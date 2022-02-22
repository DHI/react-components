import React, { FC } from 'react';
import { useTheme } from '@mui/material';
import {
  DragHandle as DragHandleIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { HandleProps } from './types';
import BoxRootStyled from './BoxRoot.styled';
import IconBoxStyled from './IconBox.styled';

const Handle: FC<HandleProps> = ({
  onMouseDown,
  onMouseUp,
  isCollapsed,
  onClickExpand,
  vertical,
  size,
}) => {
  const localTheme = useTheme();
  const isHorizontal = !vertical;

  const sizeMap = {
    small: {
      height: 16,
      padding: (theme: typeof localTheme) => theme.spacing(1, 1, 0.1, 1),
    },
    large: {
      height: 34,
      padding: (theme: typeof localTheme) => theme.spacing(3, 3, 0.3, 3),
    },
  };

  const iconSizeTranslateMap = {
    small: 'translate(0, -3px)',
    large: 'translate(0, -8px)',
  };

  return (
    <BoxRootStyled
      draggable={false}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={() => isCollapsed && onClickExpand()}
      isCollapsed={isCollapsed}
      vertical={vertical}
    >
      <IconBoxStyled
        draggable={false}
        sx={{
          transform: !isHorizontal
            ? 'translate(-40%, 0) rotate(-90deg)'
            : 'unset',
          ...sizeMap[size],
        }}
      >
        {!isCollapsed ? (
          <DragHandleIcon
            sx={{
              color: 'primary.main',
              transform: 'translate(0, -5px)',
              width: 18,
              translate: iconSizeTranslateMap[size],
            }}
          />
        ) : (
          <ExpandLessIcon
            sx={{
              color: 'primary.main',
              transform: 'translate(0, -5px)',
              width: 18,
              translate: iconSizeTranslateMap[size],
            }}
          />
        )}
      </IconBoxStyled>
    </BoxRootStyled>
  );
};

export default Handle;
