import useScreenOrientation from 'app/hooks/useScreenOriantation';
import { useRouter } from 'next/router';
import React from 'react'
import { useMoralis } from 'react-moralis';
import { RouteGuard } from 'utils/RouteGaurd'
import Header from './layout/header';
import { isDesktop, isMobile } from 'react-device-detect';
import PortraitWarning from './components/PortraitWarning';



const ComponentRouters=({Component, pageProps}:any)=> {
    const {user} = useMoralis();
    const router = useRouter();
    const orientation = useScreenOrientation()
    console.log(router.asPath);
  return (
      <RouteGuard user={user}>
         {router.asPath === "/home" || router.asPath ===  '/bone-staking' ? <Header /> : ""}
         {isMobile && orientation === 'landscape-primary' ? <PortraitWarning /> : <Component {...pageProps} />
         }
      </RouteGuard>
  )
}

export default ComponentRouters