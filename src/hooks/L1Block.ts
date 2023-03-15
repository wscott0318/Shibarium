import Web3 from 'web3'
const HttpProvider = "https://eth-goerli.g.alchemy.com/v2/xv2JiP-gGcBNnTwaqOoKJDj917JFIMXp";
const HttpProviderPUPPYNET517 = process.env.RPC_517;

export function L1Block(): any {
    try{
    return new Web3(new Web3.providers.HttpProvider(HttpProvider));
    }catch(error){
        console.log(error,'9');
        
    }
}

export function PUPPYNET517(): any {
    try{
    return new Web3(new Web3.providers.HttpProvider(HttpProviderPUPPYNET517 as any));
    }catch(error){
        console.log('Connection Error',error);
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

