const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-dom',
      // 'react-router-dom',
      'axios',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dll'),
    filename: '[name].dll.js',
    library: '_dll_[name]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      context: __dirname,
      path: path.join(__dirname, 'public', 'dll', '[name].manifest.json'),
    }),
  ],
};
