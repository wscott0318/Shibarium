import * as yup from "yup";
import React, { useCallback, useEffect, useState } from "react";
import { ChainId } from "shibarium-get-chains";
import { useFormik } from "formik";
import { useActiveWeb3React } from "../../services/web3";
import Web3 from 'web3';
import { dynamicChaining } from 'web3/DynamicChaining';
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { useAppDispatch } from "../../state/hooks";
import fromExponential from 'from-exponential';
import { addDecimalValue, currentGasPrice, getAllowanceAmount, sentryErrors, stakeForErrMsg, USER_REJECTED_TX, web3Decimals } from "web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json";
import { MAXAMOUNT,checkImageType } from "../../web3/commonFunctions";
import { useEthBalance } from '../../hooks/useEthBalance';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerValidator } from "services/apis/network-details/networkOverview";
import * as Sentry from '@sentry/nextjs';
import CommonModal from "pages/components/CommonModel";
import { getExplorerLink } from "app/functions/explorer";
import CircularProgress from '@material-ui/core/CircularProgress';

function StepThree({ becomeValidateData, stepState, stepHandler }: any) {

  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const dispatch = useAppDispatch();
  const [transactionState, setTransactionState] = useState({
    state: false,
    title: 'Pending',
  })
  const [hashLink, setHashLink] = useState('')
  const [minHeimdallFee, setMinHeimdallFee] = useState<number>(0);
  const ethBalance =  useEthBalance();
  const tokenBalance = useTokenBalance(dynamicChaining[chainId].BONE);
  const availBalance = chainId === ChainId.SHIBARIUM ? ethBalance : tokenBalance;
  const isLoading = availBalance == -1;
  let schema = yup.object().shape({
    amount: yup.number()
    .typeError("Only digits are allowed.")
    .max(availBalance)
    .min(2, "Minimum 2 BONES required including Heimdal fee.")
    .required("Amount is required."),
  })
  const [loader, setLoader] = useState("step1");

  const [StepComplete, setStepComplete] = useState<any>({
    one: true,
    two: false,
    three: false,
    four: false
  })

  useEffect(() => {
    if (account) {
      getMinimunFee()
    }
  }, [account]);


  const getMinimunFee = async () => {
    try {
      let user = account;
      if (account) {
        const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
        const MinimumHeimDallFee = await instance.methods.minHeimdallFee().call({ from: user }); // read
     
        const feesHeimdall = +MinimumHeimDallFee / 10 ** web3Decimals
        setMinHeimdallFee(feesHeimdall)
      }
    }
    catch (err: any) {
      Sentry.captureMessage("getMinimunFee", err);
      sentryErrors("getMinimunFee", err);
    }
  }


  const checkPubKey = async (values: any) => {
    try {
      const user: any = account
      const amount = web3.utils.toBN(fromExponential((parseInt(values.amount) - 1) * Math.pow(10, web3Decimals)));
      const acceptDelegation = 1
      const heimdallFee = web3.utils.toBN(fromExponential(minHeimdallFee * Math.pow(10, web3Decimals)));
      console.log("step 1")
      const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
      console.log("step 2" ,user, amount, heimdallFee, acceptDelegation, becomeValidateData.publickey)
      await instance.methods.stakeFor(user, amount, heimdallFee, acceptDelegation, becomeValidateData.publickey).estimateGas({ from: user }).
      then((gas:any) => {
        console.log("step 3")
        console.log("gas" ,gas);
        if(gas > 0){
          callAPI(values)
        } else {
          setTransactionState({ state: false, title: '' })
          toast.error("Unable to calculate gas fees", {
            position: toast.POSITION.BOTTOM_CENTER, autoClose: 5000
          });
        }
      })
    } catch (err: any) {
      sentryErrors("checkPubKey", err);
      let message = stakeForErrMsg(err.toString().split("{")[0])
      setTransactionState({ state: false, title: '' })
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER, autoClose: 5000
      });
    }
  }


  const approveAmount = async (val: any) => {
    try {
      if (account) {
        let user = account;
        let amount = web3.utils.toBN(fromExponential(MAXAMOUNT * Math.pow(10, 18)));
        let instance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
        let gasFee = await instance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount).estimateGas({ from: user })
        let encodedAbi = await instance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount).encodeABI()
        let CurrentgasPrice: any = await currentGasPrice(web3)
        await web3.eth.sendTransaction({
          from: user,
          to: dynamicChaining[chainId].BONE,
          gas: (parseInt(gasFee) + 30000).toString(),
          gasPrice: CurrentgasPrice,
          data: encodedAbi
        })
          .on('transactionHash', (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: user,
                chainId,
                summary: `${res}`,
              })
            )
            let link = getExplorerLink(chainId, res, 'transaction')
            setHashLink(link)
          }).on('receipt', async (res: any) => {
            dispatch(
              finalizeTransaction({
                hash: res.transactionHash,
                chainId,
                receipt: {
                  to: res.to,
                  from: res.from,
                  contractAddress: res.contractAddress,
                  transactionIndex: res.transactionIndex,
                  blockHash: res.blockHash,
                  transactionHash: res.transactionHash,
                  blockNumber: res.blockNumber,
                  status: 1
                }
              })
            )
            checkPubKey(val)
          }).on('error', (res: any) => {
            if (res.code === 4001) {
              setTransactionState({ state: false, title: '' })
            }
          })
      }
    } catch (err: any) {
      setTransactionState({ state: false, title: '' })
      sentryErrors("approveAmount" , err);
    }

  }

  const submitTransaction = async (values: any) => {
    try {
      const user: any = account
      const amount = web3.utils.toBN(fromExponential((parseInt(values.amount) - 1) * Math.pow(10, web3Decimals)));
      const acceptDelegation = 1
      const heimdallFee = web3.utils.toBN(fromExponential(minHeimdallFee * Math.pow(10, web3Decimals)));
      const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
      const gasFee = await instance.methods.stakeFor(user, amount, heimdallFee, acceptDelegation, becomeValidateData.publickey).estimateGas({ from: user })
      const encodedAbi = await instance.methods.stakeFor(user, amount, heimdallFee, acceptDelegation, becomeValidateData.publickey).encodeABI()
      const CurrentgasPrice: any = await currentGasPrice(web3)
      await web3.eth.sendTransaction({
        from: user,
        to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
        gas: (parseInt(gasFee) + 30000).toString(),
        gasPrice: CurrentgasPrice,
        data: encodedAbi
      })
        .on('transactionHash', (res: any) => {
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            })
          )
          let link = getExplorerLink(chainId, res, 'transaction')
          setHashLink(link)
        }).on('receipt', (res: any) => {
          dispatch(
            finalizeTransaction({
              hash: res.transactionHash,
              chainId,
              receipt: {
                to: res.to,
                from: res.from,
                contractAddress: res.contractAddress,
                transactionIndex: res.transactionIndex,
                blockHash: res.blockHash,
                transactionHash: res.transactionHash,
                blockNumber: res.blockNumber,
                status: 1
              }
            })
          )
          changeStatus()
          setLoader("step4");
          setStepComplete((preState: any) => ({ ...preState, three: true }))
          localStorage.clear()
        }).on('error', (res: any) => {
          console.log(res, "error")
          setTransactionState({ state: false, title: '' })
          dispatch(
            finalizeTransaction({
              hash: res.transactionHash,
              chainId,
              receipt: {
                to: res.to,
                from: res.from,
                contractAddress: res.contractAddress,
                transactionIndex: res.transactionIndex,
                blockHash: res.blockHash,
                transactionHash: res.transactionHash,
                blockNumber: res.blockNumber,
                status: 0
              }
            })
          )
          if(res.code === 4001) {
            setTransactionState({ state: false, title: '' })
            toast.error("User denied this transaction", {
              position: toast.POSITION.BOTTOM_CENTER, autoClose: 5000
            });         
          }
        })

    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("stake for method for validators submit transaction", err);
      }
      sentryErrors("submitTransaction" , err);
      setTransactionState({ state: false, title: '' })
    }
  }

  const { values, errors, handleBlur, setFieldValue, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        amount: ''
      },
      validationSchema: schema,
      onSubmit: (values) => {
        handleTransaction(values)
      },
    });

  const notifyError = () => {
    toast.error('Error In Updating !', {
      position: toast.POSITION.BOTTOM_CENTER, autoClose: 3000
    });
  }
  const notifySuccess = () => {
    toast.success('Updated successfully !', {
      position: toast.POSITION.BOTTOM_CENTER, autoClose: 3000
    });
  }

  const handleTransaction = async (val: any) => {
    try {
      setTransactionState({state: true, title: 'Checking for approval'})
      let user: any = account
      let allowance: any = await getAllowanceAmount(library, dynamicChaining[chainId].BONE, user, dynamicChaining[chainId].STAKE_MANAGER_PROXY)
      if (allowance < +val.amount) {
        console.log("need approval ")
        approveAmount(val) // gas fee
      } else {
        setLoader("step2")
        setStepComplete((preState: any) => ({ ...preState, one: true }))
        console.log("no approval needed")
        checkPubKey(val)
      }
    } catch (err: any) {
      Sentry.captureMessage("handleTransaction", err);
      sentryErrors("handleTransaction" , err);
    }
  }

  const callAPI = async (val: any) => {
    try{
      setTransactionState({ state: true, title: 'Pending' })
      let data = new FormData();
      data.append("validatorName", becomeValidateData.name);
      data.append("public_key", becomeValidateData.publickey);
      data.append("signerAddress", account || '');
      data.append("website", becomeValidateData.website);
      data.append("img", becomeValidateData.image);
      data.append("status", "0");
      await registerValidator(data).then((res: any) => {
        setLoader("step3");
        setStepComplete((preState: any) => ({ ...preState, two: true }))
        submitTransaction(values)
      }).catch((err: any) => {
        notifyError()
      })
    }
    catch(err){
      sentryErrors("callAPI" , err);
    }
  };

  const changeStatus = async () => {
    try{
      let data = new FormData();
      data.append("validatorName", becomeValidateData.name);
      data.append("public_key", becomeValidateData.publickey);
      data.append("signerAddress", account || '');
      data.append("website", becomeValidateData.website);
      data.append("img", becomeValidateData.image);
      data.append("status", "1");
      await registerValidator(data).then((res: any) => {
        setLoader("");
        setStepComplete((preState: any) => ({ ...preState, four: true }))
        notifySuccess()
        stepHandler("next");
      }).catch((err: any) => {
        notifyError()
      })
    }
    catch(err){
      sentryErrors("changeStatus" , err);
    }
  };

