import { http } from "../http";

export function burnGetAPI(bridgeType,parentAddress){
    return http.get(`/tokens/token/${bridgeType}/${parentAddress}`)
}