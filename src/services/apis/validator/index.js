import { http } from "../http";

export function validatorsList(){
    return http.get(`validator/getList`)
}
export function retake(reqBody){
    return http.post(`validator/restake`,reqBody)
}
export function commission(reqBody){
    return http.post(`validator/updateCommission`,reqBody)
}

export function withdrawReward(reqBody){
    return http.post(`validator/withdrawRewards`,reqBody)
}
export function unbound(){
    return http.get(`validator/list`)
}
