import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline'
import Typography from '../../components/Typography'
import React, { FC, ReactNode } from 'react'

export interface ModalHeaderProps {
  header: string | ReactNode
  subheader?: string
  onClose?(): void
  onBack?(): void
}

const ModalHeader: FC<ModalHeaderProps> = ({ header, subheader, onBack, onClose }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="flex flex-col gap-1 justify-center mb-2">
        <Typography weight={700} className="flex gap-3 text-high-emphesis items-center">
          {onBack && (
            <ArrowLeftIcon onClick={onBack} width={24} height={24} className="cursor-pointer text-high-emphesis" />
          )}
          {header}
        </Typography>
        {subheader && <Typography variant="sm">{subheader}</Typography>}
      </div>
      {onClose && (
        <div className="flex items-center justify-center w-6 h-6 cursor-pointer mb-2" onClick={onClose}>
          <XIcon width={24} height={24} className="text-high-emphesis" />
        </div>
      )}
    </div>
  )
}

export default ModalHeader
