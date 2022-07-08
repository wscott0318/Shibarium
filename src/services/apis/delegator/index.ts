<<<<<<< HEAD
=======
import { DelegatorReStakeFormInterface } from "interface/delegatorAccount";
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83
import { http } from "../http";

export function withdrawRewardDelegator(validatorAddress:string,delegatorAddress:string|undefined|null){
    return http.get(`delegator/withdrawRewards/${validatorAddress}/${delegatorAddress}`);
}
<<<<<<< HEAD
=======
export function restake(reqBody:DelegatorReStakeFormInterface){
    return http.post(`delegator/restakeRewards`,reqBody)
}

export function unbound(bridgeType:string){
    return http.get(`unbond/${bridgeType}`)
}
>>>>>>> 5950c253af96671849793b05619cb21f0ef7bb83
