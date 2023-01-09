// import useScreenOrientation from 'app/hooks/useScreenOriantation';
import { useRouter } from 'next/router';
import React from 'react'
import { RouteGuard } from 'utils/RouteGaurd'
import Header from './layout/header';
import { isDesktop, isMobile } from 'react-device-detect';
// import PortraitWarning from './components/PortraitWarning';

const headerRoutes = [
  '/home',
  '/bone-staking',
  '/all-validator',
  '/my-account',
  '/migrate-stake'
]

const ComponentRouters=({Component, pageProps}:any)=> {
    const router = useRouter();
    // const orientation = useScreenOrientation()
    // console.log(router.asPath);
  return (
    <RouteGuard>
      {headerRoutes.includes(router.asPath) ? (
        <Header />
      ) : (
        null
      )}
        <Component {...pageProps} />
    </RouteGuard>
  );
}

export default ComponentRouters;