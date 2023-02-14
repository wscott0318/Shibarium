export const dynamicChaining :any  = 
    {
   1:{ // eth main net 
    BONE: '',
    STAKE_MANAGER_PROXY:'',
    VALIDATOR_SHARE: "",
    STAKE_MANAGER: "",
    DEPOSIT_MANAGER_PROXY: "",
   },
   5:{ // goerli test net
    BONE: process.env.BONE,
    STAKE_MANAGER_PROXY:process.env.STAKE_MANAGER_PROXY,
    VALIDATOR_SHARE: process.env.VALIDATOR_SHARE,
    STAKE_MANAGER: process.env.STAKE_MANAGER,
    DEPOSIT_MANAGER_PROXY: process.env.DEPOSIT_MANAGER_PROXY,
    WITHDRAW_MANAGER_PROXY: process.env.WITHDRAW_MANAGER_PROXY,
    ROOTCHAIN_MANAGER_PROXY:process.env.ROOTCHAIN_MANAGER_PROXY
   },
   517:{ // puppy test net 517
    BONE: process.env.BONE,
    STAKE_MANAGER_PROXY:process.env.STAKE_MANAGER_PROXY,
    VALIDATOR_SHARE: process.env.VALIDATOR_SHARE,
    STAKE_MANAGER: process.env.STAKE_MANAGER,
    DEPOSIT_MANAGER_PROXY: process.env.DEPOSIT_MANAGER_PROXY,
    WITHDRAW_MANAGER_PROXY: process.env.WITHDRAW_MANAGER_PROXY,
    ROOTCHAIN_MANAGER_PROXY:process.env.ROOTCHAIN_MANAGER_PROXY
   },
}
