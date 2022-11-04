/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { validators, validatorsList } from "../service/validator";
import { useWeb3React } from "@web3-react/core";
import ProjectContext from "../../context/ProjectContext";
import Footer from "../../pages/footer/index"
import { useActiveWeb3React } from "../../services/web3"
import  CommonModal from "../components/CommonModel";
import Header from "../layout/header";
import StakingHeader from '../staking-header'
export default function unbondHistoryNew() {
  // const {account}=useContext(ProjectContext)

  // const { active,deactivate } = useWeb3React()
  // const [accountsAddress, setAccountsAddress] = useState("");
  // useEffect(() => {
  //   setAccountsAddress(localStorage.getItem("accounts"));
  //   console.log('chainId',chainId)
  //   console.log('account-home',account)
  // },[account]);
  const { account, chainId = 1 } = useActiveWeb3React();
  
  /**
   * 
    useEffect(()=>{
      let userDetails = localStorage.getItem('ShibariumUser');
      userDetails = userDetails ? JSON.parse(userDetails)?.objectId: ''
      if (!userDetails && active) {
        deactivate()
      }

    },[active])
  */

 

  //  console.log('account---------------', account)
  return (
    <>
    <Header />
      <main className="main-content val_account_outr cmn-input-bg dark-bg-800 full-vh ">
          
          {/* <StakingHeader /> */}

            <section className="top_bnr_area dark-bg">
                <div className="container">
                    <h1 className="ff-mos">Your Unbound History</h1>
                </div>                
            </section> 

            <section className="mid_cnt_area">
                <div className="container">
                <div className="cmn_dasdrd_table">
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th>Validator Name</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                      
                       <tr>
                          <td><span><img src="../../images/shiba-round-icon.png" /></span><b>DeFIMatic</b></td>
                          <td><b>10 Bone</b><p>$8.2</p></td>
                          <td><span className="text-green">Success <p>claimed</p></span></td>
                          <td><p>22/08/2022, 15:28:37</p></td>                          
                        </tr>

                        <tr>
                          <td><span><img src="../../images/shiba-round-icon.png" /></span><b>DeFIMatic</b></td>
                          <td><b>10 Bone</b><p>$8.2</p></td>
                          <td><span className="text-green">Success <p>claimed</p></span></td>
                          <td><p>22/08/2022, 15:28:37</p></td>                          
                        </tr>

                        <tr>
                          <td><span><img src="../../images/shiba-round-icon.png" /></span><b>DeFIMatic</b></td>
                          <td><b>10 Bone</b><p>$8.2</p></td>
                          <td><span className="text-green">Success <p>claimed</p></span></td>
                          <td><p>22/08/2022, 15:28:37</p></td>                          
                        </tr>

                        <tr>
                          <td><span><img src="../../images/shiba-round-icon.png" /></span><b>DeFIMatic</b></td>
                          <td><b>10 Bone</b><p>$8.2</p></td>
                          <td><span className="text-green">Success <p>claimed</p></span></td>
                          <td><p>22/08/2022, 15:28:37</p></td>                          
                        </tr>

                        <tr>
                          <td><span><img src="../../images/shiba-round-icon.png" /></span><b>DeFIMatic</b></td>
                          <td><b>10 Bone</b><p>$8.2</p></td>
                          <td><span className="text-green">Success <p>claimed</p></span></td>
                          <td><p>22/08/2022, 15:28:37</p></td>                          
                        </tr>

                        <tr>
                          <td><span><img src="../../images/shiba-round-icon.png" /></span><b>DeFIMatic</b></td>
                          <td><b>10 Bone</b><p>$8.2</p></td>
                          <td><span className="text-green">Success <p>claimed</p></span></td>
                          <td><p>22/08/2022, 15:28:37</p></td>                          
                        </tr>
                       
                      </tbody>
                    </table>
                  </div>
                </div>
                </div>                
            </section>

      </main> 
    </>
  );

  
}
