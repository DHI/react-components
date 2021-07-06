// TS linting disabled as there isn't typescript code in the package yet
module.exports = {
  ignorePatterns: ['node_modules', 'dist'],
  plugins: ['prettier', 'eslint-comments', 'import'],
  env: {
    es6: true,
  },
  extends: [
    // 'airbnb-typescript',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaVersion: 2019,
  //   project: 'tsconfig.json',
  //   // tsconfigRootDir: __dirname,
  // },
  rules: {
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'prettier/prettier': 'error',
    // '@typescript-eslint/no-unsafe-assignment': 'warn',
    // '@typescript-eslint/no-unsafe-return': 'warn',
  },
};
