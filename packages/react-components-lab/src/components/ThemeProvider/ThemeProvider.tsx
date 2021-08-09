import React, { useMemo } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createTheme';
import assignIn from 'lodash.assignin';

// #region Local imports
import { mikeSharedTheme } from './mikeSharedTheme';
import * as Types from './types';
// #endregion

const ThemeProvider: React.FC<Types.IProps> = ({ overrides, children }) => {
  const theme = useMemo(() => {
    const themeWithOverrides = assignIn({ ...mikeSharedTheme }, overrides);

    return createTheme(themeWithOverrides as ThemeOptions);
  }, [overrides]);

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
