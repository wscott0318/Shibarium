import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Button, Tooltip } from "react-bootstrap";

import { useFormik, FormikProps, ErrorMessage, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { unbound, withdrawRewardDelegator } from "../../services/apis/delegator";
import { restakeDeligator } from "../../services/apis/delegator"
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
      restakeDeligator(values)
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
    <h1>account</h1>
    </>
  );
};

export default DelegatorAccount;