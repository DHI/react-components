import React, { FC } from 'react';
import { Tooltip, ValueLabelProps } from '@mui/material';

const ValueLabelComponent: FC<ValueLabelProps> = ({
  children,
  open,
  value,
  ...otherProps
}) => (
  <Tooltip
    open={open}
    title={value}
    {...otherProps}
    enterTouchDelay={0}
    placement="top"
    arrow
  >
    {children}
  </Tooltip>
);

export default ValueLabelComponent;
