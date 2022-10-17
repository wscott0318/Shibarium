import { useFormik } from "formik";
import * as yup from "yup";

function StepTwo({stepState,stepHandler}:any) {

  const initialValues = {
    image:"",
    validatorname:"",
    publickey:"",
    address:"",
    website:"",
    commission:""
  };
  let schema = yup.object().shape({
    image: yup.string().required(),
    validatorname: yup.string().required(),
    publickey: yup.string().email().required(),
    address: yup.number().required(),
    website: yup.string().url().required(),
    commission: yup.number().required().positive().integer(),
  });

  const {values,errors,handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema:schema,
    onSubmit: (values) => {
      console.log("Value", values);
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
                      values.image
                        ? values.image
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
                    name="image"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <a href="#!" className="form-control">
                    Upload
                  </a>
                </div>
              </div>
              <p className="error">{errors.image}</p>
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
            <p className="error">{errors.validatorname}</p>
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
            <p className="error">{errors.website}</p>
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
            <p className="error">{errors.address}</p>
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
            <p className="error">{errors.publickey}</p>
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
            <p className="error">{errors.commission}</p>
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