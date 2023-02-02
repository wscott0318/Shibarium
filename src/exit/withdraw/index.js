import { burnGetAPI } from "app/services/apis/bridge/burn";
import { utils } from "web3";
import { getClient } from "../../client/shibarium";

export const startWithdraw = async (clientType, burnOrExitTxHash, fast = 0) => {
  const useFast = parseInt(fast, 10) > 0;

  console.log(
    `withdraw from ${clientType} using tx ${burnOrExitTxHash}. Fast mode = ${useFast}`
  );

  const handleBurn = async (tokenAddr) => {
    let addressData;
    await burnGetAPI(clientType, tokenAddr).then((res) => {
      console.log("step 6 withdraw");
      console.log("response ", res);
      addressData = res.data.data.token;
      console.log("address data", addressData);
    });
    return addressData;
  };

  try {
    const client = await getClient(clientType);
    console.log("step 1 withdraw", client);
    const inclusion = await client.isCheckPointed(burnOrExitTxHash);
    if (!inclusion) {
      console.log("Burn transaction has not been checkpointed as yet");
    }

    console.log("step 2 withdraw" , inclusion);
    const burnExitTxReceipt =
      await client.client.child.web3_.eth.getTransactionReceipt(
        burnOrExitTxHash
      );

    const childTokenAddress = utils.toChecksumAddress(burnExitTxReceipt.to);
    console.log("step 3 withdraw");

    const tokenData = await handleBurn(childTokenAddress);
    console.log("step 5 withdraw");

    if (!tokenData) {
      console.log(
        `corresponding parent contract not found for ${childTokenAddress}`
      );
    }

    const parentTokenAddress = tokenData.parentAddress;

    // todo - other types in addition to erc20
    const erc20Token = client.erc20(parentTokenAddress, true);
    console.log("step 7 withdraw");
    let result;
    if (clientType === "pos") {
      if (useFast) {
        result = await erc20Token.withdrawExitFaster(burnOrExitTxHash, {
          from: burnExitTxReceipt.from,
        });
      } else {
        result = await erc20Token.withdrawExit(burnOrExitTxHash, {
          from: burnExitTxReceipt.from,
        });
      }
    } else if (useFast) {
      result = await erc20Token.withdrawConfirmFaster(burnOrExitTxHash, {
        from: burnExitTxReceipt.from,
      });
    } else {
      result = await erc20Token.withdrawConfirm(burnOrExitTxHash, {
        from: burnExitTxReceipt.from,
      });
    }
    console.log("step 8 withdraw");
    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);
    console.log("step 9 withdraw");
    console.log(`Withdraw Tx: ${txHash}`);

    if (clientType === "plasma") {
      console.log("Plasma withdrawal can be finalised in 7 days with:");
      console.log(
        `  sandbox-wallet exit finalise ${parentTokenAddress} ${burnExitTxReceipt.from}`
      );
    }

    return txHash;
  } catch (e) {
    console.log(e);
    return false;
  }
};
