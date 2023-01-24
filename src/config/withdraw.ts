
    const ADMIN_WALLET = process.env.NEXT_PUBLIC_ADMIN_WALLET
    const MNEMONIC = process.env.NEXT_PUBLIC_MNEMONIC
    const NET_NAME = process.env.NEXT_PUBLIC_NET_NAME
    const NET_VERS = process.env.NEXT_PUBLIC_NET_VERS
    const ROOT_RPC_HTTP = process.env.NEXT_PUBLIC_ROOT_RPC_HTTP
    const ROOT_WS_HTTP = process.env.NEXT_PUBLIC_ROOT_WS_HTTP
    const CHILD_RPC_HTTP = process.env.NEXT_PUBLIC_CHILD_RPC_HTTP
    const CHILD_WS_HTTP = process.env.NEXT_PUBLIC_CHILD_WS_HTTP
    const  PROOF_API_URL= process.env.NEXT_PUBLIC_PROOF_API_URL;
    const STAKING_API_URL = process.env.NEXT_PUBLIC_STAKING_API_URL
    const ABI_API_URL = process.env.NEXT_PUBLIC_ABI_API_URL
    const PROVIDER_NUM_ACCOUNTS = process.env.NEXT_PUBLIC_PROVIDER_NUM_ACCOUNTS
    const HEIMDALL_RPC = process.env.NEXT_PUBLIC_HEIMDALL_RPC
    const HEIMDALL_REST = process.env.NEXT_PUBLIC_HEIMDALL_REST
  
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