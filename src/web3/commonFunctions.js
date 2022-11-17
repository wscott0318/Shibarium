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

export const currentGasPrice = async (web3) => {
    let value;
    await web3.eth.getGasPrice()
    .then((res) => {
        value = parseInt(res * 1.1);
    })
    .catch((err) => {
      console.log(err)
    })
    return value
  }


  export const getNetworkName = (ID) => {
    if(ID == 1){
      return "Ethereum Mainnet"
    } else if (ID == 5){
      return "Goerli Testnet"
    } else if (ID == 417) {
      return "Puppy Net"
    } else {
      return "Shibarium Mainnet"
    }
  }

  export const tokenDecimal = 6

  export const toFixedNull = 2
  export const toFixedPrecent = 2

  export const web3Decimals = 18

  export const addDecimalValue = (value) => {
    let num = value % 1;
    if(num > 0){
      return value.toFixed(tokenDecimal)
    } else {
      return value.toFixed(toFixedNull)
    }
  }