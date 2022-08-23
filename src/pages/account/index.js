/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import  WalletBalance  from "../components/WalletBalance";
import InnerHeader from "../inner-header";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { getBoneUSDValue } from "../../services/apis/validator/index";
import { useActiveWeb3React } from "app/services/web3";
import {UserType} from '../../enums/UserType'
import { BONE_ID, ENV_CONFIGS } from '../../config/constant';
import {useEthBalance} from '../../hooks/useEthBalance';
import {useTokenBalance} from '../../hooks/useTokenBalance';
import { useERC20Balances } from "react-moralis";
import { ChainId } from "@shibarium/core-sdk";
export default function Account() {
  // const [availBalance, setAvailBalance] = useState(0);
  const [userType, setUserType] = useState('Anonymous');
  const [boneUSDValue,setBoneUSDValue] = useState(0);

  const { chainId } = useActiveWeb3React();
  const availBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(ENV_CONFIGS[chainId].BONE);
  // const boneBalance = useTokenBalance(ENV_CONFIGS[chainId].BONE);

  // useEffect(() => {
  //   if (library&&account) {
  //     const web3 = new Web3(library?.provider);
  //     web3.eth.getBalance(account).then((res) => {
  //       setAvailBalance((res / Math.pow(10, 18)));
  //     });
  //   }
  // },[library,account]);

  useEffect(() => {
    getBoneUSDValue(BONE_ID).then(res=>{
      setBoneUSDValue(res.data.data.price);
    })
  },[])
  return (
    <>
      <InnerHeader />
      <div className="page-wrapper">
        <main className="delegatorgrid-sec">
          <div className="botom-space-lg">
            <div className="darkBg position-relative sec-spc-high">
              <div className="container">
                <div className="row">
                  <div className="text-center col-sm-8 text-sm-start">
                    <h1 className="light-text fnt-58 fnt-100">Your Account</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container acct-sec">
            
            {/* overview section start */}
            <div className="baner-card top-margin">
            <h3 className="mb-0 mb-3 text-white fwb">Staking Overview</h3>
            <div className="row">
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <div className="data-box">
                    <div>
                      <h3 className="fwb upertxt font-xs">ETHEREUM WALLET BALANCE</h3>
                      <p className="mb-0 d-block fw-600 upertxt">185</p>
                      
                    </div>
                    <div>
                      <div className="card-hr"></div>
                      <span className="mb-0 mt-2">$null</span>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                <div className="data-box">
                    <div>
                      <h3 className="fwb upertxt font-xs">Your Stake</h3>
                      <p className="mb-0 d-block fw-600 upertxt">10</p>
                      
                    </div>
                    <div>
                      <div className="card-hr"></div>
                      <span className="mb-0 mt-2">$null</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                <div className="data-box">
                    <div>
                      <h3 className="fwb upertxt font-xs">Delegation</h3>
                      <p className="mb-0 d-block fw-600 upertxt">1 Validator</p>
                      
                    </div>
                    <div>
                      <div className="card-hr"></div>
                      <span className="mb-0 mt-2">$null</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                <div className="data-box">
                    <div>
                      <h3 className="fwb upertxt font-xs">Unclaimed Rewards</h3>
                      <p className="mb-0 d-block fw-600 upertxt">0.04</p>
                      
                    </div>
                    <div>
                      <div className="card-hr"></div>
                      <span className="mb-0 mt-2">$null</span>
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb upertxt">Your stake</h3>
                  <p className="mb-0 d-block fw-600">10 Matic</p>
                  <div className="card-hr"></div>
                  <span className="mb-0">$null</span>
                </div>
              </div>
               <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb upertxt">Your stake</h3>
                  <p className="mb-0 d-block fw-600">10 Matic</p>
                  <div className="card-hr"></div>
                  <span className="mb-0">$null</span>
                </div>
              </div>
              <div className="mx-auto col-sm-10 mx-md-0 col-md-6 col-lg-4 col-xl-3 bs-col">
                <div className="bs-card card">
                  <h3 className="fwb upertxt">Your stake</h3>
                  <p className="mb-0 d-block fw-600">10 Matic</p>
                  <div className="card-hr"></div>
                  <span className="mb-0">$null</span>
                </div>
              </div> */}
            </div>
            </div>
            {/* overview section end */}
            {/* btns section start */}
            <div className="text-center center-sec button-block">
              <WalletBalance
                balance={ availBalance}
                boneUSDValue={boneUSDValue}
                isDelegator={userType === UserType.Delegator}
                isValidator={userType  === UserType.Validator}
               

              />
            </div>
            {/* btns section end */}
            {/* Delegations section start */}
            <div className="baner-card mt-0">
              <h3 class="mb-0 mb-3 text-white fwb">Your Delegations</h3>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-12 mx-auto bs-col">
                    <div className="border-sec">
                      <div className="top-sec">
                        <div className="info-block">
                          <div className="image-blk">
                            <div>
                              <img className="img-fluid" src="../../assets/images/coin-matic.png" width="69" height="70" alt="coin-icon"/>
                            </div>
                          </div>
                          <div className="grid-info">
                            <div className="fw-bold">DefiMatic</div>
                            <div className="info-row">
                              <span><span className="fw-bold">100%</span> Checkpoints Signed</span>
                            </div>
                            <div className="info-row">
                              <span><span className="fw-bold">1%</span> Commission</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mid-sec bs-card h-auto">
                        <div className="block-container">
                          <div className="cus-width"> 
                            <div className="text-center">
                              <div>Your Stake</div>
                              <div className="fw-bold">10</div>
                              <div>$0</div>
                            </div>
                          </div>
                          <div className="cus-width">
                            <div className="text-center">
                              <div>Reward</div>
                              <div className="fw-bold orange-color">0.04</div>
                              <div>$0</div>
                            </div>
                          </div>
                        </div>
                        <span className="btn card-green text-center d-block btn-small mute-text mt-3">O BONE is in Unbond Period</span>
                        <ul className="btn-grp">
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn white-btn mute-text btn-small">Restake Reward</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn white-btn mute-text btn-small">Move Stake</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn btn-primary-outline btn-small">Unbound</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn btn-primary-outline btn-small">Withdraw Reward</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn btn-primary-outline btn-small">Stake More</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn btn-primary-outline btn-small elipse-btn">
                                <img className="img-fluid" src="../../assets/images/elipse.png" alt="" />
                              </a>
                            </li>
                        </ul>
                      </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12 mx-auto bs-col">
                    <div className="border-sec">
                      <div className="top-sec">
                        <div className="info-block">
                          <div className="image-blk">
                            <div>
                              <img className="img-fluid" src="../../assets/images/coin-matic.png" width="69" height="70" alt="coin-icon"/>
                            </div>
                          </div>
                          <div className="grid-info">
                            <div className="fw-bold">DefiMatic</div>
                            <div className="info-row">
                              <span><span className="fw-bold">100%</span> Checkpoints Signed</span>
                            </div>
                            <div className="info-row">
                              <span><span className="fw-bold">1%</span> Commission</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mid-sec bs-card h-auto">
                        <div className="block-container">
                          <div className="cus-width"> 
                            <div className="text-center">
                              <div>Your Stake</div>
                              <div className="fw-bold">10</div>
                              <div>$0</div>
                            </div>
                          </div>
                          <div className="cus-width">
                            <div className="text-center">
                              <div>Reward</div>
                              <div className="fw-bold orange-color">0.04</div>
                              <div>$0</div>
                            </div>
                          </div>
                        </div>
                        <span className="btn card-green text-center d-block btn-small mute-text mt-3">O BONE is in Unbond Period</span>
                        <ul className="btn-grp">
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn white-btn mute-text btn-small">Restake Reward</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn white-btn mute-text btn-small">Move Stake</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn btn-primary-outline btn-small">Unbound</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn btn-primary-outline btn-small">Withdraw Reward</a>
                            </li>
                            <li className="btn-grp-lst">
                              <a href="javascript(0)" className="btn btn-primary-outline btn-small">Stake More</a>
                            </li>
                        </ul>
                      </div>
                    </div>
                </div>
               <div className="col-lg-4 col-md-6 col-12 mx-auto bs-col">
                <div className="border-sec">
                  <div className="add-sec">
                    <div className="text-center">
                      <div className="text-center">
                        <a href="javascript:void(0);"><img className="img-fluid d-inline-block" src="../../assets/images/white-plus.png" width="27" height="28" alt="coin-icon"/></a>
                      </div>
                      <div>
                        <span>Stake to more validators</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            {/* Delegations section end */}
          </div>
        </main>

         
      </div>
    </>
  );
}
