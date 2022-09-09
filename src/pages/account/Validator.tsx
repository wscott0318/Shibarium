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
import { ChainId } from '@shibarium/core-sdk';

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
  const [toastType, setToastType] = useState<'success'|'error'|undefined>();
  const [toastMsg, setToastMessage] = useState("");
  const [confirm, setConfirm] = useState(false); 
  const [tranHashCode, setTranHashCode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [delegationsList, setDelegationsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [unboundInput, setUnboundInput] = useState<any>('');

  const [transactionLink, setTransactionLink] = useState('');

  const {account,chainId=1} = useActiveWeb3React()


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
        console.log(res.data)
        setDelegationsList(res.data.data.validators)
        getCardsData(res.data.data)
       }
     }).catch((e :any)=>{
       console.log(e);
      //  setUserType('NA')
     })
    } catch (error) {
     console.log(error)
    }
   }

   console.log(delegationsList)

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
    onSubmit: (values: RetakeFormInterface) => {
      // console.log(values)
      setLoading(true);
      let data = {
        validatorAddress: restakeModal?.address ? restakeModal?.address : '',
        amount: values.amount,
        reward: values.reward,
      }
      restake(data)
        .then((res: any) => {
          // console.log("res", res);
          if (res.status == 200) {
            setLoading(false);
            const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
            setTransactionLink(link)
            setTranHashCode(res.data.data.transactionHash);
            setSuccessMsg(res.data.message);
            setConfirm(true);
            setRestakeModal({value1:false, value2: false, address:''});
          }
        })
        .catch((err) => {
            setToastType('error')
            setToastMessage(err?.response?.data?.message);
          setLoading(false);
        });
    },
    validationSchema: restakeValidation,
  });


  const retakeFormikDelegator = useFormik({
    initialValues: {
      validatorAddress: restakeModal?.address || 'test',
      delegatorAddress: account ? account : ''
    },
    onSubmit: (values) => {
     console.log(values)
      setLoading(true);
      let dataToSend = {
        validatorAddress: restakeModal?.address || 'test',
      delegatorAddress: account ? account : ''
      }
      restakeDeligator(dataToSend)
        .then((res: any) => {
          // console.log("res", res);
          if (res.status == 200) {
            setLoading(false);
            const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
            setTransactionLink(link)
            setTranHashCode(res.data.data.transactionHash);
            setSuccessMsg(res.data.message);
            setConfirm(true);
            setRestakeModal({value1:false, value2: false, address:''});
          }
        })
        .catch((err) => {
            setToastType('error')
            setToastMessage(err?.response?.data?.message);
          setLoading(false);
        });
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
    onSubmit: (values:WithdrawInterface) => {
      setLoading(true);
      if(userType === UserType.Validator){
        withdrawReward(values).then((res) => {
          successWithdrawMessage(res);
        }).catch(err=>{
          errorWithdrawMessage(err)
        })
      }else if(userType === UserType.Delegator){
        withdrawRewardDelegator(withdrawModal.address,account ? account : '').then((res) => {
          successWithdrawMessage(res);
        }).catch(err=>{
          errorWithdrawMessage(err)
        })
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


  const unboundNewAPICall = () => {
    setUnboundModal((preVal:any) => ({...preVal, startValue:false, progressValue: true}))
    console.log("called ===>")
    let data = {
      delegatorAddress: account,
      validatorId: unboundModal.id,
      amount: unboundInput
    }
    unboundNew(data).then((res:any) => {
      if(res.status == 200){
        console.log(res.data.data.transactionHash)
        const link = getExplorerLink(chainId , res?.data?.data?.transactionHash,'transaction')
        console.log(link)
        setTransactionLink(link)
        setUnboundModal((preVal:any) => ({...preVal,progressValue: false, comfirmValue: true}))
        setUnboundInput('')
      }
    }).catch((err: any) => {
      console.log(err)
      setUnboundModal((preVal:any) => ({...preVal,progressValue: false, comfirmValue: true}))
      setUnboundInput('')
    })
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

  return (

    <>
      <DelegatePopup show={stakeMore} data={selectedRow}
                onHide={() => setStakeMoreModal(false)} />
       <ToastNotify toastMassage={toastMsg} type={toastType}/>
        
         { userType === 'Validator' ? <>
            <BorderBtn lable="Restake" handleModal={() => handleModal("Restake", account)} />
            <BorderBtn lable="Change Commission Rate" handleModal={()=>handleModal("Change Commission Rate", account)} />
            <BorderBtn lable="Withdraw Rewards" handleModal={()=>handleModal("Withdraw Rewards", account)} />
            <BorderBtn lable="Unbound" handleModal={()=>handleModal("Unbound", account)} />
          </> :
          <>
            {/* Delegations section start */}
            <div className="baner-card mt-0 w-100">
              <h3 className="mb-0 mb-3 text-white fwb">Your Delegations</h3>
          
                <div className="row transac-card">
                  {
                    delegationsList.length ? 
                   <>
                   {
                    delegationsList.map((item: any) => 
                    <div className="col-lg-4 col-md-6 col-12 bs-col">
                    <div className="border-sec">
                      <div className="top-sec">
                        <div className="info-block">
                          <div className="image-blk">
                            <div>
                              <img className="img-fluid" src={item.logoUrl} width="69" height="70" alt="coin-icon"/>
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
                              {/* <div>$0</div> */}
                            </div>
                          </div>
                          <div className="cus-width">
                            <div className="text-center">
                              <div>Reward</div>
                              <div className="fw-bold orange-color">{(parseInt(item.reward) / 10 ** 18).toFixed(4)}</div>
                              {/* <div>$0</div> */}
                            </div>
                          </div>
                        </div>
                 
                        <ul className="btn-grp">
                            <li className="btn-grp-lst">
                              <button disabled={parseInt(item.commission) == 0}  onClick={() => handleModal('Restake', item.validatorAddress)} className="btn white-btn mute-text btn-small">Restake</button>
                            </li>
                            <li className="btn-grp-lst">
                              <button onClick={() => handleModal('Withdraw Rewards', item.validatorAddress)} className="btn btn-primary-outline btn-small">Withdraw Rewards</button>
                            </li>
                            <li className="btn-grp-lst">
                              <button onClick={() => handleModal('Unbound', item.validatorAddress, item.id, (parseInt(item.stake) / 10 ** 18).toFixed(4))} className="btn btn-primary-outline btn-small">Unbound</button>
                            </li>
                            <li className="btn-grp-lst">
                              <button disabled={parseInt(item.commission) == 0}  onClick={() => { setSelectedRow({owner:item.validatorAddress, commissionPercent: item.commission, name: item.name}); setStakeMoreModal(true);    }}  className="btn btn-primary-outline btn-small">Stake More</button>
                            </li>

                        </ul>
                      </div>
                    </div>
                </div>
                    )
                   }
                   </> :
                   <div className="col-12 text-start mb-3 mb-lg-4">
                    <span> No Validators Found</span>
                </div>
                  }
               <div className="col-lg-4 col-md-6 col-12 bs-col">
                <div className="border-sec">
                  <div className="add-sec">
                    <div className="text-center">
                    <Link href="./all-validator">
                      <a>
                        <div className="text-center mb-4">
                        <img className="img-fluid d-inline-block" src="../../assets/images/white-plus.png" width="27" height="28" alt="coin-icon"/>
                        </div>
                        <div>
                          <span className="primary-text fw-600 fs-16">Stake to more validators</span>
                        </div>
                      </a>
                      </Link>
                    </div>
                  </div>
                </div>
                </div>
              </div> 
              
          
            </div>
            {/* Delegations section end */}
          </>
          }

          

      {/* Retake modal start */}
      <div className={` modal-wrap`}>
        <Modal
          // title={"Restake"}
          className="shib-popup"
          show={restakeModal.value1}
          onHide={() => setRestakeModal({value1: false,value2: false, address: ''})}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter "
          centered
        >
          {loading && <LoadingSpinner />}
          <Modal.Header closeButton className="text-center">
            <Modal.Title id="example-custom-modal-styling-title">
              Restake
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="position-relative">
            <FormikProvider value={retakeFormik}>

              <form onSubmit={retakeFormik.handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    {userType} Address 
                    <span className="address_tooltip">?
                    <span className="dummypopup"> Use Validators Staking Address</span>
                    </span>

                   
                  </label>
                  <Field
                    type="text"
                    className="form-control form-bg"
                    placeholder="Enter Validator address"
                    id="validatorAddress"
                    name="validatorAddress"
                    onChange={retakeFormik.handleChange}
                    value={restakeModal.address}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Amount
                  </label>
                  <Field
                    type="number"
                    className="form-control form-bg"
                    id="amount"
                    name="amount"
                    placeholder="0"
                    onChange={retakeFormik.handleChange}
                    value={retakeFormik.values.amount}
                  />
                  <ErrorMessage name="amount" render={renderError} />
                </div>
                <div className="form-group">
                  <label htmlFor="reward" className="form-label">
                    Stake Reward
                  </label>
                  {/* <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <Button variant="success">Hover me to see</Button>
                  </OverlayTrigger> */}
                  <select name="reward" id="reward"  className="form-control form-bg" onChange={retakeFormik.handleChange} placeholder='Wants to restake rewards as well'>
                    <option selected={retakeFormik.values.reward === 1} value={1}>Yes</option>
                    <option selected={retakeFormik.values.reward === 0} value={0}>No</option>
                  </select>
                  {/* <Field
                    type="number"
                    placeholder="0"
                    className="form-control form-bg"
                    id="reward"
                    name="reward"
                    onChange={retakeFormik.handleChange}
                    value={retakeFormik.values.reward}
                  /> */}
                  <ErrorMessage name="reward" render={renderError} />

                </div>
                <div className="pt-3 form-group pt-md-4">
                  <button
                    type="submit"
                    className="btn warning-btn border-btn light-text w-100"
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </FormikProvider>
          </Modal.Body>
        </Modal>
      </div>
      {/* retake modal end */}


      {/* Retake modal for deligator start */}
      <div className={` modal-wrap`}>
        <Modal
          title={"Restake"}
          className="shib-popup"
          show={restakeModal.value2}
          onHide={() => setRestakeModal({value2: false,value1: false, address: ''})}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter "
          centered
        >
          {loading && <LoadingSpinner />}
          <Modal.Header closeButton className="text-center">
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="d-inline-block fw-800 trs-3"
            >
              <span style={{ color: "white" }}>Restake</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="position-relative">
          {/* <ArrowTooltips 
            text={`Validator Address `}
            tooltipText="Use Validators Staking Address"
            /> */}
            <FormikProvider value={retakeFormikDelegator}>
           
              <form onSubmit={retakeFormikDelegator.handleSubmit} className="modal-form">
              <ArrowTooltips 
                    text={`Validator Address `}
                    tooltipText="Use Validators Staking Address"
                    />
                <div className="form-group">
                  
                  {/* <label htmlFor="" className="form-label">
                  Validator Address 
                    <span className="address_tooltip">?
                    <span className="dummypopup"> Use Validators Staking Address test</span>
                    </span>
                  </label> */}
                  
                  <Field
                    type="text"
                    className="form-control form-bg"
                    placeholder="Enter Validator address"
                    id="validatorAddress"
                    name="validatorAddress"
                    onChange={retakeFormikDelegator.handleChange}
                    value={restakeModal.address}
                  />
                </div>
                <div className="pt-3 form-group pt-md-4">
                  <button
                    type="submit"
                    className="btn warning-btn border-btn light-text w-100"
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </FormikProvider>
          </Modal.Body>
        </Modal>
      </div>
      {/* retake modal deligator end */}

      {/* Commision start */}
      <div className="modal-wrap">
        <Modal
          className="shib-popup"
          show={commiModal.value}
          onHide={() => setCommiModal({value: false, address: ''})}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter "
          centered
        >
          {loading && <LoadingSpinner />}
          <Modal.Header closeButton className="text-center">
            <h4>
              <span>Commission</span>
            </h4>
          </Modal.Header>
          
          <Modal.Body>
          <FormikProvider value={commiFormik}>
            <form onSubmit={commiFormik.handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  {/* {userType} Address
                  <span className="address_tooltip">?
                    <span className="dummypopup">Validators Address</span>
                    </span> */}
                    <ArrowTooltips 
                    text={`${userType} Address `}
                    tooltipText="Validators Address"
                    />
                </label>
                <input
                  type="text"
                  className="form-control form-bg"
                  id="validatorAddress"
                  name="validatorAddress"
                  onChange={commiFormik.handleChange}
                  
                  value={commiModal.address}
                  placeholder="Enter Validator address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  New Commission
                </label>
                <Field
                  type="number"
                  placeholder="Enter amount"
                  className="form-control form-bg"
                  id="newCommission"
                  name="newCommission"
                  onChange={commiFormik.handleChange}
                  value={commiFormik.values.newCommission}
                />
                <ErrorMessage name="newCommission" render={CustomRenderError}/>
              </div>
              <div className="pt-3 form-group pt-md-4">
                <button
                  type="submit"
                  className="btn warning-btn border-btn light-text w-100"
                >
                  <span>Submit</span>
                </button>
              </div>
            </form>
            </FormikProvider>
          </Modal.Body>
         
        </Modal>
      </div>
      {/* retake modal end */}

      {/* withdrawModal start */}
      <div className="modal-wrap">
        <Modal
          className="shib-popup"
          show={withdrawModal.value}
          onHide={() => setWithdrawModal({value:false,address:''})}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter "
          centered
        
        >
          {loading && <LoadingSpinner />}
          <Modal.Header closeButton className="text-center">
            {/* <h4 className="mb-0">
              <span className="trs-3"></span>
            </h4> */}
            <Modal.Title id="example-custom-modal-styling-title" className="d-inline-block fw-800 trs-3">
                Withdraw Rewards
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={withdrawFormk.handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  {userType} Address
                  <span className="address_tooltip">?
                    <span className="dummypopup">Validators Address</span>
                    </span>
                </label>
                <input
                  type="text"
                  className="form-control form-bg"
                  id="validatorAddress"
                  name="validatorAddress"
                  onChange={withdrawFormk.handleChange}
                  value={withdrawModal.address}
                  placeholder="Enter Validator address"
                />
              </div>
              <div className="pt-3 form-group pt-md-4">
                <button
                  type="submit"
                  className="btn warning-btn border-btn light-text w-100"
                >
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      {/* commision modal end */}

      {/* Unbound start */}
      <div className="modal-wrap">
        <Modal
          className="shib-popup"
          // show={unboundModal.value}
          // onHide={() => setUnboundModal({value:false,address:''})}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter "
          centered
        >
          {loading && <LoadingSpinner />}
          <Modal.Header closeButton className="text-center">
            <h4 className="mb-0">
              <span className="trs-3">Unbound</span>
            </h4>
          </Modal.Header>
          <Modal.Body>
            <h3 className="px-4 mb-4 text-center">
              <span className="trs-3">Are you sure you want to unbound?</span>
            </h3>
            <div className="pt-4 row">
              <div className="mb-3 col-sm-6 mb-sm-0">
                <a
                  href="#!"
                  className="btn bordered-btn light-text w-100"
                >
                  <span>Cancel</span>
                </a>
              </div>
              <div className="mb-3 col-sm-6 mb-sm-0">
                <a
                onClick={()=>{
                  unbound({address: account}).then((res:any) =>{
                    setLoading(false);
                    setToastType('success')
                    setToastMessage(res.data.message);
                  }).catch((e)=>{
                    setLoading(false);
                    setToastType('error')
                    setToastMessage(e?.response?.data?.message);
                  })
                }}
                  href="#!"
                  className="btn warning-btn border-btn light-text w-100"
                >
                  <span>Confirm</span>
                </a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <ConfirmPopUp
          show={confirm}
          setShow={setConfirm}
          text={tranHashCode}
          message={successMsg}
          link={transactionLink}
        />
      </div>





   {/*====================================== New modals for unbound =================================*/}

      {/* 1st screen */}
      <CommonModalNew
          title={"Unbound"}
          show={unboundModal.startValue}
          setShow={handleModalClosing}
        >
          <div>
            <div className="center-align mb-4">
              <h3>Are you sure you want to unbound?</h3>
            </div>
            <div className="card">
              {/* <div className="row bdr-bottom">
                  <div className="col-sm-8 mb-3">
                    <h6>Rewards</h6>
                    <p>You'll receive reward immediately.</p>
                  </div>
                  <div className="col-sm-4 text-end mb-3">
                    <h6>0.04 Bone</h6>
                  </div>
              </div> */}
              <div className="row">
                  <div className="col-sm-6 mb-1">
                    <h6 className="mb-0">Withdraw Stake</h6>
                  </div>
                  <div className="col-sm-6 text-end mb-1">
                    <h6 className="mb-0">{unboundModal.stakeAmount} Bone</h6>
                  </div>
              </div>
              {/* old input */}
              <div className="form-group float-group">
                <input
                value={unboundInput}
                onChange={(e) => setUnboundInput(e.target.value)}
                type="number" 
                className="form-control" placeholder="10" 
                />
                <span
                  className="primary-text over-text fw-600"
                  style={{ cursor: "pointer" }}
                  onClick={() => setUnboundInput(unboundModal.stakeAmount)}
                  >
                  MAX
                </span>
              </div>
              <div className="card-primary dark-text p-2">
                  Your Funds will be locked for <a href="" target='#' className="primary-text">checkpoints</a>
              </div>
            </div>
            {/* <div className="d-flex justify-content-between align-items-center">
              <div className="mt-2">
                $3.359 Gas Fee
              </div>
              <div className="mt-2 text-end">
                <img className="img-fluid" src="../../assets/images/arrow-right-white.png" alt="img-fluid" width={6} />
              </div>
            </div> */}
            <button
            onClick={() => unboundNewAPICall()}
            disabled={unboundInput ? false : true}
            type="button" className="btn warning-btn mt-3 mt-sm-4 w-100">Confirm Unbound</button>
          </div>
        </CommonModalNew>

         {/* unbound progress show modal */}
         <CommonModalNew
          title={"Unbound"}
          show={unboundModal.progressValue}
          setShow={handleModalClosing}
        >
          <div className="spinner-outer position-relative spiner-blk">
              <div className="loading-spinner">
                <TailSpin color="#f06500" height={80} width={80} />
              </div>
            </div>
          <div>
            <div className="center-align">
              <p className="fw-bold fs-18">Transaction in progress</p>
              <p>
                Bone transaction can take upto 5 minute to complete.
                Please wait or Increase the gas in metamask.
              </p>
              {/* <a href="javascript:void(0);" title="" className="primary-text">View on Etherscan</a> */}
            </div>
          </div>
        </CommonModalNew>
        {/* claim stake modal */}

        {/* unbound modal confirm value */}
        <CommonModalNew
          title={"Unbound"}
          show={unboundModal.comfirmValue}
          setShow={handleModalClosing}
        >
          <div>
            <div className="center-align">
              <span className="mb-3"><img src="../../assets/images/like.png" alt="" className="img-fluid" width={60} height={60} /></span>
            </div>
            <div className="center-align">
              <p className="fw-bold fs-18">Unbound Initiated</p>
              <p>The inbonding process has been initiated. Please come back after checkpoints and click on "Claim Stake".</p>
              <div className="mt-3">
              <a href={transactionLink} className="primary-text" target='_blank' title="">View on Block Explorer</a>
               </div>
 
            </div>
          </div>
        </CommonModalNew>
    </>
  );
};

export default ValidatorAccount;