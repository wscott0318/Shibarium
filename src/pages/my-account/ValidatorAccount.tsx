import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CommonModal from "../components/CommonModel";
import { useActiveWeb3React } from "../../services/web3";
import {
  getDelegatorData
} from "../../services/apis/user/userApi";
import LoadingSpinner from "pages/components/Loading";
import NumberFormat from "react-number-format";
import { Formik } from "formik";
import * as Yup from "yup";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import Web3 from "web3";
import {
  addTransaction,
  finalizeTransaction,
} from "app/state/transactions/actions";
import { useAppDispatch } from "../../state/hooks";
import fromExponential from "from-exponential";
import Link from "next/link";
import {
  addDecimalValue,
  checkpointVal,
  comissionVal,
  currentGasPrice,
  getAllowanceAmount,
  USER_REJECTED_TX,
  tokenDecimal,
  web3Decimals
} from "web3/commonFunctions";
import ERC20 from "../../ABI/ERC20Abi.json";
import { getExplorerLink } from "app/functions";
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import DelegatePopup from "pages/delegate-popup";
import { queryProvider } from "Apollo/client";
import { StakeAmount } from "Apollo/queries";
import { dynamicChaining } from "web3/DynamicChaining";
import * as Sentry from "@sentry/nextjs";
import { useValId, useEpochDyna, useMigrateStake, useValInfoContract, useValInfo } from 'app/state/user/hooks';
import { CircularProgress } from "@material-ui/core";
import { getValidatorInfo } from "app/services/apis/network-details/networkOverview";

