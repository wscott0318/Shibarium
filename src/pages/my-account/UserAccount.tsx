import React from 'react';
import Link from "next/link";
import NumberFormat from 'react-number-format';
import { tokenDecimal } from 'web3/commonFunctions';

const userAccount = ({boneUSDValue, availBalance} : {boneUSDValue : any, availBalance : any}) => {
  return (
    <section className="mid_cnt_area">
                    <div className="container">
                    <div className="col-xl-12 col-lg-12 side-auto">
                        <div className="val_del_outr">
                            <h4 className="ff-mos">Wallet Balance</h4>
                            <h3 className="ff-mos"><b>{availBalance.toFixed(tokenDecimal)}  Bone</b></h3>
                            <h4 className="ff-mos"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={((availBalance || 0) * boneUSDValue).toFixed(tokenDecimal)} /></h4>
                            <div className="btns_sec val_all_bts row">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <Link href='all-validator' passHref>
                                    <div className="cus-tooltip d-inline-block ps-0">
                                        <a className="ff-mos btn black-btn w-100 d-block tool-ico">
                                            Become a Delegator
                                        </a>
                                        <div className="tool-desc">
                                            Lorem, ipsum.
                                        </div>
                                    </div>
                                    </Link>
                                    
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <Link href='become-validator' passHref>
                                    <div className="cus-tooltip d-inline-block ps-0">
                                        <a  className="ff-mos btn black-btn w-100 d-block tool-ico">
                                            Become a Validator
                                        </a>
                                        <div className="tool-desc">
                                            Lorem, ipsum.
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
  )
}

export default userAccount