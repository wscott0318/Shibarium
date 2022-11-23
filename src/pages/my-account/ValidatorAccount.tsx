import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import CommonModal from "../components/CommonModel";
import { useActiveWeb3React } from "../../services/web3";
import { getDelegatorData, getUserType } from "../../services/apis/user/userApi"
import LoadingSpinner from 'pages/components/Loading';
import NumberFormat from 'react-number-format';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import Web3 from 'web3';
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import { useAppDispatch } from "../../state/hooks"
import fromExponential from 'from-exponential';
import { addDecimalValue, currentGasPrice, getAllowanceAmount, web3Decimals } from 'web3/commonFunctions';
import ERC20 from "../../ABI/ERC20Abi.json";
import { getExplorerLink } from 'app/functions';
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import DelegatePopup from 'pages/delegate-popup';
import { queryProvider } from 'Apollo/client';
import { StakeAmount } from 'Apollo/queries';
import { dynamicChaining } from 'web3/DynamicChaining';
import { getValidatorsDetail } from 'app/services/apis/validator';
import { tokenDecimal } from 'web3/commonFunctions';




const validatorAccount = ({ userType, boneUSDValue, availBalance }: { userType: any, boneUSDValue: any, availBalance: any }) => {
  const router = useRouter();
  const [showunboundpop, setunboundpop] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [unboundInput, setUnboundInput] = useState<any>('');
  const [validatorInfo, setValidatorInfo] = useState<any>();
  const [validatorTotalReward, setValidatorTotalReward] = useState<any>();
  const [validatorInfoContract, setValidatorInfoContract] = useState<any>();
  const [transactionState, setTransactionState] = useState({
    state: false,
    title: '',
  })
  const [hashLink, setHashLink] = useState('')
  const [validatorID, setValidatorID] = useState<any>('')

  const { account, chainId = 1, library } = useActiveWeb3React();
  const lib: any = library
  const web3: any = new Web3(lib?.provider)
  const [delegationsList, setDelegationsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [stakeMore, setStakeMoreModal] = useState(false);
  const [stakeAmounts, setStakeAmounts] = useState<any>([])
  const [restakeModal, setRestakeModal] = useState({
    value1: false,
    value2: false,
    address: ''
  });
  const [commiModal, setCommiModal] = useState({
    value: false,
    address: ''
  });
  const [withdrawModal, setWithdrawModal] = useState({
    value: false,
    address: ''
  });
  const [unboundModal, setUnboundModal] = useState({
    startValue: false,
    address: '',
    id: '',
    stakeAmount: 0
  });

  // console.log(chainId)


  const getValidatorData = async (valId :any) => {
      let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
      const valFromContract =  await instance.methods.validators(+valId).call({from : account})
      const valReward = await instance.methods.validatorReward(+valId).call({from : account})
      const dynasty = await instance.methods.dynasty().call({from : account})
      const validatorStake = await instance.methods.validatorStake(valId).call({from : account})
      const reward = addDecimalValue(valReward / Math.pow(10, web3Decimals))
      setValidatorInfoContract(valFromContract)
      setValidatorTotalReward(reward)
      console.log(valFromContract, reward,  "dynasty ===> ")
  }

  const validatorInfoAPI = () => {
    getValidatorsDetail(`${account}`)
    .then((res) => {
      setValidatorInfo(res?.data?.data?.validatorSet.validatorInfo);
    })
    .catch((error: any) => {
      console.log("error", error);
    });
  }

  const getDelegatorCardData = async (accountAddress: any) => {
    // console.log(" card data ", accountAddress)
    setLoading(true)
    try {
      getDelegatorData(accountAddress.toLowerCase()).then((res: any) => {
        if (res.data) {
          let newArray :any = []
          // console.log(res.data, "delegator card data")
          let sortedData = res.data.data.validators.filter((x:any) => parseInt(x.stake) > 0).sort((a: any, b: any) => parseInt(b.stake) - parseInt(a.stake))
          // here 
            sortedData.forEach(async (x:any) => {
              let stakeData = await getStakeAmountDelegator(+(x.id), (accountAddress.toLowerCase()))
              console.log(stakeData, "delegator card data")
              setStakeAmounts((pre :any) => ([...pre, stakeData]))
            })
          setDelegationsList(sortedData)
          setLoading(false)
          // console.log(newArray)
        }
      }).catch((e: any) => {
        console.log(e);
        //  setUserType('NA')
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // console.log(stakeAmounts)

  const handleModal = (btn: String, valAddress: any, id: any = null, stakeAmount: any = null) => {
    console.log({ btn, valAddress, id, stakeAmount })
    switch (btn) {
      case "Restake":
        if (userType === 'Validator') {
          setRestakeModal({
            value1: true,
            value2: false,
            address: valAddress
          });
        } else {
          setRestakeModal({
            value2: true,
            value1: false,
            address: valAddress
          });
        }
        break;
      case "Change Commission Rate":
        setCommiModal({
          value: true,
          address: valAddress
        });
        break;
      case "Withdraw Rewards":
        setWithdrawModal({
          value: true,
          address: valAddress
        });
        break;
      case "Unbound":
        setUnboundModal((preVal: any) => ({ ...preVal, stakeAmount: stakeAmount, startValue: true, address: valAddress, id: id }));
        break;
      default:
        break;
    }
  };


  // console.log(unboundModal)

  useEffect(() => {
    if (account && userType === "Delegator") {
      getDelegatorCardData(account)
    }
    if(account && userType === 'Validator') {
      if(validatorID) {
        getValidatorData(validatorID)
      }
      validatorInfoAPI()
      getVaiIDFromDB()
    }
  }, [account, userType, chainId, validatorID])

  // console.log(restakeModal)

  const restakeValidation: any = Yup.object({
    amount: Yup.number().min(0).max(availBalance).required("amount is required"),
    reward: Yup.number().required(),

  })
  const comissionValidation: any = Yup.object({
    comission: Yup.number().min(0).max(100).required("comission is required"),
  })

  // GET VALIDATOR ID 
  const getValidatorId = async () => {
    let user = account;

    if (account) {
      console.log(user, "account address ")
      const instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
      const ID = await instance.methods.getValidatorId(user).call({ from: account }) // read
      console.log(ID)
      return ID
    } else {
      console.log("account addres not found")
    }
  }

  const getVaiIDFromDB = async () =>{
    let accountAddress  : any= account;
    try {
      await getUserType(accountAddress.toLowerCase()).then((res : any) => {
        if (res.data && res.data.data) {
          let ut = res.data.data.validatorId;
          console.log(ut, "val id ")
          // setUserType(ut)
          setValidatorID(+ut)
        }
      }).catch((e:any) => {
        console.log(e);
        // setUserType('NA')
      })
    } catch (error) {

    }
  }

  //  COMMISSION CONTRACT 
  const callComission = async (value: any) => {
    setTransactionState({ state: true, title: 'Pending' })
    let user: any = account
    let valID = validatorID
    console.log({valID, c:  +value.comission},"comission called ==> ")
    let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);      
    let gasFee =  await instance.methods.updateCommissionRate(valID, +value.comission).estimateGas({from: user})
    let encodedAbi =  await instance.methods.updateCommissionRate(valID, +value.comission).encodeABI()
    let CurrentgasPrice : any = await currentGasPrice(web3)
       console.log(((parseInt(gasFee) + 30000) * CurrentgasPrice) / Math.pow(10 , web3Decimals), " Gas fees for transaction  ==> ")
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
        let link = getExplorerLink(chainId, res, 'transaction')
        setCommiModal({ value: false, address: '' })
        setHashLink(link)
        setTransactionState({ state: true, title: 'Submitted' })
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
        setTransactionState({state: false, title :''})
        if (res.code === 4001) {
          setCommiModal({ value: false, address: '' })
        }
      })

  }

  // RESTAKE AS VALIDATORS
  const callRestakeValidators = async (values: any) => {
    if (account) {
      setTransactionState({ state: true, title: 'Pending' })
      let walletAddress: any = account
      let ID = validatorID
      let allowance = await getAllowanceAmount(library, dynamicChaining[chainId].BONE, account, dynamicChaining[chainId].STAKE_MANAGER_PROXY) || 0
      let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);

      const amountWei = web3.utils.toBN(fromExponential((+values.amount * Math.pow(10, 18))));
      if (+values.amount > +allowance) {
        console.log("need approval")
        approveAmount(ID, amountWei, values.reward == 0 ? false : true)
      } else {
        console.log(ID, "no approval needed")
        console.log({ID, amountWei, bool: values.reward})
        let gasFee =  await instance.methods.restake(ID, amountWei, values.reward == 0 ? 0 : 1).estimateGas({from: walletAddress})
        let encodedAbi =  await instance.methods.restake(ID, amountWei, values.reward == 0 ? 0 : 1).encodeABI()
        let CurrentgasPrice : any = await currentGasPrice(web3)
           console.log(((parseInt(gasFee) + 30000) * CurrentgasPrice) / Math.pow(10 , web3Decimals), " Gas fees for transaction  ==> ")
           await web3.eth.sendTransaction({
             from: walletAddress,
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
                from: walletAddress,
                chainId,
                summary: `${res}`,
              })
            )
            // getActiveTransaction
            let link = getExplorerLink(chainId, res, 'transaction')
            setTransactionState({ state: true, title: 'Submitted' })
            setHashLink(link)
            setRestakeModal({ value1: false, value2: false, address: '' })
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
            setHashLink('')
            setTransactionState({ state: false, title: '' })
          }).on('error', (res: any) => {
            console.log(res, "error")
            setTransactionState({ state: false, title: '' })
            if (res.code === 4001) {
              setRestakeModal({ value1: false, value2: false, address: '' })
            }
          })

      }
    } else {
      console.log("account addres not found")
    }
  }

  // Approve BONE
  const approveAmount = async (id: any, amounts: any, reward: boolean) => {
    if (account) {
      let user = account;
      let amount = web3.utils.toBN(fromExponential(1000 * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ERC20, dynamicChaining[chainId].BONE);
      instance.methods.approve(dynamicChaining[chainId].STAKE_MANAGER_PROXY, amount).send({ from: user })
        .then(async (res: any) => {
          let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
          let gasFee =  await instance.methods.restake(id, amounts, reward).estimateGas({from: user})
        let encodedAbi =  await instance.methods.restake(id, amounts, reward).encodeABI()
        let CurrentgasPrice : any = await currentGasPrice(web3)
           console.log(((parseInt(gasFee) + 30000) * CurrentgasPrice) / Math.pow(10 , web3Decimals), " Gas fees for transaction  ==> ")
           await web3.eth.sendTransaction({
             from: user,
             to: dynamicChaining[chainId].STAKE_MANAGER_PROXY,
             gas: (parseInt(gasFee) + 30000).toString(),
             gasPrice: CurrentgasPrice,
             // value : web3.utils.toHex(combinedFees),
             data: encodedAbi
           })

          instance.methods.restake(id, amounts, reward).send({ from: user })
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
                setCommiModal({ value: false, address: '' })
              }
            })
        }).catch((err: any) => {
          console.log(err)
          if (err.code === 4001) {
            console.log("User denied this transaction! ")
          }
        })
    }

  }

  // WITHDRAW REWARDS VALIDATORS 
  
  const withdrawRewardValidator = async () => {
    setTransactionState({ state: true, title: 'Pending' })
    if (account) {
      let walletAddress = account
      let valID = validatorID
      let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
      let gasFee =  await instance.methods.withdrawRewards(valID).estimateGas({from: walletAddress})
      let encodedAbi =  await instance.methods.withdrawRewards(valID).encodeABI()
      let CurrentgasPrice : any = await currentGasPrice(web3)
         console.log(((parseInt(gasFee) + 30000) * CurrentgasPrice) / Math.pow(10 , web3Decimals), " Gas fees for transaction  ==> ")
         await web3.eth.sendTransaction({
           from: walletAddress,
           to:  dynamicChaining[chainId].STAKE_MANAGER_PROXY,
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
              from: walletAddress,
              chainId,
              summary: `${res}`,
            })
          )
          let link = getExplorerLink(chainId, res, 'transaction')
          setWithdrawModal({ value: false, address: '' })
          setHashLink(link)
          setTransactionState({ state: true, title: 'Submitted' })
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
            setTransactionState({ state: false, title: 'Pending' })
          if (res.code === 4001) {
            setWithdrawModal({ value: false, address: '' })
          }
        })
    } else {
      console.log("account not connected")
    }
  }

  // UNBOUND VALIDATOR 
  const unboundValidator = async () => {
    if (account) {
      setTransactionState({ state: true, title: 'Pending' })
      let walletAddress: any = account
      let ID = validatorID
      let instance = new web3.eth.Contract(stakeManagerProxyABI, dynamicChaining[chainId].STAKE_MANAGER_PROXY);
      let gasFee =  await instance.methods.unstake(ID).estimateGas({from: walletAddress})
      let encodedAbi =  await instance.methods.unstake(ID).encodeABI()
      let CurrentgasPrice : any = await currentGasPrice(web3)
         console.log(((parseInt(gasFee) + 30000) * CurrentgasPrice) / Math.pow(10 , web3Decimals), " Gas fees for transaction  ==> ")
         await web3.eth.sendTransaction({
           from: walletAddress,
           to:  dynamicChaining[chainId].STAKE_MANAGER_PROXY,
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
              from: walletAddress,
              chainId,
              summary: `${res}`,
            })
          )
          // getActiveTransaction
          let link = getExplorerLink(chainId, res, 'transaction')
          setTransactionState({ state: true, title: 'Submitted' })
          setHashLink(link)
          setunboundpop(false)
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
          setTransactionState({ state: false, title: '' })
          setHashLink('')
        }).on('error', (res: any) => {
          console.log(res, "error")
          setTransactionState({ state: false, title: '' })
          if (res.code === 4001) {
            setunboundpop(false)
          }
        })
    } else {
      console.log("account addres not found")
    }
  }

  // restake DELEGATOR 
  const restakeDelegator = async () => {
    console.log("withdraw Reward Delegator called")
    if (account) {
      setTransactionState({ state: true, title: 'Pending' })
      let walletAddress: any = account
      let instance = new web3.eth.Contract(ValidatorShareABI, restakeModal.address);
      let gasFee =  await instance.methods.restake().estimateGas({from: walletAddress})
      let encodedAbi =  await instance.methods.restake().encodeABI()
      let CurrentgasPrice : any = await currentGasPrice(web3)
         console.log(((parseInt(gasFee) + 30000) * CurrentgasPrice) / Math.pow(10 , web3Decimals), " Gas fees for transaction  ==> ")
         await web3.eth.sendTransaction({
           from: walletAddress,
           to:  restakeModal.address,
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
              from: walletAddress,
              chainId,
              summary: `${res}`,
            })
          )
          // getActiveTransaction
          let link = getExplorerLink(chainId, res, 'transaction')
          setTransactionState({ state: true, title: 'Submitted' })
          setHashLink(link)
          setRestakeModal({ value1: false, value2: false, address: '' })

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
          getDelegatorCardData(walletAddress)
        }).on('error', (res: any) => {
          console.log(res, "error")
          setRestakeModal({ value1: false, value2: false, address: '' })
          if (res.code === 4001) {
            setRestakeModal({ value1: false, value2: false, address: '' })
          }
        })
    } else {
      console.log("account addres not found")
    }
  }

  // unbound DELEGATOR 
  const unboundDelegator = async () => {
    console.log(unboundModal)
    setUnboundModal({
      ...unboundModal, startValue: false
    })
    setUnboundModal((preVal: any) => ({ ...preVal, startValue: false }))
    setTransactionState({ state: true, title: 'Unbound Pending' })
    console.log("called ===>")
    let data = {
      delegatorAddress: account,
      validatorId: unboundModal.id,
      amount: unboundInput
    }
    console.log(data.validatorId)
    if (account) {

      let walletAddress = account
      let amount = web3.utils.toBN(fromExponential(+unboundInput * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ValidatorShareABI, data.validatorId);
      await instance.methods.sellVoucher_new(amount, amount).send({ from: walletAddress })
        .on('transactionHash', (res: any) => {
          console.log(res, "hash")
          dispatch(
            addTransaction({
              hash: res,
              from: walletAddress,
              chainId,
              summary: `${res}`,
            })
          )
          // getActiveTransaction
          let link = getExplorerLink(chainId, res, 'transaction')
          setTransactionState({ state: true, title: 'Transaction Submitted' })
          setHashLink(link)
          setUnboundModal({
            startValue: false,
            address: '',
            id: '',
            stakeAmount: 0
          })
          setUnboundInput('')
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
          getDelegatorCardData(walletAddress)
        }).on('error', (res: any) => {
          console.log(res, "error")
          setUnboundInput('')
          setUnboundModal((preVal: any) => ({ ...preVal, progressValue: false, comfirmValue: true }))
          if (res.code === 4001) {
            console.log("user Denied")
          }
        })
    }
  }

  const getStakeAmountDelegator = async (id: any, account:any) => {
      const validators = await queryProvider.query({
        query: StakeAmount(id, account),
      })
      return validators.data.delegator
  }

  const getStake = (id : String) => {
    let item = stakeAmounts.length ? stakeAmounts.filter((x:any) => x.validatorId === id)[0]?.tokens : 0
    return item > 0 ? (parseInt(item) / 10 ** 18).toFixed(tokenDecimal) : "0.00"
  } 





  const rewardBalance = validatorInfo?.totalRewards ? (
    (Number(fromExponential(validatorInfo?.totalRewards)) -
      Number(fromExponential(validatorInfo?.claimedReward))) /
    Math.pow(10, 18)
  ).toFixed(tokenDecimal) : "0.00"  

  return (
    <>
      {loading && <LoadingSpinner />}
      <DelegatePopup
        data={selectedRow}
        showdelegatepop={stakeMore}
        setdelegatepop={() => setStakeMoreModal(false)}
      />
      <div className="main-content dark-bg-800 full-vh  cmn-input-bg">


        {/* retake popop start VALIDATOR*/}
        <CommonModal
          title={"Restake"}
          show={restakeModal.value1}
          setshow={() =>
            setRestakeModal({ value1: false, value2: false, address: "" })
          }
          externalCls="stak-pop"
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
                  console.log(values);
                  callRestakeValidators(values);
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
                  <>
                    <div className="cmn_inpt_row">
                     
                    </div>
                    <div className="cmn_inpt_row">
                      <div className="form-control">
                        <label className="mb-2 mb-md-2 text-white">
                          Enter amount
                        </label>
                        <input
                          type="text"
                          placeholder="Amount"
                          className="w-100"
                          value={values.amount}
                          onChange={handleChange("amount")}
                        />
                        {touched.amount && errors.amount ? (
                          <p className="primary-text pt-1 pl-2">
                            {errors.amount}
                          </p>
                        ) : null}
                       <p className="mt-2 text-white"> balance : <b>{addDecimalValue(availBalance)} </b></p>
                      </div>
                    </div>
                    <div className="cmn_inpt_row">
                      <div className="form-control">
                        <label className="mb-2 mb-md-2 text-white">
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
        {/* retake popop ends */}

        {/* commission popop start */}
        <CommonModal
          title={"Commission"}
          show={commiModal.value}
          setshow={() => setCommiModal({ value: false, address: "" })}
          externalCls="stak-pop"
        >
          <>
            <Formik
              initialValues={{
                address: "",
                comission: "",
              }}
              validationSchema={comissionValidation}
              onSubmit={(values, actions) => {
                console.log(values);
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
                    
                  </div>
                  <div className="cmn_inpt_row">
                    <div className="form-control">
                      <label className="mb-2 mb-md-2 text-white">
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
                        <p className="primary-text pt-1 pl-2">
                          {errors.comission}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="pop_btns_area">
                    <div className="form-control">
                      <button
                        className="btn primary-btn w-100"
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
          setshow={() => setWithdrawModal({ value: false, address: "" })}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">
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

        {/* withdraw popop start */}
        <CommonModal
          title={"Restake"}
          show={restakeModal.value2}
          setshow={() =>
            setRestakeModal({ value1: false, value2: false, address: "" })
          }
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">
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
          title={"Unbound"}
          show={showunboundpop}
          setshow={setunboundpop}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <form>
                <div className="only_text">
                  <p className="text-center">
                    Are you sure you want to unbound?
                  </p>
                </div>
                <div className="pop_btns_area row mr-top-50 form-control">
                  <div className="col-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setunboundpop(false);
                      }}
                      className="btn blue-btn w-100 dark-bg-800 text-white"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        unboundValidator();
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

        {/* unbound popop DELEGATOR start */}
        <CommonModal
          title={"Unbound"}
          show={unboundModal.startValue}
          setshow={() =>
            setUnboundModal({ ...unboundModal, startValue: false })
          }
          externalCls="stak-pop"
        >
          <>
            {unboundModal.startValue && (
              <div className=".cmn_modal del-tab-content">
                <div className="center-align mb-4">
                  <h4>Are you sure you want to unbound?</h4>
                </div>
                <div className="dark-bg-800 p-2 p-sm-3">
                  {/* old input */}
                  <div className="form-group float-group">
                    <div className="d-flex justify-content-between flex-wrap">
                      <h6 className="mb-1 fs-14">Withdraw Stake</h6>
                      <h6 className="mb-1 fs-14">
                        {unboundModal.stakeAmount} Bone
                      </h6>
                    </div>
                    <div className="cmn_inpt_row max-input">
                      <div className="max-input">
                        <input
                          value={unboundInput}
                          onChange={(e) => setUnboundInput(e.target.value)}
                          type="number"
                          className="w-100 dark-bg form-control"
                          placeholder="Enter amount"
                        />
                        <span
                          className="primary-text over-text fw-600"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setUnboundInput(unboundModal.stakeAmount)
                          }
                        >
                          MAX
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="mb-0">
                      Your Funds will be locked for{" "}
                      <p className="dark-text primary-text">checkpoints</p>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => unboundDelegator()}
                  disabled={unboundInput ? false : true}
                  type="button"
                  className="btn primary-btn mt-3 mt-sm-4 w-100"
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
          show={transactionState.state}
          setshow={() =>
            setTransactionState({ state: false, title: "Pending" })
          }
          externalCls="faucet-pop"
        >
          <div className="popmodal-body tokn-popup no-ht trans-mod">
            <div className="pop-block">
              <div className="pop-top">
                <div className="dark-bg-800 h-100 status-sec">
                  <span>
                    <div>
                      <img
                        width="224"
                        height="224"
                        className="img-fluid"
                        src="../../assets/images/Ellipse.png"
                        alt=""
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="pop-bottom">
                {/* <p className='elip-text mt-3'>{transactionState.hash}</p> */}
                <div className="staus-btn">
                  <button
                    type="button"
                    className="btn primary-btn w-100"
                    disabled={hashLink ? false : true}
                    onClick={() => window.open(hashLink)}
                  >
                    View on Block Explorer
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Transaction Pending popup version 2 end*/}
        </CommonModal>
        {/* pending & submit modal end */}

        {userType === "Validator" ? (
          <section className="mid_cnt_area acct">
            <div className="container">
              <div className="col-xl-12 col-lg-12 side-auto">
                <div className="val_del_outr">
                    <div className="row ff-mos">
                      <div className="col-md-6 col-xl-4 col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>{addDecimalValue(availBalance)}</span> BONE
                            </div>
                            <div className="mid-head">
                              <span><NumberFormat
                                thousandSeparator
                                displayType={"text"}
                                prefix="$ "
                                value={addDecimalValue((availBalance || 0) * boneUSDValue)}
                              /></span>
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
                            {validatorInfoContract?.commissionRate ? validatorInfoContract?.commissionRate : 0} %
                            </div>
                            <div className="mid-head">
                              {/* <span>some info here...</span> */}
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">Commission Percentage</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-4 col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                            {rewardBalance} BONE
                            </div>
                            <div className="mid-head">
                              <span>
                              <NumberFormat
                                thousandSeparator
                                displayType={"text"}
                                prefix="$ "
                                value={addDecimalValue(+rewardBalance * boneUSDValue)}
                              />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">Withdrawal reward balance</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-4 mob-margin col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>{validatorTotalReward} </span> BONE
                            </div>
                            <div className="mid-head">
                              <span>
                              <NumberFormat
                                thousandSeparator
                                displayType={"text"}
                                prefix="$ "
                                value={(+(parseInt(validatorInfo?.totalRewards) / Math.pow(10, 18)).toFixed(tokenDecimal) * boneUSDValue).toFixed(tokenDecimal)}
                              />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">Total Rewards</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-4 mob-margin col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>{+validatorInfoContract?.amount / 10 ** web3Decimals}</span> BONE
                            </div>
                            <div className="mid-head">
                              <span><NumberFormat
                                thousandSeparator
                                displayType={"text"}
                                prefix="$ "
                                value={(+validatorInfoContract?.amount / 10 ** web3Decimals * boneUSDValue).toFixed(tokenDecimal)}
                              /></span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">Self Stake</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-4 mob-margin col-custum text-center">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>{addDecimalValue(+validatorInfoContract?.delegatedAmount / Math.pow(10, web3Decimals))}</span> BONE
                            </div>
                            <div className="mid-head">
                              <span>
                              <NumberFormat
                                thousandSeparator
                                displayType={"text"}
                                prefix="$ "
                                value={(addDecimalValue(+validatorInfoContract?.delegatedAmount / Math.pow(10, web3Decimals)) * boneUSDValue).toFixed(tokenDecimal)}
                              />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">Total Delegators Reward</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 col-xl-4 mob-margin col-custum">
                        <div className="cus-box">
                          <div className="head-sec">
                            <div className="top-head">
                              <span>{addDecimalValue(+validatorInfoContract?.delegatorsReward / Math.pow(10, web3Decimals))}</span> BONE
                            </div>
                            <div className="mid-head">
                              <span>
                              <NumberFormat
                                thousandSeparator
                                displayType={"text"}
                                prefix="$ "
                                value={(addDecimalValue(+validatorInfoContract?.delegatorsReward / Math.pow(10, web3Decimals)) * boneUSDValue).toFixed(tokenDecimal)}
                              />
                              </span>
                            </div>
                          </div>

                          <div className="botom-sec">
                            <div className="botom-headsec">
                              <span className="ff-mos">Total Delegators Reward</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      
                    </div>
                  
                  {/* grid sec end */}
                  <div className="btns_sec val_all_bts row mt-3 actions-btn">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                      <div className='cus-tooltip d-inline-block ps-0'>
                        <button
                          onClick={() =>
                            handleModal(
                              "Restake",
                              account
                            )
                          }
                          className="ff-mos btn black-btn w-100 d-block tool-ico"
                        >
                          Restake
                        </button>
                        <div className="tool-desc">
                          Restake
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                    <div className='cus-tooltip d-inline-block ps-0'>
                      <button
                        onClick={() =>
                          handleModal(
                            "Change Commission Rate",
                            account
                          )
                        }
                        className="ff-mos btn black-btn w-100 d-block tool-ico"
                      >
                        Change Commission Rate
                      </button>
                      <div className="tool-desc">
                      Change your commission rate 
                      </div>
                      </div>
                    </div>
                    <div className="col-xl-3  col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                    <div className='cus-tooltip d-inline-block ps-0'>
                      <button
                        onClick={() =>
                          withdrawRewardValidator()
                        }
                        disabled={validatorTotalReward > 0 ? false : true}
                        className="ff-mos btn black-btn w-100 d-block tool-ico"
                      >
                        Withdraw Rewards
                      </button>
                      <div className="tool-desc">
                      Withdraw rewards
                      </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className='cus-tooltip d-inline-block ps-0'>
                      <button
                        onClick={() => setunboundpop(true)}
                        className="ff-mos btn black-btn w-100 d-block tool-ico"
                      >
                        Unbound
                      </button>
                      <div className="tool-desc">
                        unbound
                      </div>
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
                {delegationsList.length ? (
                  delegationsList.map((item: any, index: any) => (
                    <div
                      className="col-lg-4 col-md-6 col-12 bs-col"
                      key={index}
                    >
                      <div className="border-sec">
                        <div className="top-sec">
                          <div className="info-block">
                            <div className="image-blk">
                              <div>
                                <img
                                  className="img-fluid"
                                  src={
                                    item.logoUrl
                                      ? item.logoUrl
                                      : "../../assets/images/Shib-Logo.png"
                                  }
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
                                    {addDecimalValue(parseInt(
                                      item.checkpointSignedPercent
                                    ))}
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
                        <div className="mid-sec bs-card h-auto">
                          <div className="block-container">
                            <div className="cus-width">
                              <div className="text-center">
                                <div>Your Stake</div>
                                <div className="fw-bold">
                                  {/* {getStake(item.id)} */}
                                  {item.stake / Math.pow(10, web3Decimals)}
                                </div>
                                {/* <div className="fw-bold">{stakeAmounts?.filter((x:any) => x.validatorId === item.id)[0]?.tokens}</div> */}
                                {/* {/ <div>$0</div> /} */}
                              </div>
                            </div>
                            <div className="cus-width">
                              <div className="text-center">
                                <div>Reward</div>
                                <div className="fw-bold orange-color">
                                  {item.reward > 0
                                    ? (
                                        parseInt(item.reward) /
                                        10 ** 18
                                      ).toFixed(tokenDecimal)
                                    : "0.00"}
                                </div>
                                {/* {/ <div>$0</div> /} */}
                              </div>
                            </div>
                          </div>

                          <ul className="btn-grp">
                            <li className="btn-grp-lst">
                              <div className='cus-tooltip d-inline-block'>
                                <button
                                  disabled={
                                    parseInt(item.commission) == 0 || item.checkpointSignedPercent < 85 ||
                                    parseInt(item.reward) / 10 ** 18 < 1
                                  }
                                  onClick={() =>
                                    handleModal("Restake", item.contractAddress)
                                  }
                                  className="btn grey-btn btn-small tool-ico"
                                >
                                  Restake
                                </button>
                                <div className="tool-desc">
                                  Restake you total rewards
                                </div>
                              </div>
                            </li>
                            <li className="btn-grp-lst">
                            <div className='cus-tooltip d-inline-block'>
                              <button
                                disabled={parseInt(item.reward) / 10 ** 18 < 1}
                                onClick={() =>
                                  handleModal(
                                    "Withdraw Rewards",
                                    item.contractAddress
                                  )
                                }
                                className="btn black-btn btn-small tool-ico"
                              >
                                Withdraw Rewards
                              </button>
                                <div className="tool-desc">
                                  withdraw you total reward
                                </div>
                              </div>
                            </li>

                            <li className="btn-grp-lst">
                            <div className='cus-tooltip d-inline-block'>
                              <button
                                disabled={parseInt(item.stake) / 10 ** 18 < 1}
                                onClick={() =>
                                  handleModal(
                                    "Unbound",
                                    item.validatorAddress,
                                    item.contractAddress,
                                    (parseInt(item.stake) / 10 ** 18).toFixed(tokenDecimal)
                                  )
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
                            <div className='cus-tooltip d-inline-block'>
                              <button
                                disabled={parseInt(item.commission) == 0 || item.checkpointSignedPercent < 85}
                                onClick={() => {
                                  setSelectedRow({
                                    owner: item.contractAddress,
                                    contractAddress: item.contractAddress,
                                    commissionPercent: item.commission,
                                    name: item.name,
                                  });
                                  setStakeMoreModal(true);
                                }}
                                className="btn black-btn btn-small tool-ico"
                              >
                                Stake More
                              </button>
                                <div className="tool-desc">
                                  stake more
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                ) : !loading && !delegationsList.length ? (
                  <div className="txt-emp">
                    <div className="no-fount-txt">No Record Found</div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default validatorAccount