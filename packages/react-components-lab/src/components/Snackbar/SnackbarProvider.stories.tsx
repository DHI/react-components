import React from 'react';
import { Button } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

// #region Local imports
import SnackbarProvider from './SnackbarProvider';
import useSnackbar from './useSnackbar';
import { SnackbarProviderProps } from './types';
// #endregion

const onActionClick = action('onActionClick');
const messageContent = 'Hi, I am a snackbar!';

const App: React.FC = () => {
  const snackbar = useSnackbar();

  const handleShowSnackbar = () => {
    snackbar.showMessage(messageContent);
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
  severity: 'normal',
  onActionClick,
};
