import { http } from "../http";

export function withdrawRewardDelegator(validatorAddress:string,delegatorAddress:string|undefined|null){
    return http.get(`delegator/withdrawRewards/${validatorAddress}/${delegatorAddress}`);
}
