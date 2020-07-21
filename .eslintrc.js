const config = require('eslint-config-standard-typescript-prettier');

/** @ts-check @type import('eslint-config-standard-typescript-prettier/types').TsEslintConfig */
module.exports = {
  ...config,
  plugins: [...config.plugins, 'react'],
  extends: [...config.extends, 'plugin:react/recommended'],
  rules: {
    ...config.rules,
    //
    // Disable rules provided by other configs
    //
    'no-unused-vars': 0, // Provided by TypeScript
    'no-undef': 0, // Provided by TypeScript
    'no-void': 0,

    //
    // Disable opinionated rules from @typescript-eslint
    //

    '@typescript-eslint/member-delimiter-style': 0, // Provided by Prettier
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': 0, // Use TS compiler option instead
    '@typescript-eslint/no-empty-function': 0,

    'newline-before-return': ['off'],
    'newline-after-var': ['off'],
    'padding-line-between-statements': [
      'error',
      { prev: '*', next: 'import', blankLine: 'always' },
      { prev: '*', next: 'import', blankLine: 'always' },
      { prev: 'import', next: 'import', blankLine: 'never' },
      { prev: '*', next: 'export', blankLine: 'always' },
      { prev: 'export', next: '*', blankLine: 'always' },
      { prev: 'export', next: 'export', blankLine: 'any' },
      { prev: '*', next: 'multiline-block-like', blankLine: 'always' },
      { prev: 'multiline-block-like', next: '*', blankLine: 'always' },
      { prev: '*', next: 'block-like', blankLine: 'always' },
      { prev: 'block-like', next: '*', blankLine: 'always' },
      { prev: '*', next: 'multiline-expression', blankLine: 'always' },
      { prev: 'multiline-expression', next: '*', blankLine: 'always' },
      { prev: 'if', next: '*', blankLine: 'always' },
      { prev: '*', next: 'if', blankLine: 'always' },
      { prev: 'if', next: 'if', blankLine: 'any' },
      { prev: '*', next: 'return', blankLine: 'always' },
      {
        prev: ['singleline-const'],
        next: ['singleline-const'],
        blankLine: 'never',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/ban-types': ['off'],
    'class-methods-use-this': 0,
    'comma-dangle': [2, 'always-multiline'],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-cycle': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   { devDependencies: ['**/*.test.js', 'tooling/**', '**/*.stories.*'] },
    // ],
    'import/no-named-as-default': 0,
    'import/no-unresolved': 1,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    // 'react-hooks/exhaustive-deps': 0,
    // indent: [
    //   2,
    //   2,
    //   {
    //     SwitchCase: 1,
    //   },
    // ],
    // this ^^ causes the indent-conflict/confusion
    'max-classes-per-file': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-confusing-arrow': 0,
    'no-console': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': 1,
    'prefer-template': 2,
    'prefer-object-spread': 1,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'require-yield': 0,
    '@typescript-eslint/no-var-requires': 0,
    'no-fallthrough': 0,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'react': { version: 'detect' },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
  },
};
