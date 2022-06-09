import { createTheme } from '@mui/material/styles';
// #region Local imports
import { PaletteMode } from '@mui/material';
import { IMikeTheme } from './types';
import dhiTypography from './dhiTypography';
import getDhiPalette from './getDhiPalette';
import getDhiOverrides from './getDhiOverrides';
// #endregion

// const defaultTheme = createTheme();
const getDhiTheme = (
  mode: PaletteMode,
  overrides?: Record<string, unknown> | undefined
): IMikeTheme =>
  createTheme(
    {
      typography: dhiTypography,
      palette: getDhiPalette(mode),
      components: getDhiOverrides(mode),
    },
    overrides
  );

export default getDhiTheme;
