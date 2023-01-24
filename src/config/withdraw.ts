const {
    ADMIN_WALLET,
    MNEMONIC,
    NET_NAME,
    NET_VERS,
    ROOT_RPC_HTTP,
    ROOT_WS_HTTP,
    CHILD_RPC_HTTP,
    CHILD_WS_HTTP,
    PROOF_API_URL,
    STAKING_API_URL,
    ABI_API_URL,
    PROVIDER_NUM_ACCOUNTS,
    HEIMDALL_RPC,
    HEIMDALL_REST,
  } = process.env;
  
  let numOfAddresses = 50
  if (PROVIDER_NUM_ACCOUNTS) {
    numOfAddresses = parseInt(PROVIDER_NUM_ACCOUNTS, 10)
    if (numOfAddresses <= 0) {
      numOfAddresses = 50
    }
  }
  
  module.exports = {
    account: {
      mnemonic: MNEMONIC,
      admin_wallet: ADMIN_WALLET,
      from: ADMIN_WALLET,
      num_wallets: numOfAddresses,
    },
    network: {
      network: NET_NAME,
      version: NET_VERS,
      parent: {
        rpc: ROOT_RPC_HTTP,
        ws: ROOT_WS_HTTP,
      },
      child: {
        rpc: CHILD_RPC_HTTP,
        ws: CHILD_WS_HTTP,
      },
      heimdall: {
        rpc: HEIMDALL_RPC,
        rest: HEIMDALL_REST,
      },
    },
    apis: {
      staking_api: STAKING_API_URL,
      proof_api: PROOF_API_URL,
      abi_api: ABI_API_URL,
    },
  }

export {};