const loaderStep1 = ()=>{
  if(loader == "step1"){
    return(
      <CircularProgress color="inherit" />
    )
  }else{
    return( <div>
      <img
        className={`img-fluid tick-img ${StepComplete.one ? "" : "disabled"
          }`}
        src="../../assets/images/green-tick.png"
        alt=""
        width="20"
      />
    </div>)
  }
}

const loaderStep2 = ()=>{
  if(loader == "step2"){
    return(
      <CircularProgress color="inherit" />
    )
  }else{
    return(   <div>
      <img
        className={`img-fluid tick-img ${StepComplete.two ? "" : "disabled"
      }`}
      src="../../assets/images/green-tick.png"
      alt=""
      width="20"
      />
    </div>)
  }
}

const loaderStep3 = ()=>{
  if(loader == "step3"){
    return(
      <CircularProgress color="inherit" />
    )
  }else{
    return(   <div>
      <img
        className={`img-fluid tick-img ${StepComplete.three ? "" : "disabled"
          }`}
        src="../../assets/images/green-tick.png"
        alt=""
        width="20"
      />
    </div>)
  }
}

const loaderStep4 = ()=>{
  if(loader == "step4"){
    return(
      <CircularProgress color="inherit" />
    )
  }else{
    return( <div>
      <img
        className={`img-fluid tick-img ${StepComplete.four ? "" : "disabled"
          }`}
        src="../../assets/images/green-tick.png"
        alt=""
        width="20"
      />
    </div>)
  }
}

