// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'; // eslint-disable-line import/no-extraneous-dependencies
import { Box } from '@material-ui/core';
import React from 'react';
import DashboardCard from './DashboardCard';
import { Props as DashboardProps } from './types';

export default {
  title: 'Components/DashboardCard',
  component: DashboardCard,
} as Meta;

const Template: Story<DashboardProps> = (args) => (
  <>
    <DashboardCard {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  children: (
    <Box>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Box>
  ),
};
