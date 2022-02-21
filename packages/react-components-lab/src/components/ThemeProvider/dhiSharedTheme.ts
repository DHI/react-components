import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
// #region Local imports
import { IMikeTheme, IMikeThemeOptions } from './types';
import dhiTypography from './dhiTypography';
import dhiPalette from './dhiPallete';
import mikeOverrides from './mikeOverrides';
import mikeComponentsProps from './mikeComponentsProps';
// #endregion

const defaultTheme = createTheme();
const dhiSharedTheme: IMikeTheme = createTheme(
  deepmerge(defaultTheme, {
    typography: dhiTypography,
    palette: dhiPalette,
    // components: mikeOverrides,
    // props: mikeComponentsProps,
  })
);

export default dhiSharedTheme;
