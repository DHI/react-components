module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
  ],
  typescript: {
    // also valid 'react-docgen-typescript' | false
    reactDocgen: 'react-docgen-typescript',
    tsconfigPath: "./../tsconfig.json"
  },
  webpackFinal: async config => {
    config.devtool = 'source-map'

    config.module.rules.push({
      test: /[.]stories[.]tsx?$/,
      use: [
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
      enforce: 'pre',
    });

    return config;
  },
}
