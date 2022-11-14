import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Button, Tooltip } from "react-bootstrap";

import { useFormik, FormikProps, ErrorMessage, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { commission, restake, unbound, validatorsList, withdrawReward } from "../../services/apis/validator";
import { withdrawRewardDelegator, restakeDeligator } from "../../services/apis/delegator";

import { useUserType } from '../../state/user/hooks';
import { UserType } from "../../enums/UserType"; 
import { RetakeFormInterface,RetakeFormInterfaceDelegator, CommissionRateInterface, WithdrawInterface } from "../../interface/reTakeFormInterface";
import { useActiveWeb3React } from '../../services/web3'
import ArrowTooltips from "../../components/Modal/Tooltip"
import ConfirmPopUp from "pages/components/ConfirmPopUp";
import ToastNotify from "pages/components/ToastNotify";
import BorderBtn from "pages/components/BorderBtn";
import LoadingSpinner from "pages/components/Loading";
import WarningBtn from "pages/components/WarningBtn";
import { getDelegatorData } from "app/services/apis/user/userApi";
import { ConsoleView } from "react-device-detect";
import Link from 'next/link'
import DelegatePopup from "pages/delegate-popup";
import { CommonModalNew } from "../components/CommonModel";
import { TailSpin } from "react-loader-spinner";
import { unboundNew } from "../../services/apis/delegator/index"
import { getExplorerLink } from 'app/functions';
import { ChainId } from 'shibarium-chains';
import TriggerExample from "../../components/Icon/TooltipBootstrap"
import Web3 from "web3";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import proxyManagerABI from "../../ABI/StakeManagerProxy.json";
import {PROXY_MANAGER} from "../../web3/contractAddresses";
import fromExponential from 'from-exponential';
import {BONE} from "../../web3/contractAddresses";
import ERC20 from "../../ABI/ERC20Abi.json";
import { getAllowanceAmount } from "../../web3/commonFunctions";
import ValidatorShareABI from "../../ABI/ValidatorShareABI.json";

interface WalletBalanceProps {
  balance: number;
  boneUSDValue: number;
  userType: string;
  getCardsData: Function
}

const ValidatorAccount = ({ balance, boneUSDValue, userType, getCardsData }: WalletBalanceProps) => {

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
    progressValue: false,
    comfirmValue: false,
    address: '',
    id: '',
    stakeAmount: 0
  });
  const [stakeMore, setStakeMoreModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDCards, setLoadingDCards] = useState<boolean>(true);
  const [toastType, setToastType] = useState<'success'|'error'|undefined>();
  const [toastMsg, setToastMessage] = useState("");
  const [confirm, setConfirm] = useState(false); 
  const [tranHashCode, setTranHashCode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [delegationsList, setDelegationsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [unboundInput, setUnboundInput] = useState<any>('');
  const [buttonText, setButtonText] = useState({
    validatorReskate: 'Submit'
  })

  const [transactionLink, setTransactionLink] = useState('');

  const {account,chainId=1,library } = useActiveWeb3React()
  const lib : any = library
  const web3: any = new Web3(lib?.provider)
  // console.log(library)

  const getValidatorId = async () => {
    let user = account;
    if(account){
      const instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
      const ID = await instance.methods.getValidatorId(user).call({ from: account });
      // console.log(ID)
      return ID
    } else {
      console.log("account addres not found")
    }
  }


  // APPROVE BONE 
  const approveAmount = (id:any, amount:any, reward: boolean) => {
    if(account){
  
      let user = account;
      let amount = web3.utils.toBN(fromExponential(1000 * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ERC20, BONE);
      instance.methods.approve(PROXY_MANAGER,amount).send({ from: user })
          .then((res: any) => {
            let instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
            // console.log(res)
            setButtonText({
              validatorReskate: 'Restaking...'
            })
            instance.methods.restake(id, amount, reward).send({ from: user })
            .then((res: any) => {
              // console.log(res)
              setLoading(false);
              setTranHashCode(res.transactionHash)
              setSuccessMsg("Reskate Done")
              const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
              setTransactionLink(link)
              setConfirm(true)
              setRestakeModal({
                value1:false,
                value2: false,
                address: ""
              })
              setButtonText({
                validatorReskate: 'Submit'
              })
            }).catch((err :any) => {
              console.log(err)
            if(err.code === 4001){
              console.log("User denied this transaction! ")
            }
                setLoading(false);
                setButtonText({
                  validatorReskate: 'Submit'
                })
              })
          }).catch((err:any) => {
            console.log(err)
            setLoading(false)
            if(err.code === 4001){
              console.log("User denied this transaction! ")
            }
            setButtonText({
              validatorReskate: 'Submit'
            })
          })
    }

  }

  const handleModal = (btn: String, valAddress: any, id: any = null, stakeAmount: any = null) => {
    switch (btn) {
      case "Restake":
        if(userType === 'Validator'){
          setRestakeModal({
            value1: true,
            value2: false,
            address: valAddress
          });
        } else{
          setRestakeModal({
            value2: true,
            value1:  false,
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
        setUnboundModal((preVal: any) => ({...preVal, stakeAmount: stakeAmount, startValue: true, address: valAddress, id: id}));
        break;
      default:
        break;
    }
  };
  
  const handleModalClosing = () => {
    setUnboundInput('')
    setUnboundModal({
      startValue: false,
      progressValue: false,
      comfirmValue: false,
      address: '',
      id: '',
      stakeAmount: 0
    })
  }

  const getDelegatorCardData = (accountAddress :any) =>{
    try {
      getDelegatorData(accountAddress.toLowerCase()).then( (res :any) =>{
       if (res.data ) {
        // console.log(res.data)
        let sortedData = res.data.data.validators.sort((a:any, b:any) => parseInt(b.stake) - parseInt(a.stake))
        setDelegationsList(sortedData)
        getCardsData(res.data.data)
        setLoadingDCards(false)
       }
     }).catch((e :any)=>{
       console.log(e);
      //  setUserType('NA')
     })
    } catch (error) {
     console.log(error)
    }
   }

  //  console.log(delegationsList)

   useEffect(() => {
    if(account){
      getDelegatorCardData(account)
      
    }
   },[account])


  const restakeValidation: any = Yup.object({
    // validatorAddress: Yup.string().required(),
    amount: Yup.number().min(0).max(balance).required(),
    reward: Yup.number().required(),

  })

  const unBoundValidation: any = Yup.object({
    amount: Yup.number().min(0).max(unboundModal.stakeAmount).required(),
  })
  const restakeValidationDelegator: any = Yup.object({
    validatorAddress: Yup.string().required(),
  })

  console.log(userType)

  const retakeFormik: FormikProps<RetakeFormInterface> = useFormik<RetakeFormInterface>({
    initialValues: {
      validatorAddress: restakeModal?.address ? restakeModal?.address : '',
      amount: '',
      reward:0,
    },
    onSubmit: async (values: RetakeFormInterface) => {
      // console.log(values)
      setLoading(true);
      let data = {
        validatorAddress: restakeModal?.address ? restakeModal?.address : '',
        amount: values.amount,
        reward: values.reward,
      }
      // console.log(data)
      if(account) {
      
        let walletAddress = account
        let ID = await getValidatorId()
        let allowance = await getAllowanceAmount(library,BONE, account, PROXY_MANAGER) || 0
        let instance = new web3.eth.Contract(proxyManagerABI, PROXY_MANAGER);
        const amountWei = web3.utils.toBN(fromExponential((+values.amount * Math.pow(10, 18))));
        if(+values.amount > +allowance){
          console.log("need approval")
          setButtonText({
            validatorReskate:'Approving Bone...'
          })
            approveAmount(ID, amountWei, values.reward == 0 ? false : true)
        } else {
          console.log("no approval needed")
          setButtonText({
            validatorReskate:'Submit'
          })
        instance.methods.restake(ID, amountWei, values.reward == 0 ? false : true).send({ from: walletAddress })
              .then((res: any) => {
                // console.log(res)
                setLoading(false);
                setTranHashCode(res.transactionHash)
                setSuccessMsg("Reskate Done")
                const link = getExplorerLink(chainId , res.transactionHash,'transaction')
                setTransactionLink(link)
                setConfirm(true)
                setRestakeModal({
                  value1:false,
                  value2: false,
                  address: ""
                })
              }).catch((err :any) => {
                console.log(err)
              if(err.code === 4001){
                console.log("User denied this transaction! ")
              }
                  setLoading(false);
                })
              }
      } else {
        console.log("account addres not found")
      }
      // restake(data)
      //   .then((res: any) => {
      //     // console.log("res", res);
      //     if (res.status == 200) {
      //       setLoading(false);
      //       const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
      //       setTransactionLink(link)
      //       setTranHashCode(res.data.data.transactionHash);
      //       setSuccessMsg(res.data.message);
      //       setConfirm(true);
      //       setRestakeModal({value1:false, value2: false, address:''});
      //     }
      //   })
      //   .catch((err) => {
      //       setToastType('error')
      //       setToastMessage(err?.response?.data?.message);
      //     setLoading(false);
      //   });
    },
    validationSchema: restakeValidation,
  });


  const retakeFormikDelegator = useFormik({
    initialValues: {
      validatorAddress: restakeModal?.address || 'test',
      delegatorAddress: account ? account : ''
    },
    onSubmit: async (values) => {
    //  console.log(values)
      setLoading(true);
      let dataToSend = {
        validatorAddress: restakeModal?.address || 'test',
      delegatorAddress: account ? account : ''
      }
      // console.log(dataToSend.validatorAddress)
      if(account){
      
        let walletAddress = account
        let instance = new web3.eth.Contract(ValidatorShareABI, dataToSend.validatorAddress);
        await instance.methods.restake().send({ from: walletAddress }).then((res:any) => {
          // console.log(res)
          setLoading(false);
          setTranHashCode(res.transactionHash)
          setSuccessMsg("Reskate Done")
          const link = getExplorerLink(chainId , res.transactionHash,'transaction')
          setTransactionLink(link)
          setConfirm(true)
        }).catch((err:any) => {
          console.log(err)
          setLoading(false);
          if(err.code === 4001){
            console.log("User desined this transaction! ")
          }
        })
      }
      // restakeDeligator(dataToSend)
      //   .then((res: any) => {
      //     // console.log("res", res);
      //     if (res.status == 200) {
      //       setLoading(false);
      //       const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
      //       setTransactionLink(link)
      //       setTranHashCode(res.data.data.transactionHash);
      //       setSuccessMsg(res.data.message);
      //       setConfirm(true);
      //       setRestakeModal({value1:false, value2: false, address:''});
      //     }
      //   })
      //   .catch((err) => {
      //       setToastType('error')
      //       setToastMessage(err?.response?.data?.message);
      //     setLoading(false);
      //   });
    },
    // validationSchema: restakeValidationDelegator,
  });

  const CommiModal: any = Yup.object({
    validatorAddress: Yup.string().required(),
    newCommission: Yup.number().min(0).max(100).required(),
  })

  const commiFormik: FormikProps<CommissionRateInterface> = useFormik<CommissionRateInterface>({
    initialValues: {
      validatorAddress: account || '',
      newCommission: '',
    },
    onSubmit: (values: CommissionRateInterface) => {
      setLoading(true);
      commission(values)
        .then((res) => {
          // console.log("res", res);
          if (res.status == 200) {  
            setLoading(false);
            setTranHashCode(res.data.data.transactionHash);
            const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
            setTransactionLink(link)
            setSuccessMsg(res.data.message);
            setConfirm(true);
            setCommiModal({value:false,address:''});
          }
        })
        .catch((err) => {
          setLoading(false);
          setCommiModal({value:false,address:''});
          setToastType('error')
          setToastMessage(err?.response?.data?.message);
        });
    },
    validationSchema: CommiModal,
  });

  const successWithdrawMessage = (res:any) =>{
        setTranHashCode(res.data.data.transactionHash);
        setSuccessMsg(res.data.message);
        const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
        setTransactionLink(link)
        setConfirm(true);
        setWithdrawModal({value:false,address:''});
        setLoading(false);
  }

  const errorWithdrawMessage=(err:any)=>{
    setLoading(false);
    setToastType('error')
    setToastMessage(err?.response?.data?.message);
  }

  const withdrawFormk: FormikProps<WithdrawInterface> = useFormik<WithdrawInterface>({
    initialValues: {
      validatorAddress: userType === UserType.Validator ? account||'':'',
    },
    onSubmit: async (values:WithdrawInterface) => {
      setLoading(true);
      let dataToSend = {
        validatorAddress: userType === UserType.Validator ? account||'':'',
      }
      if(userType === UserType.Validator){
        withdrawReward(dataToSend).then((res) => {
          successWithdrawMessage(res);
        }).catch(err=>{
          errorWithdrawMessage(err)
        })
      }else if(userType === UserType.Delegator){
        // console.log(withdrawModal.address)
        if(account){
          
          let walletAddress = account
          let instance = new web3.eth.Contract(ValidatorShareABI, withdrawModal.address);
          await instance.methods.withdrawRewards().send({ from: walletAddress }).then((res:any) => {
            // console.log(res)
            setLoading(false);
            setTranHashCode(res.transactionHash)
            setSuccessMsg("Withdrawal Done")
            const link = getExplorerLink(chainId , res.transactionHash,'transaction')
            setTransactionLink(link)
            setConfirm(true)
          }).catch((err:any) => {
            console.log(err)
            setLoading(false);
            if(err.code === 4001){
              console.log("User desined this transaction! ")
            }
          })
        }
      }
    },
  });
  const renderError = (message: string) => <p className="text-danger">{message}</p>;
  const CustomRenderError = () => <p className="text-danger">range should be 0-100 %</p>;
  // const renderTooltip = (props: any) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Simple tooltip
  //   </Tooltip>
  // );


  const unboundNewAPICall = async () => {
    setUnboundModal((preVal:any) => ({...preVal, startValue:false, progressValue: true}))
    console.log("called ===>")
    let data = {
      delegatorAddress: account,
      validatorId: unboundModal.id,
      amount: unboundInput
    }
    // console.log(data.validatorId)
    if(account){
  
      let walletAddress = account
      let amount = web3.utils.toBN(fromExponential(+unboundInput * Math.pow(10, 18)));
      let instance = new web3.eth.Contract(ValidatorShareABI, data.validatorId);
      await instance.methods.sellVoucher_new(amount, amount).send({ from: walletAddress }).then((res:any) => {
        // console.log(res)
        const link = getExplorerLink(chainId , res.transactionHash,'transaction')
          // console.log(link)
          setTransactionLink(link)
          setUnboundModal((preVal:any) => ({...preVal,progressValue: false, comfirmValue: true}))
          setUnboundInput('')
      }).catch((err:any) => {
        console.log(err)
        setLoading(false);
        if(err.code === 4001){
          console.log("User desined this transaction! ")
        }
          setUnboundModal((preVal:any) => ({...preVal,progressValue: false, comfirmValue: true}))
          setUnboundInput('')
      })
    }

    // unboundNew(data).then((res:any) => {
    //   if(res.status == 200){
    //     console.log(res.data.data.transactionHash)
    //     const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
    //     console.log(link)
    //     setTransactionLink(link)
    //     setUnboundModal((preVal:any) => ({...preVal,progressValue: false, comfirmValue: true}))
    //     setUnboundInput('')
    //   }
    // }).catch((err: any) => {
    //   console.log(err)
    //   setUnboundModal((preVal:any) => ({...preVal,progressValue: false, comfirmValue: true}))
    //   setUnboundInput('')
    // })
  }


  // const unboundFromikHandling = useFormik({
  //   initialValues: {
  //     amount: 0
  //   },
  //   onSubmit: (values) => {
  //     unboundNewAPICall(),
  //   }
  //   // validationSchema: unBoundValidation
  // })

  const tooltipRestakeDelegator = () => {
    return (
      <span>Validator Address</span>
    )
  }

  const testUnboundDelegator = () => {}

  return (
    <>
    <h1>validator</h1>
    </>
  );
};

export default ValidatorAccount;