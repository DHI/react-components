import { MouseEventHandler } from 'react';
export declare type Orientation = 'horizontal' | 'vertical';
export declare type Size = 'small' | 'medium' | 'large';
export interface ResizeHandleProps {
    wrapperSize: number;
    draggableSize: number;
    minDraggableSize?: number;
    minContainerSize?: number;
    vertical?: boolean;
    onDrag: (h: number) => void;
    size?: Size;
}
export interface HandleProps {
    onMouseUp: MouseEventHandler<HTMLElement> | undefined;
    onMouseDown: MouseEventHandler<HTMLElement> | undefined;
    isCollapsed: boolean;
    onClickExpand: () => void;
    vertical: boolean;
    size?: Size;
}
