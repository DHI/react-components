import { Story } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { Typography } from '@material-ui/core';
import StaticLegend from './StaticLegend';
import { StaticLegendProps } from './types';

export default {
  title: 'Example/StaticLegend',
  component: StaticLegend,
};

const Template: Story<StaticLegendProps> = (args) => (
  <div>
    <Typography>Adds legend items to LegendBase as children</Typography>
    <StaticLegend {...args} />
  </div>
);

const items = [
  {
    label: 'Wind',
    color: '#734FF4',
  },
  {
    label: 'Water',
    color: '#38D9C4',
  },
  {
    label: 'Light',
    color: '#FDA347',
  },
];

export const Minimal = Template.bind({});
Minimal.args = {
  items,
};

export const AllProps = Template.bind({});
AllProps.args = {
  items,
  title: 'Speed',
  unit: 'm/s',
  position: 'topLeft',
  collapsable: true,
  defaultCollapsed: true,
};
