// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'; // eslint-disable-line import/no-extraneous-dependencies
import { Typography, Box } from '@material-ui/core';
import React from 'react';
import CollapsableBox from './CollapsableBox';
import { CollapsableBoxProps } from './types';

export default {
  title: 'Components/CollapsableBox',
  component: CollapsableBox,
} as Meta;

const Template: Story<CollapsableBoxProps> = (args) => (
  <Box width={1} display="flex" justifyContent="center">
    <CollapsableBox {...args}>
      <Typography variant="body2" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
    </CollapsableBox>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  collapseLabel: 'Collapse',
  expandLabel: 'Expand',
  style: {
    width: 300,
  },
};
