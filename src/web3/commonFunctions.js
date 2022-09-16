import Web3 from "web3";
import ERC20abi from "../ABI/ERC20Abi.json";


export const getAllowanceAmount = async (
    library,
    token,
    account,
    contract
) => {
    if(account){
        let lib = library
        let web3 = new Web3(lib?.provider)
        let instance = new web3.eth.Contract(ERC20abi, token)
        let allowance = await instance.methods.allowance(account, contract).call({ from: account });
        return parseInt(allowance) / 10 ** 18
    }
}

