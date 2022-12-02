import { http } from "../http";

export function getUserType(address:string){
    return http.get(`user/getType/${address}`)
}

export function getDelegatorData(address:string){
    return http.get(`delegators/overview/${address}`)
}

export function getValidatorData(address:string){
    return http.get(`validators/getValinfo/${address}`)
}
