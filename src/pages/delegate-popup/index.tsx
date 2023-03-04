import React, { useCallback, useEffect, useState } from 'react'
import { useEthBalance } from "../../hooks/useEthBalance";
import { BONE_ID } from 'app/config/constant';
import { getBoneUSDValue } from 'app/services/apis/validator';
import { useActiveWeb3React, useLocalWeb3 } from 'app/services/web3';
import { getExplorerLink } from 'app/functions/explorer';
import { ChainId } from 'shibarium-get-chains';
import { useWalletTokenBalance } from 'app/hooks/useTokenBalance';
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import fromExponential from 'from-exponential';
import { getAllowanceAmount, MAXAMOUNT, toFixedPrecent, USER_REJECTED_TX, currentGasPrice } from "../../web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json"
import CommonModal from 'pages/components/CommonModel';
import { useFormik } from "formik";
import * as yup from "yup";
import { addTransaction, finalizeTransaction } from "../../state/transactions/actions";
import { useAppDispatch } from "../../state/hooks"
import { dynamicChaining } from 'web3/DynamicChaining';
import { Spinner } from 'react-bootstrap';
import * as Sentry from "@sentry/nextjs";
import { setDelegatorData } from "../../services/apis/user/userApi"
import { CircularProgress } from '@material-ui/core';

const initialModalState = {
  step0: true,
  step1: false,
  step2: false,
  step3: false,
  title: "Delegate",
}

const DelegatePopup: React.FC<any> = ({
  data,
  onHide,
  showdelegatepop,
  setdelegatepop,
  getDelegatorCardData,
  ...props
}: any) => {
  const amount = ""
  const [explorerLink, setExplorerLink] = useState<string>("");
  const { account, chainId = 1, library } = useActiveWeb3React();
  const web3 = useLocalWeb3();
  const [transactionState, setTransactionState] = useState({
    state: false,
    title: "",
  });

  const dispatch = useAppDispatch()

  const [delegateState, setdelegateState] = useState(initialModalState);
  const [loader, setLoader] = useState(false);
  const ethBalance = useEthBalance();
  const { newBalance, updateBalance } = useWalletTokenBalance(dynamicChaining[chainId]?.BONE);
  const [walletBalance, setWalletBalance] = useState<any>();
  const isLoading = walletBalance == -1;
  const [isMax, setIsMax] = useState(false);

  useEffect(() => {
    if (chainId === ChainId.SHIBARIUM) {
      setWalletBalance(ethBalance);
    }
    else {
      setWalletBalance(newBalance);
    }
  }, [walletBalance, ethBalance, newBalance]);

  useEffect(() => {
    getBoneUSDValue(BONE_ID).then((res) => {
    
    });
    if (account) {
      // getBalanceG()
    }
  }, [account]);


  // console.log(data, "parent Data ==> ")


  const maxBal = (e: any) => {
    e.preventDefault()
    setIsMax(true);
    setFieldValue("balance", `${walletBalance}`)
  };



  const buyVouchers = async () => {
    try {
      setLoader(true);
      const requestBody = {
        validatorAddress: data.contractAddress,
        delegatorAddress: account,
        amount: values.balance,
        valID: data.validatorContractId
      };
    
      if (account) {
        let lib: any = library;
        let allowance =
          (await getAllowanceAmount(lib, dynamicChaining[chainId].BONE, account, dynamicChaining[chainId].STAKE_MANAGER_PROXY)) || 0;

        if (+requestBody.amount > allowance) {
          APPROVE_BONE(requestBody)
          // BUY_VOUCHER(requestBody)
        } else {
          BUY_VOUCHER(requestBody)
        }
      }
    }
    catch (err: any) {
      Sentry.captureMessage("buyVouchers ", err);
    }
  };



  const APPROVE_BONE = async (requestBody: any) => {
    let walletAddress: any = account;
    try {
      console.log("need Approval", amount);
      setTransactionState({ state: true, title: "Pending" });
      let approvalAmount = web3.utils.toBN(
        fromExponential(MAXAMOUNT * Math.pow(10, 18))
      );
      console.log("approvalAmount ", approvalAmount);
      let approvalInstance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
      let gasFee = await approvalInstance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, approvalAmount).estimateGas({ from: walletAddress })
      let encodedAbi = await approvalInstance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, approvalAmount).encodeABI()
      let CurrentgasPrice: any = await currentGasPrice(web3)
      // console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
      await web3.eth.sendTransaction({
        from: walletAddress,
        to: dynamicChaining[chainId].BONE,
        gas: (parseInt(gasFee) + 30000).toString(),
        gasPrice: CurrentgasPrice,
        // value : web3.utils.toHex(combinedFees),
        data: encodedAbi
      })
        .on('transactionHash', (res: any) => {
          dispatch(
            addTransaction({
              hash: res,
              from: walletAddress,
              chainId,
              summary: `${res}`,
            })
          )
          setTransactionState({ state: true, title: "Submitted" });
          setFieldValue("balance", "");
        })
        .on('receipt', (res: any) => {
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
          BUY_VOUCHER(requestBody)
        })
        .on('error', (err: any) => {
          setdelegateState(initialModalState)
          setdelegatepop();
          setTransactionState({ state: false, title: "" });
          setFieldValue("balance", "");
          resetForm();
        })
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("APPROVE_BONE ", err);
      }
      resetForm();
      setdelegateState(initialModalState)
      setdelegatepop();
      setTransactionState({ state: false, title: "" });
      setFieldValue("balance", "");
    }
