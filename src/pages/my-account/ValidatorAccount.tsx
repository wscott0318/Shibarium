import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import CommonModal from "../components/CommonModel";
import { useActiveWeb3React } from "../../services/web3";
import { getDelegatorData } from "../../services/apis/user/userApi"
import Link from "next/link";
import LoadingSpinner from 'pages/components/Loading';
import NumberFormat from 'react-number-format';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import proxyManagerABI from "../../ABI/StakeManagerProxy.json";
import { BONE, PROXY_MANAGER } from "../../web3/contractAddresses";
import Web3 from 'web3';
import { addTransaction, finalizeTransaction } from 'app/state/transactions/actions';
import { useAppDispatch } from "../../state/hooks"
import fromExponential from 'from-exponential';
import { getAllowanceAmount } from 'web3/commonFunctions';
import ERC20 from "../../ABI/ERC20Abi.json";
import { getExplorerLink } from 'app/functions';
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";
import DelegatePopup from 'pages/delegate-popup';
import { queryProvider } from 'Apollo/client';
import { StakeAmount } from 'Apollo/queries';




const validatorAccount = ({ userType, boneUSDValue, availBalance }: { userType: any, boneUSDValue: any, availBalance: any }) => {
  const router = useRouter();
  const [showunboundpop, setunboundpop] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [unboundInput, setUnboundInput] = useState<any>('');

  const [transactionState, setTransactionState] = useState({
    state: false,
    title: '',
  })
  const [hashLink, setHashLink] = useState('')

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

  const getDelegatorCardData = async (accountAddress: any) => {
    console.log(" card data ", accountAddress)
    setLoading(true)
    try {
      getDelegatorData(accountAddress.toLowerCase()).then((res: any) => {
        if (res.data) {
          let newArray :any = []
          // console.log(res.data, "delegator card data")
          let sortedData = res.data.data.validators.sort((a: any, b: any) => parseInt(b.stake) - parseInt(a.stake))
            sortedData.forEach(async (x:any) => {
              let stakeData = await getStakeAmountDelegator(+(x.id), JSON.stringify(accountAddress.toLowerCase()))
              // console.log(stakeData, "delegator card data")
              // setStakeAmounts([...stakeAmounts, stakeData])
            })
          setDelegationsList(sortedData)
          setLoading(false)
          console.log(newArray)
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

  console.log(stakeAmounts)

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


  console.log(unboundModal)

  useEffect(() => {
    if (account && userType === "Delegator") {
      getDelegatorCardData(account)
    }
  }, [account, userType])

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
      const instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
      const ID = await instance.methods.getValidatorId(user).call({ from: account });
      console.log(ID)
      return ID
    } else {
      console.log("account addres not found")
    }
  }

  //  COMMISSION CONTRACT 
  const callComission = async (value: any) => {
    setTransactionState({ state: true, title: 'Pending' })
    let user: any = account
    console.log("comission called ==> ")
    let validatorID = await getValidatorId()
    let instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
    instance.methods.updateCommissionRate(validatorID, +value.comission).send({ from: account })
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
      let ID = await getValidatorId()
      let allowance = await getAllowanceAmount(library, BONE, account, PROXY_MANAGER) || 0
      let instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
      const amountWei = web3.utils.toBN(fromExponential((+values.amount * Math.pow(10, 18))));
      if (+values.amount > +allowance) {
        console.log("need approval")
        approveAmount(ID, amountWei, values.reward == 0 ? false : true)
      } else {
        console.log("no approval needed")
        instance.methods.restake(ID, amountWei, values.reward == 0 ? false : true).send({ from: walletAddress })
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
          }).on('error', (res: any) => {
            console.log(res, "error")
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
  const approveAmount = (id: any, amount: any, reward: boolean) => {
    if (account) {
      let user = account;
      let amount = web3.utils.toBN(fromExponential(1000 * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ERC20, BONE);
      instance.methods.approve(PROXY_MANAGER, amount).send({ from: user })
        .then((res: any) => {
          let instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
          instance.methods.restake(id, amount, reward).send({ from: user })
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
      let instance = new web3.eth.Contract(ValidatorShareABI, withdrawModal.address);
      await instance.methods.withdrawRewards().send({ from: walletAddress })
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
      let ID = await getValidatorId()
      let instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
      instance.methods.unstake(ID).send({ from: walletAddress })
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
        }).on('error', (res: any) => {
          console.log(res, "error")
          if (res.code === 4001) {
            setunboundpop(false)
          }
        })
    } else {
      console.log("account addres not found")
    }
  }

  // restake DELEGATOR 
  const restakeDelegator = () => {
    console.log("withdraw Reward Delegator called")
    if (account) {
      setTransactionState({ state: true, title: 'Pending' })
      let walletAddress: any = account
      let instance = new web3.eth.Contract(ValidatorShareABI, restakeModal.address);
      instance.methods.restake().send({ from: walletAddress })
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
    setUnboundModal((preVal:any) => ({...preVal, startValue:false}))
    setTransactionState({ state: true, title: 'Unbound Pending' })
    console.log("called ===>")
    let data = {
      delegatorAddress: account,
      validatorId: unboundModal.id,
      amount: unboundInput
    }
    console.log(data.validatorId)
    if(account){
  
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
         setUnboundModal((preVal:any) => ({...preVal,progressValue: false, comfirmValue: true}))
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

  return (
    <>
      {loading && <LoadingSpinner />}
      <DelegatePopup
        data={selectedRow}
        showdelegatepop={stakeMore}
        setdelegatepop={() => setStakeMoreModal(false)}
      />
      <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg">
        {/* retake popop start */}
        <CommonModal
          title={"Restake"}
          show={restakeModal.value1}
          setShow={() => setRestakeModal({ value1: false, value2: false, address: '' })}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <Formik
                initialValues={{
                  amount: '',
                  address: '',
                  reward: 0
                }}
                validationSchema={restakeValidation}
                onSubmit={(values, actions) => {
                  console.log(values);
                  callRestakeValidators(values)
                }}
              >
                {
                  ({ errors, touched, handleChange, handleBlur, values, handleSubmit }) => (
                    <>
                      <div className="cmn_inpt_row">
                        <div className="form-control">
                          <label className="mb-2 mb-md-2 text-white">Enter validator address</label>
                          <input type="text"
                            placeholder="Validator address"
                            className="w-100"
                            value={restakeModal.address}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="cmn_inpt_row">
                        <div className="form-control">
                          <label className="mb-2 mb-md-2 text-white">Enter amount</label>
                          <input
                            type="text"
                            placeholder="Amount"
                            className="w-100"
                            value={values.amount}
                            onChange={handleChange("amount")}
                          />
                          {touched.amount && errors.amount ? <p className='primary-text pt-1 pl-2'>{errors.amount}</p> : null}
                        </div>
                      </div>
                      <div className="cmn_inpt_row">
                        <div className="form-control">
                          <label className="mb-2 mb-md-2 text-white">Enter Restake reward</label>
                          {/* <input type="text" placeholder="Stakereward" className="w-100" /> */}
                          <div className='black-sel'>
                            <select name="reward" id="reward" onChange={handleChange("reward")} className="cus-select">
                              <option selected={values.reward === 0} value={0}>No</option>
                              <option selected={values.reward === 1} value={1}>Yes</option>
                            </select>
                            <span className="arrow-down"></span>
                          </div>

                        </div>
                      </div>
                      <div className="pop_btns_area">
                        <div className="form-control">
                          <button className='btn primary-btn w-100'
                            onClick={() => handleSubmit()}
                          >Submit</button>
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
          setShow={() => setCommiModal({ value: false, address: '' })}
          externalCls="stak-pop"
        >
          <>
            <Formik
              initialValues={{
                address: '',
                comission: ''
              }}
              validationSchema={comissionValidation}
              onSubmit={(values, actions) => {
                console.log(values);
                callComission(values)
              }}
            >
              {
                ({ errors, touched, handleChange, handleBlur, values, handleSubmit }) => (
                  <div className="cmn_modal val_popups">
                    <div className="cmn_inpt_row">
                      <div className="form-control">
                        <label className="mb-2 mb-md-2 text-white">Enter validator address</label>
                        <input
                          type="text"
                          placeholder="Validator address"
                          className="w-100"
                          value={commiModal.address}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="cmn_inpt_row">
                      <div className="form-control">
                        <label className="mb-2 mb-md-2 text-white">Enter new commission</label>
                        <input
                          type="text"
                          placeholder="New commission"
                          className="w-100"
                          value={values.comission}
                          onChange={handleChange("comission")}
                        />
                        {touched.comission && errors.comission ? <p className='primary-text pt-1 pl-2'>{errors.comission}</p> : null}
                      </div>
                    </div>
                    <div className="pop_btns_area">
                      <div className="form-control">
                        <button className='btn primary-btn w-100'
                          type='submit'
                          onClick={() => handleSubmit()}
                        >Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </Formik>
          </>
        </CommonModal>
        {/* commission popop ends */}


        {/* withdraw popop start */}
        <CommonModal
          title={"Withdraw rewards"}
          show={withdrawModal.value}
          setShow={() => setWithdrawModal({ value: false, address: '' })}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">Enter validator address</label>
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
                      className='btn primary-btn w-100'>Submit</button>
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
          setShow={() => setRestakeModal({ value1: false, value2: false, address: '' })}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <>
                <div className="cmn_inpt_row">
                  <div className="form-control">
                    <label className="mb-2 mb-md-2 text-white">validator address</label>
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
                      className='btn primary-btn w-100'>Submit</button>
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
          setShow={setunboundpop}
          externalCls="stak-pop"
        >
          <>
            <div className="cmn_modal val_popups">
              <form>
                <div className="only_text">
                  <p className="text-center">Are you sure you want to unbound?</p>
                </div>
                <div className="pop_btns_area row mr-top-50 form-control">
                  <div className="col-6">
                    <button onClick={(e) => { e.preventDefault(); setunboundpop(false) }} className='btn blue-btn w-100 dark-bg-800 text-white' >Cancel</button>
                  </div>
                  <div className="col-6">
                    <button onClick={(e) => { e.preventDefault(); unboundValidator() }} className='btn primary-btn w-100' >Confirm</button>
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
          setShow={() => setUnboundModal({ ...unboundModal, startValue: false })}
          externalCls="stak-pop"
        >
          <>
            {unboundModal.startValue &&
              <div className='.cmn_modal del-tab-content'>
                <div className="center-align mb-4">
                  <h4>Are you sure you want to unbound?</h4>
                </div>
                <div className="dark-bg-800 p-2 p-sm-3">

                  {/* old input */}
                  <div className="form-group float-group">
                    <div className="d-flex justify-content-between flex-wrap">
                      <h6 className='mb-1 fs-14'>Withdraw Stake</h6>
                      <h6 className='mb-1 fs-14'>{unboundModal.stakeAmount} Bone</h6>
                    </div>
                    <div className="cmn_inpt_row max-input">
                      <div className="max-input">
                        <input
                          value={unboundInput}
                          onChange={(e) => setUnboundInput(e.target.value)}
                          type="number"
                          className="w-100 dark-bg form-control" placeholder="Enter amount"
                        />
                        <span
                          className="primary-text over-text fw-600"
                          style={{ cursor: "pointer" }}
                          onClick={() => setUnboundInput(unboundModal.stakeAmount)}
                        >
                          MAX
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="mb-0">
                      Your Funds will be locked for <p className="dark-text primary-text">checkpoints</p>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => unboundDelegator()}
                  disabled={unboundInput ? false : true}
                  type="button" className="btn primary-btn mt-3 mt-sm-4 w-100">Confirm Unbound</button>
              </div>
            }
          </>
        </CommonModal>
        {/* unbound popop DELEGATOR ends */}


        {/* pending & submit modal start */}

        <CommonModal
          title={transactionState.title}
          show={transactionState.state}
          setShow={() => setTransactionState({ state: false, title: 'Pending' })}
          externalCls="faucet-pop">
          <div className="popmodal-body tokn-popup no-ht trans-mod">
            <div className="pop-block">
              <div className="pop-top">
                <div className='dark-bg-800 h-100 status-sec'>
                  <span>
                    <div><img width="224" height="224" className="img-fluid" src="../../images/Ellipse.png" alt="" /></div>
                  </span>
                </div>
              </div>
              <div className="pop-bottom">
                {/* <p className='elip-text mt-3'>{transactionState.hash}</p> */}
                <div className='staus-btn'>
                  <button
                    type='button'
                    className='btn primary-btn w-100'
                    disabled={hashLink ? false : true}
                    onClick={() => window.open(hashLink)}
                  >
                    View on Block Explorer</button>
                </div>
              </div>
            </div>
          </div>
          {/* Transaction Pending popup version 2 end*/}
        </CommonModal>
        {/* pending & submit modal end */}

        {
          userType === "Validator" ?
            <section className="mid_cnt_area">
              <div className="container">
                <div className="col-xl-12 col-lg-12 side-auto">
                  <div className="val_del_outr">
                    <h4 className="ff-mos">Wallet Balance</h4>
                    <h3 className="ff-mos"><b>{availBalance.toFixed(4)} Bone</b></h3>
                    <h4 className="ff-mos"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={((availBalance || 0) * boneUSDValue).toFixed(2)} /></h4>
                    <div className="btns_sec val_all_bts row">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                        <button onClick={() => handleModal("Restake", account)} className="ff-mos btn black-btn w-100 d-block">
                          Restake
                        </button>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                        <button onClick={() => handleModal("Change Commission Rate", account)} className="ff-mos btn black-btn w-100 d-block">
                          Change Commission Rate
                        </button>
                      </div>
                      <div className="col-xl-3  col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                        <button onClick={() => handleModal("Withdraw Rewards", account)} className="ff-mos btn black-btn w-100 d-block">
                          Withdraw Rewards
                        </button>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <button onClick={() => setunboundpop(true)} className="ff-mos btn black-btn w-100 d-block">
                          Unbound
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </section>
            :
            <section className='del-grid-section bottom-pad ffms-inherit'>
              <div className="container">
                <div className='row'>
                  {delegationsList.length ?
                    delegationsList.map((item: any) =>
                      <div className="col-lg-4 col-md-6 col-12 bs-col">
                        <div className="border-sec">
                          <div className="top-sec">
                            <div className="info-block">
                              <div className="image-blk">
                                <div>
                                  <img className="img-fluid" src={item.logoUrl} width="69" height="70" alt="coin-icon" />
                                </div>
                              </div>
                              <div className="grid-info text-start">
                                <div className="fw-bold">{item.name}</div>
                                <div className="info-row">
                                  <span><span className="fw-bold">{parseInt(item.checkpointSignedPercent).toFixed(2)}%</span> Checkpoints Signed</span>
                                </div>
                                <div className="info-row">
                                  <span><span className="fw-bold">{item.commission}%</span> Commission</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mid-sec bs-card h-auto">
                            <div className="block-container">
                              <div className="cus-width">
                                <div className="text-center">
                                  <div>Your Stake</div>
                                  <div className="fw-bold">{(parseInt(item.stake) / 10 ** 18).toFixed(4)}</div>
                                  {/* {/ <div>$0</div> /} */}
                                </div>
                              </div>
                              <div className="cus-width">
                                <div className="text-center">
                                  <div>Reward</div>
                                  <div className="fw-bold orange-color">{(parseInt(item.reward) / 10 ** 18).toFixed(4)}</div>
                                  {/* {/ <div>$0</div> /} */}
                                </div>
                              </div>
                            </div>

                            <ul className="btn-grp">

                              {(parseInt(item.reward) / 10 ** 18) < 1 ? (<><li className="btn-grp-lst">
                                <button disabled className="btn grey-btn btn-small">Restake</button>
                              </li>
                              <li className="btn-grp-lst">
                                <button disabled className="btn black-btn btn-small">Withdraw Rewards</button>
                              </li></>):(<><li className="btn-grp-lst">
                                <button disabled={parseInt(item.commission) == 0} onClick={() => handleModal('Restake', item.contractAddress)} className="btn grey-btn btn-small">Restake</button>
                              </li>
                              <li className="btn-grp-lst">
                                <button onClick={() => handleModal('Withdraw Rewards', item.contractAddress)} className="btn black-btn btn-small">Withdraw Rewards</button>
                              </li></>)}
                              

                              
                              {(parseInt(item.stake) / 10 ** 18) <1?(<li className="btn-grp-lst">
                                <button disabled className="btn black-btn btn-small">Unbound</button>
                              </li>) : <li className="btn-grp-lst">
                                <button onClick={() => handleModal('Unbound', item.validatorAddress, item.contractAddress, (parseInt(item.stake) / 10 ** 18).toFixed(4))} className="btn black-btn btn-small">Unbound</button>
                              </li> }
                              
                              <li className="btn-grp-lst">
                                <button disabled={parseInt(item.commission) == 0} onClick={() => { setSelectedRow({ owner: item.contractAddress, contractAddress: item.contractAddress, commissionPercent: item.commission, name: item.name }); setStakeMoreModal(true); }} className="btn black-btn btn-small">Stake More</button>
                              </li>

                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                    : !loading && !delegationsList.length ? <div className='txt-emp'>
                      <div className='no-fount-txt'>No Record Found</div>
                    </div> : null
                  }
                </div>
              </div>
            </section>
        }
      </main>
    </>
  );
}

export default validatorAccount