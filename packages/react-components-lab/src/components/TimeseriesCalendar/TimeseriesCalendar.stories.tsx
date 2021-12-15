import { Story } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import TimeseriesCalendar from './TimeseriesCalendar';
import { TimeseriesCalendarProps } from './types';
import { getDateArray } from './utils';

export default {
  title: 'Example/TimeseriesCalendar',
  component: TimeseriesCalendar,
};

const Template: Story<TimeseriesCalendarProps> = (args) => (
  <>
    <TimeseriesCalendar {...args} />
  </>
);

export const Daily = Template.bind({});
const activeDate = new Date();
const dateInAYear = new Date();
dateInAYear.setFullYear(activeDate.getFullYear() + 1);
const dates = getDateArray(activeDate, dateInAYear);
console.log(dates);
Daily.args = {
  activeDate,
  dates,
  variant: 'daily',
};
