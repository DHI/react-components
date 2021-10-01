import React, {
  useState,
  useEffect,
  useCallback,
  FC,
  MouseEventHandler,
} from 'react';
// eslint-disable-next-line import/no-cycle
import Handle from './Handle';
import { ResizeHandleProps } from './types';

const VerticalHandle: FC<ResizeHandleProps> = ({
  wrapperSize,
  draggableSize,
  minDraggableSize = 0,
  minContainerSize = 0,
  orientation = 'horizontal',
  size = 'medium',
  onDrag,
  // eslint-disable-next-line radar/cognitive-complexity
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialSize, setInitialSize] = useState(minDraggableSize * 2);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (orientation === 'horizontal') {
        const wrappersHeight = wrapperSize;
        let h =
          e.clientY < minContainerSize
            ? wrappersHeight - minContainerSize
            : wrappersHeight - e.clientY;

        h = h < minDraggableSize ? 0 : h;

        onDrag(h);
      }

      if (orientation === 'vertical') {
        const wrappersWidth = wrapperSize;
        let w =
          e.clientX < minContainerSize
            ? wrappersWidth - minContainerSize
            : wrappersWidth - e.clientX;

        w = w < minDraggableSize ? 0 : w;
        onDrag(w);
      }
    },
    [orientation, minContainerSize, minDraggableSize, onDrag]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsDragging(true);
      const h = wrapperSize - e.clientY;
      const w = wrapperSize - e.clientX;
      if (orientation === 'horizontal') {
        setInitialSize(initialSize < minDraggableSize ? minDraggableSize : h);
      }

      if (orientation === 'vertical') {
        setInitialSize(initialSize < minDraggableSize ? minDraggableSize : w);
      }
    },
    [initialSize, minDraggableSize, orientation]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const remove = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
    };

    const add = () => {
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    if (isDragging) add();
    else remove();

    return remove;
  }, [isDragging, handleMouseMove, handleMouseDown, handleMouseUp]);

  const expandWidth = (30 / 100) * wrapperSize;
  const expandHeight = (30 / 100) * wrapperSize;
  const expandSize = Number(
    orientation === 'horizontal'
      ? expandHeight
      : orientation === 'vertical' && expandWidth
  );

  return (
    <Handle
      size={size}
      orientation={orientation}
      onMouseDown={handleMouseDown as unknown as MouseEventHandler<HTMLElement>}
      onMouseUp={handleMouseUp}
      isCollapsed={draggableSize < minDraggableSize}
      onClickExpand={() => onDrag(expandSize)}
    />
  );
};

VerticalHandle.defaultProps = {
  minDraggableSize: 0,
  minContainerSize: 0,
  orientation: 'horizontal',
  size: 'medium',
};

export default VerticalHandle;
