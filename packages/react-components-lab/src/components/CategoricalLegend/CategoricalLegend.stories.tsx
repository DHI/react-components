// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import CategoricalLegend from './CategoricalLegend';
import { Props } from './types';

const Template: Story<Props> = (args) => <CategoricalLegend {...args} />;

export const FloodExtent = Template.bind({});
FloodExtent.args = {
  items: [{ color: '#00A4EC', label: 'h' }],
};

export default {
  title: 'Example/CategoricalLegend',
  component: CategoricalLegend,
  argTypes: { items: [{ color: 'text', label: 'text' }] },
} as Meta;
