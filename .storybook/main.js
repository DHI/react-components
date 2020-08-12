const TsChecker = require('fork-ts-checker-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
  ],
  webpackFinal: async config => {
    config.plugins.push(new TsChecker())
    config.devtool = 'source-map'

    config.module.rules.push({
      test: /[.]stories[.]tsx?$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
        // todo recomment once bug is fixed, https://github.com/strothj/react-docgen-typescript-loader/issues/107
        // {
        //   loader: require.resolve('react-docgen-typescript-loader'),
        // },
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            parser: 'typescript',
            prettierConfig: {
              printWidth: 100,
              tabWidth: 2,
              bracketSpacing: true,
              trailingComma: 'es5',
              singleQuote: true,
            },
          },
        },
      ],
      enforce: 'pre',
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
