import React, { FC } from 'react';
import { Typography } from '@mui/material';
import CalendarItemBox from './CalendarItem.styled';
import { CalendarItemProps } from './types';

const CalendarItem: FC<CalendarItemProps> = ({
  variant,
  onClick,
  children,
  active = false,
  disabled = false,
}) => (
  <CalendarItemBox
    onClick={() => !disabled && onClick()}
    disabled={disabled}
    variant={variant}
    active={active}
  >
    <Typography variant="body2" sx={{ color: 'inherit' }}>
      {children}
    </Typography>
  </CalendarItemBox>
);

export default CalendarItem;
