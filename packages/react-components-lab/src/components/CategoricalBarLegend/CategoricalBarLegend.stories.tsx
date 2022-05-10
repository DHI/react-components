// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import CategoricalBarLegend from './CategoricalBarLegend';
import { CategoricalBarLegendProps } from './types';
import getPalette from '../ThemeProvider/getPallete';

const mikePalette = getPalette('light');

const Template: Story<CategoricalBarLegendProps> = (args) => (
  <CategoricalBarLegend {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { color: mikePalette.darkGrey.light, label: 'Permanent water' },
    { color: mikePalette.secondary.light, label: 'Water extent' },
  ],
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  items: [
    { color: mikePalette.darkGrey.light },
    { color: mikePalette.secondary.light },
  ],
};

export default {
  title: 'Components/CategoricalBarLegend',
  component: CategoricalBarLegend,
  argTypes: { items: [{ color: 'text', label: 'text' }] },
} as Meta;
