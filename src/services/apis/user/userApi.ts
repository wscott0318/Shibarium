import { http } from "../http";

export function getUserType(address:string){
    return http.get(`user/getType/${address}`)
}

export function getDelegatorData(address:string){
    return http.get(`delegators/overview/${address}`)
}

export function setDelegatorData(address:string, id:any){
    return http.post(`delegators/delegatorinfo?address=${address}&validatorId=${id}`)
}
