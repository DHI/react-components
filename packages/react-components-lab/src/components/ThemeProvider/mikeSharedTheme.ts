import { createTheme, adaptV4Theme } from '@mui/material/styles';

// #region Local imports
import { IMikeTheme, IMikeThemeOptions } from './types';
import mikeTypography from './mikeTypography';
import mikePalette from './mikePallete';
import mikeOverrides from './mikeOverrides';
import mikeComponentsProps from './mikeComponentsProps';
// #endregion

export const mikeSharedTheme: IMikeTheme = createTheme(adaptV4Theme({
  typography: mikeTypography,
  palette: mikePalette,
  overrides: mikeOverrides,
  props: mikeComponentsProps,
} as IMikeThemeOptions));

export default mikeSharedTheme;
