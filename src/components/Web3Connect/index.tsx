import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { classNames } from '../../functions/className'
import { useWalletModalToggle } from '../../state/application/hooks'
import React from 'react'
import { Activity } from 'react-feather';
import { useRouter } from 'next/router'

import Button, { ButtonProps } from '../Button'

export default function Web3Connect({ color = 'gray', size = 'sm', className = '', ...rest }: ButtonProps) {

  const toggleWalletModal = useWalletModalToggle()
  const { error } = useWeb3React()
  const router = useRouter()
  return error ? (
    <div
      className="wallet-pop"
      onClick={toggleWalletModal}
    >
      <div className="">
        <Activity className="w-4 h-4" />
      </div>
      {error instanceof UnsupportedChainIdError ? 'You are on the wrong network' : 'Error'}
    </div>
  ) : router.asPath === '/login' ? 
  <>
   <Button
     {...rest}
     id="connect-wallet"
      onClick={toggleWalletModal}
      className='login_cnt_row'>
      <span className='login_icon'><img className='img-fluid' src="../../images/fox-icon.png" alt="login-logo" /></span>
      <div className='login_cnt_row_name'>    
          <b>Connect Wallet</b>
          <p>Connect using Browser wallet</p> 
      </div>
      <span className='white_arw'><img className='img-fluid' src="../../images/white-arrow.png" alt="white-arrow" /></span>
  </Button>
  </> : (
    <Button 
      id="connect-wallet"
      onClick={toggleWalletModal}
      // variant="outlined"
      // color={color}
      className={classNames(className, '!border-none btn primary-btn')}
      
      {...rest}
    >
      {`Connect to a wallet`}
    </Button>
  )
}
