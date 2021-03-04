module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-async-to-generator',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'import',
      {
        libraryName: '@youpai/components',
        camel2DashComponentName: false,
        style: true,
        customName: (name) => {
          if (name.toLocaleLowerCase().indexOf('js') > -1) {
            return `@youpai/components/dist/JsComponents/${name}`;
          } else {
            return `@youpai/components/dist/components/${name}`;
          }
        },
      },
    ],
  ],
};
