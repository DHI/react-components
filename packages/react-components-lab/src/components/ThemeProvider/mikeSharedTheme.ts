import { createMuiTheme } from '@material-ui/core/styles';

// #region Local imports
import { IMikeTheme } from './types';
import mikeTypography from './mikeTypography';
import mikePalette from './mikePallete';
import mikeOverrides from './mikeOverrides';
// #endregion

export const mikeSharedTheme: IMikeTheme = createMuiTheme({
  typography: mikeTypography,
  palette: mikePalette,
  shape: {
    borderRadius: 4, // default mui: 4
  },
  overrides: mikeOverrides,
  props: {
    MuiDialogTitle: {
      disableTypography: true,
    },
    MuiDialogActions: {
      disableSpacing: true,
    },
    MuiAppBar: {
      position: 'fixed',
      elevation: 0,
    },
    MuiButton: {
      color: 'secondary', // set the default color prop for  buttons to secondary.
    },
    MuiCircularProgress: {
      color: 'secondary', // set the default color prop for spinners to secondary.
    },
    MuiFab: {
      color: 'secondary',
    },
    MuiTabs: {
      indicatorColor: 'primary',
      textColor: 'primary',
    },
    MuiTableCell: {
      align: 'left',
    },
    MuiLink: {
      color: 'secondary',
    },
  },
});

export default mikeSharedTheme;
