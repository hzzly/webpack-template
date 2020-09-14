const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.tsx'),
    vendors: ['react', 'axios'],
  },
  output: {
    path: path.resolve(__dirname, 'release'),
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'images',
          name: '[name].[hash:7].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['vendors', 'index'],
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/assets/images'), // 图片根路径
        glob: '*.png', // 图片类型
      },
      target: {
        image: path.resolve(__dirname, 'src/images/sprite.png'), // 生成雪碧图的名称和路径
        css: [
          [
            path.resolve(__dirname, 'src/scss/sprite.scss'),
            {
              // 生成CSS文件的名称和路径
              format: 'function_based_template', // 模板配置，注意在customTemplates中配置对应名称的属性名
            },
          ],
        ],
      },
      customTemplates: {
        function_based_template: spriteTemplateFunc, // 上一项使用到的模板变量
      },
      apiOptions: {
        cssImageRef: '../images/sprite.png', // 生成的CSS中引用的雪碧图路径
      },
      spritesmithOptions: {
        padding: 6, // 图标的间隔
      },
    }),
  ],
};

function spriteTemplateFunc(data) {
  if (data.sprites.length === 0) return '';
  const imageName = data.spritesheet.image.match(/[^/\\]+$/)[0].replace(/\.\w+$/, '');
  const fn = '$base: 40; @function rem( $px ){@return $px/60*1rem;}';
  const file = data.sprites[0].image.split('/');
  const filename = file[file.length - 1];
  const shared = `
    %${imageName} {
      background-image: url(~@/images/${filename}?${new Date().getTime()});
      background-repeat: no-repeat;
      background-size: rem(${data.spritesheet.width}) rem(${data.spritesheet.height});
    }
  `;

  const perSprite = data.sprites
    .map((sprite) => {
      const pX = sprite.offset_x
        ? `${(sprite.offset_x / (sprite.width - sprite.total_width)) * 100}%`
        : 0;
      const pY = sprite.offset_y
        ? `${(sprite.offset_y / (sprite.height - sprite.total_height)) * 100}%`
        : 0;
      return '@mixin N { width: rem(W); height: rem(H); background-position: X Y; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width)
        .replace('H', sprite.height)
        .replace('X', pX)
        .replace('Y', pY);
    })
    .join('\n');

  return `${fn}\n${shared}\n${perSprite}`;
}
