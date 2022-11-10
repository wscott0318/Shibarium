import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Web3 from "web3";
import LoadingSpinner from 'pages/components/Loading';
import { registerValidator } from "services/apis/network-details/networkOverview";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StepFour({ activInput, handleEdit, stepState, stepHandler, becomeValidateData, setBecomeValidateData, editNsave }: any) {

  console.log("becaome validate dataa", becomeValidateData)
  const [imageData, setImageData] = useState<any>({})
  const [stakeamount, setStakeamount] = useState('')
  const [apiLoading, setApiLoading] = useState(false)
  const [validation, setValidation] = useState({
    image: false,
    address: false,
  });

  function urltoFile(url: any, filename: any, mimeType: any) {
    console.log(filename, url, mimeType, "the file name is here")
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })

    );

  }

  useEffect(() => {
    const imageData = JSON.parse(localStorage.getItem('imageData') || "{}");
    if (imageData) {
      setImageData(imageData);
    }

    let stakeamount = localStorage.getItem('stakeamount');
    if (stakeamount) {
      setStakeamount(stakeamount);
    }
    console.log("stake amount ", stakeamount)
  }, []);

  const verifyAddress = (address: any) => {
    let result = Web3.utils.isAddress(address);
    return result;
  };


  const callAPI = async (values: any) => {
    setApiLoading(true)
    console.log("hiiii")
    console.log("call API called");
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
    // setBecomeValidateData(values)
    // stepHandler("next");

    var data = new FormData();
    data.append("validatorName", values.validatorname);
    data.append("public_key", values.publickey);
    data.append("signerAddress", values.address);
    data.append("website", values.website);
    data.append("commission", values.commission);
    data.append("img", imageData.image);

    await registerValidator(data).then((res: any) => {
      console.log("this is eresss",res)
      setApiLoading(false)
      // setBecomeValidateData(values)
      // stepHandler("next");
      notify()

    }).catch((err: any) => {
      console.log(err)
      setApiLoading(false)
    })
     
    

  };

  const notify = () => {
    toast("Profile Updated successfully");
    // toast("Profile Updated successfully!", {
    //     position: toast.POSITION.BOTTOM_CENTER, autoClose: 3000
    // });
  }

  let schema = yup.object().shape({
    validatorname: yup.string().required("validator name is required"),
    publickey: yup.string().required("public key is required"),
    // address: yup.string().required("address is required"),
    website: yup
      .string()
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

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setValues } =
    useFormik({
      initialValues: becomeValidateData,
      validationSchema: schema,
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
                <label htmlFor="" className="form-label d-block ff-mos">
                  Validator logo
                </label>
                <div className="icon-wrap">
                  <img
                    className="img-fluid"
                    src={imageData
                      ? imageData.path
                      : "../../assets/images/file-icon.png"}
                    alt="logo"
                    width={20}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label d-block ff-mos">
                  Signer’s address
                </label>
                <label htmlFor="" className="form-value ff-mos">
                  {becomeValidateData.address}
                </label>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="form-label ff-mos">
                    Validator name
                  </label>
                  <a
                    className="primary-text trs-3 ff-mos"
                    href="#!"
                    onClick={() => { handleEdit("name") }}
                  >
                    {editNsave && activInput.name ? "Save" : "Edit"}
                  </a>
                </div>
                <div className="input-wrap">
                  <label htmlFor="" className="form-value ff-mos">
                    {(becomeValidateData.validatorname != values.validatorname) ? values.validatorname : becomeValidateData.validatorname}
                  </label>
                  {activInput.name ? (
                    <>
                      <input
                        type="text"
                        className="form-control edit-input show"
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
                    </>
                  ) : (
                    ""
                  )}
                  {/* <input
                                   ref={ref}
                                    type="text"
                                    className="form-control edit-input show"
                                     //   className={`form-control edit-input ${
                                    //     activInput.name ? "show" : ""
                                    //   }`}
                                    placeholder="i.e Dark Knight Ventures"
                                  /> */}
                </div>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label d-block ff-mos">
                  Signer’s public key
                </label>
                <label htmlFor="" className="form-value ff-mos">
                  {becomeValidateData.publickey}
                </label>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="form-label ff-mos">
                    Website
                  </label>

                  <a
                    className="primary-text trs-3 ff-mos"
                    href="#!"
                    onClick={() => { handleEdit("website") }}
                  >
                    {editNsave && activInput.website ? "Save" : "Edit"}
                  </a>
                </div>
                <div className="input-wrap">
                  <label htmlFor="" className="form-value ff-mos">
                    {(becomeValidateData.website! = values.website) ? values.website : becomeValidateData.website}
                  </label>
                  {activInput.website ? (<>
                    <input
                      type="text"
                      className="form-control edit-input show"
                      placeholder="i.e Dark Knight Ventures"
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
                  </>
                  ) : (
                    ""
                  )}
                  {/* <input
                                    type="text"
                                    //   className={`form-control edit-input ${
                                    //     activInput.website ? "show" : ""
                                    //   }`}
                                    className="form-control edit-input show"
                                    placeholder="i.e Dark Knight Ventures"
                                  /> */}
                </div>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <label htmlFor="" className="form-label d-block ff-mos">
                  Stake amount
                </label>
                <label htmlFor="" className="form-value ff-mos">
                  {stakeamount}

                </label>
              </div>
            </div>
            <div className="col-sm-6 form-grid">
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="" className="form-label ff-mos">
                    Comission in %
                  </label>
                  <a
                    className="primary-text trs-3 ff-mos"
                    href="#!"
                    onClick={() => handleEdit("comission")}
                  >
                    {editNsave && activInput.comission ? "Save" : "Edit"}
                  </a>
                </div>
                <div className="input-wrap">
                  <label htmlFor="" className="form-value ff-mos">
                    {(becomeValidateData.commission != values.commission) ? values.commission : becomeValidateData.commission}
                  </label>
                  {activInput.comission ? (<>
                    <input
                      type="text"
                      className="form-control edit-input show"
                      placeholder="i.e Dark Knight Ventures"
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
                    ) : null}</>
                  ) : (
                    ""
                  )}
                  {/* <input
                                    type="text"
                                    className="form-control edit-input show"
                                  //   className={`form-control edit-input ${
                                  //     activInput.comission ? "show" : ""
                                  //   }`}
                                    placeholder="i.e Dark Knight Ventures"
                                  /> */}
                </div>
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

