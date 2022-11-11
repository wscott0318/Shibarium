import { classNames } from '../../functions/className'
import React, { FC } from 'react'

export interface ModalActionErrorProps {
  className?: string;
  children:any;
}

const ModalError: FC<ModalActionErrorProps> = ({ className = '', children }) => {
  if (!children) return <></>

  return (
    <p className={classNames('text-center text-red', className)}>
      {children}
    </p>
  )
}

export default ModalError
