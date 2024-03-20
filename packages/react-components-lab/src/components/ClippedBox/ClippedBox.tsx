import { UnfoldMore } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ClippedBoxProps } from './types';

const ClippedBox: FC<ClippedBoxProps> = ({
  height,
  base,
  overlay,
  direction = 'horizontal',
}) => {
  const horizontal = direction === 'horizontal';

  const [handlePosition, setHandlePosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDrag = (e: MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) {
      return;
    }

    const bounds = containerRef.current.getBoundingClientRect();
    const newPosition = horizontal
      ? ((e.clientX - bounds.left) / bounds.width) * 100
      : ((e.clientY - bounds.top) / bounds.height) * 100;
    setHandlePosition(Math.min(Math.max(newPosition, 0), 100));
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) {
      return () => {};
    }

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);

    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [isDragging]);

  const clipPathValue = horizontal
    ? `polygon(0 0, ${handlePosition}% 0, ${handlePosition}% 100%, 0 100%)`
    : `polygon(0 0, 100% 0, 100% ${handlePosition}%, 0 ${handlePosition}%)`;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: 'fit-content',
          left: 0,
          top: 0,
        }}
      >
        {base}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: 'fit-content',
          left: 0,
          top: 0,
          clipPath: clipPathValue,
        }}
      >
        {overlay}
      </Box>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'absolute',
          top: horizontal ? '0px' : `${handlePosition}%`,
          left: horizontal ? `${handlePosition}%` : '0px',
          transform: horizontal ? 'translateX(-50%)' : 'translateY(-50%)',
          width: horizontal ? 'auto' : '100%',
          height: horizontal ? height : 'auto',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: horizontal ? '5px' : 'calc(50% - 27px)',
            height: horizontal ? 'calc(50% - 27px)' : '5px',
            backgroundColor: 'white',
            top: horizontal ? 0 : undefined,
            left: horizontal ? undefined : 0,
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            width: horizontal ? '5px' : 'calc(50% - 27px)',
            height: horizontal ? 'calc(50% - 27px)' : '5px',
            backgroundColor: 'white',
            bottom: horizontal ? 0 : undefined,
            right: horizontal ? undefined : 0,
          }}
        />

        <UnfoldMore
          sx={{
            color: 'white',
            fontSize: '54px',
            border: '5px solid white',
            borderRadius: '50%',
            zIndex: 1,
            transform: horizontal ? 'rotate(90deg)' : 'none',
            cursor: horizontal ? 'ew-resize' : 'ns-resize',
          }}
          onMouseDown={startDrag as any}
        />
      </Stack>
    </Box>
  );
};

export default ClippedBox;
