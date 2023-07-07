
import { ChainId } from "shibarium-get-chains";
import { useActiveWeb3React } from "app/services/web3"
import { useEffect, useState } from "react"
import { useEthBalance } from "./useEthBalance";
import { useTokenBalance } from "./useTokenBalance";
import { dynamicChaining } from "web3/DynamicChaining";
import { SHIBARIUM_CHAIN_ID } from "app/config/constant";

export const useBoneBalance = ()=>{
    const {account,chainId =1} = useActiveWeb3React()

    const [balance, setBalance] = useState(0)
    let walletBalance = 0;
    try {
        walletBalance =
          chainId === SHIBARIUM_CHAIN_ID
            ? useEthBalance()
            : useTokenBalance(dynamicChaining[chainId].BONE);
        
    } catch (error) {
        
    }
    useEffect(() => {
        account && setBalance(walletBalance)
    }, [account,walletBalance])
    return balance
}




