// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import Card from './Card';
import { CardProps } from './types';
import productImage from './product.png';

const Template: Story<CardProps> = (args) => {
  const [isActive, setIsActive] = useState(false);

  return <Card isOpen={isActive} setIsOpen={setIsActive} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  subTitle: 'Subtitle at DHI',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  children: (
    <Box>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Box>
  ),
};

export const NotClickable = Template.bind({});
NotClickable.args = {
  title: 'Title',
  subTitle: 'Subtitle at DHI',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  isClickable: false,
  children: (
    <Box>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Box>
  ),
};

export const WithImage = Template.bind({});
WithImage.args = {
  title: 'Title',
  subTitle: 'Subtitle at DHI',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  image: productImage as string,
  children: (
    <Box>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Box>
  ),
};

export default {
  title: 'Example/Card',
  component: Card,
} as Meta;
