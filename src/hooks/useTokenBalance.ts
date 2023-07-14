import { useActiveWeb3React } from "app/services/web3";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "app/constants/abis/erc20";
import { tokenDecimal } from "web3/commonFunctions";
import * as Sentry from "@sentry/nextjs";

export const useWeb3Decimals = (address: any) => {
  const { library, account }: any = useActiveWeb3React();

  const [decimal, setDecimal] = useState<number>(0);
  useEffect(() => {
    try {
      const web3: any = new Web3(library?.provider);
      const contract = new web3.eth.Contract(ERC20_ABI, address);
      contract.methods
        .decimals()
        .call()
        .then((d: number) => {
          setDecimal(18);
        });
    } catch (error: any) {
      setDecimal(18);
      Sentry.captureException("useWeb3Decimals ", error);
    }
  }, [library, account, address]);
  return decimal;
};

export const useTokenBalance = (address: string) => {
  const { library, account }: any = useActiveWeb3React();

  const [balance, setBalance] = useState(-1);
  useEffect(() => {
    if (library && account && address) {
      try {
        const web3: any = new Web3(library?.provider);
        const contract = new web3.eth.Contract(ERC20_ABI, address);
        contract.methods
          .balanceOf(account)
          .call()
          .then((res: any) => {
            contract.methods
              .decimals()
              .call()
              .then((d: number) => {
                setBalance(+(+res / Math.pow(10, d)).toFixed(tokenDecimal));
              });
          })
          .catch((err: any) => {
            // console.log(err);
          });
      } catch (error: any) {
        // console.log(error);
        Sentry.captureException("getTokenBalance ", error);
      }
    } else {
      // console.log({ library, account, address });
    }
  }, [library, account, address]);
  return balance;
};

export const useWalletTokenBalance = (address: string) => {
  const { library, account }: any = useActiveWeb3React();

  const [newBalance, setBalance] = useState(0);
  function updateBalance() {
    try {
      const web3: any = new Web3(library?.provider);
      const contract = new web3.eth.Contract(ERC20_ABI, address);
      contract.methods
        .balanceOf(account)
        .call()
        .then((res: any) => {
          contract.methods
            .decimals()
            .call()
            .then((d: number) => {
              setBalance(+web3.utils.fromWei(res, "ether"));
            });
        });
    } catch (error: any) {
      Sentry.captureException("getTokenBalance ", error);
    }
  }
  useEffect(() => {
    if (library && account && address) {
      updateBalance();
    }
  }, [library, account, address]);
  return { newBalance, updateBalance };
};

export const getTokenBalance = async (
  library: any,
  account: any,
  address: any
) => {
  let balance: any = 0;
  if (library && account && address) {
    try {
      const web3: any = new Web3(library?.provider); //
      const contract = new web3.eth.Contract(ERC20_ABI, address);
      await contract.methods
        .balanceOf(account)
        .call()
        .then(async (res: any) => {
          await contract.methods
            .decimals()
            .call()
            .then((d: number) => {
              balance = +(+res / Math.pow(10, d)).toFixed(tokenDecimal);
              // balance = web3.utils.fromWei(res, 'ether')
            });
        })
        .catch((err: any) => {
          // console.log("balance error " , err)
        });
    } catch (error: any) {
      Sentry.captureException("getTokenBalance ", error);
    }
    return balance;
  }
};
