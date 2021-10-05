// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import CategoricalBarLegend from './CategoricalBarLegend';
import { CategoricalBarLegendProps } from './types';
import mikePalette from '../ThemeProvider/mikePallete';

const Template: Story<CategoricalBarLegendProps> = (args) => (
  <CategoricalBarLegend {...args} />
);

export const PermanentWater = Template.bind({});
PermanentWater.args = {
  items: [{ color: mikePalette.darkGrey.light, label: 'Permanent water' }],
};

export const WaterExtent = Template.bind({});
WaterExtent.args = {
  items: [{ color: mikePalette.secondary.light, label: 'Water extent' }],
};

export default {
  title: 'Example/CategoricalBarLegend',
  component: CategoricalBarLegend,
  argTypes: { items: [{ color: 'text', label: 'text' }] },
} as Meta;