console.log(transactionState,'transactionState');

  }
  const initialValues = {
    balance: 0,
  };

  let schema = yup.object().shape({
    balance: yup
      .number().typeError("Only digits are allowed.")
      .max(
        walletBalance,
        "Insufficient Balance."
      )
      .required("Balance is required."),
  });

  const callAPIforDelegator = async (requestBody: any) => {
    try {
      const valID = requestBody.valID
      const wallet: any = account
      await setDelegatorData(wallet.toLowerCase(), valID).then((res: any) => {
        // console.log(res.data, "callAPIforDelegator data res ==> ")
      })
    } catch (err: any) {
      // console.log(err)
    }


  }

  const { values, errors, handleBlur, handleChange, setFieldValue, handleSubmit, touched, setValues, resetForm }: any =
    useFormik({
      initialValues: initialValues,
      validationSchema: schema,
      onSubmit: (values) => {
        console.log("Value", values);
        setdelegateState({
          step0: false,
          step1: true,
          step2: false,
          step3: false,
          title: "Delegate"
        })
      },
    });

  const BUY_VOUCHER = async (requestBody: any) => {
    setTransactionState({ state: true, title: "Pending" });
    let walletAddress: any = account;
    let _minSharesToMint = web3.utils.toBN(
      fromExponential(1 * Math.pow(10, 18))
    );
    let amount = web3.utils.toBN(
      fromExponential(+requestBody.amount * Math.pow(10, 18))
    );

    try {
      console.log("No approval needed", amount);
      let instance = new web3.eth.Contract(
        ValidatorShareABI,
        requestBody.validatorAddress
      );
      // console.log({amount, _minSharesToMint})
      await instance.methods
        .buyVoucher(amount, _minSharesToMint)
        .send({ from: walletAddress })
        .on("transactionHash", (res: any) => {
          setLoader(false);
          dispatch(
            addTransaction({
              hash: res,
              from: walletAddress,
              chainId,
              summary: `${res}`,
            })
          );
          setLoader(true);
          setFieldValue("balance", '')
          const link = getExplorerLink(chainId, res, "transaction");
          setExplorerLink(link);
          setdelegateState({
            step0: false,
            step1: false,
            step2: true,
            step3: false,
            title: "Transaction In Progress",
          });
          setTransactionState({ state: true, title: "Submitted" });
          setFieldValue("balance", "");
        })
        .on("receipt", (res: any) => {
          updateBalance();
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
                status: 1,
              },
            })
          );
          setTimeout(async () => {
            await getDelegatorCardData(account);
          }, 3000)
          const link = getExplorerLink(
            chainId,
            res.transactionHash,
            "transaction"
          );

          setExplorerLink(link);
          setdelegateState({
            step0: false,
            step1: false,
            step2: false,
            step3: true,
            title: "Transaction Done",
          });
          callAPIforDelegator(requestBody)
          setTimeout(() => {
            window.location.reload()
          }, 2000)
          resetForm();
        })
        .on("error", (err: any) => {
          console.log(err)
          setdelegateState(initialModalState);
          setdelegatepop();
          setFieldValue("balance", "");
          console.log("values ==> ", values.balance);
          resetForm();
        });
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("BUY_VOUCHER ", err);
      }
      setTransactionState({ state: false, title: "" });
      setdelegateState(initialModalState);
      setdelegatepop();
      setFieldValue("balance", "");
      console.log("values ==> ", values.balance);
      resetForm();
    }
  };

  useEffect(() => {
    if (!showdelegatepop) {
      setLoader(false);
      setValues(initialValues);
    }
  }, [showdelegatepop]);

  const handleClose = () => {
    setdelegateState(initialModalState);
    setdelegatepop();
    setFieldValue("balance", 0);
  }

