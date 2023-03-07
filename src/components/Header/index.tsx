import Mobile from './Mobile'
import useDesktopMediaQuery from '../../hooks/useDesktopMediaQuery'
import React, { FC } from 'react'

import Desktop from './Desktop'

const Header: FC = () => {
  const isDesktop = useDesktopMediaQuery()

  return <>{isDesktop ? <Desktop /> : <Mobile />}</>
}

export default Header
