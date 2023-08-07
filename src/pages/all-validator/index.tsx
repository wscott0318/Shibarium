/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import Valitotors from "./valitotors";
import {
  useUserType,
  useValCount,
  useValId,
  useValThreshold,
} from "app/state/user/hooks";
import { useRouter } from "next/router";
import { useActiveWeb3React } from "../../services/web3";
import { getValidatorInfo } from "app/services/apis/network-details/networkOverview";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { dynamicChaining } from "web3/DynamicChaining";
import { L1Block, ChainId } from "app/hooks/L1Block";
import * as Sentry from "@sentry/nextjs";

export const Allvalidator: React.FC = () => {
  const [userType, setUserType] = useUserType(); // NOSONAR
  const { account, chainId = 1 } = useActiveWeb3React();
  const myRef = useRef<any>(null);
  const router = useRouter();
  const executeScroll = () => myRef.current.scrollIntoView();
  const [nodeSetup, setNodeSetup] = useState<any>("");
  const [validatorThreshold, setValidatorThreshold] = useValThreshold();
  const [valInfoLoader, setValInfoLoader] = useState(true);
  const [valId, setValId] = useValId(); // NOSONAR
  const [totalValCount, setTotalValCount] = useValCount();

  const getValInfo = () => {
    try {
      const valData = JSON.parse(localStorage.getItem("valInfo") || "{}");
      if (Object.keys(valData).length) {
        setNodeSetup(valData.status);
      } else {
        let id: any = account;
        getValidatorInfo(id)
          .then((res: any) => {
            setNodeSetup(
              res.data.message.val?.status ? res.data.message.val?.status : null
            );
            setValInfoLoader(false);
            localStorage.setItem(
              "valInfo",
              JSON.stringify(res.data.message.val)
            );
          })
          .catch((err) => {});
      }
    } catch (err: any) {
      setValInfoLoader(false);
      Sentry.captureMessage("getValCount", err);
    }
  };

  useEffect(() => {
    if (account) {
      getValInfo();
    }
  }, [account]);

  const renderButtons = () => {
    if (account && !valInfoLoader) {
      if (userType === "Validator") {
        if (nodeSetup == "1" || nodeSetup == "3" || nodeSetup == "2") {
          console.log("here in if");
          return null;
        } else {
          console.log("here in else");
          return (
            <div className="btns-sec btn-width">
              <div className="btns-wrap">
                <button
                  disabled={
                    +totalValCount <= +validatorThreshold ? false : true
                  }
                  onClick={() => {
                    router
                      .push("/become-validator")
                      .then(() => {})
                      .catch(() => {});
                  }}
                  className={`${
                    +totalValCount >= +validatorThreshold ? "d-none" : ""
                  } btn primary-btn`}
                >
                  Become a Validator
                </button>
              </div>
              <div className="btns-wrap">
                <button
                  // onClick={()=>
                  //   router.push('/all-validator')
                  //  }
                  onClick={executeScroll}
                  className="btn white-btn"
                >
                  Become a Delegator
                </button>
              </div>
              <div className="btns-wrap">
                <button
                  onClick={() => router.push("/choose-your-path")}
                  className="btn grey-btn"
                >
                  Choose Your Path
                </button>
              </div>
            </div>
          );
        }
      } else if (userType === "Delegator") {
        return null;
      } else {
        return (
          <div className="btns-sec btn-width">
            <div className="btns-wrap">
              <button
                disabled={+totalValCount <= +validatorThreshold ? false : true}
                onClick={() => {
                  router
                    .push("/become-validator")
                    .then(() => {})
                    .catch(() => {});
                }}
                className={`${
                  +totalValCount >= +validatorThreshold ? "d-none" : ""
                } btn primary-btn`}
              >
                Become a Validator
              </button>
            </div>
            <div className="btns-wrap">
              <button
                // onClick={()=>
                //   router.push('/all-validator')
                //  }
                onClick={executeScroll}
                className="btn white-btn"
              >
                Become a Delegator
              </button>
            </div>
            <div className="btns-wrap">
              <button
                onClick={() => router.push("/choose-your-path")}
                className="btn grey-btn"
              >
                Choose Your Path
              </button>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="main-content dark-bg-800 full-vh font-up ffms-inherit staking-main">
        {/* <StakingHeader /> */}
        {/* banner section start */}
        <section className="inner-banner dark-bg">
          <div className="container">
            <div className="section-info">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12">
                  <div className="lft-txt">
                    <h1 className="mb-2 mb-sm-3 mb-md-4 ff-mos">
                      All Validators
                    </h1>
                    <div className="mt-2 btns-sec">{renderButtons()}</div>
                  </div>
                </div>
                <div className="col-md-5 col-sm-12 m-hide">
                  <div className="shib-img-sec text-end">
                    <img src="../../assets/images/shib-bg.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner section closed */}

        <div id="all-validators-section" ref={myRef} className=" ffms-inherit">
          <Valitotors withStatusFilter={true} nodeSetup={nodeSetup} />
        </div>
      </div>
    </>
  );
};

export default Allvalidator;
