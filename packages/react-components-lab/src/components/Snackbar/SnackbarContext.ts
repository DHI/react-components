import React from 'react';

// #region Local imports
import { SnackbarContexValue } from './types';
// #endregion

const SnackbarContext = React.createContext({} as SnackbarContexValue);
export default SnackbarContext;
