import { get } from "axios"
import { apis} from "../../config/withdraw"

class StakingAPI {
  constructor() {
    this.baseUrl = `${apis.staking_api}/api/v1`
  }

  async fetch(uri) {
    return get(`${this.baseUrl}${uri}`)
  }

  async getTokens(bridgeType) {
    const response = await this.fetch(`/tokens/list/${bridgeType}`)

    if (response.status !== 200) {
      console.log(`Error fetching tokens: ${response.statusText}`)
      return null
    }
    return response.data.data.tokenList
  }

  async getTokenData(bridgeType, parentAddress) {
    try {
      const response = await this.fetch(`/tokens/token/${bridgeType}/${parentAddress}`)

      if (response.status !== 200) {
        console.log(`Error fetching tokens: ${response.statusText}`)
        return null
      }
      return response.data.data.token
    } catch (e) {
      console.log(e.message)
      if (e.response.data) {
        console.log(e.response.data)
      }
      return null
    }
  }
}

export default {
  StakingAPI,
}
