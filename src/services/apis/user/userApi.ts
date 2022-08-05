import { http } from "../http";

export function getUserType(address:string){
    return http.get(`user/getType/${address}`)
}