import gql from 'graphql-tag';

export const allValidatorsQuery = () => {
    const queryString = `query pools {
        validators(orderBy: commissionRate) {
          validatorId
          totalStaked
          status
          signerPubKey
          signer
          selfStake
          owner
          nonce
          liquidatedRewards
          jailEndEpoch
          isInAuction
          id
          delegatedStake
          deactivationEpoch
          commissionRate
          auctionAmount
          activationEpoch
        }
      }
`
return gql(queryString)
}
export const StakeAmount = (id:any, account :any) => {
    const queryString = `query pools {
      delegator(id: "delegator:2:0x993e8794ca03f520c4a8a30f7c0f44f6b57c1d93") {
        tokens
        validatorId
      }
    }
`
return gql(queryString)
}