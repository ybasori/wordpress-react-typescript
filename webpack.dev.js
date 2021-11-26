const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

require("dotenv").config();

module.exports = merge(common, {
  mode: "development",
  entry: {
    client: `webpack-dev-server/client?http://localhost:${process.env.PORT}/`,
    hot: "webpack/hot/only-dev-server",
  },
  devtool: "inline-source-map",
  devServer: {
    proxy: {
      "*": {
        target: `http://localhost:${process.env.PORT}/`,
        changeOrigin: true,
      },
    },
    port: process.env.PROXY_PORT,
  },
  output: {
    clean: true,
    publicPath: `http://localhost:${process.env.PROXY_PORT}/wp-content/themes/wordpress-react/`,
  },
});
