import { useRouter } from 'next/router';
import React from 'react'
import { useMoralis } from 'react-moralis';
import { RouteGuard } from 'utils/RouteGaurd'
import Header from './layout/header';

const ComponentRouters=({Component, pageProps}:any)=> {
    const {user} = useMoralis();
    const router = useRouter();
  return (
      <RouteGuard user={user}>
          {router.asPath == "/login" ? "" : <Header />}
          <Component {...pageProps} />
      </RouteGuard>
  )
}

export default ComponentRouters