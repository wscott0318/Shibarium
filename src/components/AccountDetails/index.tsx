import Davatar from '@davatar/react'
import { HeadlessUiModal } from '../../components/Modal'
import { injected, SUPPORTED_WALLETS } from '../../modals/WalletModal/wallets'
import { getExplorerLink } from '../../functions/explorer'
import { shortenAddress } from './format'
import { useActiveWeb3React } from '../../services/web3'
import { useAppDispatch } from '../../state/hooks'
import { clearAllTransactions } from '../../state/transactions/actions'
import Image from 'next/image'
import React, { FC, useCallback, useMemo } from 'react'
import { ExternalLink as LinkIcon } from 'react-feather'
import Button from '../Button'
import ExternalLink from '../ExternalLink'
import Copy from './Copy'
import Transaction from './Transaction'
import { useRouter } from 'next/router'

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

const AccountDetails: FC<AccountDetailsProps> = ({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}) => {
  const { chainId, account, connector, deactivate, library } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const router = useRouter();
  const connectorName = useMemo(() => {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return (
      <p className="text-secondary">
        Connected with {name}
      </p>
    )
  }, [connector])

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  // console.log({pendingTransactions})
  const logoutHandler = async () => {
    deactivate();
    await router.push("/home");
  };
  return (
    <div className="space-y-3">
      {/* <img src="../../../public/assets/images/icons/assets.jpg"  width={48}
                      height={48} /> */}
      <div className="space-y-3">
        <HeadlessUiModal.Header
          header={`Account`}
          onClose={toggleWalletModal}
        />
        <HeadlessUiModal.BorderedContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {connectorName}
            <Button
              variant="outlined"
              color="blue"
              size="xs"
              onClick={logoutHandler}
            >
              <span className="trs-2">{`Disconnect`}</span>
            </Button>
          </div>
          <div
            id="web3-account-identifier-row"
            className="flex flex-col justify-center gap-4 web3-fixtxt"
          >
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-full">
                <Davatar
                  size={48}
                  // @ts-ignore TYPE NEEDS FIXING
                  address={account}
                  defaultComponent={
                    // <Image
                    //   src="../../public/images/metamask_icon.png"
                    //   alt="Sushi Chef"
                    //   width={48}
                    //   height={48}
                    // />
                    <img className="white-icon" src="../../images/metamask_icon.png" width={48}
                     height={48}/>
                  }
                  provider={library}
                />
              </div>
              <p  className="text-white">
                {ENSName ? ENSName : account && shortenAddress(account)}
              </p>
            </div>
            <div className="flex items-center gap-2 space-x-3">
              {chainId && account && (
                <ExternalLink
                  color="blue"
                  startIcon={<LinkIcon size={16} />}
                  href={
                    chainId &&
                    getExplorerLink(chainId, ENSName || account, "address")
                  }
                >
                  <p>
                    <span className="trs-3">{`View on explorer`}</span>
                  </p>
                </ExternalLink>
              )}
              {account && (
                <Copy toCopy={account}>
                  <p>
                    <span className="trs-3">{`Copy Address`}</span>
                  </p>
                </Copy>
              )}
            </div>
          </div>
        </HeadlessUiModal.BorderedContent>
        <HeadlessUiModal.BorderedContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-secondary">
              {`Recent Transactions`}
            </p>
            <Button
              variant="outlined"
              color="blue"
              size="xs"
              className='mob-wb-btn'
              onClick={clearAllTransactionsCallback}
            >
              <span className="trs-2">{`Clear all`}</span>
            </Button>
          </div>
          <div className="flex flex-col divide-y divide-dark-800">
            {!!pendingTransactions.length || !!confirmedTransactions.length ? (
              <>
                {pendingTransactions.map((el, index) => (
                  <Transaction key={index} hash={el} />
                ))}
                {confirmedTransactions.map((el, index) => (
                  <Transaction key={index} hash={el} />
                ))}
              </>
            ) : (
              <p className="text-secondary">
                {`Your transactions will appear here...`}
              </p>
            )}
          </div>
        </HeadlessUiModal.BorderedContent>
      </div>
    </div>
  );
}

export default AccountDetails
