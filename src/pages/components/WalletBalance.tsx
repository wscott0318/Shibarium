import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import  BorderBtn  from "./BorderBtn";
import  WarningBtn  from "./WarningBtn";

import { useFormik,FormikProps } from "formik";
import * as Yup from "yup";
import { commission, restake, withdrawReward } from "../../services/apis/validator";
import  ConfirmPopUp  from "./ConfirmPopUp";
import { TailSpin, Triangle } from "react-loader-spinner";
import  LoadingSpinner  from "./Loading";
import  ToastNotify  from "./ToastNotify";
import {useUserType} from '../../state/user/hooks';
import { UserType } from "../../enums/UserType";
import {RetakeFormInterface,CommissionRateInterface,WithdrawInterface} from "../../interface/reTakeFormInterface";
import { useActiveWeb3React } from '../../services/web3'

interface WalletBalanceProps{
  balance:number,
  boneUSDValue:number
}

const WalletBalance = ({ balance,boneUSDValue}:WalletBalanceProps) => {

  const [restakeModal, setRestakeModal] = useState(false);
  const [commiModal, setCommiModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [unboundModal, setUnboundModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [tranHashCode, setTranHashCode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [userType, setUserType] =useUserType();
  const {account} = useActiveWeb3React()

  const handleModal = (btn:String) => {
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

const restakeValidation:any = Yup.object({
  validatorAddress: Yup.string().required(),
  amount: Yup.string().required(),
  reward: Yup.string().required(),
})

    const retakeFormik: FormikProps<RetakeFormInterface> = useFormik<RetakeFormInterface>({
    initialValues: {
      validatorAddress: account || '',
      amount:'',
      reward:'',
    },
    onSubmit: (values:RetakeFormInterface) => {
      setLoading(true);
      restake(values)
        .then((res:any) => {
          console.log("res", res);
          if (res.status == 200) {
            setLoading(false);
            setTranHashCode(res.data.data.transactionHash);
            setSuccessMsg(res.data.message);
            setConfirm(true);
            setRestakeModal(false);
          }
        })
        .catch((err) => {
          setErrMessage(err.message);
          setLoading(false);
          setError(true);
          setTimeout(()=>{
            setError(false)
          },1000)
        });
    },
    validationSchema: restakeValidation,
  });
  const commiFormik : FormikProps<CommissionRateInterface> =  useFormik<CommissionRateInterface>({
    initialValues: {
      validatorAddress: account || '',
      newCommission:'',
    },
    onSubmit: (values:CommissionRateInterface) => {
      setLoading(true);
      commission(values)
        .then((res) => {
          console.log("res", res);
          if(res.status==200){
            setLoading(false);
            setTranHashCode(res.data.data.transactionHash);
            setSuccessMsg(res.data.message);
            setConfirm(true);
            setCommiModal(false);
          }
        })
        .catch((err) => {
          setErrMessage(err.message);
          setLoading(false);
          setError(true);
          setCommiModal(false);
          setTimeout(()=>{
            setError(false)
          },1000)
          console.log("err", err);
        });
    },
  });
  const withdrawFormk: FormikProps<WithdrawInterface> = useFormik<WithdrawInterface>({
    initialValues: {
      validatorAddress: account||'',
    },
    onSubmit: (values:WithdrawInterface) => {
      setLoading(true);
      withdrawReward(values).then((res) => {
        setTranHashCode(res.data.data.transactionHash);
        setSuccessMsg(res.data.message);
        setConfirm(true);
        setWithdrawModal(false);
        setLoading(false);
      }).catch(err=>{
        setErrMessage(err.message);
        setLoading(false);
        setError(true);
        setTimeout(()=>{
          setError(false)
        },1000)
      })
    },
  });

  return (
    <>
{error&&<ToastNotify toastMassage={errMessage}/>}
      <h2 className="mb-3 low-font-wt">Ethereum Wallet Balance</h2>
      <h1 className="fw-700 light-text">
        {` ${(balance.toFixed(8))} BONE Wallet`}{" "}
      </h1>
      <h2 className="low-font-wt">{(balance*boneUSDValue).toFixed(4)} USD</h2>
      <div className="flex-wrap mt-4 d-flex align-items-center justify-content-center flex-column flex-sm-row">
        {userType === UserType.Delegator && (
          <>
            <BorderBtn lable="Become A Validator" link="/become-validator" handleModal={handleModal} />
            <BorderBtn lable="Restake" handleModal={handleModal} />
            <BorderBtn lable="Withdraw Rewards" handleModal={handleModal}/>
            <BorderBtn lable="Unbound" handleModal={handleModal} />
          </>
        )}
        {userType === UserType.Validator && (
          <>
            <BorderBtn lable="Restake" handleModal={handleModal} />
            <BorderBtn lable="Change Commission Rate" handleModal={handleModal} />
            <BorderBtn lable="Withdraw Rewards" handleModal={handleModal}/>
            <BorderBtn lable="Unbound" handleModal={handleModal} />
          </>
        )}
        {userType === UserType.NA && (
          <>
            <BorderBtn lable="Become A Validator" handleModal={handleModal} />
            <WarningBtn lable="Become A Delegator" />
          </>
        )}
      </div>
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
            <form onSubmit={retakeFormik.handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  {userType} Address
                </label>
                <input
                  type="text"
                  className="form-control form-bg"
                  placeholder="Enter Validator address"
                  id="validatorAddress"
                  name="validatorAddress"
                  readOnly
                  onChange={retakeFormik.handleChange}
                  value={retakeFormik.values.validatorAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control form-bg"
                  id="amount"
                  name="amount"
                  placeholder="0"
                  onChange={retakeFormik.handleChange}
                  value={retakeFormik.values.amount}
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Stake Reward
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="form-control form-bg"
                  id="reward"
                  name="reward"
                  onChange={retakeFormik.handleChange}
                  value={retakeFormik.values.reward}
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
            <form onSubmit={commiFormik.handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="" className="form-label">
                {userType} Address
                </label>
                <input
                  type="text"
                  className="form-control form-bg"
                  id="validatorAddress"
                  name="validatorAddress"
                  onChange={commiFormik.handleChange}
                  readonly
                  value={commiFormik.values.validatorAddress}
                  placeholder="Enter Validator address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  New Commission
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="form-control form-bg"
                  id="newCommission"
                  name="newCommission"
                  onChange={commiFormik.handleChange}
                  value={commiFormik.values.newCommission}
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
      {/* retake modal end */}

      {/* Commision start */}
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
                {userType} Address
                </label>
                <input
                  type="number"
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
              <div className="col-sm-6">
                <a
                  href="javascript:void(0)"
                  className="btn bordered-btn light-text w-100"
                >
                  <span>Cancel</span>
                </a>
              </div>
              <div className="col-sm-6">
                <a
                  href="javascript:void(0)"
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

export default WalletBalance;