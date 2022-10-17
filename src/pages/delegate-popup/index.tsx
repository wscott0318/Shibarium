import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useEthBalance } from "../../hooks/useEthBalance";
import { BONE_ID, ENV_CONFIGS } from 'app/config/constant';
import { getBoneUSDValue } from 'app/services/apis/validator';
import NumberFormat from 'react-number-format';
import { useActiveWeb3React, useLocalWeb3 } from 'app/services/web3';
import boneAbi from '../../constants/shibariumABIs/BONE_ABI.json'
// @ts-ignore
import { useSnackbar } from 'react-simple-snackbar';

import { buyVoucher } from 'app/services/apis/delegator/delegator';
import { parseUnits } from '@ethersproject/units';

import { getExplorerLink } from 'app/functions';
import { ChainId } from '@shibarium/core-sdk';
import ToastNotify from 'pages/components/ToastNotify';
import { useTokenBalance } from 'app/hooks/useTokenBalance';
import {L1Block} from "app/hooks/L1Block";
import Web3 from "web3";
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import fromExponential from 'from-exponential';
import { getAllowanceAmount } from "../../web3/commonFunctions";
import { BONE, PROXY_MANAGER } from 'web3/contractAddresses';
import ERC20 from "../../ABI/ERC20Abi.json"
import CommonModal from 'pages/components/CommonModel';
import { useFormik } from "formik";
import * as yup from "yup";

