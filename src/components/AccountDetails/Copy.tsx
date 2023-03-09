import { DocumentDuplicateIcon } from '@heroicons/react/outline'
import { classNames } from '../../functions'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import React, { FC } from 'react'

interface CopyHelperProps {
  className?: string
  toCopy: string
  children?: React.ReactNode
}

const CopyHelper: FC<CopyHelperProps> = ({ className, toCopy, children }) => {
  const [isCopied, setCopied] = useCopyClipboard()

  const copiedRender = () =>{
    if(isCopied){
      return "Copied"
    }else{
      if(children){
        return children
      }else{
        return  <DocumentDuplicateIcon width={16} height={16} />
      }
    }
  } 

  return (
    <div className={classNames(className)} onClick={() => setCopied(toCopy)}>
        <div className="flex items-center gap-1 cursor-pointer wal-btn">
          {copiedRender()}
        </div>
    </div>
  )
}

export default CopyHelper
