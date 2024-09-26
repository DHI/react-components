// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { InputFileProps } from './types';
import InputFile from './InputFile';

export default {
  title: 'Components/InputFile',
  component: InputFile,
  argTypes: {
    variant: { control: 'select' },
    accept: { control: 'string' },
    quantity: { control: 'select' },
    showFiles: { control: 'boolean' },
  },
} as Meta;

const Template: Story<InputFileProps> = (args) => <InputFile {...args} />;

export const Dropzone = Template.bind({});
Dropzone.args = {
  variant: 'dropzone',
  accept: ['.txt', '.png'],
  quantity: 'multiple',
  showFiles: true,
};

export const DropzoneNoReplace = Template.bind({});
DropzoneNoReplace.args = {
  variant: 'dropzone',
  accept: ['.txt', '.png'],
  quantity: 'multiple',
  showFiles: true,
  replaceOnUpload: false,
};

export const DropzoneSingle = Template.bind({});
DropzoneSingle.args = {
  variant: 'dropzone',
  accept: ['.txt', '.png'],
  quantity: 'single',
  showFiles: true,
};

export const DropzoneHiddenFiles = Template.bind({});
DropzoneHiddenFiles.args = {
  variant: 'dropzone',
  accept: ['.txt', '.png'],
  quantity: 'multiple',
  showFiles: false,
};

export const Button = Template.bind({});
Button.args = {
  variant: 'button',
  accept: ['.txt', '.png'],
  quantity: 'multiple',
  showFiles: true,
};

export const Icon = Template.bind({});
Icon.args = {
  variant: 'iconbutton',
  accept: ['.txt', '.png'],
  quantity: 'multiple',
  showFiles: true,
};
