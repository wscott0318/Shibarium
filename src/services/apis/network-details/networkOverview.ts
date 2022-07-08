import { http } from "../http";
import { STAKING_API } from "../http";

export function getUserType(address:string){
    return http.get(`/user/getType/${address}`)
}
export function getValidatorCount(){
    return STAKING_API.get(`api/v1/validators/metadata/stakedCount`)
}
export function getTotalStake(){
    return STAKING_API.get(`api/v1/validators/metadata/totalStake`)
}
export function getTotalRewardDistributed(){
    return STAKING_API.get(`api/v1/rewards/summary`)
}
export function getLastCheckpoint(){
    return STAKING_API.get(`api/v1/checkpoints/latest`)
}