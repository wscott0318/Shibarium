import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Button, Tooltip } from "react-bootstrap";

import { useFormik, FormikProps, ErrorMessage, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { restake, unbound, withdrawRewardDelegator } from "../../services/apis/delegator";

import { UserType } from "../../enums/UserType";
import { CommissionRateInterface, WithdrawInterface } from "../../interface/reTakeFormInterface";
import { useActiveWeb3React } from '../../services/web3'

import ConfirmPopUp from "pages/components/ConfirmPopUp";
import ToastNotify from "pages/components/ToastNotify";
import BorderBtn from "pages/components/BorderBtn";
import LoadingSpinner from "pages/components/Loading";
import WarningBtn from "pages/components/WarningBtn";
import { DelegatorReStakeFormInterface } from "interface/delegatorAccount";

interface WalletBalanceProps {
  balance: number;
  boneUSDValue: number;
  userType:UserType;
}

const DelegatorAccount = ({ balance, boneUSDValue,userType }: WalletBalanceProps) => {

  const [restakePopup, setRestakePopup] = useState(false);
  const [commiModal, setCommiModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [unboundModal, setUnboundModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastType, setToastType] = useState<'success'|'error'|undefined>();
  const [toastMsg, setToastMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [tranHashCode, setTranHashCode] = useState("");
  const [successMsg, setSuccessMsg] = useState('')
  const { account } = useActiveWeb3React()

  const handleModal = (btn: String) => {
    switch (btn) {
      case "Restake":
        setRestakePopup(true);
        break;
    //   case "Change Commission Rate":
    //     setCommiModal(true);
    //     break;
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

  const restakeValidation: any = Yup.object({
    validatorAddress: Yup.string().required(),
    delegatorAddress: Yup.string().required(),
  })

  const retakeFormik: FormikProps<DelegatorReStakeFormInterface> = useFormik<DelegatorReStakeFormInterface>({
    initialValues: {
      validatorAddress:  '',
      delegatorAddress: account || ''
    },
    onSubmit: (values: DelegatorReStakeFormInterface) => {
      // console.log(values)
      setLoading(true);
      restake(values)
        .then((res: any) => {
          console.log("res", res);
          if (res.data.status === 'success') {
            setLoading(false);
            setTranHashCode(res.data.data.transactionHash);
            setSuccessMsg(res.data.message);
            setConfirm(true);
            setRestakePopup(false);
          }else{
            setToastType('error')
            setToastMessage(res.data.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          //   setToastType('error')
          // setToastMessage(err.message);
          setLoading(false);
        });
    },
    validationSchema: restakeValidation,
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
      setToastMessage(err?.response?.message);
  }

  const withdrawFormk: FormikProps<WithdrawInterface> = useFormik<WithdrawInterface>({
    initialValues: {
      validatorAddress: ''
    },
    onSubmit: (values:WithdrawInterface) => {
      setLoading(true);
        withdrawRewardDelegator(values.validatorAddress,account).then((res) => {
          if (res.data.status === 'success') {
            successWithdrawMessage(res);
          }else{
            errorWithdrawMessage(res)
          }
        }).catch(err=>{
          errorWithdrawMessage(err)
        })
    },
  });
  const renderError = (message: string) => <p className="text-danger">{message}</p>;
  
  // const renderTooltip = (props: any) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Simple tooltip
  //   </Tooltip>
  // );
  
  return (

    <>
    <ToastNotify toastMassage={toastMsg} type={toastType}/>
          <>
            <BorderBtn lable="Become A Validator" link="/become-validator" handleModal={handleModal} />
            <BorderBtn lable="Restake" handleModal={handleModal} />
            <BorderBtn lable="Withdraw Rewards" handleModal={handleModal} />
            <BorderBtn lable="Unbound" handleModal={handleModal} />
          </>
      {/* Retake modal start */}
      <div className={` modal-wrap`}>
        <Modal
          className="shib-popup"
          show={restakePopup}
          onHide={() => setRestakePopup(false)}
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
                    {'Validator'} Address
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
                   <ErrorMessage name="validatorAddress" render={renderError} />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    {'Delegator'} Address
                  </label>
                  <Field
                    type="text"
                    className="form-control form-bg"
                    placeholder="Enter Validator address"
                    id="validatorAddress"
                    name="validatorAddress"
                    readOnly
                    onChange={retakeFormik.handleChange}
                    value={retakeFormik.values.delegatorAddress}
                  />
                   <ErrorMessage name="delegatorAddress" render={renderError} />
                </div>
                {/* <div className="form-group">
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
                </div> */}
                {/* <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Stake Reward
                  </label>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <Button variant="success">Hover me to see</Button>
                  </OverlayTrigger>
                  <Field
                    type="number"
                    placeholder="0"
                    className="form-control form-bg"
                    id="reward"
                    name="reward"
                    onChange={retakeFormik.handleChange}
                    value={retakeFormik.values.reward}
                  />
                  <ErrorMessage name="reward" render={renderError} />

                </div> */}
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
              <span className="trs-3">Withdraws Rewards</span>
            </h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={withdrawFormk.handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Validator Address
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

export default DelegatorAccount;