import React, { FC } from 'react';
import { Typography, useTheme } from '@mui/material';
import CalendarItemBox from './CalendarItem.styled';
import { CalendarItemProps } from './types';

const CalendarItem: FC<CalendarItemProps> = ({
  variant,
  onClick,
  children,
  active = false,
  disabled = false,
}) => {
  const theme = useTheme();
  return (
    <CalendarItemBox
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      variant={variant}
      active={active}
      theme={theme}
    >
      <Typography variant="body2" style={{ color: 'inherit' }}>
        {children}
      </Typography>
    </CalendarItemBox>
  );
};

export default CalendarItem;
