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
    getTransactions(account).then((res) => {
      let pending = res.filter((e: any) => e.status === 0).length;
      setPendingTransactionsCount(pending);
    });
  };
  useEffect(() => {
    if (account) {
      getTransactionsCount();
    }
  }, [account]);
  console.log("pending transaction ", pendingTransactionCount);
  return { pendingTransactionCount, getTransactionsCount };
};

export default useTransactionCount;
