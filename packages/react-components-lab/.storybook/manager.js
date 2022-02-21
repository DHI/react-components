
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

import '@storybook/addon-actions/register';

var pJson = require('./../package.json');

// let themeGRAS = create({
//   base: 'light',

//   colorPrimary: 'hotpink',
//   colorSecondary: 'deepskyblue',

//   // UI
//   appBg: 'white',
//   appContentBg: 'silver',
//   appBorderColor: 'grey',
//   appBorderRadius: 4,

//   // Typography
//   fontBase: '"Open Sans", sans-serif',
//   fontCode: 'monospace',

//   // Text colors
//   textColor: 'black',
//   textInverseColor: 'rgba(255,255,255,0.9)',

//   // Toolbar default and active colors
//   barTextColor: 'silver',
//   barSelectedColor: 'black',
//   barBg: 'hotpink',

//   // Form colors
//   inputBg: 'white',
//   inputBorder: 'silver',
//   inputTextColor: 'black',
//   inputBorderRadius: 4,

//   brandTitle: 'My custom storybook',
//   brandUrl: 'https://example.com',
//   brandImage: 'https://placehold.it/350x150',
// });

addons.setConfig({
  theme: {
    ...themes.dark,
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
    // appContentBg: 'silver',
  },
});
