import React from 'react';
// #region Local imports
import SnackbarContext from './SnackbarContext';
import { SnackbarContextValue } from './types';
// #endregion

const useSnackbar = (): SnackbarContextValue =>
  React.useContext(SnackbarContext);

export default useSnackbar;
