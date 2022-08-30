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
