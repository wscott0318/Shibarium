import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { classNames } from '../../functions'
import { useWalletModalToggle } from '../../state/application/hooks'
import React from 'react'
import { Activity } from 'react-feather'

import Button, { ButtonProps } from '../Button'

export default function Web3Connect({ color = 'gray', size = 'sm', className = '', ...rest }: ButtonProps) {

  const toggleWalletModal = useWalletModalToggle()
  const { error } = useWeb3React()
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
  ) : (
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
