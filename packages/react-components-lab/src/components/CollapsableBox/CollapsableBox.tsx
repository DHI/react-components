import React, { FC, useState } from 'react';
import { Box, Button, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import clsx from 'clsx';
import useStyles from './styles';
import { CollapsableBoxProps } from './types';

const CollapsableBox: FC<CollapsableBoxProps> = ({
  expandLabel,
  collapseLabel,
  children,
  style = {},
  className = '',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const classes = useStyles();

  return (
    <Box style={{ ...style }} className={className}>
      <Collapse
        in={!isCollapsed}
        collapsedSize={75}
        className={classes.collapsable}
      >
        <span
          className={clsx(
            classes.overlay,
            isCollapsed && classes.collapsedOverlay
          )}
        />
        <Box p={1}>{children}</Box>
      </Collapse>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="text"
          color="primary"
          className={classes.button}
          fullWidth
        >
          <ExpandMore className={clsx(!isCollapsed && classes.icon)} />
          {isCollapsed ? expandLabel : collapseLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default CollapsableBox;
