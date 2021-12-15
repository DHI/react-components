import React, { FC, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TimeseriesCalendarProps, DailyData } from './types';
import { getDailyFormattedDates } from './utils';

const useStyles = makeStyles((theme) => ({}));

const TimeseriesCalendar: FC<TimeseriesCalendarProps> = ({
  dates,
  activeDate,
  variant,
  onChangeDataset,
}) => {
  const classes = useStyles();
  const [dailyData, setDailyData] = useState<DailyData | undefined>(undefined);
  useEffect(() => {
    const dailyFormattedDates = getDailyFormattedDates(dates);
    // console.log(dailyFormattedDates);
  }, [dates]);
  return null;
};

export default TimeseriesCalendar;
