import { utils } from "web3";
import { getClient } from "../../client/shibarium";
import { getToWeiUnitFromDecimal } from "../../utils/weiDecimal";
// import { StakingAPI } from "../../client/staking-api"
import { burnGetAPI } from "../../services/apis/bridge/burn";
export const startBurn = async (clientType, token, from, amount) => {
  console.log(`begin exit from L2 -> L1 using ${clientType}`);
  const handleBurn = async (tokenAddr) => {
    let addressData;
    await burnGetAPI(clientType, tokenAddr)
      .then((res) => {
        addressData = res.data.data.token;
      })
      .catch((err) => {
        addressData = {};
        console.log(err);
      });
    return addressData;
  };
  try {
    console.log(`Get token data from Staking API for ${token}`);
    const tokenAddr = utils.toChecksumAddress(token);
    const tokenData = await handleBurn(tokenAddr);

    const childAddr = tokenData?.childAddress;
    const format = getToWeiUnitFromDecimal(tokenData?.childDecimals);
    const { tokenType } = tokenData;
    const amountWei = utils.toWei(String(amount), format);
   
    
    if (tokenType !== "ERC20") {
      console.log(`${tokenType} not implemented yet`);
      process.exit(1);
    }

    const client = await getClient(clientType);

    const erc20Token = client.erc20(childAddr, false);
    console.log("sending burn/burn tx on Child Contract, L2:");
    console.log("erc20 token => " , erc20Token , client)
    const result = await erc20Token.withdrawStart(amountWei, { from });

    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);
    console.log(`Burn/Exit Tx: ${txHash}`);
    console.log(
      "Use the Tx to track the burn/burn and check checkpoint inclusion on Parent chain:"
    );
    console.log(`   sandbox-wallet exit burn-status ${clientType} ${txHash}`);
    console.log("Use the Tx to finalise and withdraw when ready:");
    console.log(`   sandbox-wallet exit withdraw ${clientType} ${txHash}`);
    return txHash;
  } catch (e) {
    console.log(e);
  }
};

export const burnStatus = async (clientType, txHash) => {
  try {
    console.log("");
    const client = await getClient(clientType);
    const burnExitTx = await client.client.child.web3_.eth.getTransaction(
      txHash
    );
    const burnExitTxreceipt = await client.client.child.web3_.eth.getTransactionReceipt(
      txHash
    );
      console.log("burn exit tx " , burnExitTx , burnExitTxreceipt)
    const from = String(burnExitTx.from);

    console.log(`Exit type            : ${clientType}`);
    console.log(`Tx was sent from     : ${from}`);
    console.log(`L2 Tx Hash           : ${txHash}`);

    const inclusion = await client.isCheckPointed(txHash);

    console.log(`Checkpoint Inclusion : ${inclusion}`);

    if (!inclusion) {
      console.log("");
      console.log("Burn transaction has not been checkpointed as yet");
      // process.exit(0)
    }

    console.log("");
    console.log("withdraw process can be executed with:");
    console.log(`  sandbox-wallet exit withdraw ${clientType} ${txHash}`);
    console.log("");
    return {inclusion,burnExitTxreceipt};
    // process.exit(0)
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default {
  burnStatus,
};
