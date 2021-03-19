/* eslint-disable react/jsx-props-no-spreading */
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import Legend from './Legend';
import { LegendProps } from './types';

const colors = ['#440154', '#481567', '#482677', '#453781', '#404788', '#39568C', '#33638D', '#2D708E', '#287D8E', '#238A8D', '#1F968B', '#20A387', '#29AF7F', '#3CBB75', '#55C667', '#73D055', '#95D840', '#B8DE29', '#DCE319', '#FDE725'];

export default {
  title: 'Example/Legend',
  component: Legend,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<LegendProps> = (args) => <Legend {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Velocity',
  unit: 'm/s',
  min: 0,
  max: 4,
  colors,
  maxItems: 10,
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
