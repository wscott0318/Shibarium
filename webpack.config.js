const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  // other webpack configuration
  devtool: "source-map",
  plugins: [
    new SentryWebpackPlugin({
      // sentry-cli configuration - can also be done directly through sentry-cli
      // see https://docs.sentry.io/product/cli/configuration/ for details
      authToken: "b19312f3665b488fb055bd3e86fc6005f49940a4e7a84ffda3105785530e5558",
      org: "shibainu",
      project: "shibarium",
      configFile: 'sentry.properties',
      dryRun: true,
      // other SentryWebpackPlugin configuration
      include: ".",
      ignore: ["node_modules", "webpack.config.js"],
    }),
  ],
};