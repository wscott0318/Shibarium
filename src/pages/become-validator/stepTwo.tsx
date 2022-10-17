import { useFormik } from "formik";
import React, {useState} from "react";
import * as yup from "yup";
import Web3 from "web3";

function StepTwo({stepState,stepHandler}:any) {

  const [imageData, setImageData] = useState<any>("");
  const [validation, setValidation] = useState({
    image: false,
    address: false
  })

  
  const verifyAddress = (address: any) => {
    let result = Web3.utils.isAddress(address)
    return result
  }

  const callAPI = (values: any) => {
    if(imageData && verifyAddress(values.address)){
      setValidation({image: false, address: false})
    } else if (!imageData && verifyAddress(values.address)) {
      setValidation((pre:any) => ({...pre, image: true}))
    } else if (imageData && !verifyAddress(values.address)){
      setValidation((pre:any) => ({...pre, address: true})) 
    }
  }

  const initialValues = {
    validatorname:"",
    publickey:"",
    address:"",
    website:"",
    commission:""
  };
  let schema = yup.object().shape({
    validatorname: yup.string().required("validator name is required"),
    publickey: yup.string().required("public key is required"),
    address: yup.string().required("address is required"),
    website: yup.string().required("website is required"),
    commission: yup.string().required("commission is required"),
  });

  const {values,errors,handleBlur,handleChange,handleSubmit, touched} = useFormik({
    initialValues: initialValues,
    validationSchema:schema,
    onSubmit: (values) => {
      console.log("Value", values);
      callAPI(values)
    },
  });


  return (
    // <>
    <form onSubmit={handleSubmit}>
      <div className="progress-tab">
        <div className="mb-4 mb-xl-5">
          <h5 className="fwb fw-700 mb-2">Add node details</h5>
          <p className="">
            Please provide your node details for better recognizability
          </p>
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
                    src={
                      imageData
                        ? URL.createObjectURL(imageData)
                        : "../../assets/images/file-icon.png"
                    }
                    alt=""
                    className="img-fluid"
                    width={22}
                  />
                </div>
                <div className="file-input">
                  <input
                    type="file"
                    className="input-file"
                    accept="image/*"
                    // @ts-ignore
                    onChange={(e) => setImageData(e.target.files[0])}
                  />
                  <a href="#!" className="form-control">
                    Upload
                  </a>
                </div>
                {validation.image ? <p className="primary-text error">image is required</p> : null}
              </div>
            </div>
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
            </div>
            {touched.validatorname && errors.validatorname ? <p className="primary-text error">{errors.validatorname}</p> : null}
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
            </div>
           {touched.website && errors.website ? <p className="primary-text error">{errors.website}</p> : null}
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
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.address &&  errors.address ? <p className="primary-text error">{errors.address}</p> : null}
            {validation.address ? <p className="primary-text error">enter a valid address</p> : null}
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
            </div>
            {touched.publickey && errors.publickey ?  <p className="primary-text error">{errors.publickey}</p> : null}
          </div>
          <div className="col-sm-6 form-grid">
            <div className="form-group">
              <label htmlFor="" className="form-label ff-mos">
                Comission in %
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
            </div>
            {touched.commission && errors.commission ?  <p className="primary-text error">{errors.commission}</p> : null}
          </div>
        </div>
        <div className="btn-wrap col-sm-3 mt-4 ">
          <button
            type="submit"
            value="submit"
            className="btn primary-btn w-100"
            // onClick={stepHandler}
          >
            <span className="ff-mos">{!stepState.step4 ? "Next" : "Save"}</span>
          </button>
        </div>
      </div>
    </form>
    // </>
  );
}

export default StepTwo