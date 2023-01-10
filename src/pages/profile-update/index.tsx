/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "pages/layout/header";
import { useFormik } from "formik";
import * as yup from "yup";
import { getValidatorInfo, updateValidator } from "app/services/apis/network-details/networkOverview";
import Web3 from "web3";
import { useActiveWeb3React } from "app/services/web3";
import LoadingSpinner from 'pages/components/Loading';
import { useUserType } from "app/state/user/hooks";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Sentry from "@sentry/nextjs";

export default function ProfileUpdate() {

    const { chainId = 1, account, library } = useActiveWeb3React();
    const userAccount: any = account
    const [imageData, setImageData] = useState<any>('');
    const [imageURL, setImageURL] = useState<any>('');
    const [loader, setLoader] = useState(false)
    const [userType, setUserType] = useUserType();
    const router = useRouter()
    const [validation, setValidation] = useState({
        image: false,
        address: false,
    });
    const [imgsize, setImgsize] = useState(false)

    const callValidatorInfo = async (account: any) => {
        setLoader(true)
        try {
            await getValidatorInfo(account).then((res: any) => {
                // console.log(res.data.message.val)
                setImageURL(res.data.message.val.logoUrl)
                setValues({
                    validatorname: res.data.message.val.name,
                    address: account,
                    website: res.data.message.val.description,
                    publickey: res.data.message.val.publickey,

                })
                setLoader(false)
            })
        }
        catch (err: any) {
            setLoader(false);
            Sentry.captureException("callValidatorInfo ", err);
        }
    }
    useEffect(() => {
        if (account && userType) {
            if (userType === 'Validator') {
                callValidatorInfo(account)
            }
            else {
                router.back()
            }
        }
    }, [account, userType])

    const [initialValues, setInitialValues] = useState({
        validatorname: '',
        address: userAccount,
        website: '',
        publickey: ''
    });

    const verifyAddress = (address: any) => {
        let result = Web3.utils.isAddress(address);
        return result;
    };


    // console.log(imageData)
    const callAPI = async (values: any) => {
        console.log(values, imageData, "call API called");
        setLoader(true)
        try {
            if ((imageData || imageURL) && verifyAddress(values.address)) {
                setValidation({ image: false, address: false });
            } else if (!(imageData || imageURL) && verifyAddress(values.address)) {
                setValidation({ address: false, image: true });
            } else if ((imageData || imageURL) && !verifyAddress(values.address)) {
                setValidation({ image: false, address: true });
            }
            else {
                setValidation({ image: true, address: true });
            }
            let data = new FormData();
            data.append("validatorName", values.validatorname);
            data.append("signerAddress", values.address);
            data.append("website", values.website);
            data.append("public_key", values.publickey);
            data.append("img", imageData.image);
            if (!imgsize) {
                await updateValidator(data).then((res: any) => {
                    // console.log(res)
                    setLoader(false)
                    callValidatorInfo(values.address)
                    notify()
                }).catch((err: any) => {
                    // console.log(err)
                    setLoader(false)
                })
            } else {
                setLoader(false)

            }
        }
        catch (err: any) {
            Sentry.captureException("callAPI ", err);
        }

    };

    let schema = yup.object().shape({
        validatorname: yup.string().typeError("Name is required.").max(14,"Name must be less than 15 characters.").typeError("Name must be less than 15 characters.").required("Validator name is required.").matches(/^[a-z\d\-_\s]+$/i, "Entered wrong charactor."),
        address: yup.string().required("Address is required."),
        website: yup
            .string()
            .typeError("Website is required.")
            .url("Enter a vaild url.")
            .required("Website is required.")
            .matches(
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                "Enter a vaild url."
            ),
    });

    const { values, errors, setFieldValue, handleBlur, handleChange, handleSubmit, touched, setValues } =
        useFormik({
            initialValues: initialValues,
            validationSchema: schema,
            onSubmit: (values) => {
                callAPI(values);
            },
        });

    const notify = () => {
        toast("Profile Updated successfully!", {
            position: toast.POSITION.BOTTOM_CENTER, autoClose: 5000
        });
    }

    const imgSizeCheck = (e: any) => {
        try {

            if (e.target.files[0]?.size <= 204800) {
                setImageData({ image: e.target.files[0] });
                setImgsize(false)
            } else if(e.target.files[0]?.size > 204800){
                setImgsize(true)
            }
        }
        catch (err: any) {
            Sentry.captureException("imgSizeCheck ", err);
        }
    }
    console.log(imageURL,"image urlurl")
    console.log(imageData, "imageData API called");
    const trimSpace = (e: any) => {
        try {
          setFieldValue(e.target.name, e.target.value.trim());
        } catch (err: any) {
          Sentry.captureMessage("trimSpace", err);
        }
      };
    const getimage = () => {
        if(imageData) return URL.createObjectURL(imageData.image);
        else if(imageURL) return imageURL;
        else return "../../assets/images/file-icon.png";
    }
    let image = getimage();
    const valMsg = () => {
        if(validation.image) return 'Image is required.';
        else if (imgsize) return "Maximum allowed size is 200 Kb";
        return null;
      }
    return (
        <>
            {loader && <LoadingSpinner />}
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit oh position-relative profile">
                <Header />
                <div className="shape bottom-right">
                    <img className="img-fluid" src="../../assets/images/shape3.png" alt="shape-img" />
                </div>
                <section className="top_bnr_area dark-bg darkbg py-0">
                    <div className="container">
                        <div className="section-info ps-0 position-relative">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h1 className="text-white trs-6 fw-500 ff-mos">Update Profile</h1>
                                </div>
                                <div className="col-md-6">
                                    <div className="banner-image">
                                        <img className="img-fluid ms-auto" src="../../assets/images/banner.png" width={450} alt="banner-img" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="profile-section position-relative oh">
                    <div className="shape shap-top-left">
                        <img className="img-fluid" src="../../assets/images/shape1.png" alt="shape-img" />
                    </div>

                    <div className="container">
                        <div className="row mx-0 position-relative">
                            <div className="col-lg-8 mx-auto cus-card-800 py-3 py-sm-4 py-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="progress-tab">
                                        <div className="mb-4 mb-xl-5">
                                            <h5 className="fwb fw-700 mb-2 ff-mos">Update node details</h5>
                                            <p className="ff-mos">You can update/edit your node details for better recognizability</p>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Validator logo</label>
                                                    <div className="file-wrap">
                                                        <div className="file-icons">
                                                            <img src={image} alt="" className="img-fluid" width={22} />
                                                        </div>
                                                        <div className="file-input">
                                                            <input
                                                                type="file"
                                                                className="input-file"
                                                                accept="image/*"
                                                                // @ts-ignore
                                                                onChange={imgSizeCheck}
                                                            />
                                                            <a href="#!" className="form-control ff-mos">
                                                                Upload
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="primary-text error ff-mos">{valMsg()}</p>
                                            </div>
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Validator name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="i.e Dark Knight Ventures"
                                                        name="validatorname"
                                                        value={values.validatorname}
                                                        onChange={handleChange}
                                                        onBlur={trimSpace}
                                                    />
                                                    {touched.validatorname && errors.validatorname ? (
                                                        <p className="primary-text error ff-mos">
                                                            {/* @ts-ignore */}
                                                            {errors.validatorname}
                                                        </p>
                                                    ) : null}
                                                </div>

                                            </div>
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Website</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="https://knightventures.com"
                                                        name="website"
                                                        value={values.website}
                                                        onChange={handleChange}
                                                        onBlur={trimSpace}
                                                    />
                                                    {touched.website && errors.website ? (
                                                        <p className="primary-text error ff-mos">
                                                            {/* @ts-ignore */}
                                                            {errors.website}
                                                        </p>
                                                    ) : null}
                                                </div>

                                            </div>
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Signer’s address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
                                                        name="address"
                                                        readOnly={true}
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Signer’s Public key</label>
                                                    <input type="text" className="form-control" placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx" name="publickey" />
                                                </div>
                                            </div> */}
                                            {/* <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Commission in %</label>
                                                    <input type="text" className="form-control" name="commission" />
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="btn-wrap col-sm-5 mt-4 flx mx-auto">
                                            <button type="submit" value="submit" className="btn primary-btn w-100">
                                                <span className="ff-mos">Update</span>
                                            </button>
                                            <ToastContainer />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}