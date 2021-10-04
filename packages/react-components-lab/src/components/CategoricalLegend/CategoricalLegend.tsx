import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { CategoricalLegendProps } from './types';
import useCategoricalLegendStyles from './styles';

const CategoricalLegend: FC<CategoricalLegendProps> = ({ items }) => {
  const classes = useCategoricalLegendStyles();

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
            width={legendItem.label.length ? '50%' : '100%'}
            className={classes.legendColor}
            style={{
              backgroundColor: legendItem.color,
              width: legendItem.label.length ? '50%' : '100%',
            }}
          />
          {Boolean(legendItem.label.length) && (
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

export default CategoricalLegend;
