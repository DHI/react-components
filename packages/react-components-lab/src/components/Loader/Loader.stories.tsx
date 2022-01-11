// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import Loader from './Loader';
import { LoaderProps } from './types';

export default {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    isLoading: { control: 'boolean' },
    variant: { control: 'select' },
  },
};

const Template: Story<LoaderProps> = (args) => (
  <div>
    <Loader {...args} style={{ height: '50vh', position: 'unset' }} />
  </div>
);

export const Blocking = Template.bind({});
Blocking.args = {
  isLoading: true,
  variant: 'blocking',
};

export const TopBar = Template.bind({});
TopBar.args = {
  isLoading: true,
  variant: 'topbar',
};
