import React, { FC, useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { LegendBaseProps } from './types';
import ButtonBaseStyled from './ButtonBase.styled';
import RootBoxStyled from './RootBox.styled';
import ArrowDownIconStyled from './ArrowDownIcon.styled';
import ColorBoxStyled from './ColorBox.styled';
import TruncateTypographyStyled from './TruncateTypography.styled';

const positionStylesMap = {
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
};

const LegendBase: FC<LegendBaseProps> = ({
  unit,
  title = 'Legend',
  position = 'bottomRight',
  defaultCollapsed = false,
  collapsable = false,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <RootBoxStyled
      sx={{
        ...positionStylesMap[position],
      }}
    >
      <ButtonBaseStyled disabled={!collapsable} onClick={toggleCollapsed}>
        <TruncateTypographyStyled>{title}</TruncateTypographyStyled>
        {collapsable && (
          <ArrowDownIconStyled
            sx={{
              transform: collapsed && 'rotate(180deg)',
            }}
          />
        )}
      </ButtonBaseStyled>
      <Box
        sx={{
          backgroundColor: 'lightGrey.main',
        }}
      >
        <Collapse in={!collapsed}>
          {unit && (
            <Box display="flex" justifyContent="flex-end" mx={1}>
              <Typography variant="subtitle2">{unit}</Typography>
              <ColorBoxStyled />
            </Box>
          )}

          <Box
            sx={{
              margin: 1,
            }}
          >
            {children}
          </Box>
        </Collapse>
      </Box>
    </RootBoxStyled>
  );
};

export default LegendBase;
