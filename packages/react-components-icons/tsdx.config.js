/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup').default;

module.exports = {
  rollup(config, options) {
    config.plugins = [url(), svgr(), ...config.plugins];

    return config;
  },
};
