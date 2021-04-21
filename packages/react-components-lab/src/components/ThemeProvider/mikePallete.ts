import { palette as muiPalette } from '@material-ui/system';

// #region Local imports
import { MIKE_COLORS } from './mikeColors';
// #endregion

const mikePalette = {
  ...muiPalette,
  primary: {
    main: MIKE_COLORS.BRANDBLUE_DEFAULT,
    dark: MIKE_COLORS.BRANDBLUE_DARK,
    light: MIKE_COLORS.BRANDBLUE_LIGHT,
    contrastText: MIKE_COLORS.WHITE,
  },
  secondary: {
    main: MIKE_COLORS.ACTIONBLUE_DEFAULT,
    dark: MIKE_COLORS.ACTIONBLUE_DARK,
    light: MIKE_COLORS.ACTIONBLUE_LIGHT,
    contrastText: MIKE_COLORS.WHITE,
  },
  error: {
    main: MIKE_COLORS.PINK_DEFAULT,
    dark: MIKE_COLORS.PINK_DARK,
    light: MIKE_COLORS.PINK_LIGHT,
    contrastText: MIKE_COLORS.WHITE,
  },
  warning: {
    main: MIKE_COLORS.YELLOW_DEFAULT,
    dark: MIKE_COLORS.YELLOW_DARK,
    light: MIKE_COLORS.YELLOW_LIGHT,
    contrastText: MIKE_COLORS.WHITE,
  },
  info: {
    main: MIKE_COLORS.ACTIONBLUE_DEFAULT,
    dark: MIKE_COLORS.ACTIONBLUE_DARK,
    light: MIKE_COLORS.ACTIONBLUE_LIGHT,
    contrastText: MIKE_COLORS.WHITE,
  },
  success: {
    main: MIKE_COLORS.GREEN_DEFAULT,
    dark: MIKE_COLORS.GREEN_DARK,
    light: MIKE_COLORS.GREEN_LIGHT,
    contrastText: MIKE_COLORS.WHITE,
  },
  darkGrey: {
    main: MIKE_COLORS.DARKGREY_DEFAULT,
    dark: MIKE_COLORS.DARKGREY_DARK,
    light: MIKE_COLORS.DARKGREY_LIGHT,
    contrastText: MIKE_COLORS.BLACK,
  },
  mediumGrey: {
    main: MIKE_COLORS.MEDIUMGREY_DEFAULT,
    dark: MIKE_COLORS.MEDIUMGREY_DARK,
    light: MIKE_COLORS.MEDIUMGREY_LIGHT,
    contrastText: MIKE_COLORS.BLACK,
  },
  lightGrey: {
    main: MIKE_COLORS.XLIGHTGREY,
    dark: MIKE_COLORS.XLIGHTGREY,
    light: MIKE_COLORS.XLIGHTGREY,
    contrastText: MIKE_COLORS.BLACK,
  },
  text: {
    primary: MIKE_COLORS.BRANDBLUE_DEFAULT,
    secondary: MIKE_COLORS.DARKGREY_DEFAULT,
    disabled: MIKE_COLORS.MEDIUMGREY_DEFAULT,
    hint: MIKE_COLORS.ACTIONBLUE_DEFAULT,
  },
  background: {
    default: MIKE_COLORS.XLIGHTGREY,
    paper: MIKE_COLORS.WHITE,
  },
  divider: MIKE_COLORS.MEDIUMGREY_DEFAULT,
  // Custom 'intention' objects
  ultimate: {
    main: MIKE_COLORS.GREEN_DEFAULT,
    dark: MIKE_COLORS.GREEN_DARK,
    light: MIKE_COLORS.GREEN_LIGHT,
    contrastText: MIKE_COLORS.WHITE,
  },
};

export default mikePalette;
