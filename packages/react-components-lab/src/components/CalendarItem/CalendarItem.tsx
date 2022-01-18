import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './styles';
import { CalendarItemProps } from './types';

const CalendarItem: FC<CalendarItemProps> = ({
  variant,
  onClick,
  children,
  active = false,
  disabled = false,
}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(
        disabled && {
          [classes.button]: true,
          [classes.disabled]: true,
        },
        variant === 'button' &&
          !disabled && {
            [classes.button]: true,
            [classes.active]: active,
          },
        variant === 'semi-button' &&
          !disabled && {
            [classes.button]: true,
            [classes.semiActive]: active,
          }
      )}
      onClick={() => !disabled && onClick()}
    >
      <Typography variant="body2" style={{ color: 'inherit' }}>
        {children}
      </Typography>
    </Box>
  );
};

export default CalendarItem;
