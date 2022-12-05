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
      delegator(id: "delegator:${id}:${account}") {
        tokens
        validatorId
      }
    }
`
return gql(queryString)
}
export const validatorRewardHistory = (id:any) => {
    const queryString = `query pools 
      {
        validatorClaimRewards(where: {validatorId: 10}, orderBy: timestamp, orderDirection: desc) {
          address
          amount
          timestamp
          transactionHash
          validatorId
        }
    }
`;
return gql(queryString)
}