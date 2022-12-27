import { useActiveWeb3React } from "app/services/web3"
import { useEffect, useState } from "react"
import Web3 from 'web3';
import { ERC20_ABI } from "app/constants/abis/erc20";
import { tokenDecimal } from "web3/commonFunctions";
import * as Sentry from "@sentry/nextjs";

export const useTokenBalance = (address:string)=>{
    const {library,account}:any = useActiveWeb3React()

    const [balance, setBalance] = useState(0)
    useEffect(() => {
        if (library && account && address) {
            try {      
                const web3:any = new Web3(library?.provider);
                const contract = new web3.eth.Contract(ERC20_ABI,address);
                
                contract.methods.balanceOf(account).call().then((res:any) => {
                    contract.methods.decimals().call().then((d:number)=>{
                        setBalance(+(+res / Math.pow(10, d)).toFixed(tokenDecimal));
                    })
                })
            } catch (error :any) {
                Sentry.captureException("getTokenBalance ", error);
            }
        }
    }, [library,account,address])
    // console.log("updated balance " , balance);
    return balance
}

export const useWalletTokenBalance = (address:string)=>{
    const {library,account}:any = useActiveWeb3React()

    const [newBalance, setBalance] = useState(-1)
    function updateBalance () {
        try {      
            const web3:any = new Web3(library?.provider);
            const contract = new web3.eth.Contract(ERC20_ABI,address);
            contract.methods.p(account).call().then((res:any) => {
                contract.methods.decimals().call().then((d:number)=>{
                    setBalance(+(+res / Math.pow(10, d)).toFixed(tokenDecimal));
                })
            })
        } catch (error :any) {
            Sentry.captureException("getTokenBalance ", error);
        }
    }
    useEffect(() => {
        if (library && account && address) {
            updateBalance();
        }
    }, [library,account,address])
    return {newBalance , updateBalance};
}
export const getTokenBalance = async (library :any, account :any, address :any) => {
    var balance :any = 0
    // console.log({library,account, address})
    if (library && account && address) {
        try {      
            const web3:any = new Web3(library?.provider); // 
            const contract = new web3.eth.Contract(ERC20_ABI,address);
    
          await  contract.methods.balanceOf(account).call().then(async (res:any) => {
              await  contract.methods.decimals().call().then((d:number)=>{
                    balance = +(+res / Math.pow(10, d)).toFixed(tokenDecimal)
                    // balance = web3.utils.fromWei(res, 'ether')
                    // console.log(balance)
                })
              })
        } catch (error :any) {
            // console.log(error)
            Sentry.captureException("getTokenBalance ", error);
        }
        return balance
     }

}