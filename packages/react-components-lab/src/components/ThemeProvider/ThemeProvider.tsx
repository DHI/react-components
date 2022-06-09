import React, { useMemo, FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createTheme from '@material-ui/core/styles/createTheme';

// #region Local imports
import { getTheme } from './mikeSharedTheme';
import * as Types from './types';
// #endregion

const isDarkMode = false;
// (window.matchMedia &&
//   window.matchMedia('(prefers-color-scheme: dark)').matches);

const ThemeProvider: FC<Types.IProps> = ({
  overrides,
  children,
  type = isDarkMode ? 'dark' : 'light',
}) => {
  const theme = useMemo(
    () => createTheme({ ...getTheme(type) }, overrides),
    [overrides, type]
  );

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </>
  );
};

export default ThemeProvider;
