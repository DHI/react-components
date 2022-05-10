import { palette as muiPalette } from '@material-ui/system';

// #region Local imports
import { Color, PaletteType } from '@material-ui/core';
import MIKE_COLORS from './mikeColors';
import { IMikePalette } from './types';
// #endregion

export const mikePaletteLight = {
  ...muiPalette,
  type: 'light',
  primary: {
    light: MIKE_COLORS.BRANDBLUE_LIGHT,
    main: MIKE_COLORS.BRANDBLUE_DEFAULT,
    dark: MIKE_COLORS.BRANDBLUE_DARK,
    contrastText: MIKE_COLORS.WHITE,
  },
  secondary: {
    light: MIKE_COLORS.ACTIONBLUE_LIGHT,
    main: MIKE_COLORS.ACTIONBLUE_DEFAULT,
    dark: MIKE_COLORS.ACTIONBLUE_DARK,
    contrastText: MIKE_COLORS.WHITE,
  },
  error: {
    light: MIKE_COLORS.PINK_LIGHT,
    main: MIKE_COLORS.PINK_DEFAULT,
    dark: MIKE_COLORS.PINK_DARK,
    contrastText: MIKE_COLORS.WHITE,
  },
  warning: {
    light: MIKE_COLORS.YELLOW_LIGHT,
    main: MIKE_COLORS.YELLOW_DEFAULT,
    dark: MIKE_COLORS.YELLOW_DARK,
    contrastText: MIKE_COLORS.WHITE,
  },
  info: {
    light: MIKE_COLORS.ACTIONBLUE_LIGHT,
    main: MIKE_COLORS.ACTIONBLUE_DEFAULT,
    dark: MIKE_COLORS.ACTIONBLUE_DARK,
    contrastText: MIKE_COLORS.WHITE,
  },
  success: {
    light: MIKE_COLORS.GREEN_LIGHT,
    main: MIKE_COLORS.GREEN_DEFAULT,
    dark: MIKE_COLORS.GREEN_DARK,
    contrastText: MIKE_COLORS.WHITE,
  },
  text: {
    primary: MIKE_COLORS.BRANDBLUE_DARK,
    secondary: MIKE_COLORS.BRANDBLUE_DARK,
    disabled: MIKE_COLORS.GREY200,
    hint: MIKE_COLORS.BRANDBLUE_DARK,
  },
  background: {
    default: MIKE_COLORS.WHITE,
    paper: MIKE_COLORS.WHITE,
  },
  divider: MIKE_COLORS.GREY100,
  grey: {
    50: MIKE_COLORS.GREY50,
    100: MIKE_COLORS.GREY100,
    200: MIKE_COLORS.GREY200,
    300: MIKE_COLORS.GREY300,
    400: MIKE_COLORS.GREY400,
    500: MIKE_COLORS.GREY500,
    600: MIKE_COLORS.GREY600,
    700: MIKE_COLORS.GREY700,
    800: MIKE_COLORS.GREY800,
    900: MIKE_COLORS.GREY900,
    A100: MIKE_COLORS.GREY50,
    A200: MIKE_COLORS.GREY200,
    A400: MIKE_COLORS.GREY300,
    A700: MIKE_COLORS.GREY500,
  } as Color,
  darkGrey: {
    light: MIKE_COLORS.GREY200,
    main: MIKE_COLORS.GREY500,
    dark: MIKE_COLORS.GREY600,
    contrastText: MIKE_COLORS.BLACK,
  },
  mediumGrey: {
    light: MIKE_COLORS.GREY50,
    main: MIKE_COLORS.GREY100,
    dark: MIKE_COLORS.GREY200,
    contrastText: MIKE_COLORS.BLACK,
  },
  lightGrey: {
    main: MIKE_COLORS.GREY50,
    dark: MIKE_COLORS.GREY50,
    light: MIKE_COLORS.GREY50,
    contrastText: MIKE_COLORS.BLACK,
  },
  ultimate: {
    main: MIKE_COLORS.GREEN_DEFAULT,
    dark: MIKE_COLORS.GREEN_DARK,
    light: MIKE_COLORS.GREEN_LIGHT,
    contrastText: MIKE_COLORS.WHITE,
  },
};

