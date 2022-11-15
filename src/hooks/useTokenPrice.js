import { useActiveWeb3React } from "app/services/web3"
import { useEffect, useState } from "react"
import Web3 from 'web3';

export const useTokenPrice = (address)=>{
    const [price, setPrice] = useState(0);

    return price
}


