// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import BarLegend from './BarLegend';
import { BarLegendProps } from './types';

const BluesLegend =
  'https://terracotta-python.readthedocs.io/en/latest/_images/cmap-blues-bar.png';
const NDVILegend =
  'https://terracotta-python.readthedocs.io/en/latest/_images/cmap-rdylgn-bar.png';
const YLRDLegend =
  'https://terracotta-python.readthedocs.io/en/latest/_images/cmap-ylorrd-bar.png';
const RDPULegend =
  'https://terracotta-python.readthedocs.io/en/latest/_images/cmap-rdpu-bar.png';

export default {
  title: 'Example/BarLegend',
  component: BarLegend,
  argTypes: {
    src: { control: 'text' },
    length: { control: 'number' },
    range: { control: 'object' },
    unit: { control: 'text' },
  },
} as Meta;

const Template: Story<BarLegendProps> = (args) => <BarLegend {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: BluesLegend,
};

export const MinMax = Template.bind({});
MinMax.args = {
  src: RDPULegend,
  range: ['low', 'high'],
};

export const Unit = Template.bind({});
Unit.args = {
  src: YLRDLegend,
  range: [0, 40],
  length: 5,
  unit: '°C',
};

export const NDVI = Template.bind({});
NDVI.args = {
  src: NDVILegend,
  range: [0, 1],
  length: 6,
};
