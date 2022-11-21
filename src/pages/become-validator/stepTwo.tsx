import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Web3 from "web3";
import { registerValidator } from "services/apis/network-details/networkOverview";
import { useActiveWeb3React } from "../../services/web3";
import LoadingSpinner from 'pages/components/Loading';

export const validatorSchema = yup.object().shape({
  validatorname: yup
    .string()
    .required("validator name is required")
    .matches(/^[A-Za-z][A-Za-z0-9 ]+$/, "Entered wrong charactor "),
  publickey: yup
    .string()
    .notOneOf(
      [yup.ref("address"), null],
      "Signer's address & public key should not match"
    )
    .matches(/^0x/, "should only start with 0x")
    .matches(/^[A-Za-z0-9 ]+$/,'no special characters allowed')
    .required("public key is required"),
  website: yup
    .string()
    .url()
    .required("website is required")
    .matches(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      "enter a vaild url"
    ),
  commission: yup
    .string()

    .required("commission is required")
    .matches(
      /^(?:100(?:[.,]00?)?|\d?\d(?:[.,]\d\d?)?)$/,
      "enter vaild percentage"
    ),
});

function StepTwo({
  stepState,
  stepHandler,
  becomeValidateData,
  setBecomeValidateData,
}: any) {

  const { account } = useActiveWeb3React();
  const userAddress: any = account
  const [imageData, setImageData] = useState<any>("");
  const [validation, setValidation] = useState({
    image: false,
    address: false,
  });
  const [imageSize , setImageSize ] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)

  const verifyAddress = (address: any) => {
    let result = Web3.utils.isAddress(address);
    return result;
  };

  const callAPI = async (values: any) => {
    // console.log("call API called");
    setApiLoading(true)
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

    setApiLoading(false)
    values.image = imageData
    console.log(values)
    setBecomeValidateData(values)
    stepHandler("next");
  };

  const [initialValues, setInitialValues] = useState({
    validatorname: "",
    publickey: "",
    address: userAddress,
    website: "",
    commission: "",
  });

  // console.log("Become Validate Data in Step Two", initialValues);
  useEffect(() => {
    if (becomeValidateData) {
      setInitialValues(becomeValidateData)
      setBecomeValidateData(becomeValidateData)
      setValues(becomeValidateData)
    }
  }, [])

 

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validatorSchema,
      onSubmit: (values) => {
      //console.log("Value", values);
        callAPI(values);
      },
    });

  const onImageChange = (event: any) => {
    if (event.target.files[0]?.size <= 204800) {
      setImageData(event.target.files[0])
      setImageSize(false)
  } else {
      setImageSize(true)
  }
    // console.log(event.target.files[0])
  }

  return (
    // <>
    <form onSubmit={handleSubmit}>
      {apiLoading && <LoadingSpinner />}
      <div className="progress-tab">
        <div className="mb-4 mb-xl-5">
          <h5 className="fwb fw-700 mb-2 ff-mos">Add node details</h5>
          <p className="ff-mos">
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
                    className="img-fluid" // 200kb 
                    width={22}
                  />
                </div>
                <div style={{cursor: 'pointer'}} className="file-input">
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
                <p className="primary-text error ff-mos">{errors.website}</p>
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
                <p className="primary-text error ff-mos">{errors.publickey}</p>
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
                <p className="primary-text error ff-mos">{errors.commission}</p>
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
            <span className="ff-mos">Back</span>
          </button>
          <button
            type="submit"
            value="submit"
            className="btn primary-btn w-100"
          // onClick={() => {
          //   if (
          //     Object.keys(errors).length === 0 &&
          //     Object.getPrototypeOf(errors) === Object.prototype
          //   ) {
          //     setBecomeValidateData(values)
          //     stepHandler("next");
          //   }
          // }}
          >
            <span className="ff-mos">Next</span>
          </button>
        </div>
      </div>
    </form>
    // </>
  );
}

export default StepTwo