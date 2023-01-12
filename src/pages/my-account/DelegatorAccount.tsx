import React, { useEffect, useState } from 'react'
import { getDelegatorData } from "../../services/apis/user/userApi"
import { useActiveWeb3React } from "../../services/web3"
import { tokenDecimal } from 'web3/commonFunctions'
import * as Sentry from "@sentry/nextjs";
const delegatorAccount = () => {
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
    try {
      getDelegatorData(accountAddress.toLowerCase()).then((res: any) => {
        if (res.data) {
          // console.log(res.data)
          let sortedData = res.data.data.validators.sort((a: any, b: any) => +(b.stake) - +(a.stake))
          setDelegationsList(sortedData)
        }
      })
    } catch (error: any) {
      // console.log(error)
      Sentry.captureException("getDelegatorCardData ", error);
    }
  }

  const handleModal = (btn: String, valAddress: any, id: any = null, stakeAmount: any = null) => {
    try {
      switch (btn) {
        case "Restake":
          setRestakeModal({
            value2: true,
            value1: false,
            address: valAddress
          });
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
    }
    catch (err: any) {
      Sentry.captureException("handleModal ", err);
    }
  };

  useEffect(() => {
    if (account) {
      getDelegatorCardData(account)
    }
  }, [account])


  return (
    <>
      <section className='del-grid-section top-pad bottom-pad ffms-inherit'>
        <div className="container">
          <div className='row'>
            {delegationsList.length ?
              delegationsList.map((item: any) =>
                <div className="col-lg-4 col-md-6 col-12 bs-col" key={item?.validatorAddress}>
                  <div className="border-sec">
                    <div className="top-sec">
                      <div className="info-block">
                        <div className="image-blk">
                          <div>
                            <img className="img-fluid" src={item?.image} width="69" height="70" alt="coin-icon" />
                          </div>
                        </div>
                        <div className="grid-info text-start">
                          <div className="fw-bold">{item.name}</div>
                          <div className="info-row">
                            <span><span className="fw-bold">{+(item.checkpointSignedPercent).toFixed(tokenDecimal)}%</span> Checkpoints Signed</span>
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
                            <div className="fw-bold">{(+(item.stake) / 10 ** 18).toFixed(tokenDecimal)}</div>
                            {/* {/ <div>$0</div> /} */}
                          </div>
                        </div>
                        <div className="cus-width">
                          <div className="text-center">
                            <div>Reward</div>
                            <div className="fw-bold orange-color">{(+(item.reward) / 10 ** 18).toFixed(tokenDecimal)}</div>
                            {/* {/ <div>$0</div> /} */}
                          </div>
                        </div>
                      </div>

                      <ul className="btn-grp mg-grid">
                        <li className="btn-grp-lst">
                          <button disabled={+(item.commission) == 0} onClick={() => handleModal('Restake', item.contractAddress)} className="btn grey-btn btn-small">Restake</button>
                        </li>
                        <li className="btn-grp-lst">
                          <button onClick={() => handleModal('Withdraw Rewards', item.contractAddress)} className="btn black-btn btn-small">Withdraw Rewards</button>
                        </li>
                        <li className="btn-grp-lst">
                          <button onClick={() => handleModal('Unbound', item.validatorAddress, item.contractAddress, (+(item.stake) / 10 ** 18).toFixed(tokenDecimal))} className="btn black-btn btn-small">Unbound</button>
                        </li>
                        <li className="btn-grp-lst">
                          <button disabled={parseInt(item.commission) == 0} onClick={() => { setSelectedRow({ owner: item.contractAddress, commissionPercent: item.commission, name: item.name }); setStakeMoreModal(true); }} className="btn black-btn btn-small">Stake More</button>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>
              )
              : (
                <div className="txt-emp">
                  <div className="no-fount-txt">
                    <img className="d-inline-block mb-3" src="../../assets/images/no-record.png" />
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default delegatorAccount