import { CheckCircleIcon, ExclamationIcon, XCircleIcon } from '@heroicons/react/outline'
import ExternalLink from '../../components/ExternalLink'
import Loader from '../../components/Loader'
import Typography from '../../components/Typography'
import { classNames, getExplorerLink } from '../../functions'
import { useActiveWeb3React } from '../../services/web3'
import { useAllTransactions } from '../../state/transactions/hooks'
import React, { FC } from 'react'

const Transaction: FC<{ hash: string }> = ({ hash }) => {
  const { chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()
  
  const tx = allTransactions?.[hash]
  const summary = tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')
  const cancelled = tx?.receipt && tx.receipt.status === 1337

  if (!chainId) return null

  const pendingRender = ()=>{
    if(pending){
      return "text-primary"
    }else{
      if(success){
        return 'text-green'
      }else{
          return  'text-red'
      }
    }
  }

  const circleIconRender = ()=>{
    if(success){
      return <CheckCircleIcon width={16} height={16} />
    }else{
      return cancelled ?  <XCircleIcon width={16} height={16} /> :  <ExclamationIcon width={16} height={16} />
    }
  }


  return (
    <div className="flex flex-col w-full py-1">
      <ExternalLink href={getExplorerLink(chainId, hash, 'transaction')} className="flex items-center gap-2">
        <div
          className={classNames(
           pendingRender()
          )}
        >
          {pending ? (
            <Loader />
          ) : circleIconRender()}
        </div>
        <Typography variant="xs" weight={700} className="flex items-center hover:underline py-0.5">
          {summary ?? hash}
        </Typography>
      </ExternalLink>
    </div>
  )
}

export default Transaction