const handleTransactionState = useCallback(() => setTransactionState({ state: false, title: "Pending" }),[])

  return (
    <>
      <ToastContainer />
      <div className="progress-tab">
        <div className="mb-4 mb-xl-5">
          <h5 className="mb-2 fw-700 ff-mos">Add your stake amount</h5>
          <p className="ff-mos">Please provide your stake amount detail here</p>
        </div>
        <div className="row">
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Validator logo
              </label>
              <div className="file-wrap">
                <div className="file-icons">
                  <img
                    src={
                      becomeValidateData.image ?
                        checkImageType(becomeValidateData.image)
                        : "../../assets/images/file-icon.png"
                    }
                    alt=""
                    className="img-fluid" // 200kb
                    width={22}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Validator name
              </label>

              <input
                type="text"
                className="form-control fld-fade"
                placeholder="i.e Dark Knight Ventures"
                name="name"
                value={becomeValidateData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Website
              </label>
              <input
                type="text"
                className="form-control fld-fade"
                placeholder="https://knightventures.com"
                name="website"
                value={becomeValidateData.website}
                readOnly
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Signer’s address
              </label>
              <input
                type="text"
                className="form-control fld-fade"
                placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
                name="address"
                readOnly={true}
                value={account || ""}
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Signer’s Public Key <span className="get-info">i</span>
                <div className="tool-desc">
                  Signer's Public Key
                </div>
              </label>

              <input
                type="text"
                className="form-control fld-fade"
                placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
                name="publickey"
                readOnly={true}
                value={becomeValidateData.publickey}
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid mx-field cus-tool">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Enter the stake amount <span className="get-info">i</span>
                <div className="tool-desc">
                  Additional 1 Bone will be deducted for Heimdall fee
                </div>
              </label>
              <div className="relative maxButtonFloat">
                <input
                  type="text"
                  className="mb-2 form-control"
                  placeholder="00.00"
                  name="amount"
                  value={values.amount}
                  readOnly={availBalance <= 0}
                  onChange={handleChange("amount")}
                />
                <button
                  disabled={availBalance <= 0}
                  className="absolute MaxAmountButton orange-txt fw-bold amt-val max-bdge"
                  onClick={() => {
                    setFieldValue(
                      "amount",(addDecimalValue(+(availBalance - 0.000001).toString()))
                    );
                  }}
                >
                  MAX
                </button>
              </div>
                <div className="blk-dta cst-blk">
                  {touched.amount && errors.amount ? (
                    <p className="primary-text">{errors.amount}</p>
                  ) : null}
                  {!isLoading && (availBalance <= 0 ? (
                    <p className="primary-text">Insufficient Balance</p>
                  ) : null)}
                </div>


              <div className="row-st cst-row">
                <div className="blk-dta">
                  <p className="amt-val bold">
                    Minimum 2 BONES required
                  </p>
                </div>
                <div className="blk-dta text-nowrap">
                  <p className="amt-val">
                    Balance: {addDecimalValue(+availBalance) >= 0? addDecimalValue(+availBalance) : "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 btn-wrap col-sm-5 flx">
          <button
            type="button"
            className="btn grey-btn w-100"
            onClick={() => stepHandler("back")}
          >
            <span className="ff-mos">Back</span>
          </button>
          <button
            type="button"
            disabled={availBalance <= 0}
            className="btn primary-btn w-100"
            onClick={() => handleSubmit()}
          >
            <span className="ff-mos">Next</span>
          </button>
        </div>
        <CommonModal
          title={transactionState.title}
          show={transactionState.state}
          setshow={handleTransactionState}
          externalCls="faucet-pop no-lft"
        >
          <div className="popmodal-body tokn-popup no-ht trans-mod">
            <div className="pop-block">
              <div className="pop-top">
                <div className="dark-bg-800 h-100 status-sec sec-ht position-relative">
                  <div className='trans-loader'>
                    <div className="loading-steps">
                      <div
                        className={`step_wrapper ${StepComplete.one ? "completed" : ""
                          }`}
                      >
                        <div className={`step1`}>
                          {loaderStep1()}
                        </div>
                        <span>Approval for BONE.</span>
                      </div>
                      <div
                        className={`step_wrapper ${StepComplete.two ? "completed" : ""
                      }`}
                      >
                        <div className={`step2`}>
                          {
                            loaderStep2()
                          }
                        </div>
                          <span>Saving info in database.</span>
                      </div>
                      <div
                        className={`step_wrapper ${StepComplete.three ? "completed" : ""
                          }`}
                      >
                        <div className={`step3`}>
                          {loaderStep3()}
                        </div>
                        <span>Processing Transaction.</span>
                      </div>
                      <div
                        className={`step_wrapper ${StepComplete.four ? "completed" : ""
                          }`}
                      >
                        <div className={`step4`}>
                          {loaderStep4()}
                        </div>
                        <span>Successfully Completed.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pop-bottom">
                <div className="staus-btn">
                  <button
                    type="button"
                    className="btn primary-btn w-100"
                    disabled={hashLink ? false : true}
                    onClick={() => window.open(hashLink)}
                  >
                    View on Block Explorer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      </div>
    </>
  );
}

export default StepThree