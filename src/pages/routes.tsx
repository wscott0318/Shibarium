import { useRouter } from "next/router";
import React from "react";
import { RouteGuard } from "utils/RouteGaurd";
import Header from "./layout/header";
import ErrorBoundary from "app/components/ErrorBoundary";

const headerRoutes = ["/", "/all-validator", "/my-account", "/migrate-stake"];

const ComponentRouters = ({ Component, pageProps }: any) => {
  const router = useRouter();
  return (
    <ErrorBoundary>
      <RouteGuard>
        {headerRoutes.includes(router.asPath) ? <Header /> : null}
        <Component {...pageProps} />
      </RouteGuard>
    </ErrorBoundary>
  );
};

export default ComponentRouters;
