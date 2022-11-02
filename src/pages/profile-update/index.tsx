/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "pages/layout/header";
import StakingHeader from "pages/staking-header";
import Link from 'next/link';
import { useFormik } from "formik";
import * as yup from "yup";
import { updateValidator } from "app/services/apis/network-details/networkOverview";
import Web3 from "web3";
import { useActiveWeb3React } from "app/services/web3";


export default function ProfileUpdate() {

    const { chainId = 1, account, library } = useActiveWeb3React();
    const userAccount : any = account
    const [imageData, setImageData] = useState<any>("");
    const [validation, setValidation] = useState({
      image: false,
      address: false,
    });

    const [initialValues, setInitialValues] = useState({
        validatorname: "",
        address: userAccount,
        website: "",
      });

    const verifyAddress = (address: any) => {
        let result = Web3.utils.isAddress(address);
        return result;
      };

    const callAPI = async (values: any) => {
        console.log(values , imageData ,"call API called");
        if (imageData && verifyAddress(values.address)) {
          setValidation({ image: false, address: false });
          console.log("1");
        } else if (!imageData && verifyAddress(values.address)) {
          setValidation({ address: false, image: true });
          console.log("2");
        } else if (imageData && !verifyAddress(values.address)) {
          setValidation({ image: false, address: true });
          console.log("3");
        } else {
          setValidation({ image: true, address: true });
        }
    
//         curl --location --request PUT 'http://18.216.5.132:3000/api/v1/validators/update' \
// --form '_public_key="0x123456"' \
// --form '_validatorName="abc"' \
// --form '_website="google.com"' \
// --form '_img=@"/C:/Users/a8571/OneDrive/Pictures/Screenshots/abc5.png"'




        var data = new FormData();
        data.append("_validatorName", values.validatorname);
        data.append("_public_key", values.address);
        data.append("_website", values.website);
        // data.append("commission", values.commission);
        data.append("img", imageData.image);
    
        await updateValidator(data).then((res :any) => {
          console.log(res)
        }).catch((err:any) => {
          console.log(err)
        })
    
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

      const { values, errors, handleBlur, handleChange, handleSubmit, touched,setValues } =
      useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: (values) => {
          console.log("Value", values);
          callAPI(values);
        },
      });
  
    console.log("image", imageData.name);

    return (
        <>
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg ffms-inherit">
            <Header />
                <section className="top_bnr_area dark-bg darkbg py-4 py-md-5">
                    <div className="container">
                        <div className="section-info ps-0 position-relative">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h1 className="text-white trs-6 fw-500 ff-mos">Update Profile</h1>
                                </div>
                                <div className="col-md-6">
                                    <div className="banner-image">
                                        <img className="img-fluid ms-auto" src="../../images/shiba-img.png" width={350} alt="banner-img" />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
                <section className="rewards-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto cus-card-800 py-3 py-sm-4 py-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="progress-tab">
                                        <div className="mb-4 mb-xl-5">
                                            <h5 className="fwb fw-700 mb-2 ff-mos">Add node details</h5>
                                            <p className="ff-mos">Please provide your node details for better recognizability</p>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 form-grid">
                                                <div className="form-group">
                                                    <label className="form-label ff-mos">Validator logo</label>
                                                    <div className="file-wrap">
                                                        <div className="file-icons">
                                                            <img  src={
                                                                imageData
                                                                    ? URL.createObjectURL(imageData.image)
                                                                    : "../../assets/images/file-icon.png"
                                                                } alt="" className="img-fluid" width={22} />
                                                        </div>
                                                        <div className="file-input">
                                                        <input
                                                        type="file"
                                                        className="input-file"
                                                        accept="image/*"
                                                        // @ts-ignore
                                                        onChange={(e) => setImageData({image: e.target.files[0], name: e.target.files[0].name})}
                                                        />
                                                        <a href="#!" className="form-control ff-mos">
                                                        Upload
                                                        </a>
                                                    </div>
                                                    </div>
                                                </div>
                                                {validation.image ? (
                                                    <p className="primary-text error ff-mos">image is required</p>
                                                    ) : null}
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
                                                </div>
                                                {touched.validatorname && errors.validatorname ? (
                                                <p className="primary-text error ff-mos">
                                                    {errors.validatorname}
                                                </p>
                                                ) : null}
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
                                                </div>
                                                {touched.website && errors.website ? (
                                                    <p className="primary-text error ff-mos">{errors.website}</p>
                                                    ) : null}
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
