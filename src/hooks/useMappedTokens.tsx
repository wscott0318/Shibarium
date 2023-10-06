import { useQuery } from "@tanstack/react-query";
import { getWalletTokenList } from "app/services/apis/validator";
import axios from "axios";

const useMappedTokens = () => {
  let tokens = useQuery({
    queryKey: ["mainnet_tokens"],
    queryFn: () =>
      getWalletTokenList().then((res: any) => res.data.message.tokens),
  });

  return tokens;
};

export default useMappedTokens;
