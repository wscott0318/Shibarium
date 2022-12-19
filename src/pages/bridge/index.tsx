/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Popup from "../components/PopUp";
import NumberFormat from "react-number-format";
import CommonModal from "../components/CommonModel";
import InnerHeader from "../inner-header";
import Link from "next/link";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import Sidebar from "../layout/sidebar";
import Web3Status from "app/components/Web3Status";
import { getWalletTokenList } from "../../services/apis/validator/index";
import { getTokenBalance } from "../../hooks/useTokenBalance";
import { getBoneUSDValue } from "../../services/apis/validator/index";
import { useActiveWeb3React } from "../../services/web3";
import { BONE_ID } from "../../config/constant";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import depositManagerABI from "../../ABI/depositManagerABI.json";
import Web3 from "web3";
import {
  addTransaction,
  finalizeTransaction,
} from "app/state/transactions/actions";
import { useAppDispatch } from "../../state/hooks";
import fromExponential from "from-exponential";
import { getExplorerLink } from "app/functions";
import { currentGasPrice, getAllowanceAmount, USER_REJECTED_TX } from "web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json";
import { tokenDecimal } from "web3/commonFunctions";
import { useWeb3React } from "@web3-react/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addTokenAbi from "../../ABI/custom-token-abi.json";
import { AbiItem } from "web3-utils";
import * as Sentry from "@sentry/nextjs";
import { MenuItem, Select } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import SUPPORTED_NETWORKS from "../../modals/NetworkModal/index";
import { ChainId } from "../../modals/NetworkModal/ChainIDs";
import { NETWORK_ICON, NETWORK_LABEL } from "../../config/networks";
import Image from "next/image";
import { dynamicChaining } from "web3/DynamicChaining";
import ManageToken from "../components/ManageToken"
import Comingsoon from "app/components/coming-soon";

