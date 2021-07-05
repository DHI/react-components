// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

// #region Local imports
import SvgContainer from './SvgContainer';
import { SvgContainerProps } from './types';
import { EditIcon } from '../lib';
import icon from '../svg-icons/edit.svg';
// #endregion

export default {
  title: 'Icons',
  component: SvgContainer,
  argTypes: {},
} as Meta;

const Template: Story<SvgContainerProps> = (args) => (
  <div>
    <h2>DHI Icons</h2>
    <SvgContainer {...args} />
    <EditIcon />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  Icon: icon,
  height: 40,
  width: 40,
};
