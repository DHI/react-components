// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'; // eslint-disable-line import/no-extraneous-dependencies
import { Typography, Box } from '@material-ui/core';
import React from 'react';
import Legend from './ContinuousLegend';
import { LegendProps } from './types';

const colors = [
  '#440154',
  '#481567',
  '#482677',
  '#453781',
  '#404788',
  '#39568C',
  '#33638D',
  '#2D708E',
  '#287D8E',
  '#238A8D',
  '#1F968B',
  '#20A387',
  '#29AF7F',
  '#3CBB75',
  '#55C667',
  '#73D055',
  '#95D840',
  '#B8DE29',
  '#DCE319',
  '#FDE725',
];

export default {
  title: 'Example/Legend',
  component: Legend,
} as Meta;

const Template: Story<LegendProps> = (args) => (
  <>
    <Typography>
      Adds dynamic legend items, based on a color array, and a number range to
      LegendBase
    </Typography>
    <Box
      position="relative"
      height={500}
      width={800}
      p={2}
      m={2}
      style={{ backgroundColor: '#cccccc' }}
    >
      <Typography>Map</Typography>
      <Legend {...args} />
    </Box>
  </>
);

export const Minimal = Template.bind({});
Minimal.args = {
  colors,
  min: 0,
  max: 1,
};

export const AllProps = Template.bind({});
AllProps.args = {
  title: 'Velocity',
  unit: 'm/s',
  min: 0,
  max: 4,
  colors,
  maxItems: 10,
  position: 'topLeft',
  collapsable: true,
  defaultCollapsed: true,
};
