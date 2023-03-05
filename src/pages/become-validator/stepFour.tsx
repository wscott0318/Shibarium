import { useFormik } from "formik";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatorSchema } from "./stepTwo"
import  Link  from "next/link"

function StepFour({ activInput, handleEdit, stepState, stepHandler, becomeValidateData, setBecomeValidateData, editNsave }: any) {


  const { handleSubmit} =
    useFormik({
      initialValues: becomeValidateData,
      validationSchema: validatorSchema,
      onSubmit: (values) => {
      },
    });
  return (

    <>
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="progress-tab step_4">
          <div className="mb-4 mb-xl-3">
            <h5 className="fw-700 mb-2 ff-mos">Setup complete </h5>
            <p className="ff-mos"></p>
          </div>
          <p>your details has been submitted ,
            please spin up your node </p>
          <div className="btn-wrap col-sm-5 mt-4 flx">
            <Link href='/'  passHref className="btn primary-btn w-100">
              <span className="btn primary-btn w-100"> Go to Home Page </span>
            </Link>

          </div>
        </div>
      </form>
    </>
  );
}

export default StepFour

