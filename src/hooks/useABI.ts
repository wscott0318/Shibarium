import { useEffect, useState } from "react";
import axios from "axios";
import { AbiItem } from "web3-utils";
export const useABI = (key: string) => {
  const url = process.env.NEXT_PUBLIC_ABI_API_URL;
  const network = process.env.NEXT_PUBLIC_NET_NAME;
  const version = process.env.NEXT_PUBLIC_NET_VERS;
  const [abi, setAbi] = useState<AbiItem>();

  async function getABI() {
    const { data } = await axios.get(`${url}/${network}/${version}/${key}`);
    setAbi(data.abi);
  }

  useEffect(() => {
    if (key) getABI();
  }, [key]);

  return abi;
};
