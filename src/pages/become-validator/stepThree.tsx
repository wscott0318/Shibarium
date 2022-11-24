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
import { currentGasPrice, getAllowanceAmount, web3Decimals } from "web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json";
import { MAXAMOUNT } from "../../web3/commonFunctions";
import {useEthBalance} from '../../hooks/useEthBalance';
import {useTokenBalance} from '../../hooks/useTokenBalance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from 'pages/components/Loading';
import { registerValidator } from "services/apis/network-details/networkOverview";
import * as Sentry from '@sentry/nextjs';

function StepThree({becomeValidateData, stepState,stepHandler}:any) {

  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const dispatch = useAppDispatch();
  const [apiLoading, setApiLoading] = useState(false)
  
  const [minDeposit ,setMinDeposit] = useState<number>(0);
  const [minHeimdallFee ,setMinHeimdallFee] = useState<number>(0);
  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(dynamicChaining[chainId].BONE);
  
  let schema = yup.object().shape({
    amount: yup.number().typeError("only digits are allowed").min(minDeposit).max(availBalance).required("amount is required"),
  })


  useEffect(() => {
    if(account){
      getMinimunFee()
    }
  }, [account])


  const getMinimunFee = async () => {
    try{
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
    catch(err:any){
      Sentry.captureMessage("New Error " , err);
    }
  }
  

  const  approveAmount = async (data :any) => {
    if (account) {
      let user = account;
      let amount = web3.utils.toBN(fromExponential(MAXAMOUNT * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
      let gasFee =  await instance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount).estimateGas({from: user})
      let encodedAbi =  await instance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount).encodeABI()
      let CurrentgasPrice : any = await currentGasPrice(web3)
         console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
         await web3.eth.sendTransaction({
           from: user,
           to:  dynamicChaining[chainId].BONE,
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
        let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
        let gasFee =  await instance.methods.stakeFor(user, data.amount ,data.heimdallFee, data.acceptDelegation, data.key ).estimateGas({from: user})
        let encodedAbi =  await instance.methods.stakeFor(user, data.amount ,data.heimdallFee, data.acceptDelegation, data.key ).encodeABI()
        let CurrentgasPrice : any = await currentGasPrice(web3)
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
            setApiLoading(false)
        stepHandler("next");  
          }).on('error', (res: any) => {
            console.log(res, "error")
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
      }).on('error', (res: any) => {
        console.log(res, "error")
        if (res.code === 4001) {

        }
      })
    } else {
      console.log("account not connected ====> ")
    }
  }

  const submitTransaction = async (values : any) => {
    // stepHandler("next")  
    setApiLoading(true)
    console.log("called contract ===> ")
    let user : any = account
    let allowance : any = await getAllowanceAmount(library, dynamicChaining[chainId].BONE, user, dynamicChaining[chainId].STAKE_MANAGER_PROXY)
    let amount = web3.utils.toBN(fromExponential(+values.amount * Math.pow(10, 18)));
    let acceptDelegation = 1
    // let becomeValidateData.publickey = "0x040ef89e54996ee859c6c47fd3fe0bbfac9d1256937fdb86da5a1a7a0441ebe3c8b86b6448fe60b4bbca0933f70f403afd1ab973c1ab82497698dc95183b314b9d"
    let heimdallFee = web3.utils.toBN(fromExponential(minHeimdallFee * Math.pow(10, 18)));

    if(allowance < +values.amount) {
      console.log("need approval ")
      let data = {acceptDelegation, key : becomeValidateData.publickey, heimdallFee, amount}
      approveAmount(data)
    } else {
      let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
    let gasFee =  await instance.methods.stakeFor(user, amount,heimdallFee, acceptDelegation,becomeValidateData.publickey ).estimateGas({from: user})
    let encodedAbi =  await instance.methods.stakeFor(user, amount,heimdallFee, acceptDelegation,becomeValidateData.publickey ).encodeABI()
    let CurrentgasPrice : any = await currentGasPrice(web3)
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
        setApiLoading(false)
        stepHandler("next");
      }).on('error', (res: any) => {
        console.log(res, "error")
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
    }
    

  }

  const { values, errors, handleBlur, handleChange, handleSubmit, touched,setValues } =
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
      position: toast.POSITION.BOTTOM_CENTER ,autoClose: 3000
  });
  }
  const notifySuccess = () => {
    toast.success('Updated successfully !', {
      position: toast.POSITION.BOTTOM_CENTER ,autoClose: 3000
  });
  }

  const callAPI = async (val :any) => {
    setApiLoading(true)
    var data = new FormData();
    data.append("validatorName", becomeValidateData.name);
    data.append("public_key", becomeValidateData.publickey);
    data.append("signerAddress", account || '');
    data.append("website", becomeValidateData.website);
    data.append("img", becomeValidateData.image);

    console.log(becomeValidateData, "data")

    await registerValidator(data).then((res: any) => {
      console.log("this is eresss",res)
      setApiLoading(false)
      notifySuccess()
      submitTransaction(val);
    }).catch((err: any) => {
      console.log(err)
      setApiLoading(false)
      notifyError()

    })
  };

  


    return (
      <>
      {apiLoading && <LoadingSpinner />}
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
                  <img
                    src={
                      becomeValidateData?.image
                        ? URL.createObjectURL(becomeValidateData?.image)
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
                Signer’s Public key
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
                Heimdall Fee
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="https://knightventures.com"
                name="website"
                value={minHeimdallFee}
                readOnly={true}
              />
            </div>

          </div>
        </div>
          <div className="row">
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label ff-mos">
                  Enter the stake amount
                </label>
                <input
                  type="text"
                  className="mb-2 form-control"
                  placeholder="00.00"
                  value={values.amount}
                  readOnly={availBalance <= 0}
                  onChange={handleChange("amount")}
                />
                {touched.amount && errors.amount ? <p className="primary-text pt-2 er-txt">{errors.amount}</p> : null} 
                {availBalance <= 0 ? <p className="primary-text pt-2 er-txt">Insufficient Balance</p> : null} 
                
                <div className="row-st">
                  <div className="blk-dta">
                    <label htmlFor="" className="form-label ff-mos mb-0">
                    Minimum: {minDeposit} BONE
                    </label>
                  </div>
                  <div className="blk-dta">
                    <p className="amt-val">Balance: {availBalance}</p>
                  </div>
                </div>

              </div>
            </div>

         
         
        
          </div>
          <div className="btn-wrap col-sm-5 mt-4 flx">
            <button
              type="button"
              className="btn grey-btn w-100"
              onClick={()=>stepHandler("back")}
            >
              <span className="ff-mos">
                Back
              </span>
            </button>
            <button
              type="button"
              disabled={availBalance <= 0}
              className="btn primary-btn w-100"
              onClick={()=> handleSubmit()}
            >
              <span className="ff-mos">
                Next
              </span>
            </button>
          </div>
        </div>
      </>
    );
}

export default StepThree