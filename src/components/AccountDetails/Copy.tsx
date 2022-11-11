import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/outline'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import React, { FC } from 'react'

interface CopyHelperProps {
  className?: string
  toCopy: string
  children?: React.ReactNode
}

const CopyHelper: FC<CopyHelperProps> = ({ className, toCopy, children }) => {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <div className='' onClick={() => setCopied(toCopy)}>
        <div className="flex items-center gap-1 cursor-pointer">
          {isCopied ? "Copied!"  : children ? children : <DocumentDuplicateIcon width={16} height={16} />}
        </div>
    </div>
  )
}

export default CopyHelper
