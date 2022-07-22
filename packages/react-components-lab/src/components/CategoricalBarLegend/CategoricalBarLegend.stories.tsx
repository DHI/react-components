// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import CategoricalBarLegend from './CategoricalBarLegend';
import { CategoricalBarLegendProps } from './types';
import getDhiPalette from '../ThemeProvider/getDhiPalette';

const dhiPalette = getDhiPalette('light');

const Template: Story<CategoricalBarLegendProps> = (args) => (
  <CategoricalBarLegend {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { color: dhiPalette.darkGrey.light, label: 'Permanent water' },
    { color: dhiPalette.secondary.light, label: 'Water extent' },
  ],
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  items: [
    { color: dhiPalette.darkGrey.light },
    { color: dhiPalette.secondary.light },
  ],
};

export default {
  title: 'Components/CategoricalBarLegend',
  component: CategoricalBarLegend,
  argTypes: { items: [{ color: 'text', label: 'text' }] },
} as Meta;
