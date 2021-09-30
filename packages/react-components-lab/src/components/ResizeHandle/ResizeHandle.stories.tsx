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

const TemplateHorizontal: Story<ResizeHandleProps> = (args) => {
  const [height, setHeight] = useState(200);
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
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
        <Box
          width={1}
          position="absolute"
          display="flex"
          justifyContent="center"
          top={-16}
        >
          <ResizeHandle {...args} onDrag={setHeight} />
        </Box>
        {height !== 0 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={`${height}px`}
            className={classes.background1}
          >
            <Typography variant="h3">Container</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const TemplateVertical: Story<ResizeHandleProps> = (args) => {
  const [width, setWidth] = useState(200);
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="row"
      height="50vh"
      width="96vw"
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
        <Box
          height={1}
          position="absolute"
          display="flex"
          alignItems="center"
          left={-16}
        >
          <ResizeHandle {...args} onDrag={setWidth} />
        </Box>
        {width !== 0 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={`${width}px`}
            height={1}
            className={classes.background1}
          >
            <Typography variant="h3">Container</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const Horizontal = TemplateHorizontal.bind({});
Horizontal.args = {
  boxSize: 200,
  minSize: 100,
};

export const Vertical = TemplateVertical.bind({});

TemplateVertical.args = {
  orientation: 'vertical',
  minSize: 100,
  boxSize: 200,
};