export default function Withdraw() {
  const { chainId = 1, account, library } = useActiveWeb3React();
  const lib: any = library;
  const web3: any = new Web3(lib?.provider);
  const dispatch = useAppDispatch();

  const bridgeType: string = localStorage.getItem("bridgeType") || "deposit";

  const [menuState, setMenuState] = useState(false);
  const [selectedToken, setSelectedToken] = useState(
    JSON.parse(localStorage.getItem("depositToken") || "{}")
  );
  const [showDepositModal, setDepositModal] = useState(false);
  const [showWithdrawModal, setWithdrawModal] = useState(false);
  const [showTokenModal, setTokenModal] = useState(false);
  const [depositTokenInput, setDepositTokenInput] = useState("");
  const [withdrawTokenInput, setWithdrawTokenInput] = useState("");
  const [dWState, setDWState] = useState(
    bridgeType === "deposit" ? true : false
  );
  const [boneUSDValue, setBoneUSDValue] = useState(0);
  const [hashLink, setHashLink] = useState("");
  const [newToken, addNewToken] = useState("");
  const [openManageToken, setOpenManageToken] = useState(false)
  const handleMenuState = () => {
    setMenuState(!menuState);
  };
  const router = useRouter();
  // useEffect(() => {
  //   console.log("chain id  , ", SUPPORTED_NETWORKS);
  // })

  useEffect(() => {
    getBoneUSDValue(BONE_ID).then((res) => {
      setBoneUSDValue(res.data.data.price);
    });
  }, [account]);

  const [withModalState, setWidModState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    title: "Initialize Withdraw",
  });
  const [depModalState, setDepModState] = useState({
    step0: true,
    step1: false,
    step2: false,
    title: "Confirm deposit",
  });
  const [tokenState, setTokenState] = useState({
    step0: true,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    title: "Select a Token",
  });
  const [tokenModalList, setTokenModalList] = useState<any>([]);
  const [tokenList, setTokenList] = useState([]);
  const [localTokens, setLocalTokens] = useState<any>(
    JSON.parse(localStorage.getItem("newToken") || "[]")
  );
  const [tempTokens, setTempTokens] = useState<any>({
    parentContract: "",
    childContract: "",
    parentName: "",
    parentSymbol: "",
  });
  const getTokensList = () => {
    try {
      getWalletTokenList().then((res) => {
        let list = res.data.message.tokens;
        list.forEach(async (x: any) => {
          if (x.parentName === "BoneToken") {
            x.balance = await getTokenBalance(
              lib,
              account,
              dynamicChaining[chainId].BONE
            );
          } else {
            x.balance = await getTokenBalance(lib, account, x.parentContract);
          }
        });
        setTokenList(list);
        // setTokenFilteredList(list);
        setTokenModalList([...localTokens, ...list]);
      });
    } catch (err: any) {
      Sentry.captureMessage("getTokensList", err);
    }
  };
  useEffect(() => {
    if (account) {
      getTokensList();
      // console.log("selected token : " , selectedToken?.type);
    } else {
      router.push('/')
    }
  }, [account])

  // const handleSearchList = (key: any) => {
  //   try {
  //     setmodalKeyword(key);
  //     if (key.length) {
  //       let newData = tokenList.filter((name) => {
  //         return Object.values(name)
  //           .join(" ")
  //           .toLowerCase()
  //           .includes(key.toLowerCase());
  //       });
  //       setTokenModalList(newData);
  //     } else {
  //       setTokenModalList(tokenList);
  //     }
  //   } catch (err: any) {
  //     Sentry.captureMessage("handleSearchList", err);
  //   }
  // };

  // const handleTokenSelect = (token: any) => {
  //   // console.log(token)
  //   setSelectedToken(token);
  //   setTokenModal(false);
  // };

  // const handleMax = (e:any) => {
  //   console.log("values inside e ", e);
  //   if(e.target.classList[2] == "depositMax"){
  //     setDepositTokenInput(selectedToken.balance);
  //     setFieldValue("amount" , selectedToken.balance);
  //   }
  //   else{
  //     setWithdrawTokenInput(selectedToken.balance);
  //     setFieldValue("withdrawAmount" , selectedToken.balance);
  //   }
  // };

  const depositValidations: any = Yup.object({
    fromChain: Yup.number().required("Required Field"),
    toChain: Yup.number().required("Required Field"),
    amount: Yup.number()
      .typeError("Only digits are allowed.")
      .min(0.001, "Invalid Amount.")
      .max(selectedToken.balance, "Insufficient Balance")
      .required("Amount is required."),
  });
  const withdrawValidations: any = Yup.object({
    fromChain: Yup.number(),
    toChain: Yup.number(),
    withdrawAmount: Yup.number()
      .typeError("Only digits are allowed.")
      .min(0.001, "Invalid Amount.")
      .max(selectedToken.balance, "Insufficient Balance")
      .required("Amount is required."),
  });

  const approvalForDeposit = (amount: any, token: any, contract: any) => {
    try {
      let user: any = account;
      const amountWei = web3.utils.toBN(
        fromExponential(1000 * Math.pow(10, 18))
      );
      let instance = new web3.eth.Contract(ERC20, token);
      instance.methods
        .approve(contract, amountWei)
        .send({ from: user })
        .on("transactionHash", (res: any) => {
          // console.log(res, "hash")
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            })
          );
        })
        .on("receipt", (res: any) => {
          // console.log(res, "receipt")
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
          // call deposit contract
          let instance = new web3.eth.Contract(
            depositManagerABI,
            dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
          );
          instance.methods
            .depositERC20(dynamicChaining[chainId].BONE, user, amount)
            .send({ from: account })
            .on("transactionHash", (res: any) => {
              // console.log(res, "hash")
              dispatch(
                addTransaction({
                  hash: res,
                  from: user,
                  chainId,
                  summary: `${res}`,
                })
              );
              let link = getExplorerLink(chainId, res, "transaction");
              setHashLink(link);
              setDepModState({
                step0: false,
                step1: false,
                step2: true,
                title: "Transaction Submitted",
              });
              // setDepositTokenInput('');
            })
            .on("receipt", (res: any) => {
              // console.log(res, "receipt")
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
              setDepositModal(false);
            })
            .on("error", (res: any) => {
              // console.log(res, "error")
              if (res.code === 4001) {
                setDepModState({
                  step0: true,
                  step1: false,
                  step2: false,
                  title: "Confirm deposit",
                });
                setDepositModal(false);
              }
            });
          //deposit contract ends
        })
        .on("error", (res: any) => {
          // console.log(res, "error")
          if (res.code === 4001) {
            setDepModState({
              step0: true,
              step1: false,
              step2: false,
              title: "Confirm deposit",
            });
            setDepositModal(false);
          }
        });
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("approvalForDeposit", err);
      }
      setDepModState({
        step0: true,
        step1: false,
        step2: false,
        title: "Confirm deposit",
      });
      setDepositModal(false);
    }
  };

  const callDepositModal = (values: any, resetForm: any) => {
    try {
      console.log("deposit values =>  ", values);
      setDepositTokenInput(values.amount);
      {
        setDepModState({
          step0: true,
          step1: false,
          step2: false,
          title: "Confirm deposit",
        });
        setDepositModal(true);
        resetForm();
      }
    } catch (err: any) {
      Sentry.captureMessage("callDepositModal", err);
    }
  };
  const callWithdrawModal = (values: any) => {
    console.log("withdraw values =>  ", values);
    try {
      setWithdrawTokenInput(values.withdrawAmount);
      {
        setWidModState({
          step0: true,
          step1: false,
          step2: false,
          step3: false,
          step4: false,
          title: "Initialize Withdraw",
        });
        setWithdrawModal(true);
      }
    } catch (err: any) {
      Sentry.captureMessage("callWithdrawModal", err);
    }
  };

  const callDepositContract = async () => {
    try {
      if (account) {
        setDepModState({
          step0: false,
          step1: true,
          step2: false,
          title: "Transaction Pending",
        });
        let user: any = account;
        const amountWei = web3.utils.toBN(
          fromExponential(+depositTokenInput * Math.pow(10, 18))
        );
        let allowance =
          (await getAllowanceAmount(
            library,
            dynamicChaining[chainId].BONE,
            account,
            dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
          )) || 0;

        if (+depositTokenInput > +allowance) {
          // console.log("need approval")
          approvalForDeposit(
            amountWei,
            dynamicChaining[chainId].BONE,
            dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
          );
        } else {
          // console.log("no approval needed")
          let instance = new web3.eth.Contract(
            depositManagerABI,
            dynamicChaining[chainId].DEPOSIT_MANAGER_PROXY
          );
          instance.methods
            .depositERC20ForUser(dynamicChaining[chainId].BONE, user, amountWei)
            .send({ from: account })
            .on("transactionHash", (res: any) => {
              // console.log(res, "hash")
              dispatch(
                addTransaction({
                  hash: res,
                  from: user,
                  chainId,
                  summary: `${res}`,
                })
              );
              let link = getExplorerLink(chainId, res, "transaction");
              setHashLink(link);
              setDepModState({
                step0: false,
                step1: false,
                step2: true,
                title: "Transaction Submitted",
              });
              // setDepositTokenInput('');
            })
            .on("receipt", (res: any) => {
              // console.log(res, "receipt")
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
              setDepositModal(false);
            })
            .on("error", (res: any) => {
              // console.log(res, "error")
              if (res.code === 4001) {
                setDepModState({
                  step0: true,
                  step1: false,
                  step2: false,
                  title: "Confirm deposit",
                });
                setDepositModal(false);
              }
            });
        }
      } else {
        // console.log("account not found")
      }
    } catch (err: any) {
      if(err.code !== USER_REJECTED_TX) {
        Sentry.captureMessage("callDepositContract", err);
      }
      setDepModState({
        step0: true,
        step1: false,
        step2: false,
        title: "Confirm deposit",
      });
      setDepositModal(false);
    }
  };
  const callWithdrawContract = async () => {
    try {
      if (account) {
        setWidModState({
          step0: false,
          step1: true,
          step2: false,
          step3: false,
          step4: false,
          title: "Withdrawal Pending",
        });
        let allowance =
          (await getAllowanceAmount(
            library,
            dynamicChaining[chainId].BONE,
            account,
            dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY
          )) || 0;
        if (+withdrawTokenInput > +allowance) {

          approveWithdraw();
        }
        else {
          submitWithdraw();
        }
      }
    } catch (err: any) {
      Sentry.captureMessage("callDepositContract", err);
    }
  };
  const approveWithdraw = async () => {
    // console.log("called approveAmount ");
    try {
      if (account) {
        // console.log("called approval ")
        let user = account;
        let amount = web3.utils.toBN(fromExponential(+withdrawTokenInput * Math.pow(10, 18)));
        let instance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
        let gasFee = await instance.methods.approve(dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY, amount).estimateGas({ from: user })
        let encodedAbi = await instance.methods.approve(dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY, amount).encodeABI()
        let CurrentgasPrice: any = await currentGasPrice(web3)
        // console.log((parseInt(gasFee) + 30000) * CurrentgasPrice, " valiuee ==> ")
        await web3.eth.sendTransaction({
          from: user,
          to: dynamicChaining[chainId].BONE,
          gas: (parseInt(gasFee) + 30000).toString(),
          gasPrice: CurrentgasPrice,
          // value : web3.utils.toHex(combinedFees),
          data: encodedAbi
        })
          .on('transactionHash', (res: any) => {
            // console.log(res, "hash")
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
            // console.log(res, "receipt")
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
            submitWithdraw();
          })
      } else {
        // console.log("account not connected ====> ")
      }
    } catch (err: any) {
      Sentry.captureMessage("approvewithdraw ", err);
    }

  }

  const submitWithdraw = async () => {
    try {
      let user: any = account;
      const amountWei = web3.utils.toBN(
        fromExponential(+depositTokenInput * Math.pow(10, 18))
      );
      let instance = new web3.eth.Contract(
        depositManagerABI,
        dynamicChaining[chainId].WITHDRAW_MANAGER_PROXY
      );
      instance.methods
        .depositERC20ForUser(dynamicChaining[chainId].BONE, user, amountWei)
        .send({ from: account })
        .on("transactionHash", (res: any) => {
          // console.log(res, "hash")
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            })
          );
          let link = getExplorerLink(chainId, res, "transaction");
          setHashLink(link);
          setWidModState({
            step0: false,
            step1: false,
            step2: true,
            step3: false,
            step4: false,
            title: "Transaction Submitted",
          });
          // setDepositTokenInput('');
        })
        .on("receipt", (res: any) => {
          // console.log(res, "receipt")
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
          setWidModState({
            step0: false,
            step1: false,
            step2: false,
            step3: true,
            step4: false,
            title: "Processing Transfer",
          });
        })
        .on("error", (res: any) => {
          // console.log(res, "error")
          if (res.code === 4001) {
            setWidModState({
              step0: true,
              step1: false,
              step2: false,
              step3: false,
              step4: false,
              title: "Initialize Withdraw",
            });
            setWithdrawModal(false);
          }
        });
        
      }
      catch (err: any) {
        if(err.code !== USER_REJECTED_TX) {
          Sentry.captureMessage("submitWithdraw ", err);
        }
        setWidModState({
          step0: true,
          step1: false,
          step2: false,
          step3: false,
          step4: false,
          title: "Initialize Withdraw",
        });
        setWithdrawModal(false);
    }
  }
  // const addTokenHandler = async () => {
  //   setConfirmImport(!confirmImport);
  //   setAgreeImport(!agreeImport);
  //   try {
  //     const isValidAddress = await web3.utils.isAddress(String(newToken));
  //     if (isValidAddress) {
  //       const checkArray = tokenModalList.map((st: any) => st?.parentContract);
  //       // let localtoken = JSON.parse(localStorage.getItem("newToken") || "[]");
  //       let localtokenarray = localTokens.map((st: any) => st.parentContract);
  //       const isalreadypresent = checkArray.some((item: any) =>
  //         localtokenarray.includes(newToken)
  //       );
  //       if (isalreadypresent) {
  //         toast.error("Address already exists !", {
  //           position: toast.POSITION.BOTTOM_CENTER,
  //           autoClose: 3000,
  //         });
  //       } else {
  //         const contractInstance = new web3.eth.Contract(
  //           addTokenAbi,
  //           String(newToken)
  //         );
  //         let symbol = await contractInstance.methods
  //           .symbol()
  //           .call({ from: String(account) })
  //           .then((token: any) => token)
  //           .catch((err: any) => console.log(err));
  //         let name = await contractInstance.methods
  //           .name()
  //           .call({ from: String(account) })
  //           .then((token: any) => token)
  //           .catch((err: any) => console.log(err));
  //         const obj = {
  //           parentContract: String(newToken),
  //           childContract: String(newToken),
  //           parentName: name,
  //           parentSymbol: symbol,
  //         };
  //         setLocalTokens([...localTokens, obj]);
  //         setTokenModalList([...tokenModalList, obj]);
  //         toast.success(`${name} successfully added.`, {
  //           position: toast.POSITION.BOTTOM_CENTER,
  //           autoClose: 3000,
  //         });
  //         setTokenState({
  //           step0: false,
  //           step1: false,
  //           step2: false,
  //           step3: false,
  //           step4: true,
  //           title: "Manage Token",
  //         });
  //       }
  //     } else {
  //     }
  //   } catch (err: any) {
  //     Sentry.captureMessage("addTokenHandler", err);
  //   }
  // };

  useEffect(() => {
    if (!showTokenModal) {
      addNewToken("");
    }
  }, [showTokenModal]);
  useEffect(() => {
    const isValidAddress = web3.utils.isAddress(String(newToken));
    try {
      if (tokenState.step2 && isValidAddress) {
        toast.success("Address is valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600,
        });
        setTokenState({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          title: "Manage Token",
        });
      } else if (!isValidAddress && newToken.length > 0) {
        toast.error("Address is Invalid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600,
        });
        setTokenState({
          step0: false,
          step1: false,
          step2: true,
          step3: false,
          step4: false,
          title: "Manage Token",
        });
      }
      if (tokenState.step4 && isValidAddress) {
        toast.success("Address is valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600,
        });
        setTokenState({
          step0: false,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          title: "Manage Token",
        });
      }
      // code below is to check whether tokens are already present or not
      const checkArray = tokenModalList.map((st: any) => st?.parentContract);
      let localtokenarray = localTokens.map((st: any) => st.parentContract);
      const isalreadypresent = checkArray.some((item: any) =>
        localtokenarray.includes(newToken)
      );
      if (isalreadypresent && newToken.length > 0) {
        toast.error("Address is already present", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (err: any) {
      Sentry.captureMessage("useEffect on line 449 in bridge > backup", err);
    }
  }, [newToken]);

  useEffect(() => {
    try {
      if (showTokenModal) {
        localStorage.setItem("newToken", JSON.stringify(localTokens));
        let uniqueObjArray = [
          ...new Map(
            localTokens.map((item: any) => [item["parentContract"], item])
          ).values(),
        ];
        let uniqueObjArray2 = [
          ...new Map(
            tokenModalList.map((item: any) => [item["parentContract"], item])
          ).values(),
        ];
        let combineArray = [...uniqueObjArray, ...uniqueObjArray2];
        let finalUniqueArray = [
          ...new Map(
            combineArray.map((item: any) => [item["parentContract"], item])
          ).values(),
        ];
        setTokenModalList(finalUniqueArray);
      }
    } catch (err: any) {
      Sentry.captureMessage("UseEffect line 512 in bridge backup ", err);
    }
  }, [localTokens]);

  useEffect(() => {
    try {
      if (tokenModalList.length > 0) {
        // console.log("initial page load");
        let updatedArray = [...tokenModalList, ...localTokens];
        setTokenModalList(updatedArray);
      }
    } catch (err: any) {
      Sentry.captureMessage("UseEffect line 540", err);
    }
  }, []);

  const getTempTokens = async () => {
    try {
      const isValidAddress = web3.utils.isAddress(String(newToken));

      if (
        isValidAddress &&
        account &&
        (tokenState.step2 || tokenState.step3 || tokenState.step4)
      ) {
        const contractInstance = new web3.eth.Contract(
          addTokenAbi,
          String(newToken)
        );
        let symbol: any = await contractInstance.methods
          .symbol()
          .call({ from: String(account) })
          .then((token: any) => token)
          .catch((err: any) => console.log(err));
        let name: any = await contractInstance.methods
          .name()
          .call({ from: String(account) })
          .then((token: any) => token)
          .catch((err: any) => console.log(err));
        const obj = {
          parentContract: String(newToken),
          childContract: String(newToken),
          parentName: name,
          parentSymbol: symbol,
        };
        const isalreadypresent = localTokens
          .map((st: any) => st.parentContract)
          .includes(obj.parentContract);
        // console.log("isalreadypresent", isalreadypresent);
        if (!isalreadypresent) {
          setTempTokens({
            parentContract: String(newToken),
            childContract: String(newToken),
            parentName: name,
            parentSymbol: symbol,
          });
        } else if (isalreadypresent) {
          // toast.error("Address is already present", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 1500,
          // });
          setTempTokens({
            // parentContract: "",
            // childContract: "",
            // parentName: "",
            // parentSymbol: "",
          });
        }
      }
      // console.log("temptoken", tempTokens);
    } catch (err: any) {
      Sentry.captureMessage("getTempTokens", err);
    }
  };

  useEffect(() => {
    getTempTokens();
  }, [newToken, tokenState]);

  // const clearAllCustomTokens = () => {
  //   try {
  //     let checkArray = tokenModalList;
  //     let localtokenarray = localTokens.map((st: any) => st.parentContract);
  //     const notLocalTokens = checkArray.filter(
  //       (item: any) => !localtokenarray.includes(item.parentContract)
  //     );
  //     setTokenModalList(notLocalTokens);
  //     setLocalTokens([]);
  //     localStorage.setItem("newToken", "[]");
  //   } catch (err: any) {
  //     Sentry.captureMessage("clearAllCustomTokens", err);
  //   }
  // };

  // console.log("tokenmodallist", tokenModalList);

  const spliceCustomToken = (index: any) => {
    try {
      let incomingObject = localTokens[index];
      const filteredModallist = localTokens.filter((ss: any) => {
        return ss.parentContract !== incomingObject.parentContract;
      });
      setLocalTokens(filteredModallist);
      const filtered2 = tokenModalList.filter((ss: any) => {
        return ss.parentContract !== incomingObject.parentContract;
      });
      setTokenModalList(filtered2);
    } catch (err: any) {
      Sentry.captureMessage("spliceCustomToken ", err);
    }
  };

  // console.log("tokenModalList--", tokenModalList);
  // console.log('localToken', localTokens);
  // console.log("tokenState 3", tokenState.step3)
  return (
    <>
      <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />

        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            <Comingsoon />
          </div>
        </section>
      </main>
    </>
  );
}
