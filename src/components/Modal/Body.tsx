import React, { FC } from 'react'

export interface ModalBodyProps {
  className?: string
  children:any;
}

const ModalBody: FC<ModalBodyProps> = ({ className = '', children }) => {
  return <div className='flex flex-col h-full lg:max-w-lg lg:min-w-lg gap-4'>{children}</div>
}

export default ModalBody
