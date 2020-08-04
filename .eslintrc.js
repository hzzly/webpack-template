module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb/base', 'prettier', 'eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'generator-star-spacing': 0,
    'consistent-return': 0,
    'class-methods-use-this': 0,
    'import/no-unresolved': 0,
    'global-require': 1,
    'import/prefer-default-export': 0,
    'no-else-return': 0,
    'no-restricted-syntax': 0,
    'import/no-extraneous-dependencies': 0,
    'no-use-before-define': 0,
    'no-nested-ternary': 0,
    'no-unused-expressions': 0,
    'arrow-body-style': 0,
    'linebreak-style': 0,
    'import/extensions': 0,
    'no-bitwise': 0,
    'no-cond-assign': 0,
    indent: ['off', 2],
    // 'comma-dangle': [
    //   'error',
    //   {
    //     arrays: 'always-multiline',
    //     objects: 'always-multiline',
    //     imports: 'always-multiline',
    //     exports: 'always-multiline',
    //     functions: 'ignore',
    //   },
    // ],
    'object-curly-newline': [0],
    'function-paren-newline': [0],
    'no-restricted-globals': [0],
    'require-yield': [1],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
