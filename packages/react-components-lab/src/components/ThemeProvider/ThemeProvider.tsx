import React, { useMemo, FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createTheme';
import assignIn from 'lodash.assignin';

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
  const theme = useMemo(() => {
    const themeWithOverrides = assignIn({ ...getTheme(type) }, overrides);

    return createTheme(themeWithOverrides as ThemeOptions);
  }, [overrides, type]);

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
