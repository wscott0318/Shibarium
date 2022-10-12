import { useMoralisWeb3Api } from "react-moralis";
import { useActiveWeb3React } from "app/services/web3"
import { useEffect, useState } from "react"
import Web3 from 'web3';

export const useTokenPrice = (address)=>{
    const Web3Api = useMoralisWeb3Api();
    const [price, setPrice] = useState(0);

    useEffect(() => {
     if (address && Web3Api) {
        try {      
            const options = {
                address: "0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096",
                chain: 'eth',
                exchange:'uniswap-v3'
              };
            Web3Api.token.getTokenPrice(options).then((price)=>{
                console.log(price)
                setPrice(price)
            }).catch(e =>{})
        } catch (error) {
            
        }
     }
    }, [address,Web3Api])
    return price
}


