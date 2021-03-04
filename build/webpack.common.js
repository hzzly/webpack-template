const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const pages = [{ name: 'home', title: '首页', template: '' }];

const entry = {};

const genHtmlPluginConfig = (options) => {
  return options.map((option) => {
    entry[option.name] = path.resolve(__dirname, `../src/pages/${option.name}.tsx`);
    return new HtmlWebpackPlugin({
      filename: `${option.name}.html`,
      title: option.title,
      template: path.resolve(__dirname, `../public/${option.template || 'index'}.html`),
      inject: true,
      minify: false,
      chunks: [`${option.name}`],
    });
  });
};
const htmlPluginConfigs = genHtmlPluginConfig(pages);
const spriltsConfigs = genSpritesmithPlugin(`../src/assets/images`);

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../release'),
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader!ts-loader',
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
          name: `[name].[ext]?${new Date().getTime()}`,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    modules: ['node_modules', path.resolve(__dirname, '../src')],
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  plugins: [...htmlPluginConfigs, ...spriltsConfigs],
};

function genSpritesmithPlugin(src) {
  const names = fs.readdirSync(path.resolve(__dirname, src)).filter((f) => f.indexOf('.') < 0);
  if (names.length > 0) {
    return names.map((name) => {
      return spritesmithPlugin(src, name);
    });
  } else {
    return [spritesmithPlugin(src)];
  }
}

function spritesmithPlugin(src, name) {
  return new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, `${src}${name ? `/${name}` : ''}`), // 图片根路径
      glob: '*.png', // 图片类型
    },
    target: {
      image: path.resolve(__dirname, `../src/images/${name || 'sprite'}.png`), // 生成雪碧图的名称和路径
      css: [
        [
          path.resolve(__dirname, `../src/scss/common/${name || 'sprite'}.scss`),
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
      cssImageRef: `../images/${name || 'sprite'}.png`, // 生成的CSS中引用的雪碧图路径
    },
    spritesmithOptions: {
      padding: 6, // 图标的间隔
    },
  });
}

function spriteTemplateFunc(data) {
  if (data.sprites.length === 0) return '';
  const imageName = data.spritesheet.image.match(/[^/\\]+$/)[0].replace(/\.\w+$/, '');
  const file = data.sprites[0].image.split('/');
  const filename = file[file.length - 1];
  const shared = `
    %${imageName} {
      background-image: url(~@/images/${filename}?${new Date().getTime()});
      background-repeat: no-repeat;
      background-size: ${data.spritesheet.width / 2}px ${data.spritesheet.height / 2}px;
    }
  `;

  const perSprite = data.sprites
    .map((sprite) => {
      const pX = sprite.offset_x ? `${sprite.offset_x / 2}px` : 0;
      const pY = sprite.offset_y ? `${sprite.offset_y / 2}px` : 0;

      return '@mixin N { width: W; height: H; background-position: X Y; }'
        .replace('N', sprite.name)
        .replace('W', `${sprite.width / 2}px`)
        .replace('H', `${sprite.height / 2}px`)
        .replace('X', pX)
        .replace('Y', pY);
    })
    .join('\n');

  return `${shared}\n${perSprite}`;
}
