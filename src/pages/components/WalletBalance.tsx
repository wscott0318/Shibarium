import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import BorderBtn from "./BorderBtn";
import WarningBtn from "./WarningBtn";

import { useFormik, FormikProps, ErrorMessage, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { commission, restake, withdrawReward } from "../../services/apis/validator";
import { withdrawRewardDelegator } from "../../services/apis/delegator";
import ConfirmPopUp from "./ConfirmPopUp";
import { TailSpin, Triangle } from "react-loader-spinner";
import LoadingSpinner from "./Loading";
import ToastNotify from "./ToastNotify";
import { useUserType } from '../../state/user/hooks';
import { UserType } from "../../enums/UserType";
import { RetakeFormInterface, CommissionRateInterface, WithdrawInterface } from "../../interface/reTakeFormInterface";
import { useActiveWeb3React } from '../../services/web3'
import DelegatorAccount from "pages/account/Delegator";
import ValidatorAccount from "pages/account/Validator";

interface WalletBalanceProps {
  balance: number,
  boneUSDValue: number,
  getCardsData: Function
}

const WalletBalance = ({ balance, boneUSDValue , getCardsData}: WalletBalanceProps) => {

  // const [restakeModal, setRestakeModal] = useState(false);
  // const [commiModal, setCommiModal] = useState(false);
  // const [withdrawModal, setWithdrawModal] = useState(false);
  // const [unboundModal, setUnboundModal] = useState(false);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState(false);
  // const [errMessage, setErrMessage] = useState("");
  // const [confirm, setConfirm] = useState(false);
  // const [tranHashCode, setTranHashCode] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");
  const [userType, setUserType] = useUserType();
  // const { account } = useActiveWeb3React()

  // const handleModal = (btn: String) => {
  //   switch (btn) {
  //     case "Restake":
  //       setRestakeModal(true);
  //       break;
  //     case "Change Commission Rate":
  //       setCommiModal(true);
  //       break;
  //     case "Withdraw Rewards":
  //       setWithdrawModal(true);
  //       break;
  //     case "Unbound":
  //       setUnboundModal(true);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const restakeValidation: any = Yup.object({
  //   validatorAddress: Yup.string().required(),
  //   amount: Yup.number().min(0).max(balance).required(),
  //   reward: Yup.number().required(),

  // })

  // const retakeFormik: FormikProps<RetakeFormInterface> = useFormik<RetakeFormInterface>({
  //   initialValues: {
  //     validatorAddress: account || '',
  //     amount:0,
  //     reward:0,
  //   },
  //   onSubmit: (values: RetakeFormInterface) => {
  //     // console.log(values)
  //     setLoading(true);
  //     restake(values)
  //       .then((res: any) => {
  //         console.log("res", res);
  //         if (res.status == 200) {
  //           setLoading(false);
  //           setTranHashCode(res.data.data.transactionHash);
  //           setSuccessMsg(res.data.message);
  //           setConfirm(true);
  //           setRestakeModal(false);
  //         }
  //       })
  //       .catch((err) => {
  //         setErrMessage(err.message);
  //         setLoading(false);
  //         setError(true);
  //         setTimeout(() => {
  //           setError(false)
  //         }, 1000)
  //       });
  //   },
  //   validationSchema: restakeValidation,
  // });
  // const commiFormik: FormikProps<CommissionRateInterface> = useFormik<CommissionRateInterface>({
  //   initialValues: {
  //     validatorAddress: account || '',
  //     newCommission: '',
  //   },
  //   onSubmit: (values: CommissionRateInterface) => {
  //     setLoading(true);
  //     commission(values)
  //       .then((res) => {
  //         console.log("res", res);
  //         if (res.status == 200) {
  //           setLoading(false);
  //           setTranHashCode(res.data.data.transactionHash);
  //           setSuccessMsg(res.data.message);
  //           setConfirm(true);
  //           setCommiModal(false);
  //         }
  //       })
  //       .catch((err) => {
  //         setErrMessage(err.message);
  //         setLoading(false);
  //         setError(true);
  //         setCommiModal(false);
  //         setTimeout(() => {
  //           setError(false)
  //         }, 1000)
  //         console.log("err", err);
  //       });
  //   },
  // });

  // const successWithdrawMessage = (res:any) =>{
  //       setTranHashCode(res.data.data.transactionHash);
  //       setSuccessMsg(res.data.message);
  //       setConfirm(true);
  //       setWithdrawModal(false);
  //       setLoading(false);
  // }

  // const errorWithdrawMessage=(err:any)=>{
  //   setErrMessage(err.message);
  //   setLoading(false);
  //   setError(true);
  //   setTimeout(()=>{
  //     setError(false)
  //   },1000)
  // }

  // const withdrawFormk: FormikProps<WithdrawInterface> = useFormik<WithdrawInterface>({
  //   initialValues: {
  //     validatorAddress: userType === UserType.Validator?account||'':'',
  //   },
  //   onSubmit: (values:WithdrawInterface) => {
  //     setLoading(true);
  //     if(userType === UserType.Validator){
  //       withdrawReward(values).then((res) => {
  //         successWithdrawMessage(res);
  //       }).catch(err=>{
  //         errorWithdrawMessage(err)
  //       })
  //     }else if(userType === UserType.Delegator){
  //       withdrawRewardDelegator(values.validatorAddress,account).then((res) => {
  //         successWithdrawMessage(res);
  //       }).catch(err=>{
  //         errorWithdrawMessage(err)
  //       })
  //     }
  //   },
  // });
  // const renderError = (message: string) => <p className="text-danger">{message}</p>;
  // // const renderTooltip = (props: any) => (
  // //   <Tooltip id="button-tooltip" {...props}>
  // //     Simple tooltip
  // //   </Tooltip>
  // // );

  return (
    <>
      {/* <h2 className="mb-3 low-font-wt">Ethereum Wallet Balance</h2>
      <h1 className="fw-700 light-text">
        {` ${(balance.toFixed(8))} BONE Wallet`}{" "}
      </h1>
      <h2 className="low-font-wt">{(balance * boneUSDValue).toFixed(4)} USD</h2> */}
      <div className="flex-wrap mt-4 d-flex align-items-center justify-content-center flex-column flex-sm-row">

        {

          userType === UserType.NA
            ?  <>
            <BorderBtn lable="Become A Validator" handleModal={() => { }} />
            <WarningBtn link="/account" handleModal={undefined} lable="Become A Delegator" />
          </>
            : <ValidatorAccount getCardsData={getCardsData} balance={balance} boneUSDValue={boneUSDValue} userType={userType} /> 
             
        }

      </div>

    </>
  );
};

export default WalletBalance;