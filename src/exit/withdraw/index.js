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
      addressData = res.data.data.token;
    }).catch((err) => {
      addressData = {};
      console.log(err);
    });
    return addressData;
  };

  try {
    const client = await getClient(clientType);
    const inclusion = await client.isCheckPointed(burnOrExitTxHash);
    if (!inclusion) {
      console.log("Burn transaction has not been checkpointed as yet");
    }

    const burnExitTxReceipt =
      await client.client.child.web3_.eth.getTransactionReceipt(
        burnOrExitTxHash
      );

    const childTokenAddress = utils.toChecksumAddress(burnExitTxReceipt.to);

    const tokenData = await handleBurn(childTokenAddress);

    if (!tokenData) {
      console.log(
        `corresponding parent contract not found for ${childTokenAddress}`
      );
    }

    const parentTokenAddress = tokenData.parentAddress;

    // todo - other types in addition to erc20
    const erc20Token = client.erc20(parentTokenAddress, true);
    console.log("burn exit tx receipt => " ,burnExitTxReceipt);
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

    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);

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
