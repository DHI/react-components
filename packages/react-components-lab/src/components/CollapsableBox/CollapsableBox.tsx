import React, { FC, useState } from 'react';
import { Box, Button, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { CollapsableBoxProps } from './types';

const CollapsableBox: FC<CollapsableBoxProps> = ({
  expandLabel,
  collapseLabel,
  children,
  style = {},
  className = '',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Box style={{ ...style }} className={className}>
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
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
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
          <ExpandMore
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
