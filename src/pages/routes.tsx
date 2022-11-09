// import useScreenOrientation from 'app/hooks/useScreenOriantation';
import { useRouter } from 'next/router';
import React from 'react'
import { RouteGuard } from 'utils/RouteGaurd'
import Header from './layout/header';
import { isDesktop, isMobile } from 'react-device-detect';
// import PortraitWarning from './components/PortraitWarning';



const ComponentRouters=({Component, pageProps}:any)=> {
    const router = useRouter();
    // const orientation = useScreenOrientation()
    // console.log(router.asPath);
  return (
    <RouteGuard>
      {router.asPath === "/home" ||
      router.asPath === "/bone-staking" ||
      router.asPath === "/all-validator" ||
      router.asPath === "/my-account" ? (
        <Header />
      ) : (
        ""
      )}
      {/* {isMobile && orientation === "landscape-primary" ? (
        <PortraitWarning />
      ) : ( */}
        <Component {...pageProps} />
      {/* )} */}
    </RouteGuard>
  );
}

export default ComponentRouters