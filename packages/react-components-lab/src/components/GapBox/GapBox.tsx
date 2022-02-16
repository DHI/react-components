import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Props } from './types';
import useStyles from './styles';

// Extends MUI Box with gap style prop
const GapBox: FC<Props> = ({ gap = 1, children, ...otherProps }) => {
  const classes = useStyles({ gap });

  return (
    <Box className={classes.root} {...otherProps}>
      {children}
    </Box>
  );
};

export default GapBox;
