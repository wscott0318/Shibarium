/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import CommonModal from "../components/CommonModel";
import InnerHeader from "../inner-header";
import Link from "next/link";
import {
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
      <ToastContainer />
      <main className="main-content">
        <Sidebar
          handleMenuState={handleMenuState}
          onClickOutside={() => {
            setMenuState(false);
          }}
          menuState={menuState}
        />
        {/* modal code start */}
        {/* Deposit popup start */}
        <CommonModal
          title={depModalState.title}
          show={showDepositModal}
          setshow={setDepositModal}
          externalCls="dark-modal-100 bridge-ht"
        >
          {/* Deposit popups start */}
          <>
            {/* confirm deposit popop starts */}

            {dWState && depModalState.step0 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <div className="img-flexible">
                          <img
                            className="img-fluid d-inline-block"
                            src="../../assets/images/etharium.png"
                            alt=""
                          />
                        </div>
                        <h6>
                          {depositTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            width="22"
                            height="22"
                            src={
                              selectedToken.logo
                                ? selectedToken.logo
                                : "../../assets/images/eth.png"
                            }
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId]}</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block arow-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          {/* <img
                            className="img-fluid"
                            src={NETWORK_ICON[chainId == 5 ? 517 : 5]}
                            alt=""
                          /> */}
                        </div>
                        <p>{NETWORK_LABEL[chainId == 5 ? 517 : 5]}</p>
                      </div>
                    </div>
                    {/* <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../assets/images/eth.png"
                            alt=""
                          />
                        </div>
                        <p>Estimation of GAS fee required</p>
                      </div>
                      <div>
                        <p className="fw-bold">$10.00</p>
                      </div>
                    </div> */}
                  </div>
                  <div className="pop-bottom">
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => callDepositContract()}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* confirm deposit popop ends */}

            {/* Transaction pending popup start */}

            {dWState && depModalState.step1 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../assets/images/etharium.png"
                            alt=""
                          />
                        </span>
                        <h6>
                          {depositTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            width="22"
                            height="22"
                            src={
                              selectedToken.logo
                                ? selectedToken.logo
                                : "../../assets/images/eth.png"
                            }
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId]}</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            src={NETWORK_ICON[chainId == 5 ? 417 : 5]}
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId == 5 ? 417 : 5]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-center text-section">
                      <h4 className="pop-hd-md" style={{ color: "var(--bs-orange)" }}>Moving funds</h4>
                      <p>
                        It will take up to 10 - 15 minutes to move the funds on
                        Shibarium Mainnet.
                      </p>
                    </div>
                    <div>
                      <a
                        onClick={() => {
                          setDepModState({
                            step0: false,
                            step1: false,
                            step2: true,
                            title: "Transaction Submitted",
                          });
                        }}
                        className={`btn grey-btn w-100 relative ${depModalState.step1 && "disabled btn-disabled"}`}
                        href="javascript:void(0)"
                      >
                        <span className="spinner-border text-secondary pop-spiner fix_spinner"></span>
                        <span>Continue</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction pending popup end */}

            {/* Transaction completed popup start */}

            {dWState && depModalState.step2 && (
              <div className="popmodal-body no-ht">
                <div className="pop-block">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../assets/images/etharium.png"
                            alt=""
                          />
                        </span>
                        <h6>
                          {depositTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p>
                          <NumberFormat
                            thousandSeparator
                            displayType={"text"}
                            prefix="$ "
                            value={(
                              (+depositTokenInput || 0) * boneUSDValue
                            ).toFixed(tokenDecimal)}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="image_area row h-75">
                      <div className="flex text-center col-12 watch-img-sec align-items-center justify-content-center">
                        <img
                          className="img-fluid img-wdth"
                          src="../../assets/images/cmpete-step.png"
                          width="150"
                          height="150"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section complete-modal">
                      {/* <h4 className="pop-hd-md">Transaction Completed</h4>
                      <p>Transaction completed succesfully.</p> */}
                    </div>
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => window.open(hashLink)}
                      >
                        View on Block Explorer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction completed popup end */}
          </>
        </CommonModal>

        {/* Deposit popup end */}

        {/* Withdraw popups start */}
        <CommonModal
          title={withModalState.title}
          show={showWithdrawModal}
          setshow={setWithdrawModal}
          externalCls="dark-modal-100 bridge-ht2"
        >
          {/* Withdraw tab popups start */}
          <>
            {/* Initialize withdraw popup start */}
            {withModalState.step0 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block withdraw_pop">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src={selectedToken.logo ? selectedToken.logo : "../../assets/images/red-bone.png"}
                            alt=""
                          />
                        </span>
                        <h6>
                          {withdrawTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p><NumberFormat
                          thousandSeparator
                          displayType={"text"}
                          prefix="$ "
                          value={(
                            (+withdrawTokenInput || 0) * boneUSDValue
                          ).toFixed(tokenDecimal)}
                        /></p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            src={NETWORK_ICON[chainId == 5 ? 417 : 5]}
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId == 5 ? 417 : 5]}</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            width="22"
                            height="22"
                            src={
                              selectedToken.logo
                                ? selectedToken.logo
                                : "../../assets/images/eth.png"
                            }
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pop-bottom">
                    <div className="text-center text-section">
                      <h4 className="pop-hd-md" style={{ color: "var(--bs-orange)" }}>Initialize Whitdraw</h4>
                      <p>
                        It will take up to 60 mins to 3 hours to reach the
                        checkpoint.{" "}
                      </p>
                    </div>
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() => callWithdrawContract()}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Initialize withdraw popup end */}

            {/* Reaching checkpoint popup start */}
            {withModalState.step1 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block withdraw_pop">
                  <div className="pop-top">
                    <div className="mt-0 cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src={selectedToken.logo ? selectedToken.logo : "../../assets/images/red-bone.png"}
                            alt=""
                          />
                        </span>
                        <h6>
                          {withdrawTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p><NumberFormat
                          thousandSeparator
                          displayType={"text"}
                          prefix="$ "
                          value={(
                            (+withdrawTokenInput || 0) * boneUSDValue
                          ).toFixed(tokenDecimal)}
                        /></p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            src={NETWORK_ICON[chainId == 5 ? 417 : 5]}
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId == 5 ? 417 : 5]}</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block img-flexible">
                          <img
                            className="img-fluid"
                            width="22"
                            height="22"
                            src={
                              selectedToken.logo
                                ? selectedToken.logo
                                : "../../assets/images/eth.png"
                            }
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId]}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="pop-mid">
                    <div className="center-content">
                      <p>Custom token not found Add your first custom token</p>
                    </div>
                  </div> */}


                  <div className="myTipsArea">Tip: Custom tokens are stored locally in your browser </div>
                  <div className="pop-bottom">
                    <div className="text-center text-section">
                      <h4 className="pop-hd-md" style={{ color: "var(--bs-orange)" }}>Moving funds to Ethereum</h4>
                      <p>
                        It will take up to 60 mins to 3 hours to reach the
                        checkpoint.
                      </p>
                    </div>
                    <div>
                      <a
                        onClick={() =>
                          setWidModState({
                            step0: false,
                            step1: false,
                            step2: true,
                            step3: false,
                            step4: false,
                            title: "Checkpoint reached",
                          })
                        }
                        className={`btn grey-btn w-100 relative ${withModalState.step1 && "disabled btn-disabled"}`}
                        href="javascript:void(0)"
                      >
                        <span className="spinner-border text-secondary pop-spiner fix_spinner"></span>
                        <span>Moving funds</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            )}
            {/* Reaching checkpoint  popup end */}

            {/* checkpoint Reached popup start */}
            {withModalState.step2 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block withdraw_pop">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../assets/images/red-bone.png"
                            alt=""
                          />
                        </span>
                        <h6>
                          {withdrawTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p><NumberFormat
                          thousandSeparator
                          displayType={"text"}
                          prefix="$ "
                          value={(
                            (+withdrawTokenInput || 0) * boneUSDValue
                          ).toFixed(tokenDecimal)}
                        /></p>
                      </div>
                    </div>
                    {/* <div className="pop-action">
                      <a
                        className="btn primary-btn w-100"
                        href="javascript:void(0)"
                      >
                        ETHEREUM MAINNET
                      </a>
                    </div> */}
                  </div>
                  <div className="pop-bottom">
                    <div className="text-center text-section">
                      <h4 className="pop-hd-md" style={{ color: "var(--bs-orange)" }}>Complete Withdraw</h4>
                      <p>
                        You need to confirm one more transaction to get your
                        funds in your Ethereum Account.
                      </p>
                    </div>
                    <div>
                      <a
                        className="btn primary-btn w-100"
                        onClick={() =>
                          setWidModState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: true,
                            step4: false,
                            title: "Complete Withdraw",
                          })
                        }
                      >
                        Confirm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* checkpoint Reached popup end */}

            {/* Complete withdraw popup start */}
            {withModalState.step3 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block withdraw_pop">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../assets/images/red-bone.png"
                            alt=""
                          />
                        </span>
                        <h6>
                          {withdrawTokenInput + " " + selectedToken.parentName}
                        </h6>
                        <p><NumberFormat
                          thousandSeparator
                          displayType={"text"}
                          prefix="$ "
                          value={(
                            (+withdrawTokenInput || 0) * boneUSDValue
                          ).toFixed(tokenDecimal)}
                        /></p>
                      </div>
                    </div>
                    <div className="pop-grid">
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../assets/images/etharium.png"
                            alt=""
                          />
                        </div>
                        <p>{NETWORK_LABEL[chainId]}</p>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block right-arrow">
                          <div className="scrolldown-container">
                            <div className="scrolldown-btn">
                              <svg
                                version="1.1"
                                id="Слой_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="80px"
                                viewBox="0 0 50 80"
                                enableBackground="new 0 0 50 80"
                                xmlSpace="preserve"
                              >
                                <path
                                  className="first-path"
                                  fill="#FFFFFF"
                                  d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057                  s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119                  l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305                  c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                                />
                                <path
                                  className="second-path"
                                  fill="#FFFFFF"
                                  d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057                  c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12                  l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305                  c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center box-block">
                        <div className="d-inline-block">
                          <img
                            className="img-fluid"
                            src="../../assets/images/etharium.png"
                            alt=""
                          />
                        </div>
                        <p>Wallet X25654a5</p>
                      </div>
                    </div>
                    {/* <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../assets/images/eth.png"
                            alt=""
                          />
                        </div>
                        <p>Estimation of GAS fee required</p>
                      </div>
                      <div>
                        <p className="fw-bold">$20.00</p>
                      </div>
                    </div> */}
                  </div>
                  <div className="pop-bottom">
                    <div className="text-section">
                      <h4 className="pop-hd-md">Withdrawing funds</h4>
                      <p>Moving funds to your {NETWORK_LABEL[chainId]} Account.</p>
                    </div>
                    <div>
                      <a
                        onClick={() =>
                          setWidModState({
                            step0: false,
                            step1: false,
                            step2: false,
                            step3: false,
                            step4: true,
                            title: "Withdraw Complete",
                          })
                        }
                        className="btn grey-btn w-100"
                        href="javascript:void(0)"
                      >
                        <span className="spinner-border text-secondary pop-spiner"></span>
                        <span>Moving funds</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Complete withdraw popup end */}

            {/* withdraw complete popup start */}
            {withModalState.step4 && !dWState && (
              <div className="popmodal-body no-ht">
                <div className="pop-block withdraw_pop">
                  <div className="pop-top">
                    <div className="cnfrm_box dark-bg">
                      <div className="top_overview col-12">
                        <span>
                          <img
                            className="img-fluid"
                            src="../../assets/images/red-bone.png"
                            alt=""
                          />
                        </span>
                        <h6>100 SHIB</h6>
                        <p>500.00$</p>
                      </div>
                    </div>
                    <div className="pop-action">
                      <a
                        className="btn primary-btn w-100"
                        href="javascript:void(0)"
                      >
                        TRANSFER COMPLETE
                      </a>
                    </div>
                  </div>

                  <div className="myTipsArea">Tip: Custom tokens are stored locally in your browser </div>

                </div>
                <div className="pop-bottom">
                  <div className="text-section">
                    <h4 className="pop-hd-md">Transaction Completed</h4>
                    <p className="lite-color">
                      Transaction completed succesfully. Your Ethereum wallet
                      Balance will be updated in few minute. In case of
                      problems contact our{" "}
                      <a
                        title="Support"
                        href="javascript:void(0);"
                        className="orange-txt"
                      >
                        Support.
                      </a>
                    </p>
                  </div>
                  <div>
                    <a
                      className="btn primary-btn w-100"
                      onClick={() => setWithdrawModal(false)}
                    >
                      View on Shibascan
                    </a>
                  </div>
                </div>
              </div>

            )}
            {/* withdraw complete popup start */}
          </>
          {/* Withdraw tab popups end */}
        </CommonModal>
        {/* Withdraw tab popups end */}

        {/* Token popups start */}
        {openManageToken ? <ManageToken setSelectedToken={setSelectedToken} setOpenManageToken={setOpenManageToken} /> : null}
        {/* Token popups end */}

        {/* modal code closed */}
        <section className="assets-section">
          <div className="cmn_dashbord_main_outr">
            <InnerHeader />
            {/* withdraw main section start */}
            <div className="box-wrap">
              {/* Left section start */}
              <div className="left-box">
                <div className="block-card">
                  <div className="box-top">
                    <h3 className="mb-3">Shibarium Bridge</h3>
                    {dWState ? (
                      <div className="txt-row">
                        <div className="row-hd">Transfer Overview:</div>
                        <p className="row-description">
                          The deposit process consists of a single transaction.
                        </p>
                      </div>
                    ) : (
                      <div className="txt-row">
                        <div className="row-hd">Withdraw Overview:</div>
                        <p className="row-description">
                          The Withdraw process consists of three transactions.
                        </p>
                      </div>
                    )}
                    {dWState ? (
                      <div className="txt-row">
                        <div className="row-hd">Transfer Time:</div>
                        <p className="row-description">
                          Moving your funds from Ethereum to Shibarium take up
                          to 10 - 15 Minutes.
                        </p>
                      </div>
                    ) : (
                      <div className="txt-row">
                        <div className="row-hd">Withdraw Time:</div>
                        <p className="row-description">
                          Moving your funds from Ethereum to Shibarium take up
                          to 60 mins to 3 hours.
                        </p>
                      </div>
                    )}
                    {
                      <div
                        className={`txt-row ${dWState ? "visVisible" : "visInvisible"
                          }`}
                      >
                        <div className="row-hd">
                          <span className="icon-image">
                            <img
                              className="img-fluid"
                              src="../../assets/images/i-info-icon.png"
                              alt=""
                            />
                          </span>
                          <span className="alignment">
                            Delegation/Staking Advice:
                          </span>
                        </div>
                        <p className="row-description">
                          Delegation/Staking takes place on Ethereum. Do not
                          deposit funds to Shibarium for this purpose.{" "}
                          {/* <a className="orange-txt" href="javascript:void(0);">
                            Staking UI
                          </a> */}
                        </p>
                      </div>
                    }
                  </div>
                  <div className="blank-box"></div>
                  <div className="box-bottom d-flex flex-column justify-content-end">
                    {/* <div
                      className={`amt-section position-relative ${!dWState ? "visVisible" : "visInvisible"
                        }`}
                    >
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            width="20"
                            height="20"
                            src="../../assets/images/red-bone.png"
                            alt=""
                          />
                        </div>
                        <p className="lite-color">
                          Estimation of GAS fee required
                        </p>
                      </div>
                      <div>
                        <p className="lite-color fw-bold">$10.00</p>
                      </div>
                    </div> */}
                    {/* <div className="amt-section position-relative">
                      <div className="coin-blk">
                        <div className="coin-sec">
                          <img
                            className="img-fluid"
                            src="../../assets/images/eth.png"
                            alt=""
                          />
                        </div>
                        <p className="lite-color">
                          Estimation of GAS fee required
                        </p>
                      </div>
                      <div>
                        <p className="lite-color fw-bold">$10.00</p>
                      </div>
                    </div> */}
                    <div className="sub-buttons-sec row buttons-fix">
                      <div className="mb-3 col-lg-6 mb-lg-0">
                        {/* <button type="button" className="btn white-btn w-100">
                          How Shibarium Works
                        </button> */}
                        <Link href="how-it-works" passHref>
                          <a target="_blank" className="btn white-btn w-100">
                            How Shibarium Works
                          </a>
                        </Link>
                      </div>
                      <div className="col-lg-6">
                        <button
                          // type="button w-100"
                          className="btn white-btn w-100"
                        >
                          FAQs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Left section end */}
              {/* Right section start */}

              <div className="right-box">
                <div className="block-card d-flex flex-column justify-content-between bridge_form_sec">
                  <div className="tab-sec botom-spcing">
                    <ul className="tab-links">
                      <li>
                        <a
                          className={`tb-link ${dWState && "tab-active"}`}
                          onClick={() => setDWState(true)}
                        >
                          Deposit
                        </a>
                      </li>
                      <li>
                        <a
                          className={`tb-link ${!dWState && "tab-active"}`}
                          onClick={() => setDWState(false)}
                        >
                          Withdraw
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Deposit tab content section start */}
                  {dWState && (
                    <div className="tab-content-sec h-100">
                      <Formik
                        initialValues={{
                          amount: "",
                          fromChain: chainId,
                          toChain: chainId == 5 ? 417 : 5,
                        }}
                        validationSchema={depositValidations}
                        onSubmit={(values, { resetForm }) => {
                          // console.log(actions);
                          callDepositModal(values, resetForm);
                        }}
                      >
                        {({
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          values,
                          handleSubmit,
                          setFieldValue
                        }) => (
                          <div className="h-100">
                            <div className="sec-wrapper">
                              <div className="wrap-top">
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      From
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div>
                                          {
                                            selectedToken.logo
                                              ? (<img
                                                width="22"
                                                height="22"
                                                className="img-fluid"
                                                src={selectedToken.logo}
                                                alt=""
                                              />) :
                                              (
                                                <img
                                                  className="img-fluid"
                                                  src={"../../assets/images/eth.png"}
                                                  alt=""
                                                />
                                              )
                                          }
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        {/* <Form.Select
                                        name="fromChain"
                                        defaultValue={`${chainId}`}
                                        value={values.fromChain}
                                        onChange={(e) => {handleChange(e)}}>
                                        {[
                                          ChainId.SHIBARIUM,
                                          ChainId.GÖRLI,
                                          ChainId.ETHEREUM,
                                          ChainId.PUPPYNET517, */}
                                        {/* //  @ts-ignore
                                        ].map((key: ChainId, i: number) => {
                                          return (
                                            <> */}
                                        {/* @ts-ignore TYPE NEEDS FIXING */}
                                        {/* <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />
                                              <option value={key}> */}
                                        {/*@ts-ignore TYPE NEEDS FIXING*/}
                                        {/* {NETWORK_LABEL[key]}
                                              </option>
                                            </>
                                          )

                                        })}
                                      </Form.Select> */}
                                        <input
                                          className="w-100"
                                          type="text"
                                          value={NETWORK_LABEL[chainId]}
                                          disabled={true}
                                        // placeholder="Ethereum chain"
                                        />
                                      </div>
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          {selectedToken.balance
                                            ? selectedToken?.balance
                                            : "00.00"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="field-grid row">
                                    <div className="mb-3 col-lg-6 col-xxl-5 col-sm-12 mb-sm-3 mb-lg-0 res-align">
                                      <div
                                        className="form-field position-relative fix-coin-field"
                                        onClick={() => {
                                          setOpenManageToken(!openManageToken)
                                          // setTokenModal(true);
                                          // setTokenState({
                                          //   step0: true,
                                          //   step1: false,
                                          //   step2: false,
                                          //   step3: false,
                                          //   step4: false,
                                          //   title: "Select a Token",
                                          // });

                                        }}
                                      >
                                        <div className="right-spacing">
                                          <div>
                                            <img
                                              className="img-fluid"
                                              src={
                                                selectedToken.logo
                                                  ? selectedToken.logo
                                                  : "../../assets/images/eth.png"
                                              }
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="lite-800">
                                          <span className="lite-800 fw-bold">
                                            {selectedToken.parentName
                                              ? selectedToken.parentName
                                              : "Select Token"}
                                          </span>
                                        </div>
                                        <div className="lft-spc">
                                          <div className="arow-outer">
                                            <span className="arrow-down"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-xxl-7 col-sm-12 field-col">
                                      <div className="form-field position-relative two-fld">
                                        <div className="mid-chain w-100">
                                          <input
                                            className="w-100"
                                            type="text"
                                            placeholder="0.00"
                                            name="amount"
                                            disabled={selectedToken?.type == undefined ? true : false}
                                            // defaultValue={depositTokenInput}
                                            value={values.amount}
                                            onChange={handleChange("amount")}
                                          />
                                        </div>
                                        <div
                                          className="rt-chain"
                                          onClick={(e) => setFieldValue("amount", selectedToken.balance)}
                                        >
                                          <span className="orange-txt fw-bold depositMax">
                                            MAX
                                          </span>
                                        </div>
                                      </div>
                                      {touched.amount && errors.amount ? (
                                        <p className="pt-0 pl-2 primary-text">
                                          {errors.amount}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      To
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div>
                                          <img
                                            width="22"
                                            height="22"
                                            className="img-fluid"
                                            src={
                                              NETWORK_ICON[
                                              chainId == 5 ? 417 : 5
                                              ]
                                            }
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          disabled={true}
                                          placeholder="Shibarium chain"
                                          value={
                                            NETWORK_LABEL[
                                            chainId == 5 ? 417 : 5
                                            ]
                                          }
                                        />
                                      </div>
                                      {/* <Form.Select
                                        name="toChain"
                                        defaultValue={`${chainId}`}
                                        value={values.toChain}
                                        onChange={(e) => {handleChange(e)}}
                                      >
                                        {[
                                          ChainId.SHIBARIUM,
                                          ChainId.GÖRLI,
                                          ChainId.ETHEREUM,
                                          ChainId.PUPPYNET517, */}
                                      {/* //  @ts-ignore
                                        ].map((key: ChainId, i: number) => {
                                          // console.log(values);
                                          return (
                                            <> */}
                                      {/* @ts-ignore TYPE NEEDS FIXING */}
                                      {/* <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />

                                              <option value={key} disabled={values.fromChain == key ? true : false}> */}
                                      {/*@ts-ignore TYPE NEEDS FIXING*/}
                                      {/* {NETWORK_LABEL[key]}
                                              </option>
                                            </>
                                          )

                                        })}
                                      </Form.Select> */}
                                      {/* <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          00.00
                                        </span>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wrap-bottom">
                                <div className="btn-modify">
                                  <button
                                    onClick={() => handleSubmit()}
                                    type="button"
                                    className="btn primary-btn w-100"
                                  >
                                    Transfer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Formik>
                    </div>
                  )}
                  {/* Deposit tab content section end */}

                  {/* Withdraw tab content section start */}
                  {!dWState && (
                    <Formik
                      initialValues={{
                        withdrawAmount: "",
                        fromChain: chainId == 5 ? 417 : 5,
                        toChain: chainId,
                      }}
                      validationSchema={withdrawValidations}
                      onSubmit={(values, { resetForm }) => {
                        console.log("values ==>>", values);
                        callWithdrawModal(values);
                        resetForm();
                      }}
                    >
                      {({
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        values,
                        handleSubmit,
                        setFieldValue
                      }) => (
                        <div className="tab-content-sec h-100">
                          <form className="h-100" onSubmit={handleSubmit}>
                            <div className="sec-wrapper">
                              <div className="wrap-top">
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      From
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div>
                                          <img
                                            width="22"
                                            height="22"
                                            className="img-fluid"
                                            src={
                                              NETWORK_ICON[
                                              chainId == 5 ? 417 : 5
                                              ]
                                            }
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          // placeholder="Shibarium Mainnet"
                                          value={
                                            NETWORK_LABEL[
                                            chainId == 5 ? 417 : 5
                                            ]
                                          }
                                          disabled={true}
                                        />
                                      </div>
                                      {/* <Form.Select
                                        name="fromChain"
                                        defaultValue={`${chainId}`}
                                        value={values.fromChain}
                                        onChange={handleChange}
                                      >
                                        {[
                                          ChainId.SHIBARIUM,
                                          ChainId.GÖRLI,
                                          ChainId.ETHEREUM,
                                          ChainId.PUPPYNET517, */}
                                      {/* //  @ts-ignore
                                        ].map((key: ChainId, i: number) => {
                                          // console.log(values);
                                          return (
                                            <> */}
                                      {/* @ts-ignore TYPE NEEDS FIXING */}
                                      {/* <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />

                                              <option value={key}> */}
                                      {/*@ts-ignore TYPE NEEDS FIXING*/}
                                      {/* {NETWORK_LABEL[key]}
                                              </option>
                                            </>
                                          )

                                        })}
                                      </Form.Select> */}
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          {selectedToken.balance
                                            ? selectedToken?.balance
                                            : "00.00"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="field-grid row">
                                    <div className="mb-3 col-lg-6 col-xxl-5 col-sm-12 mb-sm-3 mb-lg-0 res-align">
                                      <div
                                        className="form-field position-relative fix-coin-field h-100"
                                        onClick={() => {
                                          setOpenManageToken(!openManageToken)
                                          // onClick={() => {
                                          //   setTokenModal(true);
                                          //   setTokenState({
                                          //     step0: true,
                                          //     step1: false,
                                          //     step2: false,
                                          //     step3: false,
                                          //     step4: false,
                                          //     title: "Select a Token",
                                          //   });
                                        }}
                                      >
                                        <div className="right-spacing">
                                          <div>
                                            <img
                                              width="24"
                                              height="24"
                                              className="img-fluid"
                                              src={
                                                selectedToken.logo
                                                  ? selectedToken.logo
                                                  : "../../assets/images/shiba-round-icon.png"
                                              }
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="lite-800">
                                          <span className="lite-800 fw-bold">
                                            {selectedToken.parentName
                                              ? selectedToken.parentName
                                              : "Select Token"}
                                          </span>
                                        </div>
                                        <div className="lft-spc">
                                          <div className="arow-outer">
                                            <span className="arrow-down"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-xxl-7 col-sm-12 field-col h-100">
                                      <div className="form-field position-relative two-fld">
                                        <div className="mid-chain w-100">
                                          <input
                                            className="w-100"
                                            type="text"
                                            placeholder="0.00"
                                            name="withdrawAmount"
                                            disabled={selectedToken?.type == undefined ? true : false}
                                            value={values.withdrawAmount}
                                            onChange={handleChange("withdrawAmount")}
                                          />
                                        </div>
                                        <div
                                          className="rt-chain"
                                          onClick={(e) => setFieldValue("withdrawAmount", selectedToken.balance)}
                                        >
                                          <span className="orange-txt fw-bold withdrawMax">
                                            MAX
                                          </span>
                                        </div>
                                      </div>
                                      {touched.withdrawAmount && errors.withdrawAmount ? (
                                        <p className="pt-0 pl-2 primary-text">
                                          {errors.withdrawAmount}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="botom-spcing">
                                  <div>
                                    <label className="mb-2 mb-xxl-3 mb-md-2">
                                      To
                                    </label>
                                    <div className="form-field position-relative txt-fix">
                                      <div className="icon-chain">
                                        <div>
                                          {
                                            selectedToken.logo
                                              ? (<img
                                                width="22"
                                                height="22"
                                                className="img-fluid"
                                                src={selectedToken.logo}
                                                alt=""
                                              />) :
                                              (
                                                <img
                                                  className="img-fluid"
                                                  src={"../../assets/images/eth.png"}
                                                  alt=""
                                                />
                                              )
                                          }
                                        </div>
                                      </div>
                                      <div className="mid-chain">
                                        <input
                                          className="w-100"
                                          type="text"
                                          // placeholder="Shibarium Mainnet"
                                          value={NETWORK_LABEL[chainId]}
                                          disabled={true}
                                        />
                                      </div>
                                      {/* <Form.Select
                                        name="toChain"
                                        defaultValue={`${chainId}`}
                                        value={values.toChain}
                                        onChange={handleChange}
                                      >
                                        {[
                                          ChainId.SHIBARIUM,
                                          ChainId.GÖRLI,
                                          ChainId.ETHEREUM,
                                          ChainId.PUPPYNET517, */}
                                      {/* //  @ts-ignore
                                        ].map((key: ChainId, i: number) => {
                                          // console.log(values);
                                          return (
                                            <> */}
                                      {/* @ts-ignore TYPE NEEDS FIXING */}
                                      {/* <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />

                                              <option value={key} disabled={values.fromChain == key ? true : false}> */}
                                      {/*@ts-ignore TYPE NEEDS FIXING*/}
                                      {/* {NETWORK_LABEL[key]}
                                              </option>
                                            </>
                                          )

                                        })}
                                      </Form.Select> */}
                                      <div className="rt-chain">
                                        <span className="fld-head lite-800">
                                          Balance:
                                        </span>
                                        <span className="fld-txt lite-800">
                                          00.00
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wrap-bottom">
                                <div className="btn-modify">
                                  <button
                                    onClick={() => handleSubmit()}
                                    type="submit"
                                    className="btn primary-btn w-100"
                                  >
                                    Transfer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                    </Formik>
                  )}

                  {/* Withdraw   tab content section end */}
                </div>
              </div>
              {/* right section start */}
            </div>
            {/* withdraw main section end */}
          </div>
        </section>
      </main>
    </>
  );
}
