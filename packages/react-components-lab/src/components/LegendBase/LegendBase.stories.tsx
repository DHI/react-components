import { Story } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { Typography } from '@material-ui/core';
import LegendBase from './LegendBase';
import { LegendBaseProps } from './types';

export default {
  title: 'Example/LegendBase',
  component: LegendBase,
};

const Template: Story<LegendBaseProps> = (args) => (
  <div>
    <Typography>
      This is a map overlay legend frame, used by StaticLegend and Legend
    </Typography>
    <LegendBase {...args} />
  </div>
);

const children = <Typography>Content</Typography>;

export const Minimal = Template.bind({});
Minimal.args = {
  children,
};

export const AllProps = Template.bind({});
AllProps.args = {
  children,
  title: 'Speed',
  unit: 'm/s',
  position: 'topLeft',
  collapsable: true,
  defaultCollapsed: true,
};
