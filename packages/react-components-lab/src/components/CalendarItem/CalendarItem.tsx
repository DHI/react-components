import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { activeCSS, buttonCSS, disabledCSS, semiActiveCSS } from './styles';
import { CalendarItemProps } from './types';

const CalendarItem: FC<CalendarItemProps> = ({
  variant,
  onClick,
  children,
  active = false,
  disabled = false,
}) => {
  const boxStyles: Record<string, unknown> =
    (disabled && { ...disabledCSS, ...buttonCSS }) ||
    (variant === 'button' &&
      !disabled && {
        ...buttonCSS,
        ...(active && activeCSS),
      }) ||
    (variant === 'semi-button' &&
      !disabled && { ...buttonCSS, ...(active && semiActiveCSS) }) ||
    {};

  return (
    <Box sx={{ ...boxStyles }} onClick={() => !disabled && onClick()}>
      <Typography variant="body2" style={{ color: 'inherit' }}>
        {children}
      </Typography>
    </Box>
  );
};

export default CalendarItem;
