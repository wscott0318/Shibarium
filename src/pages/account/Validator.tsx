import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Button, Tooltip } from "react-bootstrap";

import { useFormik, FormikProps, ErrorMessage, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { commission, restake, unbound, validatorsList, withdrawReward } from "../../services/apis/validator";
import { withdrawRewardDelegator } from "../../services/apis/delegator";

import { useUserType } from '../../state/user/hooks';
import { UserType } from "../../enums/UserType"; 
import { RetakeFormInterface, CommissionRateInterface, WithdrawInterface } from "../../interface/reTakeFormInterface";
import { useActiveWeb3React } from '../../services/web3'

import ConfirmPopUp from "pages/components/ConfirmPopUp";
import ToastNotify from "pages/components/ToastNotify";
import BorderBtn from "pages/components/BorderBtn";
import LoadingSpinner from "pages/components/Loading";
import WarningBtn from "pages/components/WarningBtn";
import { getDelegatorData } from "app/services/apis/user/userApi";
import { ConsoleView } from "react-device-detect";


interface WalletBalanceProps {
  balance: number;
  boneUSDValue: number;
  userType: string
}

const ValidatorAccount = ({ balance, boneUSDValue, userType }: WalletBalanceProps) => {

  const [restakeModal, setRestakeModal] = useState(false);
  const [commiModal, setCommiModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [unboundModal, setUnboundModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastType, setToastType] = useState<'success'|'error'|undefined>();
  const [toastMsg, setToastMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [tranHashCode, setTranHashCode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { account } = useActiveWeb3React();
  const [delegationsList, setDelegationsList] = useState([]);

  const handleModal = (btn: String) => {
    console.log(btn)
    switch (btn) {
      case "Restake":
        setRestakeModal(true);
        break;
      case "Change Commission Rate":
        setCommiModal(true);
        break;
      case "Withdraw Rewards":
        setWithdrawModal(true);
        break;
      case "Unbound":
        setUnboundModal(true);
        break;
      default:
        break;
    }
  };
  

  const getDelegatorCardData = (accountAddress :any) =>{
    try {
      getDelegatorData(accountAddress.toLowerCase()).then( (res :any) =>{
       if (res.data ) {
        console.log(res.data)
        setDelegationsList(res.data.data.validators)
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
    validatorAddress: Yup.string().required(),
    amount: Yup.number().min(0).max(balance).required(),
    reward: Yup.number().required(),

  })

  console.log(userType)

  const retakeFormik: FormikProps<RetakeFormInterface> = useFormik<RetakeFormInterface>({
    initialValues: {
      validatorAddress: account || '',
      amount: '',
      reward:0,
    },
    onSubmit: (values: RetakeFormInterface) => {
      // console.log(values)
      setLoading(true);
      restake(values)
        .then((res: any) => {
          // console.log("res", res);
          if (res.status == 200) {
            setLoading(false);
            setTranHashCode(res.data.data.transactionHash);
            setSuccessMsg(res.data.message);
            setConfirm(true);
            setRestakeModal(false);
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
            setSuccessMsg(res.data.message);
            setConfirm(true);
            setCommiModal(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          setCommiModal(false);
          setToastType('error')
          setToastMessage(err?.response?.data?.message);
        });
    },
    validationSchema: CommiModal,
  });

  const successWithdrawMessage = (res:any) =>{
        setTranHashCode(res.data.data.transactionHash);
        setSuccessMsg(res.data.message);
        setConfirm(true);
        setWithdrawModal(false);
        setLoading(false);
  }

  const errorWithdrawMessage=(err:any)=>{
    setLoading(false);
    setToastType('error')
    setToastMessage(err?.response?.data?.message);
  }

  const withdrawFormk: FormikProps<WithdrawInterface> = useFormik<WithdrawInterface>({
    initialValues: {
      validatorAddress: userType === UserType.Validator?account||'':'',
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
        withdrawRewardDelegator(values.validatorAddress,account).then((res) => {
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
  
  return (

    <>
       <ToastNotify toastMassage={toastMsg} type={toastType}/>
        
         { userType === 'Validator' ? <>
            <BorderBtn lable="Restake" handleModal={handleModal} />
            <BorderBtn lable="Change Commission Rate" handleModal={handleModal} />
            <BorderBtn lable="Withdraw Rewards" handleModal={handleModal} />
            <BorderBtn lable="Unbound" handleModal={handleModal} />
          </> :
          <>
            {/* Delegations section start */}
            <div className="baner-card mt-0">
              <h3 className="mb-0 mb-3 text-white fwb">Your Delegations</h3>
          
                <div className="row">
                  {
                    delegationsList.length ? 
                   <>
                   {
                    delegationsList.map((item: any) => 
                    <div className="col-lg-4 col-md-6 col-12 mx-auto bs-col">
                    <div className="border-sec">
                      <div className="top-sec">
                        <div className="info-block">
                          <div className="image-blk">
                            <div>
                              <img className="img-fluid" src="../../assets/images/coin-matic.png" width="69" height="70" alt="coin-icon"/>
                            </div>
                          </div>
                          <div className="grid-info">
                            <div className="fw-bold">DefiMatic</div>
                            <div className="info-row">
                              <span><span className="fw-bold">{item.checkpointSignedPercent}%</span> Checkpoints Signed</span>
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
                              <p onClick={() => handleModal('Restake')} className="btn white-btn mute-text btn-small">Restake</p>
                            </li>
                            <li className="btn-grp-lst">
                              <p onClick={() => handleModal('Change Commission Rate')} className="btn white-btn mute-text btn-small">Change Commission Rate</p>
                            </li>
                            <li className="btn-grp-lst">
                              <p onClick={() => handleModal('Withdraw Rewards')} className="btn btn-primary-outline btn-small">Withdraw Rewards</p>
                            </li>
                            <li className="btn-grp-lst">
                              <p onClick={() => handleModal('Unbound')} className="btn btn-primary-outline btn-small">Unbound</p>
                            </li>
                        </ul>
                      </div>
                    </div>
                </div>
                    )
                   }
                   </> :
                <span> No Validators Found</span>
                  }
               <div className="col-lg-4 col-md-6 col-12 mx-auto bs-col">
                <div className="border-sec">
                  <div className="add-sec">
                    <div className="text-center">
                      <div className="text-center">
                        <a href="javascript:void(0);"><img className="img-fluid d-inline-block" src="../../assets/images/white-plus.png" width="27" height="28" alt="coin-icon"/></a>
                      </div>
                      <div>
                        <span>Stake to more validators</span>
                      </div>
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
          className="shib-popup"
          show={restakeModal}
          onHide={() => setRestakeModal(false)}
          size="lg"
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
                    value={retakeFormik.values.validatorAddress}
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

      {/* Commision start */}
      <div className="modal-wrap">
        <Modal
          className="shib-popup"
          show={commiModal}
          onHide={() => setCommiModal(false)}
          size="lg"
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
                  onChange={commiFormik.handleChange}
                  
                  value={commiFormik.values.validatorAddress}
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
          show={withdrawModal}
          onHide={() => setWithdrawModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter "
          centered
        >
          {loading && <LoadingSpinner />}
          <Modal.Header closeButton className="text-center">
            <h4 className="mb-0">
              <span className="trs-3">Withdraw Rewards</span>
            </h4>
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
                  value={withdrawFormk.values.validatorAddress}
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
          show={unboundModal}
          onHide={() => setUnboundModal(false)}
          size="lg"
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
        />
      </div>


    </>
  );
};

export default ValidatorAccount;