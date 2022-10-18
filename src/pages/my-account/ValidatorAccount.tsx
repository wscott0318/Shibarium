import React from 'react'
import { useRouter } from "next/router";

const validatorAccount = () => {
    const router = useRouter();
    
  return (
    <div>
             <section className="mid_cnt_area ff-mos">
                <div className="container">
                    <div className="col-xl-11 col-lg-12 side-auto">
                        <h4 className="ff-mos">Ethereum Wallet Balance</h4>
                        <h3 className="ff-mos"><b>0 Bone</b></h3>
                        <h4 className="ff-mos">$0.00</h4>        
                        <div className="btns_sec val_all_bts row">
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space"> 
                                <button  onClick={()=>{
                                    router.push('/become-validator')
                                  }} className="btn grey-btn w-100 d-block ff-mos">
                                    Become a Validator
                                </button>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">                        
                                <button onClick={()=>{
                                  router.push('/all-validator')
                                }} className="btn primary-btn w-100 d-block ff-mos">
                                    Become a Delegator
                                </button> 
                            </div>
                            
                            
                        </div>
                    </div>
                </div>                
            </section>
    </div>
  )
}

export default validatorAccount