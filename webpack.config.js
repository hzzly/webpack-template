const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  mode: "productioin",  // 在生产模式下， 代码就会自动压缩
  entry: ["./src/index.js"],
  output: {
    // 输出目录
    path: path.join(__dirname, "dist"),
    // 文件名称
    filename: "bundle.[name].[hash].js"
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        // "style-loader", // 不再需要style-loader要已经分离处理
        MiniCssExtractPlugin.loader,
        "css-loader", // 编译css
        "postcss-loader",
        "sass-loader" // 编译scss
      ]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,  // 开启 CSS Module
            localIdentName: '[local]_[hash:base64:5]',  // 定制哈希字符串的格式
            // localIdentName: '[path][name]-[local]-[hash:base64:5]', // 定制哈希字符串的格式
            root: 'static',
            minimize: true,
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)/,
      use: {
        loader: 'url-loader',
        options: {
          outputPath: 'images/', // 图片输出的路径
          limit: 10 * 1024
        }
      }
    }, {
      test: /\.(eot|woff2?|ttf|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[name]-[hash:5].min.[ext]',
          limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
          publicPath: 'fonts/',
          outputPath: 'fonts/'
        }
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名
      template: path.join(__dirname, 'public/index.html') // 指定模板路径
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    host: "0.0.0.0", // 可以使用手机访问
    port: 8080,
    historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
    proxy: {
      // 代理到后端的服务地址，会拦截所有以api开头的请求地址
      "/api": "http://localhost:3000"
    }
  },
  resolve: {
    extension: ["", ".js", ".jsx"],
    alias: {
      "@": path.join(__dirname, "src"),
      pages: path.join(__dirname, "src/pages"),
      router: path.join(__dirname, "src/router")
    }
  },
  optimization: {
    splitChunks: {  // 代码分割按需加载、提取公共代码
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
  devtool: "cheap-module-eval-source-map", // 开发环境配置
  // devtool:"cheap-module-source-map",   // 线上生成配置
}