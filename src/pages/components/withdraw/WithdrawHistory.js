import { utils } from "web3";
import { getClient, loadContract } from "../../../client/shibarium";
// import { StakingAPI } from "../../client/staking-api"
import { getToWeiUnitFromDecimal } from "utils/weiDecimal";
import { burnGetAPI } from "app/services/apis/bridge/burn";

const withdrawHistoryPlasma = async (
  client,
  token,
  walletAddr,
  childTokenAddr,
  parentTokenAddr,
  decimals
) => {
  const format = getToWeiUnitFromDecimal(decimals);
  const childWeb3 = client.client.child.web3_;

  const childTokenContract = await loadContract(
    childTokenAddr,
    "ChildERC20",
    "l2",
    "plasma"
  );
  const parentWithdrawManagerContract = await loadContract(
    "Main.Contracts.WithdrawManagerProxy",
    "WithdrawManager"
  );

  const symbol = await childTokenContract.methods.symbol().call();

  const events = await childTokenContract.getPastEvents("Withdraw", {
    filter: { token: parentTokenAddr, from: walletAddr },
    fromBlock: 0,
    toBlock: "latest",
  });

  console.log("");

  for (let i = 0; i < events.length; i += 1) {
    console.log("");
    const burnEvent = events[i];
    const burnTxHash = burnEvent.transactionHash;
    const burnBlockNumber = burnEvent.blockNumber;
    const { amount } = burnEvent.returnValues;
    const amountFormatted = utils.fromWei(amount, format);

    const block = await childWeb3.eth.getBlock(burnBlockNumber);

    const d = new Date(parseInt(block.timestamp, 10) * 1000);

    console.log(`${amountFormatted} ${symbol}`);
    console.log(d);
    console.log(`1. Burned in Tx ${burnTxHash}`);

    const inclusion = await client.isCheckPointed(burnTxHash);
    if (inclusion) {
      console.log(`   Burn tx included in checkpoint`);

      const chainBlockInfo = await client.exitUtil.getChainBlockInfo(
        burnTxHash
      );

      console.log(`2. Withdrawal confirmation`);
      const payload = await client.exitUtil.buildPayloadForExit(
        burnTxHash,
        "0xebff2602b3f468259e1e99f613fed6691f3a6526effe6ef3e768ba7ae7a36c4f".toLowerCase()
      );

      const age = await parentWithdrawManagerContract.methods
        .verifyInclusion(payload, 0, false)
        .call();
      const ageBn = new utils.BN(String(age));
      const exitId = ageBn.shln(1);
      const exitAt = exitId.shrn(128);

      // ExitStarted
      const exitStartedEvent =
        await parentWithdrawManagerContract.getPastEvents("ExitStarted", {
          filter: { exitId },
          fromBlock: chainBlockInfo.txBlockNumber,
          toBlock: "latest",
        });

      let withdrawBlockNum;
      if (exitStartedEvent.length > 0) {
        const withdrawConfirmedTx = exitStartedEvent[0].transactionHash;
        withdrawBlockNum = exitStartedEvent[0].blockNumber;
        console.log(`   withdrawal confirmed in Tx: ${withdrawConfirmedTx}`);
      } else {
        console.log("   ExitStarted event not found - try running:");
        console.log(
          `     ./bin/sandbox-wallet exit withdraw plasma ${burnTxHash}`
        );
        console.log("");
        console.log("------------------");
        continue;
      }

      console.log("3. Finalised");
      // get Withdraw event
      const withdrawEvent = await parentWithdrawManagerContract.getPastEvents(
        "Withdraw",
        {
          filter: { exitId },
          fromBlock: withdrawBlockNum,
          toBlock: "latest",
        }
      );

      if (withdrawEvent.length > 0) {
        console.log("   withdraw event found");
        const finalisedTx = withdrawEvent[0].transactionHash;
        console.log(`   finalised in Tx: ${finalisedTx}`);
      } else {
        console.log("   Withdraw event not found");
        const canExitAt = parseInt(exitAt, 10) * 1000;
        const now = Date.now();
        if (now > canExitAt) {
          console.log("   Exit date passed. Run the Plasma finalise command:");
          console.log(
            `     ./bin/sandbox-wallet exit withdraw finalise ${parentTokenAddr} ${walletAddr}`
          );
          console.log("");
        } else {
          const exitDate = new Date(canExitAt);
          console.log("   Exit date not reached.");
          console.log(`   Can run finalise command on ${exitDate}`);
        }
      }
    } else {
      console.log(`    burn tx not yet included in checkpoint`);
    }
    console.log("------------------");
    return payload;
  }
};

