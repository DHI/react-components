import React, { FC } from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { ColorsArr, LegendProps } from './types';
import StaticLegend from '../StaticLegend/StaticLegend';

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
  min,
  max,
  colors,
  doMixColors,
  maxItems = 10,
  ...otherProps
}) => {
  const colorLenByMax = colors.length / maxItems;
  const maxColorOverBy = Math.ceil(colorLenByMax);
  const reducedColors =
    colorLenByMax >= 1.5
      ? colors.filter((_, i) => i % maxColorOverBy === 0)
      : colors;

  const mixedColors = doMixColors ? mixLegendColors(colors) : reducedColors;
  const step = (max - min) / (mixedColors.length - 1);

  const legendItems = mixedColors
    .map((color, i) => ({
      label: Number(min + i * step).toFixed(2),
      color,
    }))
    .reverse();

  return <StaticLegend {...otherProps} items={legendItems} />;
};

export default Legend;