const DelegatePopup: React.FC<any> = ({
  data,
  onHide,
  showdelegatepop,
  setdelegatepop,
  ...props
}: any) => {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<number | string>("");
  const [tnxCompleted, setTnxCompleted] = useState(false);
  const [boneUSDValue, setBoneUSDValue] = useState<number>(0);
  const [expectedGas, setExpectedGas] = useState<number>(0);
  const [explorerLink, setExplorerLink] = useState<string>("");
  const [msgType, setMsgType] = useState<"error" | "success" | undefined>();
  const [toastMassage, setToastMassage] = useState("");
  const { account, chainId = 1, library } = useActiveWeb3React();
  const web3 = useLocalWeb3();

  const [delegateState, setdelegateState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4:false,
    title: "Delegate",
  });

  const walletBalance =
    chainId === ChainId.SHIBARIUM
      ? useEthBalance()
      : useTokenBalance(ENV_CONFIGS[chainId].BONE);

  const getBalanceG = () => {
    web3?.eth?.getBalance().then((lastBlock: number) => {
      console.log(lastBlock);
    });
  };

  useEffect(() => {
    getBoneUSDValue(BONE_ID).then((res) => {
      setBoneUSDValue(res.data.data.price);
    });
    if (account) {
      // getBalanceG()
    }
  }, [account]);

  useEffect(() => {
    const url =
      "https://ethgasstation.info/api/ethgasAPI.json?api-key=b1a28ddf8de1f32ead44643566e38dba07687ea6e456e3d9a7d1de290466";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setExpectedGas(data.fastest * 21000 * Math.pow(10, -9));
      });
  }, []);

  const useMax = () => {
    setAmount(walletBalance);
  };
  const closeModal = (e: any) => {
    setStep(1);
    setAmount("");
    setTnxCompleted(false);
    onHide();
  };
  const approveHandler = () => {
    if (!amount || !(amount > 0)) {
      setToastMassage("Amount must be greater than 0");
      setMsgType("error");
      return;
    }
    // if ((amount > walletBalance)) {
    //   setToastMassage(`Enter smaller amount, max allowed: ${walletBalance.toFixed(4)} BONE`);
    //   setMsgType('error')
    //   return;
    // }
    setTnxCompleted(false);
    // if (web3) {
    //   const currentChain: ChainId = chainId || ChainId.SHIBARIUM;
    //   const bone = new web3.eth.Contract(boneAbi, ENV_CONFIGS[currentChain].BONE);
    //   //  const val = web3.utils.toBN(amount*Math.pow(10,18))
    //   const val = parseUnits(amount.toString(), 18)
    //   web3.eth.sendTransaction({
    //     from: account,
    //     to: ENV_CONFIGS[currentChain].BONE,
    //     data: bone.methods.approve(ENV_CONFIGS[currentChain].STAKE_MANAGER, val).encodeABI()
    //   }).then((res: any) => {
    //     // setStep(2)
    //     setTnxCompleted(true)
    //   }).catch((e: any) => { console.log(e); setStep(1); })
    // }
    setTimeout(() => {
      setTnxCompleted(true);
    }, 1000);
    setStep(2);
  };
  const buyVouchers = async () => {
    const requestBody = {
      validatorAddress: data.owner,
      delegatorAddress: account,
      amount: amount,
    };
    setTnxCompleted(false);
    console.log(requestBody);
    if (account) {
      let lib: any = library;
      let web3: any = new Web3(lib?.provider);
      let walletAddress = account;
      let _minSharesToMint = 1;
      let allowance =
        (await getAllowanceAmount(lib, BONE, account, PROXY_MANAGER)) || 0;
      let amount = web3.utils.toBN(
        fromExponential(+requestBody.amount * Math.pow(10, 18))
      );
      if (+requestBody.amount > allowance) {
        console.log("need Approval");
        let approvalAmount = web3.utils.toBN(
          fromExponential(1000 * Math.pow(10, 18))
        );
        let approvalInstance = new web3.eth.Contract(ERC20, BONE);
        approvalInstance.methods
          .approve(PROXY_MANAGER, approvalAmount)
          .send({ from: walletAddress })
          .then(async (res: any) => {
            console.log(res);
            let instance = new web3.eth.Contract(
              ValidatorShareABI,
              requestBody.validatorAddress
            );
            await instance.methods
              .buyVoucher(amount, _minSharesToMint)
              .send({ from: walletAddress })
              .then((res: any) => {
                setTnxCompleted(true);
                setToastMassage(res?.data?.message);
                setMsgType("success");
                const link = getExplorerLink(
                  chainId,
                  res.transactionHash,
                  "transaction"
                );
                setExplorerLink(link);
              })
              .catch((err: any) => {
                console.log(err);
                setToastMassage("Something went wrong");
                setMsgType("error");
                setTnxCompleted(true);
                setStep(2);
                if (err.code === 4001) {
                  console.log("User desined this transaction! ");
                }
              });
          })
          .catch((err: any) => {
            console.log(err);
            setToastMassage("Something went wrong");
            setMsgType("error");
            setTnxCompleted(true);
            setStep(2);
          });
      } else {
        console.log("No approval needed");
        let instance = new web3.eth.Contract(
          ValidatorShareABI,
          requestBody.validatorAddress
        );
        await instance.methods
          .buyVoucher(amount, _minSharesToMint)
          .send({ from: walletAddress })
          .then((res: any) => {
            console.log(res);
            setTnxCompleted(true);
            setToastMassage(res?.data?.message);
            setMsgType("success");
            const link = getExplorerLink(
              chainId,
              res.transactionHash,
              "transaction"
            );
            setExplorerLink(link);
          })
          .catch((err: any) => {
            console.log(err);
            setToastMassage("Something went wrong");
            setMsgType("error");
            setTnxCompleted(true);
            setStep(2);
            if (err.code === 4001) {
              console.log("User desined this transaction! ");
            }
          });
      }
    }
    // buyVoucher(requestBody).then(res =>{
    //   setTnxCompleted(true)
    //   setToastMassage(res?.data?.message);
    //   setMsgType('success')
    //   const link = getExplorerLink(chainId,res?.data?.data?.transactionHash,'transaction')
    //   setExplorerLink(link)
    // }).catch((e)=>{
    //   setToastMassage(e?.response?.data?.message);
    //   setMsgType('error')
    //   setTnxCompleted(true);setStep(2)})
  };

  console.log(data);
