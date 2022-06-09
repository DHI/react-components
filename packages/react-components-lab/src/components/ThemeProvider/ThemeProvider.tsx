import React, { useMemo, FC } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// #region Local imports
import { assignIn } from 'lodash';
import getDhiSharedTheme from './getDhiSharedTheme';
import { ThemeProviderProps, IMikeTheme } from './types';
// #endregion
const DHIThemeProvider: FC<ThemeProviderProps> = ({
  overrides = {},
  children,
  mode = 'light',
}) => {
  const theme: IMikeTheme = useMemo(() => {
    const themeWithOverrides = getDhiSharedTheme(mode, {
      components: overrides,
    });
    return themeWithOverrides;
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
