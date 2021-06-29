import React, { useEffect, useState, FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { BarLegendProps } from './types';
import useStyles from './styles';

const BarLegend: FC<BarLegendProps> = ({ src, length, range, unit = '' }) => {
  const classes = useStyles();
  const [val, setVals] = useState<string[] | undefined>();

  useEffect(() => {
    if (
      length !== undefined &&
      range &&
      typeof range[0] === 'number' &&
      typeof range[1] === 'number'
    ) {
      let localLength = length;
      localLength -= 1;

      const arr: string[] = [];
      const diff: number = range[1] - range[0];
      const incr: number = diff / localLength;

      for (let i = 0; i <= localLength; i += 1) {
        const value = range[0] + incr * i;
        arr.push(value.toFixed(2));
      }

      setVals(arr);
    }
  }, [range, length]);

  return (
    <Box style={{ width: '100%' }}>
      <img src={src} alt="legend-colorbar" className={classes.colorbar} />
      {range &&
        (typeof range[0] === 'number' && typeof range[1] === 'number' && val ? (
          <Box display="flex" justifyContent="space-between">
            {val.map((v: string) => (
              <Typography key={`value-${v}`} style={{ fontSize: 10 }}>
                {`${v}${unit}`}
              </Typography>
            ))}
          </Box>
        ) : (
          range[0] &&
          range[1] && (
            <Box display="flex" justifyContent="space-between">
              <Typography style={{ fontSize: 10 }}>
                {`${range[0]}${unit}`}
              </Typography>
              <Typography style={{ fontSize: 10 }}>
                {`${range[1]}${unit}`}
              </Typography>
            </Box>
          )
        ))}
    </Box>
  );
};

export default BarLegend;
