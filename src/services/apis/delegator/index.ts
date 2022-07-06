import { DelegatorReStakeFormInterface } from "interface/delegatorAccount";
import { http } from "../http";

export function withdrawRewardDelegator(validatorAddress:string,delegatorAddress:string|undefined|null){
    return http.get(`delegator/withdrawRewards/${validatorAddress}/${delegatorAddress}`);
}
export function restake(reqBody:DelegatorReStakeFormInterface){
    return http.post(`delegator/restakeRewards`,reqBody)
}

export function unbound(bridgeType:string){
    return http.get(`unbond/${bridgeType}`)
}