import { useEffect, useState } from "react";
import axios from "axios";
import { AbiItem } from "web3-utils";
export const useABI = (key: string) => {
  const [abi, setAbi] = useState<AbiItem>();

  async function getABI() {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_ABI_API_URL}/sepolia/v2/${key}`
    );
    setAbi(data.abi);
  }

  useEffect(() => {
    if (key) getABI();
  }, [key]);

  return abi;
};
