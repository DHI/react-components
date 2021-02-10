import { Button, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { DateFilterProps } from '../types';
import DateInput from './DateInput';

const DateFilter: FC<DateFilterProps> = ({
  dateTimeFormat,
  startTimeUtc,
  timeZone,
  date,
  onSetDate,
  onClearDateFilter,
  children,
}) => {
  return (
    <Grid container direction="row" alignItems="center" justify="flex-end" spacing={3}>
      <Grid item>
        <DateInput
          label="From"
          dateFormat={dateTimeFormat}
          timeZone={timeZone}
          defaultDate={date.from ? date.from : new Date(startTimeUtc).toISOString()}
          dateSelected={(value) => onSetDate({ ...date, from: value })}
        />
      </Grid>
      <Grid item>
        <DateInput
          label="To"
          dateFormat={dateTimeFormat}
          timeZone={timeZone}
          defaultDate={date.to ? date.to : new Date().toISOString()}
          dateSelected={(value) => onSetDate({ ...date, to: value })}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={() => onClearDateFilter()}>
          Reset Date
        </Button>
      </Grid>
      {children}
    </Grid>
  );
};

export { DateFilter, DateFilterProps };
