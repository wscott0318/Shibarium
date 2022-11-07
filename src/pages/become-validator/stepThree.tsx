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

function StepThree({stepState,stepHandler}:any) {

  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const dispatch = useAppDispatch();
  
  let schema = yup.object().shape({
    amount: yup.number().typeError("only digits are allowed").min(1000).required("comission is required"),
  })

  const submitTransaction = (values : any) => {
    // stepHandler("next")  
    let user : any = account
    let acceptDelegation = true
    let publicKey = ""
    let amount = web3.utils.toBN(fromExponential(+values.amount * Math.pow(10, 18)));
    let heimdallFee = web3.utils.toBN(fromExponential(200 * Math.pow(10, 18)));
    let instance = new web3.eth.Contract(proxyManagerABI, dynamicChaining[chainId].PROXY_MANAGER);
    instance.methods.updateCommissionRate(user, amount,heimdallFee, acceptDelegation,  ).send({ from: account }) // write
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
        if (res.code === 4001) {

        }
      })

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