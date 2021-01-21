const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './release',
    stats: 'errors-only',
    port: '8086',
    // host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
    open: true,
    proxy: {
      // '/': {
      //   target: 'http://xxxxxxx',
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin({}), new FriendlyErrorsWebpackPlugin()],
});
