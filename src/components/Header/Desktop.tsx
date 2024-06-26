import { NATIVE } from 'shibarium-get-chains'
import Container from 'app/components/Container'
import { NAV_CLASS } from 'app/components/Header/styles'
// import LanguageSwitch from 'app/components/LanguageSwitch'
import Web3Network from 'app/components/Web3Network'
import Web3Status from 'app/components/Web3Status'
import useIsCoinbaseWallet from 'app/hooks/useIsCoinbaseWallet'
import { useActiveWeb3React } from 'app/services/web3'
import { useETHBalances } from 'app/state/wallet/hooks'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

const HEADER_HEIGHT = 64

const Desktop: FC = () => {
  // const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const isCoinbaseWallet = useIsCoinbaseWallet()

  return (
    <>
      <header className="fixed z-20 hidden w-full lg:block" style={{ height: HEADER_HEIGHT }}>
        <nav className={NAV_CLASS}>
          <Container maxWidth="7xl" className="mx-auto">
            <div className="">
              <div className="flex gap-4">
                <div className="flex items-center w-6 mr-4">
                  <Image src="https://www.shibatoken.com/images/shib-logo.svg" alt="Sushi logo" width="24" height="24" />
                </div>
              
              </div>
             <RightMenu />
            </div>
          </Container>
        </nav>
      </header>
      <div style={{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }} />
    </>
  )
}

export const RightMenu = ()=>{
  const { account, chainId, library } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const isCoinbaseWallet = useIsCoinbaseWallet()

  return(
    <div className="flex items-center justify-end gap-2 meta-mask">
    {library && (library.provider.isMetaMask || isCoinbaseWallet) && (
      <div className="hidden sm:inline-block">
        <Web3Network />
      </div>
    )}

    <div className="flex items-center w-auto text-sm font-bold border-2 rounded shadow cursor-pointer pointer-events-auto select-none border-dark-800 hover:border-dark-700 bg-dark-900 whitespace-nowra">
      {account && chainId && userEthBalance && (
        <Link  href="#" passHref>
          <a className="hidden px-3 network text-high-emphesis text-bold md:block">
            {/*@ts-ignore*/}
            {userEthBalance?.toSignificant(4)} {NATIVE[chainId || 1].symbol}
          </a>
        </Link>
      )}
      <Web3Status />
    </div>
    <div className="hidden lg:flex">
      {/* <LanguageSwitch /> */}
    </div>
  </div>
  )
}
export default Desktop
