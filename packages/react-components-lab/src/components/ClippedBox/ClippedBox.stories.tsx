/* eslint-disable react/destructuring-assignment */
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Box } from '@mui/material';
import ClippedBox from './ClippedBox';
import { ClippedBoxProps } from './types';
import getDhiPalette from '../ThemeProvider/getDhiPalette';

const dhiPalette = getDhiPalette('light');

const Template: Story<ClippedBoxProps> = (args) => (
  <ClippedBox
    {...args}
    base={
      <Box
        sx={{
          height: args.height,
          width: '100%',
          backgroundColor: dhiPalette.primary.main,
        }}
      />
    }
    overlay={
      <Box
        sx={{
          height: args.height,
          width: '100%',
          backgroundColor: dhiPalette.secondary.main,
        }}
      />
    }
  />
);

export const Default = Template.bind({});
Default.args = {
  direction: 'horizontal',
  height: 100,
};

export const Vertical = Template.bind({});
Vertical.args = {
  direction: 'vertical',
  height: 400,
};

export default {
  title: 'Components/ClippedBox',
  component: ClippedBox,
} as Meta;
