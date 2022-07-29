import { useActiveWeb3React } from "app/services/web3"
import { useEffect, useState } from "react"
import Web3 from 'web3';
import { ERC20_ABI } from "app/constants/abis/erc20";

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
                    setBalance((+res / Math.pow(10, d)));
                }).catch((e:any) =>{});
              }).catch((e:any) =>{});
        } catch (error) {
            
        }
     }
    }, [library,account,address])
    return balance
}