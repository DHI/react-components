
module.exports = {
  ignorePatterns: [
    'node_modules',
    'dist',
  ],
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    project: 'tsconfig.json',
    // tsconfigRootDir: __dirname,
  },
  rules: {
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-multiple-empty-lines': ['warn', { max: 2 }],
  },
};
