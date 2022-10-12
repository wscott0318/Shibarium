import { DelegatorReStakeFormInterface } from "interface/delegatorAccount";
import { http } from "../http";

export function withdrawRewardDelegator(validatorAddress:string,delegatorAddress:string|undefined|null){
    console.log({validatorAddress, delegatorAddress})
    return http.post(`delegators/withdraw`,{validatorAddress,delegatorAddress});
}
export function restakeDeligator(reqBody:DelegatorReStakeFormInterface){
    return http.post(`delegators/restake`,reqBody)
}

export function unbound(body:any){
    return http.post(`unbond`,body)
}

export function unboundNew(body:any){
    return http.post('delegators/unbonds/sellVoucher', body)
}

export function unbondsHistory(param:any) {
    return http.get(`delegators/unbonds/history/${param}`)
}

export function unbondRewards(param:any) {
    return http.get(`/delegators/claim-rewards/${param}`)
}

export function unboundClaim(body :any) {
    return http.post(`delegators/unbonds/unstakeClaim`, body)
}

// delegators/unbonds/sellVoucher' 

// { /delegators/unbonds/history/0x993E8794Ca03F520c4A8A30F7C0f44f6B57C1D93
//     "delegatorAddress" : "0xc3E9adc34bFD50bB99E8D0fD4846360D2557c0cb",
//     "validatorId" : 2,
//     "amount" : 5
// }


