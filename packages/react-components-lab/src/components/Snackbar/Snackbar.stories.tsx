/* eslint-disable react/jsx-props-no-spreading */
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { SnackbarProvider, useSnackbar } from './Snackbar';
import { SnackbarProviderProps } from './types';

export default {
  title: 'Example/Snackbar',
  component: SnackbarProvider,
  argTypes: {},
} as Meta;

const Template: Story<SnackbarProviderProps> = (args) => {
  const snackbar = useSnackbar();

  const handleShowSnackbar = () => {
    console.log(snackbar);
    snackbar.showMessage('test');
  };

  return (
    <SnackbarProvider {...args}>
      <Typography variant="body1">
        Snackbar with default configuration settings
      </Typography>
      <Button variant="outlined" onClick={handleShowSnackbar}>Show</Button>
    </SnackbarProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
