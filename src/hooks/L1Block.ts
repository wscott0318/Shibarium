import Web3 from 'web3'
var HttpProvider = "https://goerli.infura.io/v3/49e2ef5f477941c1b90a222c858c574e";

export function L1Block(): any {
    try{
    return new Web3(new Web3.providers.HttpProvider(HttpProvider));
    }catch(error){
        // console.log('Connection Error',error);
    }
}
export async function ChainId() {
    try{
    const web3test = L1Block();
    const Id = await new web3test.eth.getChainId()
    return Id
    }catch(error){
        // console.log('Connection Error',error);
    }
}

