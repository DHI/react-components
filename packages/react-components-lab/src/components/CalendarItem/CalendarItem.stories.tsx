// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import CalendarItem from './CalendarItem';
import { CalendarItemProps } from './types';

const Template: Story<CalendarItemProps> = (args) => <CalendarItem {...args} />;

export const Button = Template.bind({});
Button.args = {
  variant: 'button',
  children: 'March',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'button',
  children: 'March',
  disabled: true,
};

export const ActiveButton = Template.bind({});
ActiveButton.args = {
  variant: 'button',
  active: true,
  children: 'March',
};

export const SemiButton = Template.bind({});
SemiButton.args = {
  variant: 'semi-button',
  children: 'March',
};

export const ActiveSemiButton = Template.bind({});
ActiveSemiButton.args = {
  variant: 'semi-button',
  children: 'March',
  active: true,
};

export default {
  title: 'Components/CalendarItem',
  component: CalendarItem,
} as Meta;
