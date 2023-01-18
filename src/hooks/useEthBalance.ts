import { useActiveWeb3React } from "app/services/web3";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { dynamicChaining } from "web3/DynamicChaining";
import { useWeb3Decimals } from "./useTokenBalance";

export const useEthBalance = () => {
  const { library, account, chainId = 1 }: any = useActiveWeb3React();
  const decimal = useWeb3Decimals(dynamicChaining[chainId].BONE);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (library && account) {
      try {
        const web3 = new Web3(library?.provider);
        web3.eth
          .getBalance(account)
          .then((res) => {
            let bal = +res / Math.pow(10, decimal);
            setBalance(bal);
          })
          .catch((e: any) => {
            // console.log(e)
          });
      } catch (error) {}
    }
  }, [library, account]);
  return balance;
};
