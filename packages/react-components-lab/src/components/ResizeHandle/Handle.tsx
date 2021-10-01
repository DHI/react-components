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
  size,
}) => {
  const classes = useStyles();

  const isHorizontal = orientation === 'horizontal';
  const isSizeSmall = size === 'small';
  const isSizeLarge = size === 'large';
  return (
    <Box
      draggable={false}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={clsx(classes.root, isCollapsed && classes.collapsedRoot)}
      onClick={() => isCollapsed && onClickExpand()}
      style={{ cursor: isHorizontal ? 's-resize' : 'w-resize' }}
    >
      <Box
        draggable={false}
        className={clsx(
          classes.iconBox,
          isSizeSmall && classes.sizeSmall,
          isSizeLarge && classes.sizeLarge
        )}
        style={{
          transform: !isHorizontal
            ? 'translate(-40%, 0) rotate(-90deg)'
            : 'unset',
        }}
      >
        {!isCollapsed ? (
          <DragHandleIcon
            className={clsx(
              classes.icon,
              isSizeSmall && classes.iconSmall,
              isSizeLarge && classes.iconLarge
            )}
          />
        ) : (
          <ExpandLessIcon
            className={clsx(
              classes.icon,
              isSizeSmall && classes.iconSmall,
              isSizeLarge && classes.iconLarge
            )}
          />
        )}
      </Box>
    </Box>
  );
};

export default Handle;
