import React from 'react';
import { Chip } from '@material-ui/core';
import GapBox from './GapBox';

export default {
  title: 'Example/GapBox',
  component: GapBox,
};

const Template = (args) => <GapBox {...args} />;

const Chips = ['Ocean', 'Waves', 'Sea', 'Tides'].map((label) => (
  <Chip label={label} />
));

export const Grid = Template.bind({});
Grid.args = {
  gap: 3,
  children: <>{Chips}</>,
  display: 'flex',
};
