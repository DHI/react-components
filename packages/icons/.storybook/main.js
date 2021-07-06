module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
    // exclude svg from the default storybook file-loader
    assetRule.exclude = /\.svg$/;

    // add svgr loader to handle svgs
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
