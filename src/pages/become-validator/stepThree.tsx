import * as yup from "yup";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { useActiveWeb3React } from "../../services/web3";
import Web3 from 'web3';
import { dynamicChaining } from 'web3/DynamicChaining';
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import proxyManagerABI from "../../ABI/StakeManagerProxy.json";
import { useAppDispatch } from "../../state/hooks";
import fromExponential from 'from-exponential';
import { currentGasPrice, getAllowanceAmount } from "web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json";

function StepThree({becomeValidateData, stepState,stepHandler}:any) {

  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const dispatch = useAppDispatch();
  
  let schema = yup.object().shape({
    amount: yup.number().typeError("only digits are allowed").min(1000).required("comission is required"),
  })


  const  approveAmount = (data :any) => {
    if (account) {
      let user = account;
      let amount = web3.utils.toBN(fromExponential(10000 * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
      instance.methods.approve(dynamicChaining[chainId].PROXY_MANAGER, amount)
      .send({ from: user })
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
        let instance = new web3.eth.Contract(proxyManagerABI, dynamicChaining[chainId].PROXY_MANAGER);
        await instance.methods.stakeFor(user, data.amount ,data.heimdallFee, data.acceptDelegation, data.key )
        .send({ from: account }) // write
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
    console.log("called contract ===> ")
    let user : any = account
    let allowance : any = await getAllowanceAmount(library, dynamicChaining[chainId].BONE, user, dynamicChaining[chainId].PROXY_MANAGER)
    let amount = web3.utils.toBN(fromExponential(+values.amount * Math.pow(10, 18)));
    let acceptDelegation = true
    // let becomeValidateData.publickey = "0x040ef89e54996ee859c6c47fd3fe0bbfac9d1256937fdb86da5a1a7a0441ebe3c8b86b6448fe60b4bbca0933f70f403afd1ab973c1ab82497698dc95183b314b9d"
    let heimdallFee = web3.utils.toBN(fromExponential(2 * Math.pow(10, 18)));

    if(allowance < +values.amount) {
      console.log("need approval ")
      let data = {acceptDelegation, key : becomeValidateData.publickey, heimdallFee, amount}
      approveAmount(data)
    } else {
      let instance = new web3.eth.Contract(proxyManagerABI, dynamicChaining[chainId].PROXY_MANAGER);
    // let gasFee =  await instance.methods.stakeFor(user, amount,heimdallFee, acceptDelegation,becomeValidateData.publickey ).estimateGas({from: user})
    // let encodedAbi =  await instance.methods.stakeFor(user, amount,heimdallFee, acceptDelegation,becomeValidateData.publickey ).encodeABI()
    // let CurrentgasPrice : any = await currentGasPrice(web3)
    //    console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
    //    await web3.eth.sendTransaction({
    //      from: user,
    //      to: dynamicChaining[chainId].PROXY_MANAGER,
    //      gas: (parseInt(gasFee) + 30000).toString(),
    //      gasPrice: CurrentgasPrice,
    //      // value : web3.utils.toHex(combinedFees),
    //      data: encodedAbi
    //    })
    await instance.methods.stakeFor(user, amount,heimdallFee, acceptDelegation,becomeValidateData.publickey )
    .send({ from: account }) // write
      .on('transactionHash', (res: any) => {
        console.log(res, "hash")
        stepHandler("next");
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
      submitTransaction(values);
    },
  });

  


    return (
      <>
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
                  Enter the stake amount
                </label>
                <input
                  type="text"
                  className="mb-3 form-control"
                  placeholder="00.00"
                  value={values.amount}
                  onChange={handleChange("amount")}
                />
                {touched.amount && errors.amount ? <p className="primary-text pt-0 pl-2">{errors.amount}</p> : null} 
                <label htmlFor="" className="form-label ff-mos">
                  Minimum: 1000 BONE
                </label>
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