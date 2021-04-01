// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Button } from '@material-ui/core';

// #region Local imports
import SnackbarProvider from './SnackbarProvider';
import useSnackbar from './useSnackbar';
import { SnackbarProps } from './types';
// #endregion

const messageContent: string = 'Hi, I am a snackbar!';
const App: React.FC = () => {
  const snackbar = useSnackbar();

  const handleShowSnackbar = () => {
    snackbar.showMessage(messageContent);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleShowSnackbar}>Show</Button>
    </>
  );
};

export default {
  title: 'Example/Snackbar',
  component: SnackbarProvider,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is default configurations for a Snackbar',
      },
    },
  },
} as Meta;


const Template: Story<SnackbarProps> = (args) => (
  <SnackbarProvider {...args}>
    <App />
  </SnackbarProvider>
);

export const Default = Template.bind({});
Default.args = {
  autoHideDuration: 3000,
  transitionComponent: 'slide',
  severity: 'normal',
};
