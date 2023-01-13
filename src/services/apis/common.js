import { http } from "./http";

export function getSnapshots(){
    return http.get(`aws/getList`)
}
