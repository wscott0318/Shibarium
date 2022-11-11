
import { ChainId } from "@shibarium/core-sdk";
import { ENV_CONFIGS } from "app/config/constant";
import { useActiveWeb3React } from "app/services/web3"
import { useEffect, useState } from "react"
import { useEthBalance } from "./useEthBalance";
import { useTokenBalance } from "./useTokenBalance";
import { dynamicChaining } from "web3/DynamicChaining";

export const useBoneBalance = ()=>{
    const {account,chainId =1} = useActiveWeb3React()

    const [balance, setBalance] = useState(0)
    let walletBalance = 0;
    try {
        walletBalance = chainId === ChainId.SHIBARIUM ? useEthBalance() : useTokenBalance(dynamicChaining[chainId].BONE);
        
    } catch (error) {
        
    }
    useEffect(() => {
        account && setBalance(walletBalance)
    }, [account,walletBalance])
    return balance
}




