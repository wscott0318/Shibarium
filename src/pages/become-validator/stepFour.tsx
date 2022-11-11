import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Web3 from "web3";
import LoadingSpinner from 'pages/components/Loading';
import { registerValidator } from "services/apis/network-details/networkOverview";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatorSchema } from "./stepTwo"

function StepFour({ activInput, handleEdit, stepState, stepHandler, becomeValidateData, setBecomeValidateData, editNsave }: any) {

  const [imageData, setImageData] = useState<any>(becomeValidateData?.image)
  const [imageSize , setImageSize ] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)
  const [validation, setValidation] = useState({
    image: false,
    address: false,
  });

  const verifyAddress = (address: any) => {
    let result = Web3.utils.isAddress(address);
    return result;
  };


  const callAPI = async (values: any) => {
    setApiLoading(true)
    console.log("call API called");
    if (imageData && verifyAddress(values.address)) {
      setValidation({ image: false, address: false });
      // console.log("1");
    } else if (!imageData && verifyAddress(values.address)) {
      setValidation({ address: false, image: true });
      // console.log("2");
    } else if (imageData && !verifyAddress(values.address)) {
      setValidation({ image: false, address: true });
      // console.log("3");
    } else {
      setValidation({ image: true, address: true });
    }

    var data = new FormData();
    data.append("validatorName", values.validatorname);
    data.append("public_key", values.publickey);
    data.append("signerAddress", values.address);
    data.append("website", values.website);
    data.append("commission", values.commission);
    data.append("img", values.image);

    await registerValidator(data).then((res: any) => {
      console.log("this is eresss",res)
      setApiLoading(false)
      notifySuccess()
      // setBecomeValidateData(values)
      // stepHandler("next");
      
    }).catch((err: any) => {
      console.log(err)
      notifyError()
      setApiLoading(false)
    })
  };

  const notifyError = () => {
    // toast("Profile Updated successfully");
    // toast("Updated successfully!", {
    //     position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000
    // });
    toast.error('Error In Updating !', {
      position: toast.POSITION.BOTTOM_CENTER ,autoClose: 3000
  });
  }
  const notifySuccess = () => {
    // toast("Profile Updated successfully");
    // toast("Updated successfully!", {
    //     position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000
    // });
    toast.success('Updated successfully !', {
      position: toast.POSITION.BOTTOM_CENTER ,autoClose: 3000
  });
  }
  const onImageChange = (event: any) => {
    if (event.target.files[0]?.size <= 204800) {
      setImageData(event.target.files[0])
      setImageSize(false)
  } else {
      setImageSize(true)
  }
  }

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setValues } =
    useFormik({
      initialValues: becomeValidateData,
      validationSchema: validatorSchema,
      onSubmit: (values) => {
        // console.log("Value", values);
        callAPI(values);
      },
    });
  return (

    <>
      {apiLoading && <LoadingSpinner />}
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="progress-tab">
          <div className="mb-4 mb-xl-5">
            <h5 className="fw-700 mb-2 ff-mos">Check complete detail</h5>
            <p className="ff-mos">Please confirm your details and submit</p>
          </div>
          <div className="row">
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Validator logo
              </label>
              <div className="file-wrap">
                <div className="file-icons">
                  <img
                    src={imageData ? URL.createObjectURL(imageData) : values.image ? URL.createObjectURL(values.image) : "../../assets/images/file-icon.png"}
                    //  src={ "../../assets/images/file-icon.png"}
                    alt=""
                    className="img-fluid" // 200kb 
                    width={22}
                  />
                </div>
                <div className="file-input">
                  <input
                    type="file"
                    className="input-file"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                   <p  className="form-control ff-mos">
                   {imageData ? "Change": "Upload"}
                  </p>
                </div>
              </div>
            </div>
            {validation.image ? (
              <p className="primary-text error ff-mos">image is required</p>
            ) : imageSize ? <p className="primary-text error ff-mos" >only under 200 kb allowed</p> : null}
          </div>

          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Validator name
              </label>

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
              <label htmlFor="" className="form-label ff-mos">
                Website
              </label>
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
              <label htmlFor="" className="form-label ff-mos">
                Signer’s address
              </label>
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
              {validation.address ? (
                <p className="primary-text error ff-mos">enter a valid address</p>
              ) : null}
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Signer’s Public key
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="01rwetk5y9d6a3d59w2m5l9u4x256xx"
                name="publickey"
                value={values.publickey}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.publickey && errors.publickey ? (
                <p className="primary-text error ff-mos">
                  {/* @ts-ignore */}
                  {errors.publickey}
                  </p>
              ) : null}
            </div>
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Commission in %
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="10"
                name="commission"
                value={values.commission}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.commission && errors.commission ? (
                <p className="primary-text error ff-mos">
                  {/* @ts-ignore */}
                  {errors.commission}
                  </p>
              ) : null}
            </div>
          </div>
        </div>
          <div className="btn-wrap col-sm-5 mt-4 flx">
            <button
              type="button"
              className="btn grey-btn w-100"
              onClick={() => stepHandler("back")}
            >
              <span className="ff-mos">
                Back
              </span>
            </button>
            <button type="submit" className="btn primary-btn w-100">
              <span className="ff-mos">Save</span>
            </button>

          </div>
        </div>
      </form>
    </>
  );
}

export default StepFour

