import React, {
  useState,
  useEffect,
  useCallback,
  FC,
  MouseEventHandler,
} from 'react';
import Handle from './Handle';
import { ResizeHandleProps } from './types';

const VerticalHandle: FC<ResizeHandleProps> = ({
  wrapperSize,
  draggableSize,
  minDraggableSize = 0,
  minContainerSize = 0,
  vertical = false,
  size = 'medium',
  onDrag,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialSize, setInitialSize] = useState(minDraggableSize * 2);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!vertical) {
        const wrappersHeight = wrapperSize;
        let h =
          e.clientY < minContainerSize
            ? wrappersHeight - minContainerSize
            : wrappersHeight - e.clientY;

        h = h < minDraggableSize ? 0 : h;

        onDrag(h);
      }

      if (vertical) {
        const wrappersWidth = wrapperSize;
        let w =
          e.clientX < minContainerSize
            ? wrappersWidth - minContainerSize
            : wrappersWidth - e.clientX;

        w = w < minDraggableSize ? 0 : w;
        onDrag(w);
      }
    },
    [vertical, minContainerSize, minDraggableSize, onDrag]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsDragging(true);
      const h = wrapperSize - e.clientY;
      const w = wrapperSize - e.clientX;
      if (!vertical) {
        setInitialSize(initialSize < minDraggableSize ? minDraggableSize : h);
      }

      if (vertical) {
        setInitialSize(initialSize < minDraggableSize ? minDraggableSize : w);
      }
    },
    [initialSize, minDraggableSize]
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
  const expandSize = Number(!vertical ? expandHeight : expandWidth);

  return (
    <Handle
      size={size}
      onMouseDown={handleMouseDown as unknown as MouseEventHandler<HTMLElement>}
      onMouseUp={handleMouseUp}
      isCollapsed={draggableSize < minDraggableSize}
      onClickExpand={() => onDrag(expandSize)}
      vertical={vertical}
    />
  );
};

VerticalHandle.defaultProps = {
  minDraggableSize: 0,
  minContainerSize: 0,
  size: 'medium',
};

export default VerticalHandle;
