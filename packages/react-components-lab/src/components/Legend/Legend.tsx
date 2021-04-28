import { TinyColor } from '@ctrl/tinycolor';
import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import useStyles from './styles';
import { ColorsArr, LegendProps } from './types';

export const mixLegendColors = (colorsArr: ColorsArr): ColorsArr => {
  const formatColors = colorsArr.map((color) =>
    color.includes('#') ? color : `#${color}`
  );
  let mixedColors: string[] = [];

  formatColors.forEach((color, i) => {
    if (i !== formatColors.length - 1) {
      const color1 = new TinyColor(color);
      const color2 = new TinyColor(formatColors[i + 1]);

      const mix = color1.mix(color2).toHexString();
      mixedColors = [...mixedColors, color, mix];
    } else mixedColors = [...mixedColors, color];
  });

  return mixedColors;
};

const Legend: FC<LegendProps> = ({
  title,
  unit,
  min,
  max,
  colors,
  doMixColors,
  maxItems = 10,
  style = {},
  headerBackground = '#fff',
  legendBackground = '#F8F8F8',
}) => {
  const classes = useStyles();

  const colorLenByMax = colors.length / maxItems;
  const maxColorOverBy = Math.ceil(colorLenByMax);
  const reducedColors =
    colorLenByMax >= 1.5
      ? colors.filter((_, i) => i % maxColorOverBy === 0)
      : colors;

  const mixedColors = doMixColors ? mixLegendColors(colors) : reducedColors;
  const step = (max - min) / (mixedColors.length - 1);

  return (
    <Box
      className={classes.wrapper}
      style={{ ...style, backgroundColor: legendBackground }}
    >
      {title && (
        <Box
          className={classes.legendHeader}
          style={{ backgroundColor: headerBackground }}
        >
          <Box p="1px 5px">
            {title.split(' ').map((word, i) => (
              <Typography key={word + String(i)}>{word}</Typography>
            ))}
          </Box>
        </Box>
      )}
      <Box p={1}>
        {unit && (
          <Box display="flex" className={classes.colorTickWrapper}>
            <span className={classes.tick}>
              <Typography variant="body1">
                <i>{unit}</i>
              </Typography>
            </span>
            <Box className={classes.color} />
          </Box>
        )}
        {mixedColors
          .map((color, i) => (
            <Box
              key={color + String(i)}
              display="flex"
              className={classes.colorTickWrapper}
            >
              <span className={classes.tick}>
                <Typography variant="body1">
                  {Number(min + i * step).toFixed(2)}
                </Typography>
              </span>
              <Box
                className={classes.color}
                style={{ backgroundColor: color }}
              />
            </Box>
          ))
          .reverse()}
      </Box>
    </Box>
  );
};

export default Legend;
