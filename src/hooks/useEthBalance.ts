import { useActiveWeb3React } from "app/services/web3"
import { useEffect, useState } from "react"
import Web3 from 'web3';

export const useEthBalance = ()=>{
    const {library,account}:any = useActiveWeb3React()

    const [balance, setBalance] = useState(0)
    useEffect(() => {
     if (library && account) {
    try {
        const web3 = new Web3(library?.provider);
        web3.eth.getBalance(account).then((res) => {
            setBalance((+res / Math.pow(10, 18)));
          }).catch((e:any) =>{
            // console.log(e)
        });;
    } catch (error) {
        
    }
     }
    }, [library,account])
    return balance
}