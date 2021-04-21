// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// #region Local imports
import ThemeProvider from './ThemeProvider';
import { IProps } from './types';
// #endregion

export default {
  title: 'Example/ThemeProvider',
  component: ThemeProvider,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is theme provider based on DHI official guidelines.',
      },
    },
  },
} as Meta;


const Template: Story<IProps> = (args) => (
  <ThemeProvider {...args}>
    <Box>
      <Box bgcolor="primary.main" margin={1} padding={2}>
        <Typography variant="h2" color="textSecondary">
          Theme Provider
        </Typography>
        <Box bgcolor="primary.light" margin={1} padding={2}>
          <Typography variant="body1">Your Application</Typography>
          <Box bgcolor="primary.main" margin={1} padding={2}>
            <Typography variant="body1" color="textSecondary">Your components</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
