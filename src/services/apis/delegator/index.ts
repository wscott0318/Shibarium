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

// delegators/unbonds/sellVoucher' 

// {
//     "delegatorAddress" : "0xc3E9adc34bFD50bB99E8D0fD4846360D2557c0cb",
//     "validatorId" : 2,
//     "amount" : 5
// }


