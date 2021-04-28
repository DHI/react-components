import React from 'react';

// #region Local imports
import { SnackbarContextValue } from './types';
// #endregion

const SnackbarContext = React.createContext({} as SnackbarContextValue);
export default SnackbarContext;
