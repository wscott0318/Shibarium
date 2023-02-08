import { getClient } from "../../client/shibarium"

export const finalise = async (token, from) => {
  console.log(`Finalise ${token} plasma withdrawal from ${from}`)

  try {
    const client = await getClient("plasma")
    const erc20Token = client.erc20(token, true)

    const result = await erc20Token.withdrawExit({ from })

    const txHash = await result.getTransactionHash()
    console.log("txHash", txHash)
    const receipt = await result.getReceipt()
    console.log("receipt", receipt)

    console.log(`Finalise Tx: ${txHash}`)
    return txHash;
  } catch (e) {
    console.log(e)
  }
  return null;
}

