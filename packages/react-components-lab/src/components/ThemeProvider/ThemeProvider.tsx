import React, { useMemo } from 'react';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import assignIn from 'lodash.assignin';

// #region Local imports
import dhiSharedTheme from './dhiSharedTheme';
import * as Types from './types';
// #endregion

const DHIThemeProvider: React.FC<Types.IProps> = ({ overrides, children }) => {
  const theme = useMemo(() => {
    const themeWithOverrides = assignIn({ ...dhiSharedTheme }, overrides);
    return createTheme(themeWithOverrides as ThemeOptions);
  }, [overrides]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default DHIThemeProvider;
