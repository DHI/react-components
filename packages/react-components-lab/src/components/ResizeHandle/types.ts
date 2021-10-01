import { MouseEventHandler } from 'react';

export type Orientation = 'horizontal' | 'vertical';
export type Size = 'small' | 'medium' | 'large';
export interface ResizeHandleProps {
  wrapperSize: number;
  draggableSize: number;
  minDraggableSize?: number;
  minContainerSize?: number;
  orientation?: Orientation;
  onDrag: (h: number) => void;
  size?: Size;
}

export interface HandleProps {
  onMouseUp: MouseEventHandler<HTMLElement> | undefined;
  onMouseDown: MouseEventHandler<HTMLElement> | undefined;
  isCollapsed: boolean;
  onClickExpand: () => void;
  orientation?: Orientation;
  size?: Size;
}