const initialModalState = {
  show: false,
  onHash: false,
  onReceipt: false,
  title: ""
}
const ValidatorAccount = ({
  userType,
  boneUSDValue,
  availBalance,
  getDelegatorAmount
}: {
  userType: any;
  boneUSDValue: any;
  availBalance: any;
  getDelegatorAmount: any
}) => {
  const router = useRouter();
  const [showUnboundClaim, setUnStakePop] = useState(false);
  const [showUnstakeClaimPop, setUnStakeClaimPop] = useState(false);
  const [showSignerAddressPop, setSignerAddressPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [unboundInput, setUnboundInput] = useState<any>("");
  const [validatorInfo, setValidatorInfo] = useState<any>({});
  const [validatorTotalReward, setValidatorTotalReward] = useState<any>();
  const [validatorInfoContract, setValidatorInfoContract] = useState<any>();
  const [epochDyna, setEpochDyna] = useEpochDyna();
  const [valInfo, setValInfo] = useValInfo();
  const [valId, setValId] = useValId();  //NOSONAR
  const isLoading = availBalance === -1;
  const [valInfoContract, setValInfoContract] = useValInfoContract()  //NOSONAR
  const [transactionState, setTransactionState] = useState(initialModalState);
  const [hashLink, setHashLink] = useState('');
  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library;
  const web3: any = new Web3(lib?.provider);
  const [delegationsList, setDelegationsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [stakeMore, setStakeMoreModal] = useState(false);
  const [stakeAmounts, setStakeAmounts] = useState<any>([]);
  const [restakeModal, setRestakeModal] = useState({
    value1: false,
    value2: false,
    address: "",
  });
  const [migrateData, setMigrateData] = useMigrateStake(); //NOSONAR
  const [commiModal, setCommiModal] = useState({
    value: false,
    address: "",
  });
  const [withdrawModal, setWithdrawModal] = useState({
    value: false,
    address: "",
  });
  const [unboundModal, setUnboundModal] = useState({
    startValue: false,
    address: "",
    id: "",
    stakeAmount: 0,
    image: "",
    valid: ""
  });
  const [comissionHandle, setComissionHandle] = useState({
    dynasty: "",
    epoch: "",
  });
  // console.log(web3Decimals , " value of d  ")
  useEffect(() => {
    if (userType === "Validator" && (+valId == 0 || valId == null)) {
      router.push("/");
    } else {
      getValInfo()
    }
  }, []);

  const getValInfo = () => {
    try { //NOSONAR
      let id: any = account
      getValidatorInfo(id).then((res: any) => {
        // setNodeSetup(res?.data?.message?.val?.status ? res?.data?.message?.val?.status : null)
        setValidatorInfo(res?.data?.message?.val)
      })
    } catch (err: any) {
      setValidatorInfo({})
      Sentry.captureMessage("getValCount", err);
    }
  }


  const getValidatorData = async (valId: any) => {
    try {
      let instance = new web3.eth.Contract(
        stakeManagerProxyABI,
        dynamicChaining[chainId].STAKE_MANAGER_PROXY
      );
      const valFromContract = await instance.methods
        .validators(valId)
        .call({ from: account });
      const valReward = await instance.methods
        .validatorReward(+valId)
        .call({ from: account });
      const dynasty = await instance.methods.dynasty().call({ from: account });
      const epoch = await instance.methods.epoch().call({ from: account });

      setComissionHandle({ dynasty, epoch });
      console.log({ dynasty, epoch });

      const reward = addDecimalValue(valReward / Math.pow(10, web3Decimals));
      setValidatorInfoContract(valFromContract);
      setValInfoContract(valFromContract)
      setValidatorTotalReward(reward);
      setEpochDyna({ epoch, dynasty })
      console.log(valFromContract, "val info ===> ");
      console.log(epochDyna, 'epochDyna');

    } catch (err: any) {
      Sentry.captureException("getValidatorData ", err);
    }
  };


  useEffect(() => {
    if (stakeAmounts.length) {
      let totalStake = stakeAmounts.map((x: any) => +(x.tokens)).reduce((accumulator: any, currentValue: any) => accumulator + currentValue)
      let totalReward = delegationsList.map((x: any) => +(x.reward)).reduce((accumulator: any, currentValue: any) => accumulator + currentValue)
      console.log({ stakeAmounts })
      getDelegatorAmount({ totalReward, totalStake })
    }
  }, [stakeAmounts, delegationsList])

  const getDelegatorCardData = async (accountAddress: any) => {
    setLoading(true);
    try {
      getDelegatorData(accountAddress.toLowerCase())
        .then((res: any) => {
          if (res.data) {
            let newArray: any = [];
            let sortedData = res.data.data.validators
              .filter((x: any) => +(x.stake) > 0)
              .sort((a: any, b: any) => parseInt(b.stake) - parseInt(a.stake));
            sortedData.forEach(async (x: any) => {
              let stakeData = await getStakeAmountDelegator(
                +x.id,
                accountAddress.toLowerCase()
              );
              setStakeAmounts((pre: any) => [...pre, stakeData]);
            });
            setDelegationsList(sortedData);
            setLoading(false);
            console.log("new delegation list", sortedData)
          }
        })
        .catch((e: any) => {
          setLoading(false);
        });
    } catch (err: any) {
      Sentry.captureException("getDelegatorCardData ", err);
    }
  };

  console.log("val info ", validatorInfo, validatorInfoContract);


  const handleModal = (
    btn: string,
    valAddress: any,
    id: any = null,
    image: any = null,
    valid: any = null,
    stakeAmount: any = null
  ) => {
    try {
      switch (btn) {
        case "Restake":
          if (userType === "Validator") {
            setRestakeModal({
              value1: true,
              value2: false,
              address: valAddress,
            });
          } else {
            setRestakeModal({
              value2: true,
              value1: false,
              address: valAddress,
            });
          }
          break;
        case "Change Commission Rate":
          setCommiModal({
            value: true,
            address: valAddress,
          });
          break;
        case "Withdraw Rewards":
          setWithdrawModal({
            value: true,
            address: valAddress,
          });
          break;
        case "Unbound":
          setUnboundModal((preVal: any) => ({
            ...preVal,
            stakeAmount: stakeAmount,
            startValue: true,
            address: valAddress,
            id: id,
            image: image,
            valid: valid,
          }));
          break;
        default:
          break;
      }
    } catch (err: any) {
      Sentry.captureException("handleModal ", err);
    }
  };

  useEffect(() => {
    if (account && userType === "Delegator") {
      getDelegatorCardData(account);
    }
    if (account && userType === "Validator") {
      if (valId) {
        getValidatorData(valId);
      }
    }
  }, [account, userType, chainId, valId]);

  const restakeValidation: any = Yup.object({
    amount: Yup.number()
      .typeError('Amount should be a number.')
      .min(0, "Invalid Amount")
      .max(availBalance, "Insufficient Balance.").moreThan(0, "You must enter valid amount.")
      .required("Amount is required."),
    reward: Yup.number().required(),
  });

  const signersAddress: any = Yup.object({
    address: Yup.string().required("Address is required."),
    publickey: Yup.string()
      .max(143)
      .notOneOf(
        [Yup.ref("address"), null],
        "Signer's address & public key should not match."
      )
      .matches(/^0x/, "Should only start with 0x.")
      .matches(/^[A-Za-z0-9 ]+$/, "No special characters allowed.")
      .required("Public key is required."),
  });

  const comissionValidation: any = Yup.object({
    comission: Yup.number()
      .min(0).moreThan(0, "You must enter valid amount.")
      .max(100)
      .required("Comission is required."),
  });

  //  COMMISSION CONTRACT
  const callComission = async (value: any) => {
    try {
      setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Pending" });
      let user: any = account;
      let instance = new web3.eth.Contract(
        stakeManagerProxyABI,
        dynamicChaining[chainId].STAKE_MANAGER_PROXY
      );
      let gasFee = await instance.methods
        .updateCommissionRate(valId, +value.comission)
        .estimateGas({ from: user });
      let encodedAbi = await instance.methods
        .updateCommissionRate(valId, +value.comission)
        .encodeABI();
      let CurrentgasPrice: any = await currentGasPrice(web3);
      await web3.eth
        .sendTransaction({
          from: user,
          to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
          gas: (parseInt(gasFee) + 30000).toString(),
          gasPrice: CurrentgasPrice,
          data: encodedAbi,
        })
        .on("transactionHash", (res: any) => {
          dispatch(
            addTransaction({
              hash: res,
              from: user,
              chainId,
              summary: `${res}`,
            })
          );
          let link = getExplorerLink(chainId, res, "transaction");
          setCommiModal({ value: false, address: "" });
          setHashLink(link);
          setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
        })
        .on("receipt", (res: any) => {
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
          setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Completed" });
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
        .on("error", (res: any) => {
          setTransactionState(initialModalState);
          if (res.code === 4001) {
            setCommiModal({ value: false, address: "" });
          }
        });
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("callComission", err);
      }
      setTransactionState(initialModalState);
      setCommiModal({ value: false, address: "" });
    }
  };

  // RESTAKE AS VALIDATORS
  const callRestakeValidators = async (values: any) => {
    try {
      if (account) {
        setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Pending" });
        let walletAddress: any = account;
        let ID = valId;
        //@ts-ignore
        let allowance =
          (await getAllowanceAmount(
            library,
            dynamicChaining[chainId].BONE,
            account,
            dynamicChaining[chainId].STAKE_MANAGER_PROXY
          )) || 0;
        let instance = new web3.eth.Contract(
          stakeManagerProxyABI,
          dynamicChaining[chainId].STAKE_MANAGER_PROXY
        );

        const amountWei = web3.utils.toBN(
          fromExponential(+values.amount * Math.pow(10, web3Decimals))
        );
        if (+values.amount > +allowance) {
          approveAmount(ID, amountWei, values.reward == 0 ? false : true);
        } else {
          let gasFee = await instance.methods
            .restake(ID, amountWei, values.reward == 0 ? 0 : 1)
            .estimateGas({ from: walletAddress });
          let encodedAbi = await instance.methods
            .restake(ID, amountWei, values.reward == 0 ? 0 : 1)
            .encodeABI();
          let CurrentgasPrice: any = await currentGasPrice(web3);
          await web3.eth
            .sendTransaction({
              from: walletAddress,
              to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
              gas: (parseInt(gasFee) + 30000).toString(),
              gasPrice: CurrentgasPrice,
              data: encodedAbi,
            })
            .on("transactionHash", (res: any) => {
              dispatch(
                addTransaction({
                  hash: res,
                  from: walletAddress,
                  chainId,
                  summary: `${res}`,
                })
              );
              let link = getExplorerLink(chainId, res, "transaction");
              setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
              setHashLink(link);
              setRestakeModal({ value1: false, value2: false, address: "" });
            })
            .on("receipt", (res: any) => {
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
              router.push("/my-account", "/my-account", { shallow: false });
              setHashLink("");
              setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Completed" });
            })
            .on("error", (res: any) => {
              setTransactionState(initialModalState);
              if (res.code === 4001) {
                setRestakeModal({ value1: false, value2: false, address: "" });
              }
            });
        }
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("callRestakeValidators", err);
      }
      setRestakeModal({ value1: false, value2: false, address: "" });
      setTransactionState(initialModalState);
    }
  };

  // Approve BONE
  const approveAmount = async (id: any, amounts: any, reward: boolean) => {
    try {
      if (account) {
        let user = account;
        let amount = web3.utils.toBN(
          fromExponential(1000 * Math.pow(10, web3Decimals))
        );
        let instance = new web3.eth.Contract(
          ERC20,
          dynamicChaining[chainId].BONE
        );
        instance.methods
          .approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount)
          .send({ from: user })
          .then(async (res: any) => {
            let instance = new web3.eth.Contract(
              stakeManagerProxyABI,
              dynamicChaining[chainId].STAKE_MANAGER_PROXY
            );
            let gasFee = await instance.methods
              .restake(id, amounts, reward)
              .estimateGas({ from: user });
            let encodedAbi = await instance.methods
              .restake(id, amounts, reward)
              .encodeABI();
            let CurrentgasPrice: any = await currentGasPrice(web3);
            await web3.eth.sendTransaction({
              from: user,
              to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
              gas: (parseInt(gasFee) + 30000).toString(),
              gasPrice: CurrentgasPrice,
              data: encodedAbi,
            });

            instance.methods
              .restake(id, amounts, reward)
              .send({ from: user })
              .on("transactionHash", (res: any) => {
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
              })
              .on("error", (res: any) => {
                if (res.code === 4001) {
                  setCommiModal({ value: false, address: "" });
                }
              });
          })
          .catch((err: any) => { });
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("approveAmount", err);
      }
      setCommiModal({ value: false, address: "" });
    }
  };

  // WITHDRAW REWARDS VALIDATORS

  const withdrawRewardValidator = async () => {
    try {
      setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Pending" });
      if (account) {
        let walletAddress = account;
        let valID = valId;
        let instance = new web3.eth.Contract(
          stakeManagerProxyABI,
          dynamicChaining[chainId].STAKE_MANAGER_PROXY
        );
        let gasFee = await instance.methods
          .withdrawRewards(valID)
          .estimateGas({ from: walletAddress });
        let encodedAbi = await instance.methods
          .withdrawRewards(valID)
          .encodeABI();
        let CurrentgasPrice: any = await currentGasPrice(web3);
        await web3.eth
          .sendTransaction({
            from: walletAddress,
            to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
            gas: (parseInt(gasFee) + 30000).toString(),
            gasPrice: CurrentgasPrice,
            data: encodedAbi,
          })
          .on("transactionHash", (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            );
            let link = getExplorerLink(chainId, res, "transaction");
            setWithdrawModal({ value: false, address: "" });
            setHashLink(link);
            setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
          })
          .on("receipt", (res: any) => {
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
            setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Completed" });
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          })
          .on("error", (res: any) => {
            setTransactionState(initialModalState);
            if (res.code === 4001) {
              setWithdrawModal({ value: false, address: "" });
            }
          });
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("withdrawRewardValidator", err);
      }
      setTransactionState(initialModalState);
      setWithdrawModal({ value: false, address: "" });
    }
  };
  // WITHDRAW REWARDS delegator

  const withdrawRewardDelegator = async (address: any, id: any) => {
    try {
      setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Withdraw Rewards" });
      if (account) {
        let walletAddress = account;
        let instance = new web3.eth.Contract(ValidatorShareABI, address);
        let gasFee = await instance.methods
          .withdrawRewards()
          .estimateGas({ from: walletAddress });
        let encodedAbi = await instance.methods.withdrawRewards().encodeABI();
        let CurrentgasPrice: any = await currentGasPrice(web3);
        await web3.eth
          .sendTransaction({
            from: walletAddress,
            to: address,
            gas: (parseInt(gasFee) + 30000).toString(),
            gasPrice: CurrentgasPrice,
            data: encodedAbi,
          })
          .on("transactionHash", (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            );
            let link = getExplorerLink(chainId, res, "transaction");
            setWithdrawModal({ value: false, address: "" });
            setHashLink(link);
            setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
          })
          .on("receipt", (res: any) => {
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
            setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Completed" });
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          })
          .on("error", (res: any) => {
            setTransactionState(initialModalState);
            if (res.code === 4001) {
              setWithdrawModal({ value: false, address: "" });
            }
          });
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("withdrawRewardDelegator", err);
      }
      setTransactionState(initialModalState);
      setWithdrawModal({ value: false, address: "" });
    }
  };

  // UnstakeClaim VALIDATOR
  const unStakeClaimValidator = async () => {
    try {
      if (account) {
        setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Pending" });
        let walletAddress: any = account;
        let ID = valId;
        let instance = new web3.eth.Contract(
          stakeManagerProxyABI,
          dynamicChaining[chainId].STAKE_MANAGER_PROXY
        );
        let gasFee = await instance.methods
          .unstakeClaim(ID)
          .estimateGas({ from: walletAddress });
        let encodedAbi = await instance.methods.unstakeClaim(ID).encodeABI();
        let CurrentgasPrice: any = await currentGasPrice(web3);
        await web3.eth
          .sendTransaction({
            from: walletAddress,
            to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
            gas: (parseInt(gasFee) + 30000).toString(),
            gasPrice: CurrentgasPrice,
            data: encodedAbi,
          })
          .on("transactionHash", (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            );
            let link = getExplorerLink(chainId, res, "transaction");
            setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
            setHashLink(link);
            setUnStakePop(false);
          })
          .on("receipt", (res: any) => {
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
            setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Completed" });
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          })
          .on("error", (res: any) => {
            console.log(res, "error");
            setTransactionState(initialModalState);
            if (res.code === 4001) {
              setUnStakePop(false);
            }
          });
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("unStakeClaimValidator", err);
      }
      console.log("err ==. ", err);
      setTransactionState(initialModalState);
      setUnStakePop(false);
    }
  };

  // Unstake VALIDATOR
  const unStakeValidator = async () => {
    try {
      if (account) {
        setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Pending" });
        let walletAddress: any = account;
        let ID = valId;
        let instance = new web3.eth.Contract(
          stakeManagerProxyABI,
          dynamicChaining[chainId].STAKE_MANAGER_PROXY
        );
        let gasFee = await instance.methods
          .unstake(ID)
          .estimateGas({ from: walletAddress });
        let encodedAbi = await instance.methods.unstake(ID).encodeABI();
        let CurrentgasPrice: any = await currentGasPrice(web3);
        await web3.eth
          .sendTransaction({
            from: walletAddress,
            to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
            gas: (parseInt(gasFee) + 30000).toString(),
            gasPrice: CurrentgasPrice,
            data: encodedAbi,
          })
          .on("transactionHash", (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            );
            let link = getExplorerLink(chainId, res, "transaction");
            setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
            setHashLink(link);
            setUnStakePop(false);
          })
          .on("receipt", (res: any) => {
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
            setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Completed" });
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          })
          .on("error", (res: any) => {
            setTransactionState(initialModalState);
            if (res.code === 4001) {
              setUnStakePop(false);
            }
          });
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("unStakeClaimValidator", err);
      }
      setTransactionState(initialModalState);
      setUnStakePop(false);
    }
  };

  // restake DELEGATOR
  const restakeDelegator = async () => {
    try {
      if (account) {
        setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Pending" });
        let walletAddress: any = account;
        let instance = new web3.eth.Contract(
          ValidatorShareABI,
          restakeModal.address
        );
        let gasFee = await instance.methods
          .restake()
          .estimateGas({ from: walletAddress });
        let encodedAbi = await instance.methods.restake().encodeABI();
        let CurrentgasPrice: any = await currentGasPrice(web3);
        await web3.eth
          .sendTransaction({
            from: walletAddress,
            to: restakeModal.address,
            gas: (parseInt(gasFee) + 30000).toString(),
            gasPrice: CurrentgasPrice,
            data: encodedAbi,
          })
          .on("transactionHash", (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            );
            let link = getExplorerLink(chainId, res, "transaction");
            setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
            setHashLink(link);
            setRestakeModal({ value1: false, value2: false, address: "" });
          })
          .on("receipt", (res: any) => {
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
            setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Submitted" });
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          })
          .on("error", (res: any) => {
            setTransactionState(initialModalState);
            setRestakeModal({ value1: false, value2: false, address: "" });
            if (res.code === 4001) {
              setRestakeModal({ value1: false, value2: false, address: "" });
            }
          });
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("restakeDelegator", err);
      }
      setTransactionState(initialModalState);
      setRestakeModal({ value1: false, value2: false, address: "" });
    }
  };

  // unbound DELEGATOR
  const unboundDelegator = async () => {
    try {
      setUnboundModal({
        ...unboundModal,
        startValue: false,
      });
      setUnboundModal((preVal: any) => ({ ...preVal, startValue: false }));
      setTransactionState({ show: true, onHash: false, onReceipt: false, title: "Pending" });
      let data = {
        delegatorAddress: account,
        validatorContract: unboundModal.id,
        amount: unboundInput,
      };
      if (account) {
        let walletAddress = account;
        let amount = web3.utils.toBN(
          fromExponential(+unboundInput * Math.pow(10, web3Decimals))
        );
        let instance = new web3.eth.Contract(
          ValidatorShareABI,
          data.validatorContract
        );
        await instance.methods
          .sellVoucher_new(amount, amount)
          .send({ from: walletAddress })
          .on("transactionHash", (res: any) => {
            dispatch(
              addTransaction({
                hash: res,
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            );
            let link = getExplorerLink(chainId, res, "transaction");
            setTransactionState({ show: true, onHash: true, onReceipt: false, title: "Submitted" });
            setHashLink(link);
            setUnboundModal({
              startValue: false,
              address: "",
              id: "",
              stakeAmount: 0,
              image: "",
              valid: ""
            });
            setUnboundInput("");
          })
          .on("receipt", async (res: any) => {
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
              setTransactionState({ show: true, onHash: true, onReceipt: true, title: "Completed" });
            }, 3000)
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          })
          .on("error", (res: any) => {
            setUnboundInput("");
            setUnboundModal((preVal: any) => ({
              ...preVal,
              progressValue: false,
              comfirmValue: true,
            }));
            if (res.code === 4001) {
              setUnboundModal({
                startValue: false,
                address: "",
                id: "",
                stakeAmount: 0,
                image: "",
                valid: ""
              });
              setTransactionState(initialModalState);
            }
          });
      }
    } catch (err: any) {
      if (err.code !== USER_REJECTED_TX) {
        Sentry.captureException("unboundDelegator", err);
      }
      setUnboundInput("");
      setUnboundModal({
        startValue: false,
        address: "",
        id: "",
        stakeAmount: 0,
        image: "",
        valid: ""
      });
      setTransactionState(initialModalState);
    }
  };

  const getStakeAmountDelegator = async (id: any, account: any) => {
    try {
      console.log("stake data id  == ", id, ' account ==> ', account)
      const validators = await queryProvider.query({
        query: StakeAmount(id, account),
      });
      return validators.data.delegator;
    } catch (err: any) {
      Sentry.captureException("getStakeAmountDelegator ", err);
    }
  };

  const getStake = (id: string) => {
    try {
      let item = stakeAmounts?.length
        ? stakeAmounts.filter((x: any) => +(x.validatorId) === +id)[0]?.tokens
        : 0;
      return item > 0
        ? addDecimalValue(parseInt(item) / 10 ** web3Decimals)
        : "0.00";
    } catch (err: any) {
      Sentry.captureException("getStake ", err);
    }
  };
  const handleMigrateClick = (data: any) => {
    let stake = getStake(data.id);
    setMigrateData(data, stake);
    router.push(
      `/migrate-stake`,
      `/migrate-stake`,
      { shallow: true }
    )
  }
  const reloadOnHash = () => {
    if (transactionState.onHash) {
      window.location.reload()
    }
  }
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/Shib-Logo.png";
    event.currentTarget.className = "error w-75";
  };
  return (
    <>
      {loading && <LoadingSpinner />}
      <DelegatePopup
        data={selectedRow}
        showdelegatepop={stakeMore}
        setdelegatepop={() => { setStakeMoreModal(false); }}
        getDelegatorCardData={getDelegatorCardData}
      />
      <div className="main-content dark-bg-800 full-vh cmn-input-bg">
        {/* retake popop start VALIDATOR*/}
        <CommonModal
          title={"Restake"}
          show={restakeModal.value1}
          setshow={() => {
            setRestakeModal({ value1: false, value2: false, address: "" });
            reloadOnHash();
          }}
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <>
            <div className="cmn_modal val_popups">
              <Formik
                initialValues={{
                  amount: "",
                  address: "",
                  reward: 0,
                }}
                validationSchema={restakeValidation}
                onSubmit={(values, actions) => {
                  callRestakeValidators(values);
                }}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  values,
                  handleSubmit,
                }) => (
                  <>
                    <div className="image_area row">
                      <div className="text-center col-12 d-flex justify-content-center">
                        <img
                          className="img-fluid img-wdth"
                          src={"../../assets/images/shiba-col-2.png"}
                          width="150"
                          height="150"
                        />
                      </div>
                    </div>
                    <div className="cmn_inpt_row">
                      <div className="form-control">
                        <label className="mb-2 text-white mb-md-2">
                          Enter amount
                        </label>
                        <input
                          type="text"
                          placeholder="Amount"
                          name="amount"
                          className="w-100"
                          value={values.amount}
                          onChange={handleChange("amount")}
                        />
                        {touched.amount && errors.amount ? (
                          <p className="pl-2 mb-0 primary-text">
                            {errors.amount}
                          </p>
                        ) : null}
                        <div className="row-st">
                          <p className="mt-2 text-white">
                            {" "}
                            Balance : <b>{addDecimalValue(availBalance)} </b>
                          </p>
                          <button
                            disabled={availBalance <= 0}
                            className="orange-txt fw-bold"
                            onClick={() => {
                              setFieldValue(
                                "amount",
                                (availBalance)
                              );
                            }}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cmn_inpt_row">
                      <div className="form-control">
                        <label className="mb-2 text-white mb-md-2">
                          Select Restake reward
                        </label>
                        {/* <input type="text" placeholder="Stakereward" className="w-100" /> */}
                        <div className="black-sel">
                          <select
                            name="reward"
                            id="reward"
                            onChange={handleChange("reward")}
                            className="cus-select"
                          >
                            <option selected={values.reward === 0} value={0}>
                              No
                            </option>
                            <option selected={values.reward === 1} value={1}>
                              Yes
                            </option>
                          </select>
                          <span className="arrow-down"></span>
                        </div>
                      </div>
                    </div>
                    <div className="pop_btns_area">
                      <div className="form-control">
                        <button
                          className="btn primary-btn w-100 btn-lg"
                          onClick={() => handleSubmit()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          </>
        </CommonModal>
        {/* retake popop ends */}

        {/* commission popop start */}
        <CommonModal
          title={"Commission"}
          show={commiModal.value}
          setshow={() => {
            setCommiModal({ value: false, address: "" });
            reloadOnHash();
          }}
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <>
            <Formik
              initialValues={{
                address: "",
                comission: "",
              }}
              validationSchema={comissionValidation}
              onSubmit={(values, actions) => {
                callComission(values);
              }}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                values,
                handleSubmit,
              }) => (
                <div className="cmn_modal val_popups">
                  <div className="cmn_inpt_row">
                    <div className="image_area row">
                      <div className="text-center col-12 d-flex justify-content-center">
                        <img
                          className="img-fluid img-wdth"
                          src={"../../assets/images/shiba-col-2.png"}
                          width="150"
                          height="150"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="cmn_inpt_row">
                    <div className="form-control">
                      <label className="mb-2 text-white mb-md-2">
                        Enter new commission
                      </label>
                      <input
                        type="text"
                        placeholder="New commission"
                        className="w-100"
                        value={values.comission}
                        onChange={handleChange("comission")}
                      />
                      {touched.comission && errors.comission ? (
                        <p className="pt-1 pl-2 primary-text">
                          {errors.comission}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="pop_btns_area">
                    <div className="form-control">
                      <button
                        className="btn primary-btn w-100 btn-lg"
                        type="submit"
                        onClick={() => handleSubmit()}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          </>
        </CommonModal>
        {/* commission popop ends */}

        {/* withdraw delegator popop start */}
        <CommonModal
          title={"Withdraw rewards"}
          show={withdrawModal.value}
          setshow={() => {
            setWithdrawModal({ value: false, address: "" })
            reloadOnHash();
          }}
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <>
            <div className="cmn_modal val_popups">
              <div className="image_area row">
                <div className="text-center col-12 d-flex justify-content-center">
                  <img
                    className="img-fluid img-wdth"
                    src={"../../assets/images/shiba-col-2.png"}
                    width="150"
                    height="150"
                  />
                </div>
              </div>
              <>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 text-white mb-md-2">
                      Enter validator address
                    </label>
                    <input
                      type="text"
                      placeholder="Validator address"
                      className="w-100"
                      value={withdrawModal.address}
                      readOnly
                    />
                  </div>
                </div>
                <div className="pop_btns_area">
                  <div className="form-control">
                    <button
                      onClick={() => withdrawRewardValidator()}
                      className="btn primary-btn w-100 btn-lg"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            </div>
          </>
        </CommonModal>
        {/* withdraw popop ends */}

        {/* withdraw popop start */}
        <CommonModal
          title={"Restake"}
          show={restakeModal.value2}
          setshow={() => {
            setRestakeModal({ value1: false, value2: false, address: "" });
            reloadOnHash();
          }
          }
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <>
            <div className="cmn_modal val_popups">
              <div className="image_area row">
                <div className="text-center col-12 d-flex justify-content-center">
                  <img
                    className="img-fluid img-wdth"
                    src={"../../assets/images/shiba-col-2.png"}
                    width="150"
                    height="150"
                  />
                </div>
              </div>
              <>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 text-white mb-md-2">
                      validator address
                    </label>
                    <input
                      type="text"
                      placeholder="Validator address"
                      className="w-100"
                      value={restakeModal.address}
                      readOnly
                    />
                  </div>
                </div>
                <div className="pop_btns_area">
                  <div className="form-control">
                    <button
                      onClick={() => restakeDelegator()}
                      className="btn primary-btn w-100"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            </div>
          </>
        </CommonModal>
        {/* withdraw popop ends */}

        {/* unbound popop start */}
        <CommonModal
          title={"Unstake"}
          show={showUnboundClaim}
          setshow={() => {
            setUnStakePop(false);
            reloadOnHash();
          }}
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <>
            <div className="cmn_modal val_popups">
              <form>
                <div className="mt-5 mb-5 image_area row">
                  <div className="text-center col-12 d-flex justify-content-center">
                    <img
                      className="img-fluid img-wdth"
                      src={"../../assets/images/shiba-col-2.png"}
                      width="150"
                      height="150"
                    />
                  </div>
                </div>
                <div className="mt-5 only_text">
                  <p className="text-center">
                    Are you sure you want to unstake ?
                  </p>
                </div>
                <div className="pop_btns_area row mr-top-50 form-control">
                  <div className="col-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setUnStakePop(false);
                      }}
                      className="text-white btn blue-btn w-100 dark-bg-800"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        unStakeValidator();
                      }}
                      className="btn primary-btn w-100"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        </CommonModal>
        {/* unbound popop ends */}
        {/* unbound popop start */}
        <CommonModal
          title={"Unstake Claim"}
          show={showUnstakeClaimPop}
          setshow={() => {
            setUnStakeClaimPop(false);
            reloadOnHash();
          }}
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <>
            <div className="cmn_modal val_popups">
              <form>
                <div className="mt-5 mb-5 image_area row">
                  <div className="text-center col-12 d-flex justify-content-center">
                    <img
                      className="img-fluid img-wdth"
                      src={"../../assets/images/shiba-col-2.png"}
                      width="150"
                      height="150"
                    />
                  </div>
                </div>
                <div className="mt-5 only_text">
                  <p className="text-center">
                    Are you sure you want to unstake claim ?
                  </p>
                </div>
                <div className="pop_btns_area row mr-top-50 form-control">
                  <div className="col-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setUnStakeClaimPop(false);
                      }}
                      className="text-white btn blue-btn w-100 dark-bg-800"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        unStakeClaimValidator();
                      }}
                      className="btn primary-btn w-100"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        </CommonModal>
        {/* unbound popop ends */}

        {/* unbound popop start */}
        <CommonModal
          title={"Update Signer Address"}
          show={showSignerAddressPop}
          setshow={() => {
            setSignerAddressPop(false);
            reloadOnHash();
          }}
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <>
            <div className="cmn_modal val_popups">
              <Formik
                initialValues={{
                  address: "",
                  publickey: "",
                }}
                validationSchema={signersAddress}
                onSubmit={(values, actions) => { }}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  values,
                  handleSubmit,
                }) => (
                  <>
                    <div className="cmn_inpt_row">
                      <div className="image_area row">
                        <div className="text-center col-12 d-flex justify-content-center">
                          <img
                            className="img-fluid img-wdth"
                            src={"../../assets/images/shiba-col-2.png"}
                            width="150"
                            height="150"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cmn_inpt_row">
                      <div className="form-control">
                        <label className="mb-2 text-white mb-md-2">
                          Signer’s address
                        </label>
                        <input
                          type="text"
                          name="address"
                          placeholder="0xfe2f17400d4d8d24740ff8c0"
                          className="w-100"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        // onChange={handleChange("amount")}
                        />
                        {touched.address && errors.address ? (
                          <p className="pt-1 pl-2 primary-text">
                            {errors.address}
                          </p>
                        ) : null}
                      </div>
                      <div style={{ marginTop: "20px" }} className="form-control">
                        <label className="mb-2 text-white mb-md-2">
                          Signer’s Public key
                        </label>
                        <input
                          type="text"
                          placeholder="0xfe2f17400d4d8d24740ff8c0"
                          name="publickey"
                          value={values.publickey}
                          className="w-100"
                          // onChange={handleChange("amount")}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.publickey && errors.publickey ? (
                          <p className="pt-1 pl-2 primary-text">
                            {errors.publickey}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="pop_btns_area">
                      <div className="form-control">
                        <button
                          className="btn primary-btn w-100"
                          onClick={() => handleSubmit()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          </>
        </CommonModal>
        {/* unbound popop ends */}

        {/* unbound popop DELEGATOR start */}
        <CommonModal
          title={"Unbound"}
          show={unboundModal.startValue}
          setshow={() => {
            setUnboundModal({ ...unboundModal, startValue: false });
            reloadOnHash();
            setUnboundInput(0);
          }
          }
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <>
            {unboundModal.startValue && (
              <div className=".cmn_modal del-tab-content">
                <div className="image_area row">
                  <div className="text-center col-12 d-flex justify-content-center">
                    <img
                      className="img-fluid img-wdth"
                      src={"../../assets/images/shiba-col-2.png"}
                      width="180"
                      height="180"
                    />
                  </div>
                </div>
                <div className="mb-4 center-align">
                  <h5 className="text-center">
                    Are you sure you want to unbound?
                  </h5>
                </div>
                <div className="p-2 p-sm-3">
                  {/* old input */}
                  <div className="form-group float-group sec-format">
                    <div className="flex-wrap d-flex justify-content-between">
                      <h6 className="mb-1">Withdraw Stake</h6>
                      <h6 className="mb-1">
                        {unboundModal.stakeAmount} Bone
                      </h6>
                    </div>
                    <div className="mb-0 cmn_inpt_row max-input inpt-bg">
                      <div className="max-input dark-bg-800">
                        <input
                          value={unboundInput}
                          onChange={(e) => { setUnboundInput(e.target.value) }}
                          type="number"
                          className="w-100 form-control"
                          placeholder="Enter amount"
                        />
                        <span
                          className="primary-text over-text fw-600 "
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setUnboundInput(unboundModal.stakeAmount)
                          }
                        >
                          MAX
                        </span>
                      </div>
                      {unboundInput > unboundModal.stakeAmount ?
                        (
                          <p className="warning">Insufficient Amount</p>
                        )
                        : null}
                    </div>
                  </div>
                  <p className="mt-1 mb-0 info-txt">
                    Your Funds will be locked for{" "}
                    <p className="dark-text primary-text">Checkpoints</p>
                  </p>
                </div>
                <button
                  onClick={() => unboundDelegator()}
                  disabled={unboundInput > 0 && unboundInput <= unboundModal.stakeAmount ? false : true}
                  type="button"
                  className="mt-3 btn primary-btn mt-sm-4 w-100"
                >
                  Confirm Unbound
                </button>
              </div>
            )}
          </>
        </CommonModal>
        {/* unbound popop DELEGATOR ends */}

        {/* pending & submit modal start */}

        <CommonModal
          title={transactionState.title}
          show={transactionState.show}
          setshow={() => {
            reloadOnHash();
            setTransactionState(initialModalState)
          }
          }
          externalCls="stak-pop del-pop ffms-inherit"
        >
          <div className="popmodal-body tokn-popup no-ht trans-mod">
            <div className="pop-block">
              <ul className="mt-3 stepper del-step">
                <li className="step active">
                  <div className="step-ico">
                    <img
                      className="img-fluid"
                      src="../../assets/images/tick-yes.png"
                      alt="check-icon"
                    />
                  </div>
                  <div className="step-title">Approved</div>
                </li>
                <li className={`step ${(transactionState.onHash) && "active"}`}>
                  <div className="step-ico">
                    <img
                      className="img-fluid"
                      src="../../assets/images/tick-yes.png"
                      alt="check-icon"
                    />
                  </div>
                  <div className="step-title">Submitted</div>
                </li>
                <li className={`step ${(transactionState.onReceipt) && "active"}`}>
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
              {
                transactionState.show && transactionState.title == "Pending" && (
                  <div className="step_content fl-box">
                    <div className="ax-top">
                      <div className="image_area row">
                        <div className="text-center col-12 watch-img-sec">
                          <img
                            className="img-fluid img-wdth"
                            src="../../assets/images/progrs-img.png"
                            width="150"
                            height="150"
                          />
                        </div>
                      </div>
                      <div className="mid_text row">
                        <div className="text-center col-12">
                          <h4 className="ff-mos">Processing Transaction</h4>
                        </div>
                        <div className="text-center col-12">
                          <p className="ff-mos">
                            Approve the transaction in Metamask to proceed.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ax-bottom">
                      <div className="mt-3 pop_btns_area row form-control">
                        <div className="col-12">
                          <button
                            className={`btn primary-btn d-flex align-items-center justify-content-center w-100`}
                            disabled={hashLink ? false : true}
                            onClick={() => window.open(hashLink)}
                          >
                            <span>View on Block Explorer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              {transactionState.onHash && transactionState.title == "Submitted" && (
                <div className="step_content fl-box">
                  <div className="ax-top">
                    <div className="image_area row">
                      <div className="text-center col-12 watch-img-sec">
                        <CircularProgress color="inherit" size={120} style={{ color: "#f06500" }} />
                      </div>
                    </div>
                    <div className="mid_text row">
                      <div className="text-center col-12">
                        <h4 className="ff-mos">Transaction Submitted</h4>
                      </div>
                      <div className="text-center col-12">
                        <p className="ff-mos">
                          BONE transactions can take longer time to complete
                          based upon network congestion. Please wait or increase
                          the gas price of the transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ax-bottom">
                    <div className="mt-3 pop_btns_area row form-control">
                      <div className="col-12">
                        <button
                          className={`btn primary-btn d-flex align-items-center justify-content-center w-100`}
                          disabled={hashLink ? false : true}
                          onClick={() => window.open(hashLink)}
                        >
                          <span>View on Block Explorer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {
                transactionState.onReceipt && transactionState.title == "Completed" && (
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
                          <h4 className="ff-mos">Transaction Completed</h4>
                        </div>
                        <div className="text-center col-12">
                          <p className="ff-mos">
                            Transaction is completed. Visit link to see details.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ax-bottom">
                      <div className="mt-3 pop_btns_area row form-control">
                        <div className="col-12">
                          <button className="w-100">
                            <a
                              className="btn primary-btn d-flex align-items-center justify-content-center"
                              target="_blank"
                              href={hashLink}
                            >
                              <span>View on Block Explorer</span>
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          {/* Transaction Pending popup version 2 end*/}
        </CommonModal>
        {/* pending & submit modal end */}

        {
          userType === "Validator" ? (
            <section className="mid_cnt_area acct">
              <div className="container">
                <div className="col-xl-12 col-lg-12 side-auto">
                  <div className="val_del_outr">
                    <div className="row ff-mos">
                      <div className="col-md-6 col-xl-4 col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>{isLoading ? "0.00" : addDecimalValue(availBalance)}</span> BONE
                            </div>
                            <div className="mid-head">
                              <span>
                                <NumberFormat
                                  thousandSeparator
                                  displayType={"text"}
                                  prefix="$ "
                                  value={isLoading ? "0.00" : (addDecimalValue(
                                    (availBalance || 0.0) * boneUSDValue))}
                                />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">Wallet Balance</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-4 col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              {validatorInfoContract?.commissionRate
                                ? addDecimalValue(
                                  +validatorInfoContract?.commissionRate
                                )
                                : 0.0}{" "}
                              %
                            </div>
                            <div className="mid-head">
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">
                                Commission Percentage
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-4 col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              {validatorTotalReward
                                ? addDecimalValue(+validatorTotalReward)
                                : "0.00"}{" "}
                              BONE
                            </div>
                            <div className="mid-head">
                              <span>
                                <NumberFormat
                                  thousandSeparator
                                  displayType={"text"}
                                  prefix="$ "
                                  value={addDecimalValue(
                                    +validatorTotalReward * boneUSDValue
                                  )}
                                />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">
                                Withdrawal reward balance
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-4 mob-margin col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>
                                {validatorInfoContract?.amount
                                  ? addDecimalValue(
                                    +validatorInfoContract?.amount /
                                    10 ** web3Decimals
                                  )
                                  : "0.00"}
                              </span>{" "}
                              BONE
                            </div>
                            <div className="mid-head">
                              <span>
                                <NumberFormat
                                  thousandSeparator
                                  displayType={"text"}
                                  prefix="$ "
                                  value={addDecimalValue(
                                    (+validatorInfoContract?.amount /
                                      10 ** web3Decimals) *
                                    boneUSDValue
                                  )}
                                />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">Self Stake</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center col-md-6 col-xl-4 mob-margin col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>
                                {validatorInfoContract?.delegatedAmount
                                  ? addDecimalValue(
                                    +validatorInfoContract?.delegatedAmount /
                                    Math.pow(10, web3Decimals)
                                  )
                                  : "0.00"}
                              </span>{" "}
                              BONE
                            </div>
                            <div className="mid-head">
                              <span>
                                <NumberFormat
                                  thousandSeparator
                                  displayType={"text"}
                                  prefix="$ "
                                  value={addDecimalValue(
                                    (+validatorInfoContract?.delegatedAmount /
                                      Math.pow(10, web3Decimals)) *
                                    boneUSDValue
                                  )}

                                />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">
                                Total Delegators Amount
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-xl-4 mob-margin col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>
                                {validatorInfoContract?.delegatorsReward
                                  ? addDecimalValue(
                                    parseInt(validatorInfoContract?.delegatorsReward) / Math.pow(10, 18)
                                  )
                                  : "0.00"}
                              </span>{" "}
                              BONE
                            </div>
                            <div className="mid-head">
                              <span>
                                <NumberFormat
                                  thousandSeparator
                                  displayType={"text"}
                                  prefix="$ "
                                  value={addDecimalValue(
                                    (parseInt(validatorInfoContract?.delegatorsReward) / Math.pow(10, web3Decimals)) *
                                    boneUSDValue
                                  )}
                                />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">
                                Total Delegators Reward
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* grid sec end */}
                    <div className="mt-3 btns_sec val_all_bts row actions-btn">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="cus-tooltip d-inline-block ps-0">
                          <button
                            disabled={
                              parseInt(validatorInfoContract?.status) > 1 ||
                                parseInt(validatorInfoContract?.deactivationEpoch) > 0 || //@ts-ignore
                                valInfo.valInfo.signer == account
                                ? true
                                : false
                            }
                            onClick={() => handleModal("Restake", account)}
                            className="ff-mos btn black-btn w-100 d-block tool-ico"
                          >
                            Restake
                          </button>
                          <div className="tool-desc">
                            {/* @ts-ignore */}
                            {valInfo.valInfo.signer == account ? "Switch to your staker account" : "Restake"}</div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="cus-tooltip d-inline-block ps-0">
                          <button
                            disabled={
                              parseInt(validatorInfoContract?.status) > 1 ||
                                parseInt(validatorInfoContract?.deactivationEpoch) >
                                0 || parseInt(
                                  validatorInfoContract?.lastCommissionUpdate
                                ) +
                                parseInt(comissionHandle?.dynasty) >=
                                parseInt(comissionHandle?.epoch) //@ts-ignore
                                || valInfo.valInfo.signer == account
                                ? true
                                : false
                            }
                            onClick={() =>
                              handleModal("Change Commission Rate", account)
                            }
                            className="ff-mos btn black-btn w-100 d-block tool-ico"
                          >
                            Change Commission Rate
                          </button>
                          {parseInt(validatorInfoContract?.status) > 1 ||
                            parseInt(validatorInfoContract?.deactivationEpoch) >
                            0 || parseInt(
                              validatorInfoContract?.lastCommissionUpdate
                            ) +
                            parseInt(comissionHandle?.dynasty) >
                            parseInt(comissionHandle?.epoch) ? null :
                            (<div className="tool-desc">
                              {/* @ts-ignore */}
                              {valInfo.valInfo.signer == account ? "Switch to your staker account" : "Change your commission rate"}
                            </div>)}

                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="cus-tooltip d-inline-block ps-0">
                          <button
                            onClick={() => { withdrawRewardValidator() }}
                            disabled={ //@ts-ignore
                              parseInt(validatorInfoContract?.status) > 1 || valInfo.valInfo.signer == account
                                ? true
                                : (validatorTotalReward <= 0)
                            }
                            className="ff-mos btn black-btn w-100 d-block tool-ico"
                          >
                            Withdraw Rewards
                          </button> {/*@ts-ignore*/}
                          <div className="tool-desc">{valInfo.valInfo.signer == account ? "Switch to your staker account" : "Withdraw rewards"}</div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="cus-tooltip d-inline-block ps-0">
                          <button
                            disabled={
                              parseInt(validatorInfoContract?.deactivationEpoch) >
                                0 ||
                                validatorInfo?.fundamental === 1 ||
                                // @ts-ignore
                                valInfo.valInfo.signer == account ? true
                                : false
                            }
                            onClick={() => setUnStakePop(true)}
                            className="ff-mos btn black-btn w-100 d-block tool-ico"
                          >
                            Unstake
                          </button>
                          <div className="tool-desc-grid tool-desc">{/*@ts-ignore*/}
                            {valInfo.valInfo.signer == account ? "Switch to your staker account" : "Unstake from network"}</div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className={`cus-tooltip d-inline-block ps-0`}>
                          <button
                            disabled={
                              (parseInt(validatorInfoContract?.deactivationEpoch) >
                                0 &&
                                parseInt(validatorInfoContract?.status) === 2) &&
                                validatorInfo?.fundamental === 2 || //@ts-ignore
                                valInfo.valInfo.signer != account
                                ? false
                                : true
                            }
                            onClick={() => setUnStakeClaimPop(true)}
                            className="ff-mos btn black-btn w-100 d-block tool-ico"
                          >
                            Unstake Claim
                          </button>
                          {parseInt(validatorInfoContract?.deactivationEpoch) >= 0 ?
                            (

                              <div className="tool-desc">
                                {/*@ts-ignore*/}
                                {valInfo.valInfo.signer == account ? "Switch to your staker account" : "You need to unstake first."}
                              </div>
                            ) : (
                              <div className="tool-desc">
                                {/*@ts-ignore*/}
                                {valInfo.valInfo.signer == account ? "Switch to your staker account" : "Claim your self stake"}</div>
                            )}

                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="cus-tooltip d-inline-block ps-0">
                          <Link href="/profile-update" passHref>
                            <button className="ff-mos btn black-btn w-100 d-block tool-ico">
                              Update Profile
                            </button>
                          </Link>
                          <div className="tool-desc">Update Profile</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="del-grid-section bottom-pad ffms-inherit top-pad">
              <div className="container">
                <div className="row">
                  {delegationsList.length > 0 ? (
                    delegationsList.map((item: any, index: any) => (
                      getStake(item.id) >= 1 &&
                      (<div
                        className="col-lg-4 col-md-6 col-12 bs-col"
                        key={item.id}
                      >
                        <div className="border-sec">
                          <div className="top-sec">
                            <div className="info-block">
                              <div className="image-blk">
                                <div>
                                  <img
                                    className="img-fluid"
                                    src={
                                      item.image
                                        ? item.image
                                        : "../../assets/images/Shib-Logo.png"
                                    }
                                    onError={imageOnErrorHandler}
                                    width="69"
                                    height="70"
                                    alt="coin-icon"
                                  />
                                </div>
                              </div>
                              <div className="grid-info text-start">
                                <div className="fw-bold">{item.name}</div>
                                <div className="info-row">
                                  <span>
                                    <span className="fw-bold">
                                      {addDecimalValue(
                                        parseInt(item.checkpointSignedPercent)
                                      )}
                                      %
                                    </span>{" "}
                                    Checkpoints Signed
                                  </span>
                                </div>
                                <div className="info-row">
                                  <span>
                                    <span className="fw-bold">
                                      {addDecimalValue(+item.commission)}%
                                    </span>{" "}
                                    Commission
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-auto mid-sec bs-card">
                            <div className="block-container">
                              <div className="cus-width">
                                <div className="text-center">
                                  <div>Your Stake</div>
                                  <div className="fw-bold">
                                    {getStake(item.id)}
                                  </div>
                                </div>
                              </div>
                              <div className="cus-width">
                                <div className="text-center">
                                  <div>Reward</div>
                                  <div className="fw-bold orange-color">
                                    {+item.reward > 0
                                      ? (
                                        parseInt(item.reward) /
                                        10 ** web3Decimals
                                      ).toFixed(tokenDecimal)
                                      : "0.00"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <ul className="btn-grp mg-grid">
                              <li className="btn-grp-lst">
                                <div className="cus-tooltip d-inline-block">
                                  <button
                                    disabled={
                                      parseInt(item.commission) == comissionVal ||
                                      item.checkpointSignedPercent <
                                      checkpointVal ||
                                      parseInt(item.reward) / 10 ** web3Decimals <
                                      1 ||
                                      item.deactivationepoch === "true"
                                    }
                                    onClick={() =>
                                      handleModal("Restake", item.contractAddress)
                                    }
                                    className="btn grey-btn btn-small tool-ico"
                                  >
                                    Restake
                                  </button>
                                  <div className="tool-desc">
                                    {parseInt(item.commission) == comissionVal ||
                                      item.checkpointSignedPercent <
                                      checkpointVal ||
                                      parseInt(item.reward) / 10 ** web3Decimals <
                                      1 ? "Restaking is disabled." : "Restake your total rewards"}

                                  </div>
                                </div>
                              </li>
                              <li className="btn-grp-lst">
                                <div className="cus-tooltip d-inline-block">
                                  <button
                                    disabled={
                                      parseInt(item.reward) / 10 ** web3Decimals <
                                      1
                                    }
                                    onClick={() =>
                                      withdrawRewardDelegator(
                                        item.contractAddress,
                                        item.id
                                      )
                                    }
                                    className="btn black-btn btn-small tool-ico"
                                  >
                                    Withdraw Rewards
                                  </button>
                                  <div className="tool-desc">
                                    {parseInt(item.reward) / 10 ** web3Decimals <
                                      1 ? "Withdrawal is disabled." : "withdraw you total reward"}

                                  </div>
                                </div>
                              </li>

                              <li className="btn-grp-lst">
                                <div className="cus-tooltip d-inline-block">
                                  <button
                                    disabled={parseInt(getStake(item.id)) < 1}
                                    onClick={() => {
                                      handleModal(
                                        "Unbound",
                                        item.validatorAddress,
                                        item.contractAddress,
                                        item.image,
                                        item.id,
                                        parseInt(getStake(item.id))
                                      )
                                    }
                                    }
                                    className="btn black-btn btn-small tool-ico"
                                  >
                                    Unbound
                                  </button>
                                  <div className="tool-desc">
                                    unbound and withdraw rewards
                                  </div>
                                </div>
                              </li>

                              <li className="btn-grp-lst">
                                <div className="cus-tooltip d-inline-block">
                                  <button
                                    onClick={() => {
                                      handleMigrateClick(item);
                                    }}
                                    className="btn black-btn btn-small tool-ico"
                                  >
                                    Migrate Stake
                                  </button>
                                  <div className="tool-desc">
                                    migrate your stake
                                  </div>
                                </div>
                              </li>

                              <li className="btn-grp-lst">
                                <div className="cus-tooltip d-inline-block">
                                  <button
                                    onClick={() => {
                                      setSelectedRow({
                                        owner: item.contractAddress,
                                        contractAddress: item.contractAddress,
                                        commissionrate: item.commission,
                                        name: item.name,
                                        uptimePercent:
                                          item.checkpointSignedPercent,
                                        validatorContractId: item.id,
                                        image: item.image
                                      });
                                      setStakeMoreModal(true);
                                    }}
                                    className="btn black-btn btn-small tool-ico"
                                  >
                                    Stake More
                                  </button>
                                  <div className="tool-desc">stake more</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>)
                    ))
                  ) : !loading && delegationsList.length === 0 && (
                    <div className="txt-emp">
                      <div className="no-fount-txt">
                        <img className="mb-3 d-inline-block" src="../../assets/images/no-record.png" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        }
      </div >
    </>
  );
};

export default ValidatorAccount;