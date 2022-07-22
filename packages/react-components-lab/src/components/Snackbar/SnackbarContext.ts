import React, { createContext } from 'react';

// #region Local imports
import { SnackbarContextValue } from './types';
// #endregion

const SnackbarContext = createContext({} as SnackbarContextValue);
export default SnackbarContext;
