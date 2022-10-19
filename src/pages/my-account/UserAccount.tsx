import React from 'react'

const userAccount = () => {
  return (
    <section className="mid_cnt_area">
                    <div className="container">
                    <div className="col-xl-12 col-lg-12 side-auto">
                        <div className="val_del_outr">
                            <h4 className="ff-mos">Wallet Balance</h4>
                            <h3 className="ff-mos"><b>0 Bone</b></h3>
                            <h4 className="ff-mos">$0.00</h4>
                            <div className="btns_sec val_all_bts row">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <button className="ff-mos btn black-btn w-100 d-block">
                                        Become a Delegator
                                    </button>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <button  className="ff-mos btn black-btn w-100 d-block">
                                        Become a Validator
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
  )
}

export default userAccount