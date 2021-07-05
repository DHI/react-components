  
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

import '@storybook/addon-actions/register';

var pJson = require('./../package.json');

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
                react-components-icons
            </p>
            v${pJson.version}`,
    brandUrl: 'https://github.com/DHI/react-components/packages/732647',
    appContentBg: '#F2F5F7',
    textColor: '#0B4566',
  },
});