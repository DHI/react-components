// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { format } from 'date-fns';
import CalendarBox from './CalendarBox';
import CelendarItem from '../CalendarItem/CalendarItem';
import { CalendarBoxProps } from './types';

const Template: Story<CalendarBoxProps> = (args) => <CalendarBox {...args} />;
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const monthsComponents = months.map((month) => {
  const currentMonth = format(new Date(), 'MMM');
  return (
    <CelendarItem
      active={month === currentMonth}
      disabled={month === 'Aug'}
      variant="semi-button"
    >
      {month}
    </CelendarItem>
  );
});
export const Default = Template.bind({});
Default.args = {
  title: 'Please select a month:',
  children: [...monthsComponents],
};

export default {
  title: 'Components/CalendarBox',
  component: CalendarBox,
} as Meta;
