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
      className="flex items-center justify-center px-4 py-2 font-semibold text-white border rounded bg-opacity-80 border-red bg-red hover:bg-opacity-100"
      onClick={toggleWalletModal}
    >
      <div className="mr-1">
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
      className={classNames(className, '!border-none btn gradient_btn')}
      
      {...rest}
    >
      {`Connect using browser wallet`}
    </Button>
  )
}
