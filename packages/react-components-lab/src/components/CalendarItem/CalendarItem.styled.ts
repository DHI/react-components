import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { experimental_sx as sx } from '@mui/system';
import { CalendarItemProps } from './types';

const options = {
  shouldForwardProp: (prop) =>
    prop !== 'disabled' || prop !== 'variant' || prop !== 'active',
};

const CalendarItemBox = styled(
  Box,
  options
)<Partial<CalendarItemProps>>(({ disabled, variant, active }) => {
  const getStyle = () => {
    if (disabled)
      return {
        backgroundColor: 'mediumGrey.light',
        color: 'mediumGrey.dark',
      };
    if (variant === 'button' && !disabled)
      return {
        backgroundColor: active ? 'secondary.main' : 'mediumGrey.light',
        color: active ? 'background.paper' : 'primary.main',
        '&:hover': {
          backgroundColor: active ? 'secondary.main' : 'mediumGrey.main',
        },
      };

    if (variant === 'semi-button' && !disabled)
      return {
        backgroundColor: active ? 'secondary.main' : 'mediumGrey.light',
        color: active ? 'background.paper' : 'primary.main',
        '&:hover': {
          backgroundColor: active ? 'secondary.main' : 'mediumGrey.main',
        },
      };

    return {};
  };

  const stableCss = {
    cursor: disabled ? 'default' : 'pointer',
    borderRadius: 4,
    minWidth: 42,
    margin: '2px',
    padding: '0px 7px',
    textAlign: 'center',
    flexGrow: 1,
    ...getStyle(),
  } as const;

  return sx(stableCss);
});

export default CalendarItemBox;
