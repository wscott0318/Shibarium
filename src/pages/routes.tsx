
import { useRouter } from 'next/router';
import React from 'react'
import { RouteGuard } from 'utils/RouteGaurd'
import Header from './layout/header';

const headerRoutes = [
  '/home',
  '/all-validator',
  '/my-account',
  '/migrate-stake'
]

const ComponentRouters=({Component, pageProps}:any)=> {
    const router = useRouter();
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