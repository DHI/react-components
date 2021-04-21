import React, { useMemo } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';
import assignIn from 'lodash/assignIn';

// #region Local imports
import { mikeSharedTheme } from './mikeSharedTheme';
import * as Types from './types';
// #endregion

const ThemeProvider: React.FC<Types.IProps> = ({ overrides, children }) => {
  const theme = useMemo(() => {
    const themeWithOverrides = assignIn({ ...mikeSharedTheme }, overrides);
    return createMuiTheme(themeWithOverrides as ThemeOptions);
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
