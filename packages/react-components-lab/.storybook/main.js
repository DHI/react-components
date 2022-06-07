module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    // {
    //   name: "@storybook/addon-docs",
    //   sourceLoaderOptions: null
    // },
    "@storybook/addon-essentials",
    'storybook-dark-mode'
  ],
  typescript: {
    // also valid 'react-docgen-typescript' | false
    reactDocgen: 'react-docgen-typescript',
    tsconfigPath: "./../tsconfig.json"
  },
}
