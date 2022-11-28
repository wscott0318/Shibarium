import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Web3 from "web3";
import { getValidatorInfo, registerValidator } from "services/apis/network-details/networkOverview";
import { useActiveWeb3React } from "../../services/web3";
import LoadingSpinner from 'pages/components/Loading';
import * as Sentry from "@sentry/nextjs";

export const validatorSchema = yup.object().shape({
  name: yup
    .string()
    .max(14).typeError("name must be less than 15 characters")
    .required("validator name is required")
    .matches(/^[A-Za-z][A-Za-z0-9 ]+$/, "only alphabets & digits are allowed "),
  publickey: yup
    .string()
    .max(143)
    .notOneOf(
      [yup.ref("address"), null],
      "Signer's address & public key should not match"
    )
    .matches(/^0x/, "should only start with 0x")
    .matches(/^[A-Za-z0-9 ]+$/, 'no special characters allowed')
    .required("public key is required"),
  website: yup
    .string()
    .url("enter a vaild url")
    .required("website is required")
    .matches(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      "enter a vaild url with 'https://' or 'http://' at start "
    ),
});

function StepTwo({
  stepState,
  stepHandler,
  becomeValidateData,
  setBecomeValidateData,
}: any) {

  const { account } = useActiveWeb3React();
  const [imageData, setImageData] = useState<any>("");
  const [validation, setValidation] = useState({
    image: false,
    address: false,
  });
  const [imageSize, setImageSize] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)
  const [userAddress, setUserAddres] = useState(account)

  const verifyAddress = (address: any) => {
    try {
      let result = Web3.utils.isAddress(address);
      return result;
    }
    catch (err: any) {
      Sentry.captureMessage("New Error ", err);
    }
  };

  // const getValInfo = () => {
  //   let id : any = account
  //   getValidatorInfo(id.toLowerCase()).then((res : any) => {
  //     console.log(res.data.message.val, " vall inffoo ===> ")
  //     setValues('name', res?.data?.message?.val?.name)
  //     setValues('publickey', res.data.message.val.publickey)
  //     setValues('website', res.data.message.val.description)
  //   }).catch((err : any) => {
  //     console.log(err)
  //   })
  // }


  useEffect(() => {
    if (account) {
      setUserAddres(account)
      // getValInfo()
      // setValues('address', account)
    }
  }, [account])

  const callAPI = async (val: any) => {
    // console.log("call API called");
    try {
      if (imageData) {
        setApiLoading(false)
        val.image = imageData
        console.log(val)
        setBecomeValidateData(val)
        stepHandler("next");
      } else {
        console.log("image not valid");
        setValidation({ address: false, image: true })
      }
    }
    catch (err: any) {
      Sentry.captureMessage("New Error ", err);
      console.log("image vaild");
    };
  }

  const [initialValues, setInitialValues] = useState({
    name: "",
    publickey: "",
    website: "",
  });

  // console.log("Become Validate Data in Step Two", initialValues);
  useEffect(() => {
    if (account) {
      console.log(becomeValidateData, Object.values(becomeValidateData), "data ")
      setInitialValues(becomeValidateData)
      setBecomeValidateData(becomeValidateData)
      setValues(becomeValidateData)
    }
  }, [account])



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
    try {
      if (event.target.files[0]?.size <= 204800) {
        setImageData(event.target.files[0])
        setImageSize(false)
        setValidation({ address: false, image: false })
      } else {
        setImageSize(true)
      }
    }
    catch (err: any) {
      Sentry.captureMessage("New Error ", err);
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
                        ? URL.createObjectURL(imageData) :
                        becomeValidateData.image ? becomeValidateData.image  
                        : "../../assets/images/file-icon.png"
                    }
                    alt=""
                    className="img-fluid" // 200kb 
                    width={22}
                  />
                </div>
                <div style={{ cursor: 'pointer' }} className="file-input">
                  <input
                    type="file"
                    className="input-file"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                  <p className="form-control ff-mos">
                    {imageData ? "Change" : "Upload"}
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
                placeholder="i.e Dark Ventures"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? (
                <p className="primary-text error ff-mos">
                  {errors.name}
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
                placeholder="0xfe2f17400d4d8d24740ff8c0"
                name="address"
                readOnly={true}
                value={account || ''}
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
                placeholder="0xfe2f17400d4d8d24740ff8c0"
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