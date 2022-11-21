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

function StepThree({becomeValidateData, stepState,stepHandler}:any) {

  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const dispatch = useAppDispatch();
  
  const [minDeposit ,setMinDeposit] = useState<number>(0);
  const [minHeimdallFee ,setMinHeimdallFee] = useState<number>(0);
  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(dynamicChaining[chainId].BONE);
  
  let schema = yup.object().shape({
    amount: yup.number().typeError("only digits are allowed").min(minDeposit).required("comission is required"),
  })


  useEffect(() => {
    if(account){
      getMinimunFee()
    }
  }, [account])


  const getMinimunFee = async () => {
    let user = account;
    if (account) {
      const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
      const MinimumFees = await instance.methods.minDeposit().call({ from: account }); // read
      const MinimumHeimDallFee = await instance.methods.minHeimdallFee().call({ from: account }); // read
      const fees = +MinimumFees / 10 ** web3Decimals
      const feesHeimdall = +MinimumHeimDallFee / 10 ** web3Decimals
      setMinDeposit(fees)
      setMinHeimdallFee(feesHeimdall)
    } else {
      console.log("account addres not found")
    }
  }
  

  const  approveAmount = (data :any) => {
    if (account) {
      let user = account;
      let amount = web3.utils.toBN(fromExponential(MAXAMOUNT * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
      instance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount)
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
        let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
        await instance.methods.stakeFor(user, data.amount ,data.heimdallFee, data.acceptDelegation, data.key )
        .send({ from: account }) 
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
    // let gasFee =  await instance.methods.stakeFor(user, amount,heimdallFee, acceptDelegation,becomeValidateData.publickey ).estimateGas({from: user})
    // let encodedAbi =  await instance.methods.stakeFor(user, amount,heimdallFee, acceptDelegation,becomeValidateData.publickey ).encodeABI()
    // let CurrentgasPrice : any = await currentGasPrice(web3)
    //    console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
    //    await web3.eth.sendTransaction({
    //      from: user,
    //      to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
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
                  className="mb-2 form-control"
                  placeholder="00.00"
                  value={values.amount}
                  onChange={handleChange("amount")}
                />
                {touched.amount && errors.amount ? <p className="primary-text pt-0 er-txt">{errors.amount}</p> : null} 
                
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

         
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Heimdall Fees
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
                value={becomeValidateData.address}
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
                value={becomeValidateData.publickey}
                readOnly={true}
              />
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Accept Delegation
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="delegation"
                value="Yes"
                readOnly={true}
              />
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