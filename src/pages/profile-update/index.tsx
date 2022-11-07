/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Link from 'next/link';
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
        await getValidatorInfo(account).then((res: any) => {
            console.log(res.data.message.val_info[0])
            setImageURL(res.data.message.val_info[0].img)
            setValues({
                validatorname: res.data.message.val_info[0].validatorName,
                address: account,
                website: res.data.message.val_info[0].website,
            })
            setLoader(false)
        }).catch((err: any) => {
            console.log(err)
        })
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
    });

    const verifyAddress = (address: any) => {
        let result = Web3.utils.isAddress(address);
        return result;
    };


    // console.log(imageData)
    const callAPI = async (values: any) => {
        // console.log(values, imageData, "call API called");
        setLoader(true)
        if ((imageData || imageURL) && verifyAddress(values.address)) {
            setValidation({ image: false, address: false });
            // console.log("1");
        } else if (!(imageData || imageURL) && verifyAddress(values.address)) {
            setValidation({ address: false, image: true });
            // console.log("2");
        } else if ((imageData || imageURL) && !verifyAddress(values.address)) {
            setValidation({ image: false, address: true });
            // console.log("3");
        }
        else {
            setValidation({ image: true, address: true });
        }
        var data = new FormData();
        data.append("_validatorName", values.validatorname);
        data.append("signer_Address", values.address);
        data.append("_website", values.website);
        data.append("_img", imageData.image);
        if(!imgsize)
        {
            await updateValidator(data).then((res: any) => {
            console.log(res)
            setLoader(false)
            callValidatorInfo(values.address)
            notify()
        }).catch((err: any) => {
            console.log(err)
            setLoader(false)
        })
    }else{
        setLoader(false)
        
    }

    };

    let schema = yup.object().shape({
        validatorname: yup.string().required("validator name is required"),
        address: yup.string().required("address is required"),
        website: yup
            .string()
            .required("website is required")
            .matches(
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                "enter a vaild url"
            ),
    });

    const { values, errors, handleBlur, handleChange, handleSubmit, touched, setValues } =
        useFormik({
            initialValues: initialValues,
            validationSchema: schema,
            onSubmit: (values) => {
                console.log("Value", values);
                callAPI(values);
            },
        });

    const notify = () => {
        // toast("Profile Updated successfully");
        toast("Profile Updated successfully!", {
            position: toast.POSITION.BOTTOM_CENTER, autoClose: 5000
        });
    }

    const imgSizeCheck = (e: any) => {
        if (e.target.files[0]?.size <= 204800) {
            setImageData({ image: e.target.files[0] });
            setImgsize(false)
        } else {
            setImgsize(true)
        }

    }

    return (
        <>
            {loader && <LoadingSpinner />}
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit oh position-relative">
                <Header />
                <div className="shape bottom-right">
                    <img className="img-fluid" src="../../images/shape3.png" alt="shape-img" />
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
                                        <img className="img-fluid ms-auto" src="../../images/banner.png" width={450} alt="banner-img" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="profile-section position-relative oh">
                    <div className="shape shap-top-left">
                        <img className="img-fluid" src="../../images/shape1.png" alt="shape-img" />
                    </div>

                    <div className="container">
                        <div className="row mx-0 position-relative">
                            <div className="col-lg-8 mx-auto cus-card-800 py-3 py-sm-4 py-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="progress-tab">
                                        <div className="mb-4 mb-xl-5">
                                            <h5 className="fwb fw-700 mb-2 ff-mos">Update node details</h5>
                                            <p className="ff-mos">You can update your node details for better recognizability</p>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Validator logo</label>
                                                    <div className="file-wrap">
                                                        <div className="file-icons">
                                                            <img src={imageData ? URL.createObjectURL(imageData.image)
                                                                : imageURL ? imageURL : "../../assets/images/file-icon.png"
                                                            } alt="" className="img-fluid" width={22} />
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

                                                {validation.image ? (
                                                    <p className="primary-text error ff-mos">image is required</p>
                                                ) : imgsize ? <p className="primary-text error ff-mos" >only under 200 kb allowed</p> : null}
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
                                                        onBlur={handleBlur}
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
                                                        onBlur={handleBlur}
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