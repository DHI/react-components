// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext } from 'react';
// #region Local imports
import SnackbarContext from './SnackbarContext';
import { SnackbarContextValue } from './types';
// #endregion

const useSnackbar = (): SnackbarContextValue => useContext(SnackbarContext);

export default useSnackbar;
