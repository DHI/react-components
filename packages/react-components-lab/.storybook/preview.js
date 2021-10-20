import React from "react"
import { addDecorator } from "@storybook/react"
import { ThemeProvider } from "../src"
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator((story) => (
  <ThemeProvider>{story()}</ThemeProvider>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
}
