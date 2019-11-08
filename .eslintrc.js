const airbnbStyleRules = require('eslint-config-airbnb-base/rules/style').rules;

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:react/recommended',

    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'warning',
    //   {
    //     argsIgnorePattern: '^_',
    //   },
    // ],
    '@typescript-eslint/no-unused-vars': 'off',

    // todo
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    // '@typescript-eslint/camelcase': airbnbStyleRules.camelcase,
    indent: 'off',
    '@typescript-eslint/indent': airbnbStyleRules.indent,

    'react/display-name': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
