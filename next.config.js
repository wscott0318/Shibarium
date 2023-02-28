// const withPWA = require('next-pwa')
// const runtimeCaching = require('next-pwa/cache')

const linguiConfig = require('./lingui.config.js')
const defaultTheme = require('tailwindcss/defaultTheme')

const { ChainId } = require('shibarium-chains')

const { locales, sourceLocale } = linguiConfig
const { screens } = defaultTheme

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  env: {
    SUBH_GRAPH_URL: process.env.SUBH_GRAPH_URL,
    RPC_517: process.env.RPC_517,
    BONE: process.env.BONE,
    STAKE_MANAGER_PROXY: process.env.STAKE_MANAGER_PROXY,
    VALIDATOR_SHARE: process.env.VALIDATOR_SHARE,
    STAKE_MANAGER: process.env.STAKE_MANAGER,
    DEPOSIT_MANAGER_PROXY: process.env.DEPOSIT_MANAGER_PROXY,
    WITHDRAW_MANAGER_PROXY: process.env.WITHDRAW_MANAGER_PROXY,
  },
  webpack: (config, env, helpers, options) => {
    config.module.rules = [
      ...config.module.rules,
      {
        resourceQuery: /raw-lingui/,
        type: 'javascript/auto',
      },
    ]
    
    return config
  },
  devIndicators: {
    buildActivity: false
  },
  // experimental: {
  //   concurrentFeatures: true,
  //   serverComponents: true,
  // },
  swcMinify: false,
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    // runtimeCaching,
    dynamicStartUrlRedirect: '/',
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/sushi-cdn/image/fetch/',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
      // {
      //   source: '/stake',
      //   destination: '/bar',
      // },
    ]
  },
  i18n: {
    localeDetection: true,
    locales,
    defaultLocale: sourceLocale,
  },
  network: {
    chainIds: [ChainId.ETHEREUM, ChainId.PUPPY_NET],
    defaultChainId: ChainId.SHIBARIUM,
    domains: [
      {
        domain: 'shibarium.shib.io',
        defaultChainId: ChainId.ETHEREUM,
      },
      {
        domain: 'shibarium.shib.io',
        defaultChainId: ChainId.PUPPY_NET,
      },
    ],
  },
  publicRuntimeConfig: {
    breakpoints: screens,
  },
  sentry: {
    autoInstrumentServerFunctions: false,
    hideSourceMaps: true,
    transpileClientSDK: true,
    widenClientFileUpload: true,
  },
}

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig,SentryWebpackPluginOptions)


// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
