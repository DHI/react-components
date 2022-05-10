import { createTheme } from '@material-ui/core/styles';

// #region Local imports
import { PaletteType } from '@material-ui/core';
import mikeTypography from './mikeTypography';
import getPalette from './getPallete';
import getOverrides from './getOverrides';
import mikeComponentsProps from './mikeComponentsProps';
import { IMikeTheme } from './types';
// #endregion

export const getTheme = (type: PaletteType): IMikeTheme =>
  createTheme({
    typography: mikeTypography,
    palette: getPalette(type),
    overrides: getOverrides(type),
    props: mikeComponentsProps,
  });

export default getTheme;
