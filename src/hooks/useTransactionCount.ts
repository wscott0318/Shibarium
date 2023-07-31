import { useActiveWeb3React } from "app/services/web3";
import { usePendingTransactionCount } from "app/state/user/hooks";
import { getTransactions } from "pages/components/BridgeCalls";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useTransactionCount = () => {
  const { account } = useActiveWeb3React();
  const [pendingTransactionCount, setPendingTransactionsCount] =
    usePendingTransactionCount();
  const getTransactionsCount = () => {
    getTransactions(account).then((res: any) => {
      if (res?.length > 0) {
        let pending = res?.filter((e: any) => e.status === 0).length;
        setPendingTransactionsCount(pending);
      } else setPendingTransactionsCount(0);
    });
  };
  useEffect(() => {
    if (account) {
      getTransactionsCount();
    }
  }, [account]);
  return { pendingTransactionCount, getTransactionsCount };
};

export default useTransactionCount;
