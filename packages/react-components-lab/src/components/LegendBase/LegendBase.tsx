import React, { FC, useState } from 'react';
import { Box, Typography, Collapse, ButtonBase } from '@material-ui/core';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { LegendBaseProps } from './types';
import useStyles from './styles';

const LegendBase: FC<LegendBaseProps> = ({
  unit,
  title = 'Legend',
  position = 'bottomRight',
  defaultCollapsed = false,
  collapsable = false,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const classes = useStyles();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const rootClass = clsx(
    classes.root,
    classes[position],
    collapsed && classes.rootCollapsed
  );
  const iconClass = clsx(classes.icon, collapsed && classes.iconRotated);

  return (
    <Box className={rootClass}>
      <ButtonBase
        disabled={!collapsable}
        className={classes.buttonBase}
        onClick={toggleCollapsed}
      >
        <Typography className={classes.truncate}>{title}</Typography>
        {collapsable && <KeyboardArrowDownIcon className={iconClass} />}
      </ButtonBase>
      <Box className={classes.legendBox}>
        <Collapse in={!collapsed}>
          {unit && (
            <Box display="flex" justifyContent="flex-end" mx={1}>
              <Typography variant="subtitle2">{unit}</Typography>
              <Box className={classes.colorBox} />
            </Box>
          )}

          <Box className={classes.contentBox}>{children}</Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default LegendBase;
