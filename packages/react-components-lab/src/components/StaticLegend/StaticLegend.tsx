import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { GapBox } from '../..';
import { StaticLegendProps } from './types';
import useStyles from './styles';

const StaticLegend: FC<StaticLegendProps> = ({ items, title, unit }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {items.map((item, i) => (
        <GapBox
          mb={i === items.length - 1 ? 0 : 1}
          gap={1}
          key={item.color}
          display="flex"
        >
          <Box
            borderRadius={20}
            style={{ background: item.color }}
            width={20}
            height={20}
          />
          <Typography variant="subtitle2">{item.label}</Typography>
        </GapBox>
      ))}
    </Box>
  );
};

export default StaticLegend;
