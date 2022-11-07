/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { getValidatorInfo } from "../../services/apis/network-details/networkOverview";
import { useActiveWeb3React } from "../../services/web3"
import Header from "../layout/header";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";
import { useEffect } from "react";


const Rewards = () => {

  const { chainId = 1, account, library } = useActiveWeb3React();
  const [loader, setLoader] = useState(false);
  const [ nodeExist, setNodeExist] = useState({});


  useEffect(() => {
    if(account) {
      callValidatorInfo(account)
    }
    if(Object.values(nodeExist).length){
      setStepState({
        step1:false,
        step2:false,
        step3:true,
        step4:false,
      })
    }
  },[account])

  console.log(nodeExist, "api call ===> ")

  const userAddress = account
  const [activInput, setActivInput] = useState({
    name: false,
    website: false,
    comission: false,
  });

  const [stepState,setStepState]=useState({
    step1:true,
    step2:false,
    step3:false,
    step4:false,
  })
  const [becomeValidateData,setBecomeValidateData] = useState({
    validatorname: "",
    publickey: "",
    address: userAddress,
    website: "",
    commission: "",
  });
  // console.log("Become Validate Data in Parent",becomeValidateData)
  
  const handleEdit = (value) => {
    switch (value) {
      case "name":
        setActivInput((activInput) => ({
          ...activInput,
          name: !activInput.name,
          website: false,
          comission: false,
        }));
        break;
      case "website":
        setActivInput((activInput) => ({
          ...activInput,
          name: false,
          website: !activInput.website,
          comission: false,
        }));
        break;
      case "comission":
        setActivInput((activInput) => ({
          ...activInput,
          name: false,
          website: false,
          comission: !activInput.comission,
        }));
        break;
      default:
        break;
    }
  };

  const stepHandler = (type) => {
    if(type==="next")
    {
      if(stepState.step1)
    {
      setStepState({
        ...stepState,
        step1:false,
        step2:true
      })
    }
    else if (stepState.step2) {
      setStepState({
        ...stepState,
        step2: false,
        step3: true,
      });
    }
    if (stepState.step3) {
      setStepState({
        ...stepState,
        step3: false,
        step4: true,
      });
    }
  }
  else if( type === "back")
  {
    if (stepState.step4) {
      setStepState({
        ...stepState,
        step4: false,
        step3: true,
      });
    } else if (stepState.step3) {
      setStepState({
        ...stepState,
        step3: false,
        step2: true,
      });
    }
    if (stepState.step2) {
      setStepState({
        ...stepState,
        step2: false,
        step1: true,
      });
    }
  }
  }

  const callValidatorInfo = async (account) => {
    console.log("api called ====> ")
    setLoader(true)
    await getValidatorInfo(account).then((res) => {
        console.log(res.data.message.val_info[0])
        setNodeExist(res.data.message.val_info[0])
        setLoader(false)
    }).catch((err) => {
        console.log(err)
        setLoader(false)
    })

}

  return (
    <>
     <Header />
      <main className="main-content dark-bg-800 full-vh  cmn-input-bg ffms-inherit staking-main">
        
        {/* <StakingHeader /> */}
        <section className="top_bnr_area dark-bg darkbg py-4 py-md-5 mn-ht">
          <div className="container">
          <div className="section-info"><h1 className="text-white trs-6 fw-500 ff-mos">
              Become a validator
            </h1>
            </div>
          </div>
        </section>
        {/*  Rewards section start */}
        <section className="rewards-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 validator-steps">
                <ul className="step-vertical">
                  <li className="step-list active completed">
                    <p className="light-text fw-700 ff-mos">Setup Node</p>
                    <div className="step-blk step-float">
                      <span className="fw-700 step-num ff-mos">1</span>
                      <img
                        className="img-fluid tick-img"
                        src="../../images/green-tick.png"
                        alt=""
                        width={20}
                      />
                    </div>
                  </li>
                  <li
                    className={`step-list ${
                      !stepState.step1 && "active completed"
                    }`}
                  >
                    <p className="light-text fw-600 ff-mos">Add Node Detail</p>
                    <div className="step-blk step-float">
                      <span className="fw-700 step-num ff-mos">2</span>
                      <img
                        className="img-fluid tick-img"
                        src="../../images/green-tick.png"
                        alt=""
                        width={20}
                      />
                    </div>
                  </li>
                  <li
                    className={`step-list ${
                      (stepState.step3 || stepState.step4) && "active completed"
                    }`}
                  >
                    <p className="light-text fw-600 ff-mos">Add Your Stake</p>
                    <div className="step-blk step-float">
                      <span className="fw-700 step-num ff-mos">3</span>
                      <img
                        className="img-fluid tick-img"
                        src="../../images/green-tick.png"
                        alt=""
                        width={20}
                      />
                    </div>
                  </li>
                  <li
                    className={`step-list ${
                      stepState.step4 && "active completed"
                    }`}
                  >
                    <p className="light-text fw-600 ff-mos">Completed</p>
                    <div className="step-blk step-float">
                      <span className="fw-700 step-num ff-mos">4</span>
                      <img
                        className="img-fluid tick-img"
                        src="../../images/green-tick.png"
                        alt=""
                        width={20}
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-8">
                {/* step 1 start*/}
                {stepState.step1 && (
                  <StepOne stepHandler={stepHandler} stepState={stepState} />
                )}
                {/* step 1 end */}

                {/* step 2  start */}
                {stepState.step2 && (
                  <StepTwo
                    stepHandler={stepHandler}
                    stepState={stepState}
                    becomeValidateData={becomeValidateData}
                    setBecomeValidateData={setBecomeValidateData}
                  />
                )}
                {/* step 2 end */}

                {/* step 3 start */}

                {stepState.step3 && (
                  <StepThree stepHandler={stepHandler} stepState={stepState} />
                )}

                {/* step 3 end */}

                {/* step 4 start */}
                {stepState.step4 && (
                  <StepFour
                    activInput={activInput}
                    handleEdit={handleEdit}
                    stepHandler={stepHandler}
                    stepState={stepState}
                  />
                )}

                {/* step 4 end */}
                {/* <div className="btn-wrap col-sm-3 mt-4 ">
                  <button
                    type="button"
                    className="btn primary-btn w-100"
                    onClick={stepHandler}
                  >
                    <span className="ff-mos">
                      {!stepState.step4 ? "Next" : "Save"}
                    </span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/*  Rewards section end */}
      </main>
    </>
  );
};

export default Rewards;
