import { useWeb3React } from '@web3-react/core'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

import Loader from '../Loader'

const GnosisManagerNoSSR = dynamic(() => import('./GnosisManager'), {
  ssr: false,
})

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { active } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React("NETWORK")


  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [])


  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-secondary">
          {`Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device`}
        </div>
      </div>
    )
  }

  // if neither context is active, spin
  if (!active && !networkActive) {
    return showLoader ? (
      <div className="flex items-center justify-center h-80">
        <Loader />
      </div>
    ) : null
  }

  return (
    <>
      <GnosisManagerNoSSR />
      {children}
    </>
  )
}
