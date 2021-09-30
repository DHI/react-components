import React, { FC } from 'react';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import {
  DragHandle as DragHandleIcon,
  ExpandLess as ExpandLessIcon,
} from '@material-ui/icons';
// eslint-disable-next-line import/no-cycle
import { HandleProps } from './types';
import useStyles from './styles';

const Handle: FC<HandleProps> = ({
  onMouseDown,
  onMouseUp,
  isCollapsed,
  onClickExpand,
  orientation,
}) => {
  const classes = useStyles();

  return (
    <Box
      draggable={false}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={clsx(classes.root, isCollapsed && classes.collapsedRoot)}
      onClick={() => isCollapsed && onClickExpand()}
    >
      <Box
        draggable={false}
        className={classes.iconBox}
        style={{
          transform:
            orientation === 'vertical'
              ? 'translate(-40%, 0) rotate(-90deg)'
              : 'unset',
        }}
      >
        {!isCollapsed ? (
          <DragHandleIcon className={classes.icon} />
        ) : (
          <ExpandLessIcon className={classes.icon} />
        )}
      </Box>
    </Box>
  );
};

export default Handle;
