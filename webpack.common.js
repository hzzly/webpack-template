const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const generatorHtmlPluginConfig = (options) => {
  return options.map((option) => {
    return new HtmlWebpackPlugin({
      filename: `${option.name}.html`,
      title: '游拍',
      template: path.resolve(__dirname, `public/index.html`),
      inject: true,
      minify: false,
      chunks: [`${option.name}`],
    });
  });
};
const htmlPluginConfigs = generatorHtmlPluginConfig([{ name: 'home' }, { name: 'center' }]);

module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/ts/home.ts'),
    center: path.resolve(__dirname, 'src/ts/center.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'release'),
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  plugins: [...htmlPluginConfigs],
};
