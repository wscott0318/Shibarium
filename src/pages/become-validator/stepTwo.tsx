import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useActiveWeb3React } from "../../services/web3";
import LoadingSpinner from "pages/components/Loading";
import * as Sentry from "@sentry/nextjs";
import { checkImageType } from "web3/commonFunctions";
import { ethers } from "ethers";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const validatorSchema = yup.object().shape({
  name: yup
    .string()
    .max(14)
    .typeError("Name must be less than 15 characters.")
    .required("Validator name is required.")
    .matches(/^[a-z\d\-_\s]+$/i, "Only alphanumeric values are allowed. "),
  publickey: yup
    .string()
    .max(143)
    .min(130, "Invalid Public key")
    .notOneOf(
      [yup.ref("address"), null],
      "Signer's address & public key should not match."
    )
    .matches(/^0x/, "Should only start with 0x.")
    .matches(/^[A-Za-z0-9 ]+$/, "No special characters allowed.")
    .required("Public key is required."),
  website: yup
    .string()
    .required("Website is required.")
    // @ts-ignore
    .test("len", "Invalid URL", (val) => val?.indexOf(".") > -1),
});

function StepTwo({
  stepState,
  stepHandler,
  becomeValidateData,
  setBecomeValidateData,
}: any) {
  const { account, library } = useActiveWeb3React();
  const [imageData, setImageData] = useState<any>(becomeValidateData.image);
  const [validation, setValidation] = useState({
    image: false,
    address: false,
  });
  const lib: any = library?.provider;
  const web3 = new Web3(lib);
  const [imageSize, setImageSize] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [userAddress, setUserAddres] = useState(account);

  useEffect(() => {
    if (account) {
      setUserAddres(account);
    }
  }, [account]);

  // console.log(userAddress, 'userAddress');

  const callAPI = async (val: any) => {
    try {
      let isValid = checkPubKey();
      if (!isValid) {
        toast.error("Invalid public key", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
      }
      console.log("isValid ", isValid);
      if (imageData) {
        setApiLoading(false);
        val.image = imageData;
        setBecomeValidateData(val);
        stepHandler("next");
      } else if (becomeValidateData.image) {
        setApiLoading(false);
        val.imageURL = becomeValidateData.image;
        setBecomeValidateData(val);
        stepHandler("next");
      } else {
        setValidation({ address: false, image: true });
      }
    } catch (err: any) {
      console.log("error call api ", err);
      Sentry.captureMessage("callAPI", err);
    }
  };

  const checkPubKey = () => {
    console.log("becomevalidator data ", becomeValidateData, values);
    const PUB_KEY = values.publickey || becomeValidateData.publickey;
    const hash = ethers.utils.keccak256(PUB_KEY);
    const address = ethers.utils.getAddress("0x" + hash.slice(24 + 2));
    console.log("address", address);
    return web3.utils.checkAddressChecksum(address);
  };
  const [initialValues, setInitialValues] = useState({
    name: "",
    publickey: "",
    website: "",
  });

  useEffect(() => {
    if (account) {
      setInitialValues(becomeValidateData);
      setBecomeValidateData(becomeValidateData);
      setValues(becomeValidateData);
    }
  }, [account]);

  const trimSpace = (e: any) => {
    try {
      setFieldValue(e.target.name, e.target.value.trim());
    } catch (err: any) {
      Sentry.captureMessage("trimSpace", err);
    }
  };

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validatorSchema,
    onSubmit: (values) => {
      console.log("values ", values);
      callAPI(values);
    },
  });

  const onImageChange = (event: any) => {
    try {
      if (event.target.files[0]?.size <= 204800) {
        setImageData(event.target.files[0]);
        setImageSize(false);
        setValidation({ address: false, image: false });
      } else if (event.target.files[0]?.size > 204800) {
        setImageSize(true);
        setValidation({ address: false, image: false });
      }
    } catch (err: any) {
      Sentry.captureMessage("onImageChange", err);
    }
  };

  const valMsg = () => {
    if (validation.image) return "Image is required.";
    else if (imageSize) return "Maximum allowed size is 200 Kb";
    return null;
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        {apiLoading && <LoadingSpinner />}
        <div className="progress-tab">
          <div className="mb-4 mb-xl-5">
            <h5 className="mb-2 fwb fw-700 ff-mos">Add node details</h5>
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
                          ? checkImageType(imageData)
                          : "../../assets/images/file-icon.png"
                      }
                      alt=""
                      className="img-fluid" // 200kb
                      width={22}
                    />
                  </div>
                  <div style={{ cursor: "pointer" }} className="file-input">
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
              <p className="primary-text error ff-mos">{valMsg()}</p>
              {imageData ? null : (
                <p className="val-logo-text">upload logo only*</p>
              )}
              {/* {validation.image ? (
            ) : imageSize ? (
              <p className="primary-text error ff-mos">
                only under 200 kb allowed
              </p>
            ) : null} */}
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
                  onBlur={trimSpace}
                />
                {touched.name && errors.name ? (
                  <p className="primary-text error ff-mos">{errors.name}</p>
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
                  onBlur={trimSpace}
                />
                {touched.website && errors.website ? (
                  <p className="primary-text error ff-mos">{errors.website}</p>
                ) : null}
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label ff-mos">
                  Staker's address
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="0xfe2f17400d4d8d24740ff8c0"
                  name="address"
                  readOnly={true}
                  value={account || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validation.address ? (
                  <p className="primary-text error ff-mos">
                    enter a valid address
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-sm-12 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label ff-mos">
                  Signer’s Public key <span className="get-info">i</span>
                  <div className="tool-desc">
                    Signer’s Public Key should be without the "0x04" prefix.
                  </div>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="0xfe2f17400d4d8d24740ff8c0"
                  name="publickey"
                  value={values.publickey}
                  onChange={handleChange}
                  onBlur={trimSpace}
                />
                {touched.publickey && errors.publickey ? (
                  <p className="primary-text error ff-mos">
                    {errors.publickey}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-4 btn-wrap col-sm-5 flx">
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
            >
              <span className="ff-mos">Next</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default StepTwo;
