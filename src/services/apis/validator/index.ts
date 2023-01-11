import { http } from "../http";
import {RetakeFormInterface} from "../../../interface/reTakeFormInterface"

export function validatorsList(name:string,requestOptions:any){
    return http.get(`validators/getList?value=${name}`,requestOptions)
}
export function migrateValidatorsList(requestOptions:any){
    return http.get(`validators/getMigrationList`,requestOptions)
}
export function restake(reqBody:RetakeFormInterface){
    return http.post(`validators/restake`,reqBody)
}
export function commission(reqBody:any){
    return http.post(`validators/updateCommission`,reqBody)
}

export function withdrawReward(reqBody:any){
    return http.post(`validators/withdrawRewards`,reqBody)
}
export function unbound(body:any){
    return http.post(`unbond`,body)
}
export function getBoneUSDValue(coinId:string){
    return http.get(`coins/rate/${coinId}`)
}

export function getWalletTokenList(){
    return http.get(`tokens/getList`)
}


export const getValidatorsDetail = (id:string) =>  http.get(`validators/overview/${id}`)