const handleShow = useCallback(()=>{ handleClose(); resetForm()},[])

  const handleUserInput = (input : any) => {
    if(isMax) {
      return parseInt('' + (input * 100)) / 100
    } else if (input === 0) {
      return null
    } else {
      return input 
    }
  }

  return (
    <>
      <CommonModal
        title={delegateState.title}
        show={showdelegatepop}
        setshow={handleShow}
        externalCls="stak-pop del-pop ffms-inherit"
      >
        <>
          <div className="cmn_modal vali_deli_popups ffms-inherit">
            <ul className="mt-3 stepper del-step">
              <li className="step active">
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../assets/images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Approve</div>
              </li>
              <li className={`step ${!delegateState.step0 && "active"}`}>
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../assets/images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Delegate</div>
              </li>
              <li className={`step ${delegateState.step3 && "active"}`}>
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../assets/images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Completed</div>
              </li>
            </ul>
            {/* added by vivek */}
            {delegateState.step0 && (
              <form className="h-100" onSubmit={handleSubmit}>
                <div className="step_content fl-box">
                  <div className="ax-top">
                    <div className="my-3 info-box">
                      <div className="d-flex align-items-center justify-content-start">
                        <div>
                          <span className="user-icon u_icon"><img src={data.logoUrl ? data.logoUrl : "../../assets/images/shiba-round-icon.png"} /></span>
                        </div>
                        <div className="fw-700">
                          <span className="vertical-align ft-22">
                            {data.name}
                          </span>
                          <p>
                            <span className="light-text">
                              {data?.uptimePercent?.toFixed(toFixedPrecent)}% Performance <br />{data.commissionrate} %
                              Commission
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-auto form-field position-relative two-fld max-group extr_pd_remove bg-clr">
                      <div className="mid-chain w-100">
                        <input
                          className="w-100"
                          placeholder="0.00"
                          name="balance"
                          autoComplete="off"
                          // value={isMax ? (parseInt('' + (values.balance * 100)) / 100) : values.balance === 0 ? null : values.balance}
                          value={handleUserInput(values.balance)}
                          onChange={(e) => { handleChange(e); setIsMax(false); }}
                          onBlur={handleBlur}
                        />
                      </div>
                      <button disabled={walletBalance > 0 ? false : true} onClick={(e) => maxBal(e)} className="rt-chain">
                        <span className="orange-txt fw-bold">MAX</span>
                      </button>
                    </div>
                    {errors.balance && touched.balance && (
                      <p className="primary-text error">{errors.balance}</p>
                    )}

                    <p className="flex-wrap mt-3 inpt_fld_hlpr_txt text-pop-right d-flex">
                      <span>
                        {/* <NumberFormat
                          value={(walletBalance * boneUSDValue).toFixed(tokenDecimal)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        /> */}
                      </span>
                      <span className="text-right">
                        Balance: {isLoading ? 0.00 : (parseInt('' + (walletBalance * 100)) / 100)} BONE
                      </span>
                    </p>
                  </div>
                  <div className="ax-bottom">
                    <div className="mt-3 pop_btns_area row form-control">
                      <div className="col-12">
                        <button className="w-100" type="submit" value="submit">
                          <div className="btn primary-btn d-flex align-items-center justify-content-center">
                            <span>Continue</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {/* added by vivek */}

            {/* step 2 */}
            {delegateState.step1 && (
              <div className="step_content fl-box">
                <div className="ax-top">
                  <div className="image_area row">
                    <div className="text-center col-12 watch-img-sec">
                      <img
                        className="img-fluid img-wdth"
                        src="../../assets/images/progrs-img.png"
                      />
                    </div>
                  </div>
                  <div className="mid_text row">
                    <div className="text-center col-12">
                      {/* <h4 className="ff-mos">Buy Voucher</h4> */}
                    </div>
                    <div className="text-center col-12">
                      <p className="ff-mos">
                        Completing this transaction will stake your Bone tokens
                        and you will start earning rewards for the upcoming
                        checkpoints.
                      </p>
                    </div>
                  </div>
                  {/* <div className="fees_text">
                    <div className="icon_name">
                      <span className='ff-mos'>Estimated transaction fee</span>
                    </div>
                    <div className="">
                      <p className='ff-mos'>$10.00</p>
                    </div>
                  </div> */}
                </div>
                <div className="ax-bottom">
                  <div className="pop_btns_area row form-control">
                    <div className="col-12">
                      <button
                        className="w-100"
                        onClick={() => buyVouchers()}
                        disabled={loader}
                      >
                        {loader ? (
                          <a
                            className="btn primary-btn d-flex align-items-center crsrDefault"
                            href="javascript:void(0)"
                          >
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <a
                            className="btn primary-btn d-flex align-items-center"
                            href="javascript:void(0)"
                          >
                            <span>Delegate</span>
                          </a>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* step 1 */}
            {delegateState.step2 && (
              <div className="step_content fl-box">
                <div className="ax-top">
                  <div className="image_area row">
                    <div className="text-center col-12 watch-img-sec">
                      {/* <img
                        className="img-fluid img-wdth"
                        src="../../assets/images/progress-loading.gif"
                        height="150"
                        width="150"
                      /> */}
                      <CircularProgress color="inherit" size={120} style={{ color: "#f06500" }} />
                    </div>
                  </div>
                  <div className="mid_text row">
                    <div className="text-center col-12">
                      <h4 className="ff-mos">Transaction in progress</h4>
                    </div>
                    <div className="text-center col-12">
                      <p className="ff-mos">
                        Layer1 transactions can take longer time to complete
                        based upon network congestion. Please wait or increase
                        the gas price of the transaction.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ax-bottom">
                  <div className="mt-3 pop_btns_area row form-control">
                    <div className="col-12">
                      <a
                        className="btn primary-btn d-flex align-items-center"
                        target="_blank"
                        href={explorerLink}
                      >
                        <span>View on Block Explorer</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* step 3 */}
            {delegateState.step3 && (
              <div className="step_content fl-box">
                <div className="ax-top">
                  <div className="image_area row">
                    <div className="text-center col-12 watch-img-sec">
                      <img
                        className="img-fluid img-wdth"
                        src="../../assets/images/cmpete-step.png"
                        width="150"
                        height="150"
                      />
                    </div>
                  </div>
                  <div className="mid_text row">
                    <div className="text-center col-12">
                      <h4 className="ff-mos">Delegation Submitted </h4>
                    </div>
                    <div className="text-center col-12">
                      <p className="ff-mos">
                        Your tokens are staked successfully on validator.
                        Your delegation will take 4-5 mintues to reflect in your
                        account.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ax-bottom">
                  <div className="mt-3 pop_btns_area row form-control">
                    <div className="col-12">
                      <button className="w-100">
                        <a
                          className="btn primary-btn d-flex align-items-center"
                          target="_blank"
                          href={explorerLink}
                        >
                          <span>View on Block Explorer</span>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      </CommonModal>
    </>
  );
};

export default DelegatePopup;
