import Web3 from 'web3'
const HttpProvider = "https://goerli.infura.io/v3/49e2ef5f477941c1b90a222c858c574e";
const HttpProviderPUPPYNET517 = process.env.RPC_517;

export function L1Block(): any {
    try{
    return new Web3(new Web3.providers.HttpProvider(HttpProvider));
    }catch(error){
    }
}

export function PUPPYNET517(): any {
    try{
    return new Web3(new Web3.providers.HttpProvider(HttpProviderPUPPYNET517 as any));
    }catch(error){
    }
}
export async function ChainId() {
    try{
    const web3test = L1Block();
    const Id = await new web3test.eth.getChainId()
    return Id
    }catch(error){
    }
}

