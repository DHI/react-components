// TS linting disabled as there isn't typescript code in the package yet
module.exports = {
  ignorePatterns: ['node_modules', 'dist'],
  plugins: ['prettier', 'eslint-comments', 'import'],
  env: {
    es2021: true,
  },
  extends: [
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'prettier/prettier': 'error',
  },
};
