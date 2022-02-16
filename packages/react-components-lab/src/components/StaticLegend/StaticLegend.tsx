import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { StaticLegendProps } from './types';
import useStyles from './styles';
import LegendBase from '../LegendBase/LegendBase';

const StaticLegend: FC<StaticLegendProps> = ({
  items,
  unit,
  title = 'Legend',
  position = 'bottomRight',
  defaultCollapsed = false,
  collapsable = false,
}) => {
  const classes = useStyles();

  return (
    <LegendBase
      unit={unit}
      title={title}
      position={position}
      collapsable={collapsable}
      defaultCollapsed={defaultCollapsed}
    >
      {items.map((item, i) => (
        <Box
          key={item.color}
          mb={i === items.length - 1 ? 0 : 1}
          display="flex"
          justifyContent="space-between"
          width="100%"
        >
          <Typography className={classes.truncate} variant="subtitle2">
            {item.label}
          </Typography>

          <Box
            style={{ background: item.color }}
            className={classes.colorBox}
          />
        </Box>
      ))}
    </LegendBase>
  );
};

export default StaticLegend;
