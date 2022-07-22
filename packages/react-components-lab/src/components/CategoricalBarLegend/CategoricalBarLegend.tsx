import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { CategoricalBarLegendProps } from './types';

const CategoricalBarLegend: FC<CategoricalBarLegendProps> = ({ items }) => (
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
          sx={{
            height: 7,
            borderRadius: 10,
            backgroundColor: legendItem.color,
            width: legendItem.label?.length ? '50%' : '100%',
          }}
        />
        {Boolean(legendItem.label) && (
          <Box ml={1} width="50%">
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              {legendItem.label}
            </Typography>
          </Box>
        )}
      </Box>
    ))}
  </Box>
);

export default CategoricalBarLegend;
