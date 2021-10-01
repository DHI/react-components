// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { ResizeHandleProps } from './types';
import ResizeHandle from './ResizeHandle';

export default {
  title: 'Example/ResizeHandle',
  component: ResizeHandle,
};

const useStyles = makeStyles(() => ({
  background1: {
    backgroundColor: '#CFDBE2',
  },
  background2: {
    backgroundColor: '#97DBF9',
  },
}));

const Template: Story<ResizeHandleProps> = (args) => {
  const defaultSize = 200;

  const [height, setHeight] = useState(defaultSize);
  const [width, setWidth] = useState(defaultSize);
  const classes = useStyles();

  const { orientation, size } = args;

  const isHorizontal = orientation === 'horizontal';
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
        className={classes.background2}
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
              {...args}
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
              {...args}
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
              {...args}
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
              {...args}
              onDrag={setWidth}
              wrapperSize={400}
              draggableSize={width}
            />
          </Box>
        )}
        {height !== 0 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={isHorizontal ? `${height}px` : 1}
            width={!isHorizontal ? `${width}px` : 1}
            className={classes.background1}
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
  orientation: 'horizontal',
  size: 'medium',
};

export const Vertical = Template.bind({});

Vertical.args = {
  draggableSize: 100,
  minDraggableSize: 100,
  minContainerSize: 100,
  orientation: 'vertical',
};

export const HorizontalSmall = Template.bind({});

HorizontalSmall.args = {
  draggableSize: 100,
  minDraggableSize: 100,
  minContainerSize: 100,
  orientation: 'horizontal',
  size: 'small',
};

export const HorizontalBig = Template.bind({});

HorizontalBig.args = {
  draggableSize: 100,
  minDraggableSize: 100,
  minContainerSize: 100,
  orientation: 'horizontal',
  size: 'large',
};
