import React, { useMemo, FC } from 'react';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import CssBaseline from '@mui/material/CssBaseline';

// #region Local imports
import dhiSharedTheme from './dhiSharedTheme';
import { IProps } from './types';
// #endregion

const DHIThemeProvider: FC<IProps> = ({ overrides, children }) => {
  const theme = useMemo(() => {
    const themeWithOverrides = deepmerge({ ...dhiSharedTheme }, overrides);
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
