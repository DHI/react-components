// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Chip } from '@material-ui/core';
import GapBox from './GapBox';
import { Props } from './types';

export default {
  title: 'Example/GapBox',
  component: GapBox,
};

const Template: Story<Props> = (args) => <GapBox {...args} />;

const Chips = ['Ocean', 'Waves', 'Sea', 'Tides'].map((label) => (
  <Chip key={`chip-${label}`} label={label} />
));

export const Flex = Template.bind({});
Flex.args = {
  gap: 2,
  children: <>{Chips}</>,
  display: 'flex',
};

export const Grid = Template.bind({});
Grid.args = {
  gap: 2,
  children: <>{Chips}</>,
  display: 'grid',
};
