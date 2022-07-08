import { http } from "../http";

export function buyVoucher(body:any){
    return http.post(`/delegator/buyVoucher`,body)
}
