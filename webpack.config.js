const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  // other webpack configuration
  devtool: "source-map",
  plugins: [
    new SentryWebpackPlugin({
      // sentry-cli configuration - can also be done directly through sentry-cli
      // see https://docs.sentry.io/product/cli/configuration/ for details
      authToken: process.sentryclirc.SENTRY_AUTH_TOKEN,
      org: "shibainu",
      project: "shibarium",

      // other SentryWebpackPlugin configuration
      include: ".",
      ignore: ["node_modules", "webpack.config.js"],
    }),
  ],
};