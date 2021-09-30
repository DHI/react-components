import { MouseEventHandler } from 'react';

export type Orientation = 'horizontal' | 'vertical';

export interface ResizeHandleProps {
  boxSize: number;
  onDrag: (h: number) => void;
  minSize?: number;
  minMapSize?: number;
  orientation?: Orientation;
}

export interface HandleProps {
  onMouseUp: MouseEventHandler<HTMLElement> | undefined;
  onMouseDown: MouseEventHandler<HTMLElement> | undefined;
  isCollapsed: boolean;
  onClickExpand: () => void;
  orientation?: Orientation;
}
