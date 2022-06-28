import React, { FC } from 'react'

export interface ModalActionsProps {}

const ModalActions: FC<any> = ({ children }) => {
  return <div className="flex justify-end gap-4 items-center">{children}</div>
}

export default ModalActions
