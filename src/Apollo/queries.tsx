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