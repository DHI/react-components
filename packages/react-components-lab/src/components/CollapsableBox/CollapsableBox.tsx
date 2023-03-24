import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Collapse, useTheme } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { CollapsableBoxProps } from './types';

const CollapsableBox: FC<CollapsableBoxProps> = ({
  expandLabel,
  collapseLabel,
  children,
  style = {},
  className = '',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const theme = useTheme();
  const gradient = theme.palette.mode === 'light' ?  'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)' :  'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'


  return (
    <Box
      style={{ ...style }}
      className={className}
      sx={{ backgroundColor: 'background.paper' }}
    >
      <Collapse
        in={!isCollapsed}
        collapsedSize={75}
        sx={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          component="span"
          sx={{
            position: 'absolute',
            opacity: isCollapsed ? 1 : 0,
            pointerEvents: 'none',
            width: '100%',
            bottom: 0,
            backgroundImage: gradient,
            height: isCollapsed && 50,
          }}
        />
        <Box p={1}>{children}</Box>
      </Collapse>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="text"
          color="primary"
          sx={{
            height: 'unset',
            padding: 'unset',
          }}
          fullWidth
        >
          <ExpandLess
            sx={{
              transform: isCollapsed && 'rotateX(180deg)',
            }}
          />
          {isCollapsed ? expandLabel : collapseLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default CollapsableBox;
