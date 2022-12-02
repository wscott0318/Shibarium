import * as yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import { ChainId } from "shibarium-chains";
import { useFormik } from "formik";
import { useActiveWeb3React } from "../../services/web3";
import Web3 from 'web3';
import { dynamicChaining } from 'web3/DynamicChaining';
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { useAppDispatch } from "../../state/hooks";
import fromExponential from 'from-exponential';
import { addDecimalValue, currentGasPrice, getAllowanceAmount, web3Decimals } from "web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json";
import { MAXAMOUNT } from "../../web3/commonFunctions";
import { useEthBalance } from '../../hooks/useEthBalance';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from 'pages/components/Loading';
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
  // const [apiLoading, setApiLoading] = useState(false);
  const [transactionState, setTransactionState] = useState({
    state: true,
    title: 'Pending',
  })
  const [hashLink, setHashLink] = useState('')
  const [minDeposit, setMinDeposit] = useState<number>(0);
  const [minHeimdallFee, setMinHeimdallFee] = useState<number>(0);
  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(dynamicChaining[chainId].BONE);
  let schema = yup.object().shape({
    amount: yup.number().typeError("Only digits are allowed.").min(minDeposit).max(availBalance).required("Amount is required."),
  })
  const [loader, setLoader] = useState("step1");
  var StepComplete: string[] = [];
  useEffect(() => {
    if (account) {
      getMinimunFee()
    }
  }, [account])


  const getMinimunFee = async () => {
    try {
      let user = account;
      if (account) {
        const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
        const MinimumFees = await instance.methods.minDeposit().call({ from: user }); // read
        const MinimumHeimDallFee = await instance.methods.minHeimdallFee().call({ from: user }); // read
        const fees = +MinimumFees / 10 ** web3Decimals
        const feesHeimdall = +MinimumHeimDallFee / 10 ** web3Decimals
        setMinDeposit(fees)
        setMinHeimdallFee(feesHeimdall)
      } else {
        console.log("account addres not found")
      }
    }
    catch (err: any) {
      Sentry.captureMessage("getMinimunFee", err);
    }
  }


  const approveAmount = async (val: any) => {
    if (account) {
      console.log("called approval ")
      let user = account;
      let amount = web3.utils.toBN(fromExponential(MAXAMOUNT * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
      let gasFee = await instance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount).estimateGas({ from: user })
      let encodedAbi = await instance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount).encodeABI()
      let CurrentgasPrice: any = await currentGasPrice(web3)
      console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
      await web3.eth.sendTransaction({
        from: user,
        to: dynamicChaining[chainId].BONE,
        gas: (parseInt(gasFee) + 30000).toString(),
        gasPrice: CurrentgasPrice,
        // value : web3.utils.toHex(combinedFees),
        data: encodedAbi
      })
        .on('transactionHash', (res: any) => {
          console.log(res, "hash")
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
          console.log(res, "receipt")
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
          submitTransaction(val)
        }).on('error', (res: any) => {
          console.log(res, "error")
          if (res.code === 4001) {

          }
        })
      setTransactionState({ state: false, title: '' })
    } else {
      console.log("account not connected ====> ")
    }
  }

  const submitTransaction = async (values: any) => {
    try {
      console.log("called submitTransaction ")
      const user: any = account
      const amount = web3.utils.toBN(fromExponential(+values.amount * Math.pow(10, 18)));
      const acceptDelegation = 1
      const heimdallFee = web3.utils.toBN(fromExponential(minHeimdallFee * Math.pow(10, 18)));
      const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
      const gasFee = await instance.methods.stakeFor(user, amount, heimdallFee, acceptDelegation, becomeValidateData.publickey).estimateGas({ from: user })
      const encodedAbi = await instance.methods.stakeFor(user, amount, heimdallFee, acceptDelegation, becomeValidateData.publickey).encodeABI()
      const CurrentgasPrice: any = await currentGasPrice(web3)
      console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
      await web3.eth.sendTransaction({
        from: user,
        to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
        gas: (parseInt(gasFee) + 30000).toString(),
        gasPrice: CurrentgasPrice,
        // value : web3.utils.toHex(combinedFees),
        data: encodedAbi
      })
        .on('transactionHash', (res: any) => {
          console.log(res, "hash")
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
          console.log(res, "receipt")
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
          if (res.code === 4001) {

          }
        })

    } catch (err: any) {
      Sentry.captureMessage("submitTransaction", err);
      setTransactionState({ state: false, title: '' })
    }


  }

  const { values, errors, handleBlur, setFieldValue, handleChange, handleSubmit, touched, setValues } =
    useFormik({
      initialValues: {
        amount: ''
      },
      validationSchema: schema,
      onSubmit: (values) => {
        console.log("Value", values);
        callAPI(values)
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
  // function completeSteps (){
  //   console.log(StepComplete);
  //   if(loader == "step1"){
  //     StepComplete.push("step1");
  //     setLoader("step2");
  //   }
  //   else if(loader == "step2"){
  //     StepComplete.push("step2");
  //     setLoader("step3");
  //   }
  //   else if(loader == "step3"){
  //     StepComplete.push("step2");
  //     setLoader("step4");
  //   }
  //   else if(loader =="step4"){
  //     StepComplete.push("step3");
  //     setLoader("");
  //   }
  //   else{
  //     StepComplete.push("step4");
  //   }
  // }

  const handleTransaction = async (val: any) => {
    try {
      let user: any = account
      let allowance: any = await getAllowanceAmount(library, dynamicChaining[chainId].BONE, user, dynamicChaining[chainId].STAKE_MANAGER_PROXY)
      if (allowance < +val.amount) {
        console.log("need approval ")
        approveAmount(val) // gas fee
      } else {
        console.log("no approval needed")
        submitTransaction(val)
      }
    } catch (err: any) {
      Sentry.captureMessage("handleTransaction", err);
    }
  }

  const callAPI = async (val: any) => {
    setTransactionState({ state: true, title: 'Pending' })
    var data = new FormData();
    data.append("validatorName", becomeValidateData.name);
    data.append("public_key", becomeValidateData.publickey);
    data.append("signerAddress", account || '');
    data.append("website", becomeValidateData.website);
    data.append("img", becomeValidateData.image);
    console.log(becomeValidateData, "data")

    await registerValidator(data).then((res: any) => {
      console.log("this is eresss", res)
      handleTransaction(val)
    }).catch((err: any) => {
      console.log(err)
      notifyError()
    })
  };

  const changeStatus = async () => {
    // setApiLoading(true)
    var data = new FormData();
    data.append("validatorName", becomeValidateData.name);
    data.append("public_key", becomeValidateData.publickey);
    data.append("signerAddress", account || '');
    data.append("website", becomeValidateData.website);
    data.append("img", becomeValidateData.image);
    data.append("status", "1")

    console.log(becomeValidateData, "data")

    await registerValidator(data).then((res: any) => {
      console.log("this is eresss", res)
      // setApiLoading(false)
      notifySuccess()
      stepHandler("next");
    }).catch((err: any) => {
      console.log(err)
      // setApiLoading(false)
      notifyError()
    })
  };

  return (
    <>
      {/* {apiLoading && <LoadingSpinner />} */}
      <div className="progress-tab">
        <div className="mb-4 mb-xl-5">
          <h5 className="fw-700 mb-2 ff-mos">Add your stake amount</h5>
          <p className="ff-mos">
            Please provide your stake amount detail here
          </p>
        </div>
        <div className="row">
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Validator logo
              </label>
              <div className="file-wrap">
                <div className="file-icons">
                  {/* <img
                    src={
                      becomeValidateData?.imageURL
                        ? becomeValidateData?.imageURL : becomeValidateData?.image ? URL.createObjectURL(becomeValidateData?.image)
                          : "../../assets/images/file-icon.png"
                    }
                    alt=""
                    className="img-fluid" // 200kb 
                    width={22}
                  /> */}
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
                placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
                name="address"
                readOnly={true}
                value={account || ''}
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Signer’s Public key <span className="get-info">i</span>
                <div className="tool-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum fugit optio molestias, dolorem magni quia.</div>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
                name="publickey"
                readOnly={true}
                value={becomeValidateData.publickey}
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Enter the stake amount
              </label>
              <div className="maxButtonFloat">
                <input
                  type="text"
                  className=" mb-2 form-control"
                  placeholder="00.00"
                  value={values.amount}
                  readOnly={availBalance <= 0}
                  onChange={handleChange("amount")}
                /><button disabled={availBalance<=0} className="MaxAmountButton orange-txt fw-bold amt-val" onClick={()=> {setFieldValue ('text',  values.amount = addDecimalValue(+(availBalance-0.000001).toString()))}}>MAX</button>
                </div>
                {touched.amount && errors.amount ? <p className="primary-text pt-2 er-txt">{errors.amount}</p> : null} 
                {availBalance <= 0 ? <p className="primary-text pt-2 er-txt">Insufficient Balance</p> : null} 
                
                <div className="row-st">
                  <div className="blk-dta">
                    <label htmlFor="" className="form-label ff-mos mb-0">
                    Minimum: {minDeposit} BONE
                    </label>
                  </div>
                  <div className="blk-dta">
                    <p className="amt-val">Balance: {addDecimalValue(+availBalance)}</p>
                  </div>
                  {/* <div className="blk-dta">
                    <button disabled={availBalance<=0} className="amt-val" onClick={()=> {setFieldValue ('text',  values.amount = (availBalance-0.000001).toString())}}>MAX</button>
                  </div> */}
              </div>

            </div>
          </div>
        </div>
        <div className="btn-wrap col-sm-5 mt-4 flx">
          <button
            type="button"
            className="btn grey-btn w-100"
            onClick={() => stepHandler("back")}
          >
            <span className="ff-mos">
              Back
            </span>
          </button>
          <button
            type="button"
            disabled={availBalance <= 0}
            className="btn primary-btn w-100"
            onClick={() => handleSubmit()}
          >
            <span className="ff-mos">
              Next
            </span>
          </button>
        </div>
        <CommonModal
          title={transactionState.title}
          show={transactionState.state}
          setshow={() =>
            setTransactionState({ state: false, title: "Pending" })
          }
          externalCls="faucet-pop"
        >
          <div className="popmodal-body tokn-popup no-ht trans-mod">
            <div className="pop-block">
              <div className="pop-top">
                <div className="dark-bg-800 h-100 status-sec sec-ht position-relative">

                  {hashLink ?
                    <span>
                      <div>
                        <img
                          width="224"
                          height="224"
                          className="img-fluid"
                          src="../../assets/images/Ellipse.png"
                          alt=""
                        />
                      </div>
                    </span> :
                    <div className='trans-loader'>
                      <div className="loading-steps">
                        <div className={`step1 ${StepComplete.includes("step1") ? "completed" : ""}`}>
                          {loader == "step1" ?
                            (
                              <CircularProgress color="inherit" />
                            ) :
                            (
                              <div>
                                <img className={`img-fluid tick-img ${StepComplete.includes("step1") ? "" : "disabled"}`} src="../../assets/images/green-tick.png" alt="" width="20" />
                              </div>
                            )}
                        </div>
                        <div className={`step2 ${StepComplete.includes("step2") ? "completed" : ""}`}>
                          {loader == "step2" ? (
                            <div>
                              <CircularProgress color="inherit" />
                            </div>) : (
                            <div>
                              <img className={`img-fluid tick-img ${StepComplete.includes("step2") ? "" : "disabled"}`} src="../../assets/images/green-tick.png" alt="" width="20" />
                            </div>
                          )}
                        </div>
                        <div className={`step3 ${StepComplete.includes("step3") ? "completed" : ""}`}>
                          {loader == "step3" ? (
                            <div>
                              <CircularProgress color="inherit" />
                            </div>) : (
                            <div>
                              <img className={`img-fluid tick-img ${StepComplete.includes("step3") ? "" : "disabled"}`} src="../../assets/images/green-tick.png" alt="" width="20" />
                            </div>
                          )}
                        </div>
                        <div className={`step4 ${StepComplete.includes("step4") ? "completed" : ""}`}>
                          {loader == "step4" ? (
                            <div>
                              <CircularProgress color="inherit" />
                            </div>) : (
                            <div>
                              <img className={`img-fluid tick-img ${StepComplete.includes("step4") ? "" : "disabled"}`} src="../../assets/images/green-tick.png" alt="" width="20" />
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <span className="spiner-lg">
                        <span className="spinner-border text-secondary pop-spiner"></span>
                      </span> */}
                    </div>
                  }
                </div>
              </div>
              <div className="pop-bottom">
                {/* <p className='elip-text mt-3'>{transactionState.hash}</p> */}
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
          {/* Transaction Pending popup version 2 end*/}
        </CommonModal>
      </div>
    </>
  );
}

export default StepThree