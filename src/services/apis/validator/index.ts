import { http } from "../http";
import {RetakeFormInterfaceDelegator} from "../../../interface/reTakeFormInterface"

export function validatorsList(){
    return http.get(`validators/getList`)
}
export function restake(reqBody:RetakeFormInterfaceDelegator){
    // console.log(reqBody,'asdsa');
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
export const getValidatorsDetail = (id:string) =>  http.get(`validators/overview/${id}`)