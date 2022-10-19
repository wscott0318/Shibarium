import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import CommonModal from "../components/CommonModel";
import { useActiveWeb3React } from "../../services/web3";
import { getDelegatorData } from "../../services/apis/user/userApi"
import Link from "next/link";
import LoadingSpinner from 'pages/components/Loading';
import NumberFormat from 'react-number-format';
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";




const validatorAccount = ({userType, boneUSDValue, availBalance} : {userType : any, boneUSDValue:any, availBalance:any}) => {
    const router = useRouter();
    const [showretakepop, setretakepop] = useState(false);
    const [showcommissionpop, setcommissionpop] = useState(false);
    const [showwithdrawpop, setwithdrawpop] = useState(false);
    const [showunboundpop, setunboundpop] = useState(false);
    const [loading, setLoading] = useState(false);

    const { account, chainId = 1 } = useActiveWeb3React();
  const [delegationsList, setDelegationsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [stakeMore, setStakeMoreModal] = useState(false);
  const [restakeModal, setRestakeModal] = useState({
    value1: false,
    value2: false,
    address: ''
  });
  const [commiModal, setCommiModal] = useState({
    value: false,
    address: ''
  });
  const [withdrawModal, setWithdrawModal] = useState({
    value: false,
    address: ''
  });
  const [unboundModal, setUnboundModal] = useState({
    startValue: false,
    progressValue: false,
    comfirmValue: false,
    address: '',
    id: '',
    stakeAmount: 0
  });

  const getDelegatorCardData = (accountAddress: any) => {
    setLoading(true)
    try {
      getDelegatorData(accountAddress.toLowerCase()).then((res: any) => {
        if (res.data) {
          console.log(res.data)
          let sortedData = res.data.data.validators.sort((a: any, b: any) => parseInt(b.stake) - parseInt(a.stake))
          setDelegationsList(sortedData)
          setLoading(false)
        }
      }).catch((e: any) => {
        console.log(e);
        //  setUserType('NA')
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleModal = (btn: String, valAddress: any, id: any = null, stakeAmount: any = null) => {
    console.log({btn,valAddress, id, stakeAmount})
    switch (btn) {
      case "Restake":
        if(userType === 'Validator'){
          setRestakeModal({
            value1: true,
            value2: false,
            address: valAddress
          });
        } else {
          setRestakeModal({
            value2: true,
            value1:  false,
            address: valAddress
          });
        }
        break;
      case "Change Commission Rate":
        setCommiModal({
          value: true,
          address: valAddress
        });
        break;
      case "Withdraw Rewards":
        setWithdrawModal({
          value: true,
          address: valAddress
        });
        break;
      case "Unbound":
        setUnboundModal((preVal: any) => ({ ...preVal, stakeAmount: stakeAmount, startValue: true, address: valAddress, id: id }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (account && userType === "Delegator") {
      getDelegatorCardData(account)
    }
  }, [account])

console.log(restakeModal)

const restakeValidation: any = Yup.object({
  amount: Yup.number().min(0).max(availBalance).required("amount is required"),
  reward: Yup.number().required(),

})
const comissionValidation: any = Yup.object({
  comission: Yup.number().min(0).max(100).required("comission is required"),
})

const callComission = (value:any) => {
  
}

    return (
        <>
        {loading && <LoadingSpinner />}
            <main className="main-content dark-bg-800 full-vh top-space cmn-input-bg">
                {/* retake popop start */}
                <CommonModal
                    title={"Retake"}
                    show={restakeModal.value1}
                    setShow={() => setRestakeModal({value1:false, value2: false, address: ''})}
                    externalCls="stak-pop"
                >
                    <>
                        <div className="cmn_modal val_popups">
                            <Formik
                            initialValues={{
                              amount:'',
                              address: '',
                              reward: 0
                            }}
                            validationSchema={restakeValidation}
                            onSubmit={(values, actions) => {
                              console.log(values);
                              callComission(values)
                            }}
                            >
                               {
                              ({ errors, touched ,handleChange, handleBlur, values, handleSubmit }) => (
                                <>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <label className="mb-2 mb-md-2 text-white">Enter validator address</label>
                                        <input type="text"
                                         placeholder="Validator address"
                                          className="w-100"
                                          value={restakeModal.address}
                                          readOnly
                                          />
                                    </div>
                                </div>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <label className="mb-2 mb-md-2 text-white">Enter amount</label>
                                        <input
                                         type="text" 
                                         placeholder="Amount"
                                          className="w-100"
                                          value={values.amount}
                                          onChange={handleChange("amount")}
                                          />
                                          {touched.amount && errors.amount ? <p className='primary-text pt-1 pl-2'>{errors.amount}</p> : null}
                                    </div>
                                </div>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <label className="mb-2 mb-md-2 text-white">Enter stakereward</label>
                                        <input type="text" placeholder="Stakereward" className="w-100" />
                                    </div>
                                </div>
                                <div className="pop_btns_area">
                                    <div className="form-control">
                                      <button className='btn primary-btn w-100'
                                      onClick={() => handleSubmit()}
                                      >Submit</button> 
                                     </div>
                                </div>
                                </>
                                )}
                            </Formik>
                        </div>

                    </>
                </CommonModal>
                {/* retake popop ends */}


                {/* commission popop start */}
                <CommonModal
                    title={"Commission"}
                    show={commiModal.value}
                    setShow={() => setCommiModal({value: false, address: ''})}
                    externalCls="stak-pop"
                >
                    <>
                    <Formik
                            initialValues={{
                              address: '',
                              comission: ''
                            }}
                            validationSchema={comissionValidation}
                            onSubmit={(values, actions) => {
                              console.log(values);

                            }}
                            >
                               {
                              ({ errors, touched ,handleChange, handleBlur, values, handleSubmit }) => (
                        <div className="cmn_modal val_popups">
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <label className="mb-2 mb-md-2 text-white">Enter validator address</label>
                                        <input 
                                        type="text"
                                        placeholder="Validator address"
                                        className="w-100"
                                        value={commiModal.address}
                                        readOnly
                                        />
                                    </div>
                                </div>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <label className="mb-2 mb-md-2 text-white">Enter new commission</label>
                                        <input 
                                        type="text" 
                                        placeholder="New commission" 
                                        className="w-100" 
                                        value={values.comission}
                                        onChange={handleChange("comission")}
                                        />
                                        {touched.comission && errors.comission ? <p className='primary-text pt-1 pl-2'>{errors.comission}</p> : null}
                                    </div>
                                </div>
                                <div className="pop_btns_area">
                                    <div className="form-control">
                                      <button className='btn primary-btn w-100' 
                                        type='submit'
                                        onClick={() => handleSubmit()}
                                      >Submit
                                      </button>  
                                      </div>
                                </div>
                        </div>
                            )}
                      </Formik>
                    </>
                </CommonModal>
                {/* commission popop ends */}


                {/* withdraw popop start */}
                <CommonModal
                    title={"Withdraw rewards"}
                    show={showwithdrawpop}
                    setShow={setwithdrawpop}
                    externalCls="stak-pop"
                >
                    <>
                        <div className="cmn_modal val_popups">
                            <form>
                                <div className="cmn_inpt_row">
                                    <div className="form-control">
                                        <label className="mb-2 mb-md-2 text-white">Enter validator address</label>
                                        <input type="text" placeholder="Validator address" className="w-100" />
                                    </div>
                                </div>
                                <div className="pop_btns_area">
                                    <div className="form-control"><a className='btn primary-btn w-100' href="javascript:void(0)">Submit</a>  </div>
                                </div>
                            </form>
                        </div>

                    </>
                </CommonModal>
                {/* withdraw popop ends */}


                {/* unbound popop start */}
                <CommonModal
                    title={"Unbound"}
                    show={showunboundpop}
                    setShow={setunboundpop}
                    externalCls="stak-pop"
                >
                    <>
                        <div className="cmn_modal val_popups">
                            <form>
                                <div className="only_text">
                                    <p className="text-center">Are you sure you want to unbound?</p>
                                </div>
                                <div className="pop_btns_area row mr-top-50 form-control">
                                    <div className="col-6"><a className='btn blue-btn w-100 dark-bg-800 text-white' href="javascript:void(0)">Cancel</a>  </div>
                                    <div className="col-6"><a className='btn primary-btn w-100' href="javascript:void(0)">Confirm</a>  </div>
                                </div>
                            </form>
                        </div>

                    </>
                </CommonModal>
                {/* unbound popop ends */}

                {
                    userType === "Validator" ?
                <section className="mid_cnt_area">
                    <div className="container">
                    <div className="col-xl-12 col-lg-12 side-auto">
                        <div className="val_del_outr">
                            <h4 className="ff-mos">Wallet Balance</h4>
                            <h3 className="ff-mos"><b>{availBalance.toFixed(4)} {chainId == 7352 ? "Bone" : "Ethereum"}</b></h3>
                            <h4 className="ff-mos"><NumberFormat thousandSeparator displayType={"text"} prefix='$ ' value={((availBalance || 0) * boneUSDValue).toFixed(2)} /></h4>
                            <div className="btns_sec val_all_bts row">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <button onClick={() => handleModal("Restake", account)} className="ff-mos btn black-btn w-100 d-block">
                                        Restake
                                    </button>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <button onClick={() => handleModal("Change Commission Rate", account)} className="ff-mos btn black-btn w-100 d-block">
                                        Change Commission Rate
                                    </button>
                                </div>
                                <div className="col-xl-3  col-lg-4 col-md-6 col-sm-6 col-12 blk-space">
                                    <button onClick={() => handleModal("Withdraw Rewards", account)} className="ff-mos btn black-btn w-100 d-block">
                                        Withdraw Rewards
                                    </button>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <button onClick={() => setunboundpop(true)} className="ff-mos btn black-btn w-100 d-block">
                                        Unbound
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    </div>
                </section>
                    :
                <section className='del-grid-section top-pad bottom-pad ffms-inherit'>
      <div className="container">
        <div className='row'>
          {delegationsList.length ?
            delegationsList.map((item: any) =>
              <div className="col-lg-4 col-md-6 col-12 bs-col">
                <div className="border-sec">
                  <div className="top-sec">
                    <div className="info-block">
                      <div className="image-blk">
                        <div>
                          <img className="img-fluid" src={item.logoUrl} width="69" height="70" alt="coin-icon" />
                        </div>
                      </div>
                      <div className="grid-info text-start">
                        <div className="fw-bold">{item.name}</div>
                        <div className="info-row">
                          <span><span className="fw-bold">{parseInt(item.checkpointSignedPercent).toFixed(2)}%</span> Checkpoints Signed</span>
                        </div>
                        <div className="info-row">
                          <span><span className="fw-bold">{item.commission}%</span> Commission</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mid-sec bs-card h-auto">
                    <div className="block-container">
                      <div className="cus-width">
                        <div className="text-center">
                          <div>Your Stake</div>
                          <div className="fw-bold">{(parseInt(item.stake) / 10 ** 18).toFixed(4)}</div>
                          {/* {/ <div>$0</div> /} */}
                        </div>
                      </div>
                      <div className="cus-width">
                        <div className="text-center">
                          <div>Reward</div>
                          <div className="fw-bold orange-color">{(parseInt(item.reward) / 10 ** 18).toFixed(4)}</div>
                          {/* {/ <div>$0</div> /} */}
                        </div>
                      </div>
                    </div>

                    <ul className="btn-grp">
                      <li className="btn-grp-lst">
                        <button disabled={parseInt(item.commission) == 0} onClick={() => handleModal('Restake', item.contractAddress)} className="btn grey-btn btn-small">Restake</button>
                      </li>
                      <li className="btn-grp-lst">
                        <button onClick={() => handleModal('Withdraw Rewards', item.contractAddress)} className="btn black-btn btn-small">Withdraw Rewards</button>
                      </li>
                      <li className="btn-grp-lst">
                        <button onClick={() => handleModal('Unbound', item.validatorAddress, item.contractAddress, (parseInt(item.stake) / 10 ** 18).toFixed(4))} className="btn black-btn btn-small">Unbound</button>
                      </li>
                      <li className="btn-grp-lst">
                        <button disabled={parseInt(item.commission) == 0} onClick={() => { setSelectedRow({ owner: item.contractAddress, commissionPercent: item.commission, name: item.name }); setStakeMoreModal(true); }} className="btn black-btn btn-small">Stake More</button>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            )
            : !loading ? <p>
              No Record Found
            </p> : null
          }
        </div>
      </div>
                </section>
                }
            </main>
        </>
    );
}

export default validatorAccount