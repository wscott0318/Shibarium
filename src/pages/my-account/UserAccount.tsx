import React, { useEffect, useState } from "react";
import Link from "next/link";
import NumberFormat from "react-number-format";
import { addDecimalValue } from "web3/commonFunctions";
import { dynamicChaining } from "web3/DynamicChaining";
import stakeManagerProxyABI from "../../ABI/StakeManagerProxy.json";
import { ChainId, L1Block } from "app/hooks/L1Block";
import { useValId } from "app/state/user/hooks";
import { useActiveWeb3React } from "app/services/web3";
import * as Sentry from "@sentry/nextjs";
const userAccount = ({
  boneUSDValue,
  availBalance,
}: {
  boneUSDValue: any;
  availBalance: any;
}) => {
  const { account, chainId = 1 } = useActiveWeb3React();
  const [valCount, setValCount] = useState(0);
  const [valMaxCount, setValMaxCount] = useState(0);
  const isLoading = availBalance == -1;
  const web3test = L1Block();
  const [valId, setValId] = useValId();

  useEffect(() => {
    getValCount();
  }, []);
  const getValCount = async () => {
    try {
      const id = await ChainId();
      let instance = new web3test.eth.Contract(
        stakeManagerProxyABI,
        dynamicChaining[id]?.STAKE_MANAGER_PROXY
      );
      const valCount = await instance.methods.currentValidatorSetSize().call();
      const validatorThreshold = await instance.methods
        .validatorThreshold()
        .call();
      console.log("val info ===> ", valCount, validatorThreshold);
      setValCount(valCount);
      setValMaxCount(validatorThreshold);
    } catch (err: any) {
      Sentry.captureMessage("getValCount", err);
    }
  };
  return (
    <section className="mid_cnt_area">
      <div className="container">
        <div className="col-xl-12 col-lg-12 side-auto">
          <div className="val_del_outr">
            <h4 className="ff-mos">Wallet Balance</h4>
            <h3 className="ff-mos">
              <b>{isLoading ? "0.00" : addDecimalValue(availBalance)} Bone</b>
            </h3>
            <h4 className="ff-mos">
              <NumberFormat
                thousandSeparator
                displayType={"text"}
                prefix="$ "
                value={addDecimalValue(
                  (availBalance > 0 ? availBalance : 0) * boneUSDValue
                )}
              />
            </h4>
            <div className="btns_sec val_all_bts row">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                <Link href="all-validator" passHref>
                  <div className="cus-tooltip d-inline-block ps-0">
                    <a className="ff-mos btn black-btn w-100 d-block tool-ico">
                      Become a Delegator
                    </a>
                    <div className="tool-desc">Become a Delegator</div>
                  </div>
                </Link>
              </div>
              <div
                className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space ${
                  +valCount >= +valMaxCount ? "d-none" : ""
                }`}
              >
                <Link href="become-validator" passHref>
                  <div className="cus-tooltip d-inline-block ps-0">
                    <a className="ff-mos btn black-btn w-100 d-block tool-ico">
                      Become a Validator
                    </a>
                    <div className="tool-desc">Become a Validator</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default userAccount;
