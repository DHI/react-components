// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ResizeHandleProps } from './types';
import ResizeHandle from './ResizeHandle';
import mikePalette from '../ThemeProvider/dhiPallete';

export default {
  title: 'Components/ResizeHandle',
  component: ResizeHandle,
};

const DARKGREY_LIGHT = mikePalette.darkGrey.light;
const ACTIONBLUE_PALE = mikePalette.secondary.light;

const Template: Story<ResizeHandleProps> = (props) => {
  const defaultSize = 200;

  const [height, setHeight] = useState(defaultSize);
  const [width, setWidth] = useState(defaultSize);

  const { vertical, size } = props;

  const isHorizontal = !vertical;
  const isSizeSmall = size === 'small';
  const isSizeMedium = size === 'medium';
  const isSizeLarge = size === 'large';
  return (
    <Box
      display="flex"
      flexDirection={isHorizontal ? 'column' : 'row'}
      height={400}
      width={400}
      position="relative"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        sx={{
          backgroundColor: 'secondary.light',
        }}
      >
        <Typography variant="h3">Map</Typography>
      </Box>
      <Box position="relative">
        {isHorizontal && isSizeLarge && (
          <Box
            width={1}
            position="absolute"
            display="flex"
            justifyContent="center"
            top={-34}
          >
            <ResizeHandle
              {...props}
              onDrag={setHeight}
              wrapperSize={400}
              draggableSize={height}
            />
          </Box>
        )}

        {isHorizontal && isSizeMedium && (
          <Box
            width={1}
            position="absolute"
            display="flex"
            justifyContent="center"
            top={-25}
          >
            <ResizeHandle
              {...props}
              onDrag={setHeight}
              wrapperSize={400}
              draggableSize={height}
            />
          </Box>
        )}

        {isHorizontal && isSizeSmall && (
          <Box
            width={1}
            position="absolute"
            display="flex"
            justifyContent="center"
            top={-16}
          >
            <ResizeHandle
              {...props}
              onDrag={setHeight}
              wrapperSize={400}
              draggableSize={height}
            />
          </Box>
        )}

        {!isHorizontal && (
          <Box
            height={1}
            position="absolute"
            display="flex"
            justifyContent="center"
            left={-16}
          >
            <ResizeHandle
              {...props}
              onDrag={setWidth}
              wrapperSize={400}
              draggableSize={width}
            />
          </Box>
        )}
        {isHorizontal && height !== 0 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={isHorizontal ? `${height}px` : 1}
            width={!isHorizontal ? `${width}px` : 1}
            sx={{
              backgroundColor: 'darkGrey.light',
            }}
          >
            <Typography variant="h3">Container</Typography>
          </Box>
        )}
        {!isHorizontal && width !== 0 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={isHorizontal ? `${height}px` : 1}
            width={!isHorizontal ? `${width}px` : 1}
            sx={{
              backgroundColor: 'darkGrey.light',
            }}
          >
            <Typography variant="h3">Container</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  draggableSize: 100,
  minDraggableSize: 100,
  minContainerSize: 100,
  size: 'medium',
};

export const Vertical = Template.bind({});

Vertical.args = {
  draggableSize: 100,
  minDraggableSize: 100,
  minContainerSize: 100,
  vertical: true,
};

export const HorizontalSmall = Template.bind({});

HorizontalSmall.args = {
  draggableSize: 100,
  minDraggableSize: 100,
  minContainerSize: 100,
  size: 'small',
};

export const HorizontalBig = Template.bind({});

HorizontalBig.args = {
  draggableSize: 100,
  minDraggableSize: 100,
  minContainerSize: 100,
  size: 'large',
};
