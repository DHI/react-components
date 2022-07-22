import React, { FC } from 'react';
import { Button } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

// #region Local imports
import SnackbarProvider from './SnackbarProvider';
import useSnackbar from './useSnackbar';
import { SnackbarProviderProps } from './types';
// #endregion

// eslint-disable-next-line storybook/default-exports
const onActionClick = action('onActionClick');
const messageContent = 'Hi, I am a snackbar!';

const App: FC = () => {
  const snackbar = useSnackbar();

  const handleShowSnackbar = () => {
    snackbar.showMessage(messageContent, {
      severity: 'success',
    });
  };

  return (
    <Button variant="outlined" onClick={handleShowSnackbar}>
      Click me
    </Button>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const Default = (args: SnackbarProviderProps): JSX.Element => (
  <SnackbarProvider {...args}>
    <App />
  </SnackbarProvider>
);

Default.args = {
  autoHideDuration: 3000,
  transitionComponent: 'slide',
  severity: 'info',
  onActionClick,
};
