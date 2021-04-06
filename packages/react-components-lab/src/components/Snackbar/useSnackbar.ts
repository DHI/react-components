import React from 'react';
// #region Local imports
import SnackbarContext from './SnackbarContext';

// #endregion

const useSnackbar = () => React.useContext(SnackbarContext);

export default useSnackbar;