const initialValues = {
  balance: "",
};
let schema = yup.object().shape({
  balance: yup.string().required("Balance is required"),
});
const [balance, setBalance] = useState();
const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
  useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Value", values);
    },
  });
console.log("Balance", values.balance);
  return (
    <>
      <CommonModal
        title={delegateState.title}
        show={showdelegatepop}
        setShow={setdelegatepop}
        externalCls="stak-pop del-pop"
      >
        <>
          <div className="cmn_modal vali_deli_popups">
            <ul className="stepper mt-3 del-step">
              <li className="step active">
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Approve</div>
              </li>
              <li className={`step ${!delegateState.step0 && "active"}`}>
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Delegate</div>
              </li>
              <li className={`step ${delegateState.step4 && "active"}`}>
                <div className="step-ico">
                  <img
                    className="img-fluid"
                    src="../../images/tick-yes.png"
                    alt="check-icon"
                  />
                </div>
                <div className="step-title">Completed</div>
              </li>
            </ul>
            {/* added by vivek */}
            {delegateState.step0 && (
              <form onSubmit={handleSubmit}>
                <div className="step_content fl-box">
                  <div className="ax-top">
                    <div className="info-box my-3">
                      <div className="d-flex align-items-center justify-content-start">
                        <div>
                          <span className="user-icon"></span>
                        </div>
                        <div className="fw-700">
                          <span className="vertical-align ft-22">{data.name}</span>
                          <p>
                            <span className="light-text">
                              100% Performance - {data.commissionPercent}% Commission
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="form-field position-relative two-fld max-group extr_pd_remove">
                      <div className="mid-chain w-100">
                        <input
                          className="w-100"
                          placeholder="0.00"
                          name="balance"
                          value={values.balance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="rt-chain">
                        <span className="orange-txt fw-bold">MAX</span>
                      </div>
                    </div>
                    {errors.balance && touched.balance ? (
                      <p className="primary-text error">{errors.balance}</p>
                    ) : null }

                    <p className="inpt_fld_hlpr_txt mt-3 text-pop-right">
                      <span>
                      <NumberFormat
                      value={(walletBalance * boneUSDValue).toFixed(4)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$ "}
                        /> 
                         </span>
                      <span className="text-right">
                        Available Balance: {walletBalance?.toFixed(8)} BONE
                      </span>
                    </p>
                  </div>
                  <div className="ax-bottom">
                    <div className="pop_btns_area row form-control mt-5">
                      <div className="col-12">
                        <button
                          className="w-100"
                          type="submit"
                          value="submit"
                          onClick={() => {
                            if (+values.balance > 0) {
                              setdelegateState({
                                ...delegateState,
                                step0: false,
                                step1: true,
                              });
                              setTimeout(() => {
                                setdelegateState({
                                  step0: false,
                                  step1: false,
                                  step2: true,
                                  step3: false,
                                  step4: false,
                                  title: "Delegate",
                                });
                              }, 2000);
                            }
                          }}
                        >
                          <a
                            className="btn primary-btn d-flex align-items-center"
                            href="javascript:void(0)"
                          >
                            <span>Continue</span>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {/* added by vivek */}

            {/* step 1 */}
            {delegateState.step1 && (
              <div className="step_content fl-box">
                <div className="ax-top">
                  <div className="image_area row">
                    <div className="col-12 text-center watch-img-sec">
                      <img
                        className="img-fluid img-wdth"
                        src="../../images/progrs-img-2.png"
                      />
                    </div>
                  </div>
                  <div className="mid_text row">
                    <div className="col-12 text-center">
                      <h4>Transaction in progress</h4>
                    </div>
                    <div className="col-12 text-center">
                      <p>
                        Ethereum transactions can take longer time to complete
                        based upon network congestion. Please wait for increase
                        the gas price of the transaction
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ax-bottom">
                  <div className="pop_btns_area row form-control mt-3">
                    <div className="col-12">
                      <a
                        className="btn primary-btn d-flex align-items-center"
                        href="javascript:void(0)"
                      >
                        <span>View on Etherscan</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* step 2 */}
            {delegateState.step2 && (
              <div className="step_content fl-box">
                <div className="ax-top">
                  <div className="image_area row">
                    <div className="col-12 text-center watch-img-sec">
                      <img
                        className="img-fluid img-wdth"
                        src="../../images/progrs-img.png"
                      />
                    </div>
                  </div>
                  <div className="mid_text row">
                    <div className="col-12 text-center">
                      <h4>Buy Voucher</h4>
                    </div>
                    <div className="col-12 text-center">
                      <p>
                        Completing this transaction will stake your Burn tokens
                        and you will start earning rewards for the upcoming
                        checkpoints.
                      </p>
                    </div>
                  </div>
                  <div className="fees_text">
                    <div className="icon_name">
                      <span>Estimated transaction fee</span>
                    </div>
                    <div className="">
                      <p>$10.00</p>
                    </div>
                  </div>
                </div>
                <div className="ax-bottom">
                  <div className="pop_btns_area row form-control">
                    <div className="col-12">
                      <button
                        className="w-100"
                        onClick={() => {
                          setdelegateState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: true,
                            step4: false,
                            title: "Delegate",
                          });
                          setTimeout(() => {
                            setdelegateState({
                              step0: false,
                              step1: false,
                              step2: false,
                              step3: false,
                              step4: true,
                              title: "Delegate",
                            });
                          }, 2000);
                        }}
                      >
                        <a
                          className="btn primary-btn d-flex align-items-center"
                          href="javascript:void(0)"
                        >
                          <span>Buy Voucher</span>
                        </a>
                      </button>
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
                    <div className="col-12 text-center watch-img-sec">
                      <img
                        className="img-fluid img-wdth"
                        src="../../images/progrs-img-2.png"
                      />
                    </div>
                  </div>
                  <div className="mid_text row">
                    <div className="col-12 text-center">
                      <h4>Transaction in progress</h4>
                    </div>
                    <div className="col-12 text-center">
                      <p>
                        Ethereum transactions can take longer time to complete
                        based upon network congestion. Please wait for increase
                        the gas price of the transaction
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ax-bottom">
                  <div className="pop_btns_area row form-control mt-3">
                    <div className="col-12">
                      {/* <button onClick={()=>{
                          setdelegateState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: false,
                            step4: true,
                            title: "Delegate",
                          });
                          
                        }}> */}
                      <a
                        className="btn primary-btn d-flex align-items-center"
                        href="javascript:void(0)"
                      >
                        <span>View on Ethereum</span>
                      </a>
                      {/* </button> */}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* step 4 */}
            {delegateState.step4 && (
              <div className="step_content fl-box">
                <div className="ax-top">
                  <div className="image_area row">
                    <div className="col-12 text-center watch-img-sec">
                      <img
                        className="img-fluid img-wdth"
                        src="../../images/cmpete-step.png"
                      />
                    </div>
                  </div>
                  <div className="mid_text row">
                    <div className="col-12 text-center">
                      <h4>Delegation completed</h4>
                    </div>
                    <div className="col-12 text-center">
                      <p>
                        Your SHIBA tokens are staked successfully on validator
                        Tarus Validator. Your delegation will take-1 mintue to
                        reflect in your account.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ax-bottom">
                  <div className="pop_btns_area row form-control mt-3">
                    <div className="col-12">
                      <button
                        className="w-100"
                        onClick={() => setdelegatepop(false)}
                      >
                        <a
                          className="btn primary-btn d-flex align-items-center"
                          href="javascript:void(0)"
                        >
                          <span>View on Ethereum</span>
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
