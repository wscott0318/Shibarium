/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useActiveWeb3React } from "../../services/web3";
import Header from "../layout/header";
import { useRouter } from "next/router";
import { getValidatorsDetail } from "app/services/apis/validator";
import { getBoneUSDValue } from "../../web3/commonFunctions";
import { BONE_ID, GOERLI_CHAIN_ID } from "app/config/constant";
import NumberFormat from "react-number-format";
import Delegators from "./validator-details/Delegators";
import Checkpoints from "./validator-details/Checkpoints";
import {
  addDecimalValue,
  checkImageType,
  web3Decimals,
} from "web3/commonFunctions";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { dynamicChaining } from "web3/DynamicChaining";
import LoadingSpinner from "pages/components/Loading";
import * as Sentry from "@sentry/nextjs";
import { ChainId, L1Block } from "app/hooks/L1Block";

export default function ValidatorDetails() {
  const { account, library, chainId = 1 } = useActiveWeb3React();
  const [validatorInfo, setValidatorInfo] = useState<any>();
  const [allDelegators, setAllDelegators] = useState([]);
  const [allCheckpoints, setAllCheckpoints] = useState<any>([]);
  const [boneUsdValue, setBoneUsdValue] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [selfStaked, setSelfStaked] = useState<number>(0);

  const router = useRouter();
  useEffect(() => {
    try {
      const { id } = router.query;
      if (id) {
        setLoading(true);
        getValidatorsDetail(id.toString())
          .then((res: any) => {
            console.log("delegators response ", res?.data?.data);
            setValidatorInfo(res?.data?.data?.validatorSet?.validatorInfo);
            setAllDelegators(res?.data?.data?.validatorSet?.delegators || []);
            setAllCheckpoints(res?.data?.data?.validatorSet?.checkpoints || []);
            // console.log(res?.data?.data?.validatorSet)
            setLoading(false);
          })
          .catch((error: any) => {
            setLoading(false);
          });
      }
    } catch (err: any) {
      Sentry.captureMessage("UseEffect in all Validator [id].jsx", err);
    }
  }, []);
  useEffect(() => {
    getBoneUSDValue().then((res: any) => {
      setBoneUsdValue(res);
    });
    if (validatorInfo) {
      getTotalSupply(validatorInfo?.id);
    }
  }, [validatorInfo, account, library]);

  const getTotalSupply = async (id: any) => {
    try {
      if (chainId == GOERLI_CHAIN_ID) {
        const Cid = await ChainId();
        const web3 = L1Block();
        let instance = new web3.eth.Contract(
          stakeManagerProxyABI,
          dynamicChaining[Cid]?.STAKE_MANAGER_PROXY
        );
        const valStake = await instance.methods.validators(id).call();
        let finalAMount =
          (+valStake.amount + +valStake.delegatedAmount) /
          Math.pow(10, web3Decimals);
        let selfStake = +valStake.amount / Math.pow(10, web3Decimals);
        console.log(
          "getTotalSupply called again",
          valStake.amount,
          valStake.delegatedAmount
        );
        console.log(valStake, "data ==> ");
        setSelfStaked(selfStake);
        setTotalSupply(finalAMount);
      }
    } catch (err: any) {
      Sentry.captureMessage("getTotalSupply", err);
    }

    // amount delegatedAmount
  };

  console.log("validator info ", validatorInfo);
  const getValCondition = (uptime: any) => {
    if (uptime >= 90) return "Good";
    else if (uptime >= 70) return "Okay";
    return "Bad";
  };
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../../assets/images/shib-borderd-icon.png";
    event.currentTarget.className = "img-fluid error";
  };
  return (
    <>
      <Header />
      {loading && <LoadingSpinner />}
      <main className="main-content dark-bg-800 full-vh  cmn-input-bg font-up ffms-inherit staking-main valInfoPage">
        {/* <StakingHeader /> */}
        <section className="py-4 top_bnr_area dark-bg py-lg-5">
          <div className="container">
            <div className="row">
              <div className="mb-4 col-sm-5 col-lg-5 col-xl-4 mb-sm-0">
                <div className="text-center shib-card card h-100 p-3">
                  <div className="image-wrap">
                    <img
                      className="img-fluid w-100"
                      onError={imageOnErrorHandler}
                      src={
                        validatorInfo?.logoUrl
                          ? checkImageType(validatorInfo?.logoUrl)
                          : "../../assets/images/American_Shib.png"
                      }
                      alt="fundborn-img"
                    />
                  </div>
                  <h4 className="py-0 mt-2">
                    <span className="text-white trs-3 ff-mos">
                      {validatorInfo?.name}
                    </span>
                  </h4>
                  <h4 className="py-0">
                    <a
                      href={validatorInfo?.description}
                      target="_blank"
                      className="val_desc"
                    >
                      <span className="text-white trs-3 ff-mos">
                        {validatorInfo?.description}
                      </span>
                    </a>
                  </h4>
                  {/* <Link href="https://linktr.ee/DeFiMatic"> */}
                  {/* <a className='primary-text ff-mos'>
                                          https://linktr.ee/DeFiMatic
                                        </a> */}
                  {/* </Link> */}
                </div>
              </div>
              <div className="col-sm-7 col-lg-7 col-xl-8">
                <div className="mb-4 cus-panel h-100">
                  <div className="panel-header">
                    <h4 className="mb-0 fw-600 trs-3 ff-mos">Validator Info</h4>
                    {validatorInfo?.uptimePercent === 0 ? (
                      <div className="badge-md primary-bg">
                        <span className="trs-1 ff-mos">Inactive</span>
                      </div>
                    ) : (
                      <div className="badge-md success-bg">
                        <span className="trs-1 ff-mos">Active</span>
                      </div>
                    )}
                  </div>
                  <div className="pb-0 panel-body">
                    <ul className="mb-0 info-list list-unstyled">
                      <li className="info-data-lst">
                        <h6 className="mb-0 trs-3 fix-wid fw-600 ff-mos">
                          Staked amount
                        </h6>
                        <p className="mb-0 trs-3 ff-mos">
                          <NumberFormat
                            displayType="text"
                            thousandSeparator
                            value={addDecimalValue(totalSupply)}
                          />{" "}
                          BONE
                        </p>
                      </li>
                      <li className="info-data-lst">
                        <h6 className="mb-0 trs-3 fix-wid fw-600 ff-mos">
                          Self Stake
                        </h6>
                        <p className="mb-0 trs-3">
                          <NumberFormat
                            displayType="text"
                            thousandSeparator
                            value={addDecimalValue(selfStaked)}
                          />{" "}
                          BONE
                        </p>
                      </li>
                      <li className="info-data-lst">
                        <h6 className="mb-0 trs-3 fix-wid fw-600 ff-mos">
                          Owner address
                        </h6>
                        <p className="mb-0 trs-3 ff-mos">
                          {validatorInfo?.staker}
                        </p>
                      </li>
                      <li className="info-data-lst">
                        <h6 className="mb-0 trs-3 fix-wid fw-600 ff-mos">
                          Signer address
                        </h6>
                        <p className="mb-0 trs-3 primary-text ff-mos">
                          {validatorInfo?.signer}
                        </p>
                      </li>
                      <li className="info-data-lst">
                        <h6 className="mb-0 trs-3 fix-wid fw-600 ff-mos">
                          Commission Rate
                        </h6>
                        <p className="mb-0 trs-3 ff-mos">
                          {validatorInfo?.commissionPercent}%
                        </p>
                      </li>
                      <li className="info-data-lst">
                        <h6 className="mb-0 trs-3 fix-wid fw-600 ff-mos">
                          Condition
                        </h6>
                        <p className="mb-0 trs-3 fw-600 up-text ff-mos">
                          {getValCondition(validatorInfo?.uptimePercent)}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <AddressDetails /> */}
        <section className="pt-5 pb-4 darkbg-2 pb-lg-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 detail">
                {/* Delegation tabs start */}
                <Delegators
                  allDelegators={allDelegators}
                  boneUsdValue={boneUsdValue}
                />
                {/* deligation tab  end */}

                {/* transactions tabs start */}
                <Checkpoints
                  allCheckpoints={allCheckpoints}
                  boneUsdValue={boneUsdValue}
                  loading={loading}
                />
                {/* transactions tab  end */}

                {/* <PowerChange /> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
