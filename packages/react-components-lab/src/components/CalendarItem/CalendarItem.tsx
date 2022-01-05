import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './styles';
import { CalendarItemProps } from './types';

const CalendarItem: FC<CalendarItemProps> = ({
  active = false,
  variant,
  onClick,
  children,
}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(
        variant === 'button' && {
          [classes.button]: true,
          [classes.active]: active,
        },
        variant === 'semi-button' && {
          [classes.button]: true,
          [classes.semiActive]: active,
        }
      )}
      onClick={onClick}
    >
      <Typography variant="body2" style={{ color: 'inherit' }}>
        {children}
      </Typography>
    </Box>
  );
};

export default CalendarItem;
