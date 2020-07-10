/** @ts-check @type import('eslint-config-standard-typescript-prettier/types').TsEslintConfig */
module.exports = {
  plugins: ['only-warn', 'jsx-a11y', 'react', 'react-hooks', 'import'],
  extends: ['standard-typescript-prettier', 'prettier/react'],
  rules: {
    'newline-before-return': ['error'],
    'newline-after-var': ['error'],
    // https://eslint.org/docs/rules/padding-line-between-statements
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'multiline-expression' },
      { blankLine: 'always', prev: 'multiline-expression', next: '*' },
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: '*', next: 'if' },
      {
        blankLine: 'never',
        prev: ['singleline-const'],
        next: ['singleline-const'],
      },
    ],
    'react/jsx-uses-react': 1,
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/ban-types': ['off'],
    'class-methods-use-this': 0,
    'comma-dangle': [2, 'always-multiline'],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-cycle': 0,
    'import/no-dynamic-require': 0,
    // 'import/no-extraneous-dependencies': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['tooling/**', '**/*.stories.*'] }],
    // I think ignoring `import/no-extraneous-dependencies`
    // across the whole app ^^ is pretty bad idea,
    // since it relies on humans to have package.json in sync.
    // The next line sets it as an error
    // but leaves all files in `tooling`-directory alone.
    // In order to stop node from being bothered
    // eg `require('path')`
    // I put the `node` property on top of `webpack`
    // in the `import/resolver` for this file.
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
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
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'max-classes-per-file': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-confusing-arrow': 0,
    'no-console': 0,
    'no-nested-ternary': 0,
    'no-unused-vars': 1,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': 1,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'prefer-template': 2,
    'prefer-object-spread': 1,
    'react/jsx-fragments': 1,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'require-yield': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
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
