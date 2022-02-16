import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { CategoricalBarLegendProps } from './types';
import useCategoricalBarLegendStyles from './styles';

const CategoricalBarLegend: FC<CategoricalBarLegendProps> = ({ items }) => {
  const classes = useCategoricalBarLegendStyles();

  return (
    <Box mt={2}>
      {items.map((legendItem) => (
        <Box
          display="flex"
          alignItems="center"
          key={`legend-item-${legendItem.color}-${legendItem.label}`}
          ml={0}
          my={1}
        >
          <Box
            width={legendItem.label?.length ? '50%' : '100%'}
            className={classes.legendColor}
            style={{
              backgroundColor: legendItem.color,
              width: legendItem.label?.length ? '50%' : '100%',
            }}
          />
          {Boolean(legendItem.label) && (
            <Box ml={1} width="50%">
              <Typography variant="body2" className={classes.legendText}>
                {legendItem.label}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CategoricalBarLegend;
