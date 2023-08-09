/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from "react";
import CommonModal from "../components/CommonModel";
import InnerHeader from "../../pages/inner-header";
import Sidebar from "../layout/sidebar";
import axios from "axios";
import { useActiveWeb3React } from "app/services/web3";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import {
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { getExplorerLink } from "app/functions";
import { ChainId } from "shibarium-get-chains";
import * as Sentry from "@sentry/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GOERLI_CHAIN_ID, PUPPYNET_CHAIN_ID } from "app/config/constant";
export default function Faucet() {
  const [showSwapModal, setSwapModal] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const router = useRouter();
  const siteKey: any = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [selectedChain, setSelectedChain] = useState(1);
  const [modalState, setModalState] = useState({
    pending: true,
    done: false,
    hash: "",
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isActive, setIsActive] = useState(1);
  const { chainId = 1, account } = useActiveWeb3React();
  const [token, setToken] = useState<string>("BONE");
  const [tokenAddress, setTokenAddress] = useState(process.env.BONE as string);
  const url = process.env.NEXT_PUBLIC_FAUCET_API_URL;
  const handleMenuState = () => {
    setMenuState(!menuState);
  };
  const tokenList = [
    {
      name: "BONE",
      1: process.env.BONE as string,
      2: "0x0000000000000000000000000000000000001010",
    },
    {
      name: "LEASH",
      1: "0xF03a16A00E2Bd4de22aBf8d9b6261c0d2eBb1b70",
      2: "0x83990e7CFd6037555CFb5BC692d2e0b2893055E5",
    },
    {
      name: "SHIB",
      1: "0x24DC7E3Dee8F69465F73402211093190777BD4D4",
      2: "0x7e001F857cC89F44eb3D53b2cbFa436fABB70E39",
    },
  ];
  useEffect(() => {
    router.push("/");
  });

  const handleTokenChange = (event: any) => {
    let faucetToken = tokenList.filter(
      (token: any) => token.name === event.target.value
    );
    setToken(event.target.value);
    setTokenAddress(
      faucetToken[0][selectedChain as keyof typeof faucetToken[0]]
    );
  };

  useEffect(() => {
    let faucetToken = tokenList.filter((item: any) => item.name === token);
    setTokenAddress(
      faucetToken[0][selectedChain as keyof typeof faucetToken[0]]
    );
  }, [selectedChain]);

  console.log("selectedchain ", selectedChain, " token ", token, tokenAddress);
  const handleChange = (e: any) => {
    setSelectedChain(e.target.value);
    console.log("value inside e", e.target.value);
    setIsActive(e.target.value);
  };
  useEffect(() => {
    if (!account) {
      router.back();
    }
  }, [account]);

  const callFaucetAPI = async () => {
    setSwapModal(true);
    setModalState({
      pending: true,
      done: false,
      hash: "",
    });
    console.log("entered faucet api", account);
    try {
      await axios
        .post(`${url}/getToken`, {
          address: account,
        })
        .then(async (res: any) => {
          recaptchaRef.current?.reset();
          let accessToken = res.data.data.token;
          console.log("access token ", res);
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          };
          await axios
            .post(
              `${url}/getAuthToken`,
              {},
              {
                headers: headers,
              }
            )
            .then(async (res: any) => {
              await axios
                .post(
                  `${url}/faucet`,
                  {
                    type: selectedChain,
                    tokenAddress: tokenAddress,
                  },
                  { headers: headers }
                )
                .then((res: any) => {
                  setModalState({
                    pending: false,
                    done: true,
                    hash: res.data.data.transactionHash,
                  });
                  toast.success("Faucet claimed! Check wallet.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    type: toast.TYPE.SUCCESS,
                  });
                })
                .catch((err: any) => {
                  if (err.message === "Request failed with status code 400") {
                    toast.error("Faucet can be claimed once every 24 hours.", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 5000,
                    });
                  } else {
                    toast.error("Something went wrong", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 5000,
                    });
                  }
                  setSwapModal(false);
                  setClickedCaptcha(false);
                  recaptchaRef.current?.reset();
                });
            });
        })
        .catch((err: any) => {
          console.log(JSON.stringify(err.message));
          if (err.message === "Request failed with status code 400") {
            toast.error("Faucet can be claimed once every 24 hours.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            });
          } else {
            toast.error("Something went wrong", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            });
          }
          setSwapModal(false);
          // console.log("err =>", err)
          setClickedCaptcha(false);
          recaptchaRef.current?.reset();
        });
    } catch (err: any) {
      Sentry.captureMessage("callFaucetAPI" + selectedChain, err);
      console.log("error-> ", err);
    }
  };

  const [clickedCaptcha, setClickedCaptcha] = useState(false);

  const handleCaptcha = (e: any) => {
    // console.log("receptcha event ", e)
    setClickedCaptcha(true);
  };
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "error me-3";
  };

  const handleExplorer = () => {
    let link: any;
    if (selectedChain == 1) {
      link = getExplorerLink(GOERLI_CHAIN_ID, modalState?.hash, "transaction");
    } else {
      link = getExplorerLink(
        PUPPYNET_CHAIN_ID,
        modalState?.hash,
        "transaction"
      );
    }
    window.open(link);
  };
  return (
    <>
      <ToastContainer />
      <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />
        {/* Form section start */}
        <div className="cmn_dashbord_main_outr">
          <InnerHeader />

          <div className="swap-card cus-card-800">
            <div className="swp-header">
              <div className="mb-3 swp-left-col mb-lg-3 mb-xl-4">
                <h2 className="mb-4">Faucet</h2>
                <h6 className="mb-2">Get Gas Coin</h6>
                <p className="grey-txts">
                  This faucet transfers Gas Coin on Shibarium testnet. Confirm
                  details before submitting.
                </p>
              </div>
            </div>
            <div className="fau_tabs_area">
              {/* <div className="tab-sec botom-spcing">
                      <ul className="tab-links">
                        <li><a className="tb-link tab-active" href="javascript:void(0);">Topdog</a></li>
                        <li><a className="tb-link" href="javascript:void(0);">Puppydog</a></li>
                      </ul>
                    </div> */}
              <div className="tab-content-sec h-100">
                <div className="faucet-form">
                  <div className="form-section">
                    <div className="">
                      <div className="">
                        <form>
                          <div className="botom-spc">
                            <div className="form-group">
                              {/* <div className="mb-2 form-field dark-input">
                                <div className="mid-chain w-100 position-relative"> */}
                              {/* <Form.Select
                                    name="toChain"
                                    defaultValue={selectedChain}
                                    value={selectedChain}
                                    className="form-field"
                                    onChange={handleChange}
                                    style={{
                                      background: '#0c0f17',
                                      border: 'none',
                                      color: '#fff',
                                      marginBottom:"10px"
                                    }}
                                  >
                                    <option value="1">Goerli BONE</option>
                                    <option value="2">Puppy Net BONE</option>
                                  </Form.Select> */}
                              <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={selectedChain}
                                className="radioGroup"
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  value="1"
                                  control={<Radio />}
                                  label={
                                    <div
                                      className="d-flex justify-content-center align-items-center"
                                      style={{ height: "34px" }}
                                    >
                                      <img
                                        width={18}
                                        src="../../assets/images/eth.png"
                                        className="me-2"
                                        onError={imageOnErrorHandler}
                                      />{" "}
                                      Sepolia
                                    </div>
                                  }
                                  className={`radioButtons ${
                                    isActive == 1 && "active"
                                  }`}
                                />
                                <FormControlLabel
                                  value="2"
                                  control={<Radio />}
                                  label={
                                    <div
                                      className="d-flex justify-content-center align-items-center"
                                      style={{ height: "34px" }}
                                    >
                                      <img
                                        width={24}
                                        src="../../assets/images/shib-logo.png"
                                        className="me-2"
                                        onError={imageOnErrorHandler}
                                      />{" "}
                                      Puppy Net
                                    </div>
                                  }
                                  className={`radioButtons ${
                                    isActive == 2 && "active"
                                  }`}
                                />
                              </RadioGroup>
                            </div>
                            {/* </div>
                            </div> */}
                            <div className="form-group">
                              <div className="form-field dark-input mb-2">
                                <div className="mid-chain w-100 position-relative selectTokenWrapper">
                                  <Select
                                    labelId="select-token-for-faucet"
                                    id="selectToken"
                                    value={token}
                                    label="Select Token"
                                    onChange={handleTokenChange}
                                  >
                                    <MenuItem value={"BONE"}>
                                      BONE{"  "}
                                      <small style={{ color: "red" }}>
                                        (Plasma)
                                      </small>
                                    </MenuItem>
                                    <MenuItem value={"SHIB"}>
                                      SHIB{"  "}
                                      <small style={{ color: "red" }}>
                                        (Pos)
                                      </small>
                                    </MenuItem>
                                    <MenuItem value={"LEASH"}>
                                      LEASH{"  "}
                                      <small style={{ color: "red" }}>
                                        {" "}
                                        (Pos)
                                      </small>
                                    </MenuItem>
                                  </Select>
                                  {/* <a href="javascript:void(0);" className="orange-btn">Paste</a> */}
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="form-field dark-input">
                                <div className="mid-chain w-100 position-relative">
                                  <input
                                    className="w-100"
                                    type="text"
                                    placeholder="Insert a custom value"
                                    disabled
                                    // @ts-ignore
                                    value={account}
                                  />
                                  {/* <a href="javascript:void(0);" className="orange-btn">Paste</a> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 captcha-wrap mt-sm-4">
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={siteKey}
                              asyncScriptOnLoad={() => {}}
                              onChange={handleCaptcha}
                              onExpired={() => {
                                setClickedCaptcha(false);
                                recaptchaRef.current?.reset();
                              }}
                            />
                          </div>
                          <div className="mt-3 ">
                            <button
                              disabled={!clickedCaptcha}
                              onClick={() => callFaucetAPI()}
                              type="button"
                              className="btn primary-btn w-100"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Form section end */}
      </main>
      {/* Review model code start */}
      <CommonModal
        title={
          modalState.pending ? "Transaction Pending" : "Transaction Submitted"
        }
        show={showSwapModal}
        setshow={setSwapModal}
        externalCls="faucet-pop"
      >
        <div className="popmodal-body tokn-popup no-ht trans-mod">
          <div className="pop-block">
            <div className="pop-top">
              <div className="dark-bg-800 h-100 status-sec">
                {modalState.pending ? (
                  <span className="p-5">
                    <CircularProgress size={130} style={{ color: "#f27c02" }} />
                  </span>
                ) : (
                  <span className="p-4">
                    <div>
                      <img
                        width="180"
                        height="170"
                        className="img-fluid"
                        src="../../assets/images/Ellipse.png"
                        alt=""
                        onError={imageOnErrorHandler}
                      />
                    </div>
                  </span>
                )}
              </div>
            </div>
            <div className="pop-bottom">
              {/* <p className='mt-3 elip-text'>{modalState.hash}</p> */}
              <div className="staus-btn">
                <button
                  type="button"
                  className="btn primary-btn w-100"
                  disabled={modalState.hash ? false : true}
                  onClick={handleExplorer}
                >
                  View on Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Transaction Pending popup version 2 end*/}
      </CommonModal>
      {/* Review model code end */}
    </>
  );
}
