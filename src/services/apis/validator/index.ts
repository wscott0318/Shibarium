import { http } from "../http";
import {RetakeFormInterface} from "../../../interface/reTakeFormInterface"

export function validatorsList(){
    return http.get(`validator/getList`)
}
export function restake(reqBody:RetakeFormInterface){
    console.log(reqBody,'asdsa');
    return http.post(`validator/restake`,reqBody)
}
export function commission(reqBody:any){
    return http.post(`validator/updateCommission`,reqBody)
}

export function withdrawReward(reqBody:any){
    return http.post(`validator/withdrawRewards`,reqBody)
}
export function unbound(body:any){
    return http.post(`unbond`,body)
}
export function getBoneUSDValue(coinId:string){
    return http.get(`/coins/rate/${coinId}`)
}
export const getValidatorsDetail = (id:string) =>  http.get(`validator/overview/${id}`)