export const mikePaletteDark = {
  ...muiPalette,
  type: 'dark',
  primary: {
    light: MIKE_COLORS.BRANDBLUE_X_LIGHT,
    main: MIKE_COLORS.BRANDBLUE_LIGHT,
    dark: MIKE_COLORS.BRANDBLUE_DEFAULT,
    contrastText: MIKE_COLORS.BRANDBLUE_DARK,
  },
  secondary: {
    light: MIKE_COLORS.ACTIONBLUE_X_LIGHT,
    main: MIKE_COLORS.ACTIONBLUE_LIGHT,
    dark: MIKE_COLORS.ACTIONBLUE_DEFAULT,
    contrastText: MIKE_COLORS.BRANDBLUE_DARK,
  },
  error: {
    light: MIKE_COLORS.PINK_X_LIGHT,
    main: MIKE_COLORS.PINK_LIGHT,
    dark: MIKE_COLORS.PINK_DEFAULT,
    contrastText: MIKE_COLORS.BRANDBLUE_DARK,
  },
  warning: {
    light: MIKE_COLORS.YELLOW_X_LIGHT,
    main: MIKE_COLORS.YELLOW_LIGHT,
    dark: MIKE_COLORS.YELLOW_DEFAULT,
    contrastText: MIKE_COLORS.BRANDBLUE_DARK,
  },
  success: {
    light: MIKE_COLORS.GREEN_X_LIGHT,
    main: MIKE_COLORS.GREEN_LIGHT,
    dark: MIKE_COLORS.GREEN_DEFAULT,
    contrastText: MIKE_COLORS.BRANDBLUE_DARK,
  },
  text: {
    primary: MIKE_COLORS.WHITE,
    secondary: MIKE_COLORS.WHITE,
    disabled: MIKE_COLORS.GREY700,
    hint: MIKE_COLORS.WHITE,
  },
  background: {
    default: MIKE_COLORS.BLACK,
    paper: MIKE_COLORS.BLACK,
  },
  divider: MIKE_COLORS.GREY700,
  grey: {
    50: MIKE_COLORS.GREY900,
    100: MIKE_COLORS.GREY800,
    200: MIKE_COLORS.GREY700,
    300: MIKE_COLORS.GREY600,
    400: MIKE_COLORS.GREY500,
    500: MIKE_COLORS.GREY400,
    600: MIKE_COLORS.GREY300,
    700: MIKE_COLORS.GREY200,
    800: MIKE_COLORS.GREY100,
    900: MIKE_COLORS.GREY50,
    A100: MIKE_COLORS.GREY500,
    A200: MIKE_COLORS.GREY300,
    A400: MIKE_COLORS.GREY200,
    A700: MIKE_COLORS.GREY50,
  } as Color,
  darkGrey: {
    light: MIKE_COLORS.GREY700,
    main: MIKE_COLORS.GREY400,
    dark: MIKE_COLORS.GREY300,
    contrastText: MIKE_COLORS.BLACK,
  },
  mediumGrey: {
    light: MIKE_COLORS.GREY900,
    main: MIKE_COLORS.GREY800,
    dark: MIKE_COLORS.GREY700,
    contrastText: MIKE_COLORS.BLACK,
  },
  lightGrey: {
    main: MIKE_COLORS.GREY900,
    dark: MIKE_COLORS.GREY900,
    light: MIKE_COLORS.GREY900,
    contrastText: MIKE_COLORS.BLACK,
  },
  ultimate: {
    light: MIKE_COLORS.GREEN_X_LIGHT,
    main: MIKE_COLORS.GREEN_LIGHT,
    dark: MIKE_COLORS.GREEN_DEFAULT,
    contrastText: MIKE_COLORS.BLACK,
  },
};

const paletteVariant = {
  dark: mikePaletteDark,
  light: mikePaletteLight,
};

const getPalette = (type: PaletteType) => paletteVariant[type] as IMikePalette;

export default getPalette;
