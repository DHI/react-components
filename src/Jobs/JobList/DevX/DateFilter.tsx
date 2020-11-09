import { Button, Grid } from '@material-ui/core';
import React from 'react';
import DateInput from '../DateInput';
import { DateFilterProps } from './types';

const DateFilter = ({
  dateTimeFormat,
  startTimeUtc,
  timeZone,
  date,
  onSetDate,
  onSetDateFilter,
  onClearDateFilter
}: DateFilterProps) => {

  return (
    <Grid container direction='row' alignItems='center' justify='flex-end' spacing={3} >
      <Grid item>
        <DateInput
          label='From'
          dateFormat={dateTimeFormat}
          timeZone={timeZone}
          defaultDate={date.from ? date.from : new Date(startTimeUtc).toISOString()}
          dateSelected={(value) => onSetDate({ ...date, from: value })}
        />
      </Grid>
      <Grid item>
        <DateInput
          label='To'
          dateFormat={dateTimeFormat}
          timeZone={timeZone}
          defaultDate={date.to ? date.to : new Date().toISOString()}
          dateSelected={(value) => onSetDate({ ...date, to: value })}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={() => onSetDateFilter()}>Filter</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={() => onClearDateFilter()}>Clear</Button>
      </Grid>
    </Grid>
  );
}

export default DateFilter;