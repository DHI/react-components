import React, { FC } from 'react';
import { Box } from '@mui/material';
import { StaticLegendProps } from './types';
import LegendBase from '../LegendBase/LegendBase';
import TruncateTypographyStyled from '../LegendBase/TruncateTypography.styled';
import ColorBoxStyled from '../LegendBase/ColorBox.styled';

const StaticLegend: FC<StaticLegendProps> = ({
  items,
  unit,
  title = 'Legend',
  position = 'bottomRight',
  defaultCollapsed = false,
  collapsable = false,
  sx,
}) => (
  <LegendBase
    unit={unit}
    title={title}
    position={position}
    collapsable={collapsable}
    defaultCollapsed={defaultCollapsed}
    sx={sx}
  >
    {items.map((item, i) => (
      <Box
        key={item.color}
        mb={i === items.length - 1 ? 0 : 1}
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        <TruncateTypographyStyled variant="subtitle2">
          {item.label}
        </TruncateTypographyStyled>

        <ColorBoxStyled sx={{ backgroundColor: item.color, flexShrink: 0 }} />
      </Box>
    ))}
  </LegendBase>
);

export default StaticLegend;
