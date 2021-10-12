// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import TimestepPlayer from './TimestepPlayer';
import { TimestepPlayerProps } from './types';

export default {
  title: 'Example/TimestepPlayer',
  component: TimestepPlayer,
};

const dailyDates = [
  new Date(2021, 4, 1),
  new Date(2021, 4, 2),
  new Date(2021, 4, 3),
  new Date(2021, 4, 4),
  new Date(2021, 4, 5),
];

const monthlyDates = [
  new Date(2021, 1, 1),
  new Date(2021, 2, 1),
  new Date(2021, 3, 1),
  new Date(2021, 4, 1),
];

const yearlyDates = [
  new Date(2018, 1, 1),
  new Date(2019, 1, 1),
  new Date(2020, 1, 1),
  new Date(2021, 1, 1),
];

const Template: Story<TimestepPlayerProps> = (args) => {
  const { timesteps } = args;
  const [activeTimestep, setActiveTimestep] = useState<Date | undefined>(
    timesteps[0]
  );
  return (
    <Box mt={8}>
      <TimestepPlayer
        {...args}
        activeTimestep={activeTimestep}
        setTimestep={setActiveTimestep}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  timesteps: dailyDates,
};

export const Monthly = Template.bind({});
Monthly.args = {
  timesteps: monthlyDates,
  type: 'monthly',
};

export const Yearly = Template.bind({});
Yearly.args = {
  timesteps: yearlyDates,
  type: 'yearly',
};
