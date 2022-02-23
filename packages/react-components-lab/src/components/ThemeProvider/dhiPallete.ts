import { createTheme } from '@mui/material/styles';
import { DHI_COLORS } from './dhiColors';
import { IMikePalette } from './types';
// #endregion
const defaultTheme = createTheme();
const MuiPalette = defaultTheme.palette;

const dhiPalette: IMikePalette = {
  ...MuiPalette,
  primary: {
    main: DHI_COLORS.BRANDBLUE_DEFAULT,
    dark: DHI_COLORS.BRANDBLUE_DARK,
    light: DHI_COLORS.BRANDBLUE_LIGHT,
    contrastText: DHI_COLORS.WHITE,
  },
  secondary: {
    main: DHI_COLORS.ACTIONBLUE_DEFAULT,
    dark: DHI_COLORS.ACTIONBLUE_DARK,
    light: DHI_COLORS.ACTIONBLUE_LIGHT,
    contrastText: DHI_COLORS.WHITE,
  },
  error: {
    main: DHI_COLORS.PINK_DEFAULT,
    dark: DHI_COLORS.PINK_DARK,
    light: DHI_COLORS.PINK_LIGHT,
    contrastText: DHI_COLORS.WHITE,
  },
  warning: {
    main: DHI_COLORS.YELLOW_DEFAULT,
    dark: DHI_COLORS.YELLOW_DARK,
    light: DHI_COLORS.YELLOW_LIGHT,
    contrastText: DHI_COLORS.WHITE,
  },
  info: {
    main: DHI_COLORS.ACTIONBLUE_DEFAULT,
    dark: DHI_COLORS.ACTIONBLUE_DARK,
    light: DHI_COLORS.ACTIONBLUE_LIGHT,
    contrastText: DHI_COLORS.WHITE,
  },
  success: {
    main: DHI_COLORS.GREEN_DEFAULT,
    dark: DHI_COLORS.GREEN_DARK,
    light: DHI_COLORS.GREEN_LIGHT,
    contrastText: DHI_COLORS.WHITE,
  },
  darkGrey: {
    main: DHI_COLORS.DARKGREY_DEFAULT,
    dark: DHI_COLORS.DARKGREY_DARK,
    light: DHI_COLORS.DARKGREY_LIGHT,
    contrastText: DHI_COLORS.BLACK,
  },
  mediumGrey: {
    main: DHI_COLORS.MEDIUMGREY_DEFAULT,
    dark: DHI_COLORS.MEDIUMGREY_DARK,
    light: DHI_COLORS.MEDIUMGREY_LIGHT,
    contrastText: DHI_COLORS.BLACK,
  },
  lightGrey: {
    main: DHI_COLORS.XLIGHTGREY,
    dark: DHI_COLORS.XLIGHTGREY,
    light: DHI_COLORS.XLIGHTGREY,
    contrastText: DHI_COLORS.BLACK,
  },
  text: {
    primary: DHI_COLORS.BRANDBLUE_DEFAULT,
    secondary: DHI_COLORS.DARKGREY_DEFAULT,
    disabled: DHI_COLORS.MEDIUMGREY_DEFAULT,
  },
  background: {
    default: DHI_COLORS.XLIGHTGREY,
    paper: DHI_COLORS.WHITE,
  },
  divider: DHI_COLORS.MEDIUMGREY_DEFAULT,
};

export default dhiPalette;
