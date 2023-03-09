import HDWalletProvider from "@truffle/hdwallet-provider";
import { POSClient, setProofApi, setAbiApi, use } from "@shibarmy/shibariumjs";
import { PlasmaClient } from "@shibarmy/shibariumjs-plasma";
import { Web3ClientPlugin } from "@shibarmy/shibariumjs-web3";
import { utils } from "web3";
import { apis, account, network as _network } from "../../config/withdraw";

setProofApi(apis.proof_api);
setAbiApi(apis.abi_api);
use(Web3ClientPlugin);

const parentProvider = new HDWalletProvider({
  mnemonic: {
    phrase: account.mnemonic,
  },
  providerOrUrl: _network.parent.rpc,
  numberOfAddresses: account.num_wallets,
});

const shibariumProvider = new HDWalletProvider({
  mnemonic: {
    phrase: account.mnemonic,
  },
  providerOrUrl: _network.child.rpc,
  numberOfAddresses: account.num_wallets,
});

const getPOSClient = () => {
  try {
    const posClient = new POSClient();
    return posClient.init({
      log: false,
      network: _network.network,
      version: _network.version,
      child: {
        provider: shibariumProvider,
        defaultConfig: {
          from: account.from,
        },
      },
      parent: {
        provider: parentProvider,
        defaultConfig: {
          from: account.from,
        },
      },
    });
  } catch (error) {
    console.error("error unable to initiate plasmaClient", error);
    return null;
  }
};

async function getPlasmaClient() {
  try {
    const plasmaClient = new PlasmaClient();

    return plasmaClient.init({
      network: _network.network,
      version: _network.version,
      parent: {
        provider: parentProvider,
        defaultConfig: {
          from: account.from,
        },
      },
      child: {
        provider: shibariumProvider,
        defaultConfig: {
          from: account.from,
        },
      },
    });
  } catch (error) {
    console.error("error unable to initiate plasmaClient", error);
    return null;
  }
}

export const getClient = async (clientType) => {
  console.log("client type => ", clientType);
  if (clientType === "pos") {
    return getPOSClient();
  } else return getPlasmaClient();
};

export const loadContract = async (path, abi, layer = "l1", type = "plasma") => {
  const client = await getPOSClient();
  const abiJson = await client.client.abiManager.getABI(abi, type);
  const contractAddress = utils.isAddress(path)
    ? path
    : client.client.abiManager.getConfig(path);
  let contractObj;

  if (layer === "l1") {
    contractObj = await client.client.parent.getContract(
      contractAddress,
      abiJson
    );
    return contractObj.contract;
  }

  contractObj = await client.client.child.getContract(contractAddress, abiJson);
  return contractObj.contract;
};

const getContractAddress = async (path) => {
  const client = await getPOSClient();
  return client.client.abiManager.getConfig(path);
};

const getAbiJson = async (abi, type = "plasma") => {
  const client = await getPOSClient();
  return client.client.abiManager.getABI(abi, type);
};

export default {
  // getClient,
  // loadContract,
  getContractAddress,
  getAbiJson,
};
