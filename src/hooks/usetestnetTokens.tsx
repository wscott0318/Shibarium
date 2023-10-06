import { useQuery } from "@tanstack/react-query";
import { getWalletTokenList } from "app/services/apis/validator";
import axios from "axios";

const useTestnetTokens = () => {
  let tokens = useQuery({
    queryKey: ["testnet_tokens"],
    queryFn: () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_STAKING_API_URL_TEST}/api/v1/tokens/getList`
        )
        .then((res: any) => res.data.message.tokens),
  });

  return tokens;
};

export default useTestnetTokens;
