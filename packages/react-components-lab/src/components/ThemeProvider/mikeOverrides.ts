import { createMuiTheme } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';

// #region Local imports
import { MIKE_COLORS } from './mikeColors';
import { SPACING, FONT_SIZE, FONT_FAMILY } from './types';
import mikePalette from './mikePallete';
// #endregion

const defaultTheme = createMuiTheme();

const mikeOverrides: Overrides = {
  MuiCssBaseline: {
    '@global': {
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
        backgroundColor: MIKE_COLORS.MEDIUMGREY_DEFAULT,
        borderRadius: '100px',
      },
      '*::-webkit-scrollbar:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      '*::-webkit-scrollbar-thumb': {
        background: MIKE_COLORS.DARKGREY_DEFAULT,
        '-webkit-border-radius': '100px',
      },
      '*::-webkit-scrollbar-thumb:active': {
        background: MIKE_COLORS.DARKGREY_DEFAULT,
        '-webkit-border-radius': '100px',
      },
    },
  },
  MuiTypography: {
    root: {
      color: mikePalette.primary.main,
    },
    h1: {
      fontSize: '2rem', // 32px
      lineHeight: 1.25, // 40px - default mui:1
      fontWeight: 'normal',
    },
    h2: {
      fontSize: '1.5rem', // 24px
      lineHeight: 1.33, // 32px  - default mui:1
      fontWeight: 'normal',
    },
    h3: {
      fontSize: '1.25rem', // 20px
      lineHeight: 1.2, // 24px  - default mui:1.04
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1rem', // 16px
      lineHeight: 1.25, // 20px  - default mui:1.17
      fontWeight: 'bold',
    },
    h5: {
      // not defined in DHI guidelines
      fontSize: '1rem', // 16px
      lineHeight: 1, // 16px  - default mui:1.33
      fontWeight: 'bold',
    },
    h6: {
      // Used by mui for DialogTitles
      fontSize: '1.25rem', // 20 px
      lineHeight: 1.2, // 24px  - default mui:1.6
      fontWeight: 'bold',
    },
    subtitle1: {}, // default mui: 1rem / 1.75
    subtitle2: {}, // default mui: 0.875rem / 1.57
    body1: {
      // In Figma: Body Text
      // default mui: 1rem / 1.5.
      fontSize: '1rem', // 16px
      lineHeight: 1.374, // 22px
    },
    body2: {
      // In Figma: Body Text (S)
      // default mui: 0.875rem / 1.43
      fontSize: '0.875rem', // 14px
      lineHeight: 1.286, // 18px
    },
    button: {}, // default mui: 0.875rem / 1.75 / UPPERCASE
    caption: {}, // default mui: 0.75rem / 1.66
    overline: {}, // default mui: 0.75rem / 2.66 / UPPERCASE
  },

  MuiAppBar: {
    colorPrimary: {
      backgroundColor: MIKE_COLORS.MEDIUMGREY_LIGHT,
      height: '60px',
      borderBottom: '4px solid #DBE4E9', // MEDIUMGREY
    },
  },
  MuiToolbar: {
    root: {
      height: '60px',
      minHeight: '0 !important',
    },
  },
  MuiDialog: {},
  MuiDialogTitle: {
    root: {
      padding: '0 !important',
    },
  },
  MuiDialogContent: {
    root: {
      position: 'relative',
      padding: '0 !important',
      backgroundColor: MIKE_COLORS.XLIGHTGREY,
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 1,
        boxShadow: '0 0 10px #000000',
      },
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 1,
        boxShadow: '0 0 10px #000000',
      },
    },
  },
  MuiDialogActions: {
    root: {
      padding: '0 !important',
    },
  },
  MuiDialogContentText: {
    root: {
      color: mikePalette.text.primary,
    },
  },
  MuiButton: {
    root: {
      fontWeight: 500,
      letterSpacing: 0.1,
      textTransform: 'none',
      height: '3rem', // 48px
      '&:disabled': {
        height: '3rem', // 48px
      },
    },
    sizeLarge: {
      minWidth: 328,
    },
    sizeSmall: {
      height: '2.5rem', // 40px
      minWidth: 0,
      padding: '0 1rem', // 16px
    },
    outlined: {
      minWidth: 156,
      border: '2px solid',
    },
    contained: {
      minWidth: 156,
    },
    containedPrimary: {
      '&:disabled': {
        backgroundColor: mikePalette.primary.light,
        color: '#fff',
      },
    },
    containedSecondary: {
      '&:disabled': {
        backgroundColor: mikePalette.secondary.light,
        color: '#fff',
      },
    },
    outlinedPrimary: {
      border: '2px solid',
      '&:hover': {
        border: '2px solid',
        borderColor: mikePalette.primary.dark,
      },
      '&:disabled': {
        border: '2px solid',
        color: mikePalette.primary.light,
        borderColor: mikePalette.primary.light,
      },
    },
    outlinedSecondary: {
      border: '2px solid',
      '&:hover': {
        border: '2px solid',
        borderColor: mikePalette.secondary.dark,
      },
      '&:disabled': {
        border: '2px solid',
        color: mikePalette.secondary.light,
        borderColor: mikePalette.secondary.light,
      },
    },
    textPrimary: {
      '&:disabled': {
        color: mikePalette.primary.light,
      },
    },
    textSecondary: {
      '&:disabled': {
        color: mikePalette.secondary.light,
      },
    },
  },
  MuiBadge: {
    colorPrimary: {
      backgroundColor: mikePalette.error.main,
    },
  },
  MuiBreadcrumbs: {},
  MuiCheckbox: {
    indeterminate: {
      color: MIKE_COLORS.GREEN_DEFAULT,
    },
    colorSecondary: {
      '&$checked': {
        color: MIKE_COLORS.GREEN_DEFAULT,
      },
    },
  },
  MuiRadio: {
    root: {
      boxSizing: 'content-box',
    },
    colorPrimary: {
      // ==...muiRadioStyles,
      color: mikePalette.primary.main,
      '&$checked': {
        '& svg:nth-of-type(2)': {
          transform: 'scale(0.8)',
          fill: mikePalette.primary.main,
        },
      },
    },
    colorSecondary: {
      // ==...muiRadioStyles,
      color: mikePalette.ultimate.main,
      '&$checked': {
        '& svg:nth-of-type(2)': {
          transform: 'scale(0.8)',
          fill: mikePalette.ultimate.main,
        },
      },
    },
  },
  MuiFormControlLabel: {
    root: {
      '& .MuiTypography-root, .MuiTypography-root.Mui-disabled': {
        fontSize: '90%',
        color: mikePalette.darkGrey.main,
      },
    },
  },
  MuiFab: {
    primary: {
      '&:disabled': {
        backgroundColor: mikePalette.primary.light,
        color: '#fff',
      },
      '&:hover': {
        backgroundColor: mikePalette.primary.dark,
      },
    },
    secondary: {
      '&:disabled': {
        backgroundColor: mikePalette.secondary.light,
        color: '#fff',
      },
      '&:hover': {
        backgroundColor: mikePalette.secondary.dark,
      },
    },
  },
  MuiIconButton: {
    root: {
      '&:hover': {
        backgroundColor: MIKE_COLORS.MEDIUMGREY_DEFAULT,
      },
    },
  },
  MuiTab: {
    root: {
      textTransform: 'none',
      [defaultTheme.breakpoints.up('xs')]: {
        fontSize: '0.75rem', // 12px
        fontWeight: 'normal',
        paddingLeft: '0.75rem', // 12px
        paddingRight: '0.75rem',
        minWidth: '0',
      },
      '&:hover, &:focus': {
        color: mikePalette.primary.main,
      },
      '&$selected': {
        fontWeight: 'bold', // todo hevo: should we use theme.typography.fontWeight instead?
      },
    },
    selected: {},
  },
  MuiTabs: {
    scrollButtons: {
      [defaultTheme.breakpoints.up('xs')]: {
        minWidth: 0,
        width: 'auto',

        '&&& > *:first-child': {
          width: 40,
        },
      },
    },
  },
  MuiTable: {
    root: { overflowX: 'auto' },
  },
  MuiTableCell: {
    body: {
      height: '44px',
      color: mikePalette.primary.main,
      padding: '0',
      userSelect: 'none',
      width: '300px',
    },
    head: {
      padding: '0',
      height: '44px',
      backgroundColor: 'white',
      borderBottom: `2px solid ${mikePalette.divider}`,
      userSelect: 'none',
      cursor: 'pointer ',
    },
  },
  MuiTableRow: {
    root: {
      '&:hover, &:focus': {
        backgroundColor: mikePalette.lightGrey.main,
      },
    },
  },
  MuiTooltip: {
    arrow: {
      color: mikePalette.primary.main,
    },
    popperArrow: {
      '&[x-placement*="bottom"] span[class*="MuiTooltip-arrow"]': {
        '&::before': {
          borderWidth: '0 12px 12px 12px',
          marginTop: '-7px',
          marginLeft: '-6px',
          color: mikePalette.darkGrey.main,
        },
        '&::after': {
          borderWidth: '0 11px 11px 11px',
          borderBottomColor: mikePalette.mediumGrey.main,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: 'transparent',
          borderStyle: 'solid',
          marginTop: '-29px',
          marginLeft: '-5px',
          color: 'transparent',
          backgroundColor: 'transparent',
          width: 0,
          content: 'open-quote',
          position: 'absolute',
          display: 'block',
        },
      },
    },
    tooltip: {
      backgroundColor: mikePalette.mediumGrey.main,
      border: `1px solid ${mikePalette.darkGrey.main}`,
      maxWidth: SPACING * 46, // 368px
      minHeight: SPACING * 4, // 32px
      maxHeight: SPACING * 6.5, // 52px
      fontSize: FONT_SIZE,
      fontWeight: 'normal',
      fontFamily: FONT_FAMILY,
      padding: SPACING,
      color: mikePalette.primary.main,
      boxSizing: 'border-box',
    },
  },
  MuiStepConnector: {
    line: {
      borderColor: mikePalette.text.secondary,
    },
  },
  MuiStepIcon: {
    root: {
      fill: mikePalette.background.paper,
      color: mikePalette.text.secondary,
      border: 'solid',
      borderColor: mikePalette.text.secondary,
      borderRadius: 25,
      borderWidth: 1,
      '&$active': {
        border: 'none',
        fill: mikePalette.secondary.main,
        '& $text': {
          fill: mikePalette.secondary.contrastText,
        },
      },
      '&$completed': {
        border: 'none',
        fill: mikePalette.secondary.main,
      },
    },
    text: {
      fill: mikePalette.text.secondary,
      fontSize: '1rem', // 16px
    },
  },
  MuiStepper: {
    root: {
      padding: '0.5rem', // 8px
    },
  },
};

export default mikeOverrides;
