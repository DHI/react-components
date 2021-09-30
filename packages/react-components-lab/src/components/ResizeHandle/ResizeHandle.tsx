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
  boxSize,
  onDrag,
  minSize = 0,
  minMapSize = (20 / 100) * window.innerHeight,
  orientation = 'horizontal',
  // eslint-disable-next-line radar/cognitive-complexity
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialSize, setInitialSize] = useState(minSize * 2);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      let h =
        e.clientY < minMapSize
          ? windowHeight - minMapSize
          : windowHeight - e.clientY;

      h = h < minSize ? 0 : h;

      let w =
        e.clientX < minMapSize
          ? windowWidth - minMapSize
          : windowWidth - e.clientX;

      w = w < minSize ? 0 : w;

      if (orientation === 'horizontal') {
        onDrag(h);
      }

      if (orientation === 'vertical') {
        onDrag(w);
      }
    },
    [orientation, minMapSize, minSize, onDrag]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsDragging(true);
      const h = window.innerHeight - e.clientY;
      const w = window.innerWidth - e.clientX;
      if (orientation === 'horizontal') {
        setInitialSize(initialSize < minSize ? minSize : h);
      }

      if (orientation === 'vertical') {
        setInitialSize(initialSize < minSize ? minSize : w);
      }
    },
    [initialSize, minSize, orientation]
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

  const expandWidth = (30 / 100) * window.innerWidth;
  const expandHeight = (30 / 100) * window.innerHeight;
  const expandSize = Number(
    orientation === 'horizontal'
      ? expandHeight
      : orientation === 'vertical' && expandWidth
  );
  return (
    <Handle
      orientation={orientation}
      onMouseDown={handleMouseDown as unknown as MouseEventHandler<HTMLElement>}
      onMouseUp={handleMouseUp}
      isCollapsed={boxSize < minSize}
      onClickExpand={() => onDrag(expandSize)}
    />
  );
};

VerticalHandle.defaultProps = {
  minSize: 0,
  minMapSize: (20 / 100) * window.innerHeight,
  orientation: 'horizontal',
};

export default VerticalHandle;
