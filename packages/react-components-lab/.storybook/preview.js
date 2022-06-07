import React from "react"
import { ThemeProvider } from "../src"
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
var pJson = require('./../package.json');

const addonBothThemes = {
  brandTitle: `
  <img
      src="https://grasdatastorage.blob.core.windows.net/images/DHI_Logo_Light.png"
      style="width: 60px; height: auto;"
      alt="logo"
      style="display: inline"
  />
      <p
          style="width: 150px; margin: 0;"
      >
          react-components-lab
      </p>
      v${pJson.version}`,
brandUrl: 'https://github.com/DHI/react-components/packages/732647',
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // docs: {
  //   source: { type: 'code' }, // Default here is 'dynamic'
  // },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black', ...addonBothThemes },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white', ...addonBothThemes }
  }
}

export const decorators = [(Story, context) => {
  return <ThemeProvider type={useDarkMode() ? 'dark' : 'light'}><Story /></ThemeProvider>
}]