const withdrawHistoryPos = async (
  client,
  token,
  walletAddr,
  childTokenAddr,
  parentTokenAddr,
  decimals
) => {
  const format = getToWeiUnitFromDecimal(decimals);
  const childWeb3 = client.client.child.web3_;

  const childTokenContract = await loadContract(
    childTokenAddr,
    "ChildERC20",
    "l2",
    "pos"
  );
  const parentErc20 = client.erc20(parentTokenAddr, true);

  const symbol = await childTokenContract.methods.symbol().call();

  const events = await childTokenContract.getPastEvents("Transfer", {
    filter: {
      from: walletAddr,
      to: "0x0000000000000000000000000000000000000000",
    },
    fromBlock: 0,
    toBlock: "latest",
  });

  console.log("events " , events);
  const payload = await client.exitUtil.buildPayloadForExit(
      events[2]?.transactionHash,
      events[2]?.signature.toLowerCase()
      );
      console.log("payload " , payload);
  for (let i = 0; i < events.length; i += 1) {
    console.log("");
    const burnEvent = events[i];
    const burnTxHash = burnEvent.transactionHash;
    const burnBlockNumber = burnEvent.blockNumber;
    const amount = String(burnEvent.returnValues.value);
    const amountFormatted = utils.fromWei(amount, format);

    const block = await childWeb3.eth.getBlock(burnBlockNumber);

    const d = new Date(parseInt(block.timestamp, 10) * 1000);

    console.log(`${amountFormatted} ${symbol}`);
    console.log(d);
    console.log(`1. Burned in Tx ${burnTxHash}`);
    const inclusion = await client.isCheckPointed(burnTxHash);

    if (inclusion) {
      // const d = new Date( parseInt( inclusion.createdAt, 10 ) * 1000 )
      console.log(`   Burn tx included in checkpoint`);

      console.log(`2. Withdrawal confirmation`);

      const isWithdrawn = await parentErc20.isWithdrawExited(burnTxHash);

      if (isWithdrawn) {
        console.log("   Withdraw exit confirmed.");
      } else {
        console.log("   Withdraw exit not yet confirmed. Try running:");
        console.log(
          `      ./bin/sandbox-wallet exit withdraw pos ${burnTxHash}`
        );
      }
    } else {
      console.log(`   burn tx not yet included in checkpoint`);
    }
    console.log("------------------");
  }
  return payload;
  // burn is Transfer(account, address(0), amount); event to address 0x0

  // withdraw is exitTokens function in ERC20Predicate contract
};

export const withdrawHistory = async (clientType, token, walletAddr) => {
  console.log(
    `check withdraw history for ${token} from ${walletAddr} using ${clientType}`
  );
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
    const tokenAddr = utils.toChecksumAddress(token);
    const tokenData = await handleBurn(tokenAddr);
    // const tokenData = await stakingApi.getTokenData(clientType, tokenAddr);

    const { childDecimals, childAddress, parentAddress, tokenType } = tokenData;

    if (tokenType !== "ERC20") {
      console.log("not implemented yet");
    }
    console.log("token data " , tokenData)
    const client = await getClient(clientType);
    console.log("client received", client);
    let payload;
    if (clientType === "plasma") {
      console.log("plasma history");
      payload = await withdrawHistoryPlasma(
        client,
        token,
        walletAddr,
        childAddress,
        parentAddress,
        childDecimals
      );
    } else {
      console.log("pos history");
      payload = await withdrawHistoryPos(
        client,
        token,
        walletAddr,
        childAddress,
        parentAddress,
        childDecimals
      );
    }
    return payload;
  } catch (e) {
    console.log(e);
  }
};
