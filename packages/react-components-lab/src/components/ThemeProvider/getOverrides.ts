import { createTheme } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';
import { PaletteType } from '@material-ui/core';

// #region Local imports
import { SPACING, FONT_SIZE, FONT_FAMILY } from './types';
import getPalette from './getPallete';
import mikeColors from './mikeColors';
// #endregion

const defaultTheme = createTheme();

const getOverrides = (type: PaletteType): Overrides => {
  const mikePalette = getPalette(type);

  return {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
          backgroundColor: mikePalette.grey[100],
          borderRadius: '100px',
        },
        '*::-webkit-scrollbar:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        '*::-webkit-scrollbar-thumb': {
          background: mikePalette.grey[500],
          '-webkit-border-radius': '100px',
        },
        '*::-webkit-scrollbar-thumb:active': {
          background: mikePalette.grey[500],
          '-webkit-border-radius': '100px',
        },
      },
    },
    MuiTypography: {
      root: {
        color: mikePalette.text.primary,
      },
      colorPrimary: {
        color: mikePalette.text.primary,
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
        backgroundColor: mikePalette.grey[50],
        height: '60px',
        borderBottom: `4px solid ${mikePalette.grey[200]}`,
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
        backgroundColor: mikePalette.grey[50],
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: 1,
          boxShadow: `0 0 10px ${mikeColors.BLACK}`,
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
          boxShadow: `0 0 10px ${mikeColors.BLACK}`,
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
        '&:disabled': {
          height: '2.5rem', // 48px
        },
        minWidth: 0,
        padding: '0 1rem', // 16px
      },
      outlined: {
        minWidth: 156,
        border: '2px solid !important',
      },
      contained: {
        minWidth: 156,
      },
      containedPrimary: {
        // #xxxxxx61 = 38% opacity
        // '&:disabled': {
        // 	backgroundColor: `${mikePalette.primary.light}61`,
        // 	color: `${mikePalette.primary.contrastText}61`,
        // },
      },
      containedSecondary: {
        // '&:disabled': {
        // 	backgroundColor: `${mikePalette.secondary.light}61`,
        // 	color: `${mikePalette.secondary.contrastText}61`,
        // },
      },
      outlinedPrimary: {
        '&:hover': {
          borderColor: `${mikePalette.primary.dark}`,
        },
        '&:disabled': {
          // color: `${mikePalette.primary.light}61`,
          // borderColor: `${mikePalette.primary.contrastText}61`,
        },
      },
      outlinedSecondary: {
        '&:hover': {
          borderColor: `${mikePalette.secondary.dark}`,
        },
        '&:disabled': {
          // color: `${mikePalette.secondary.light}61`,
          // borderColor: `${mikePalette.secondary.light}61`,
        },
      },
      textPrimary: {
        '&:disabled': {
          // color: `${mikePalette.primary.light}61`,
        },
      },
      textSecondary: {
        '&:disabled': {
          // color: `${mikePalette.secondary.light}61`,
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
      root: {
        color: mikePalette.grey[500],
      },
      indeterminate: {
        color: mikePalette.success.main,
      },
      colorSecondary: {
        '&$checked': {
          color: mikePalette.success.main,
        },
      },
    },
    MuiRadio: {
      root: {
        boxSizing: 'content-box',
      },
      colorPrimary: {
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
        color: mikePalette.success.main,
        '&$checked': {
          '& svg:nth-of-type(2)': {
            transform: 'scale(0.8)',
            fill: mikePalette.success.main,
          },
        },
      },
    },
    MuiCard: {
      root: {
        display: 'flex',
      },
    },
    MuiFormControlLabel: {
      label: {
        '&$disabled': {
          color: mikePalette.grey[100],
        },
      },
      // root: {
      //   '& .MuiTypography-root, .MuiTypography-root.Mui-disabled': {
      //     fontSize: '90%',
      //     color: mikePalette.grey[500],
      //   },
      // },
    },
    MuiFab: {
      primary: {
        '&:disabled': {
          backgroundColor: mikePalette.primary.light,
          color: mikePalette.background.paper,
        },
        '&:hover': {
          backgroundColor: mikePalette.primary.dark,
        },
      },
      secondary: {
        '&:disabled': {
          backgroundColor: mikePalette.secondary.light,
          color: mikePalette.background.paper,
        },
        '&:hover': {
          backgroundColor: mikePalette.secondary.dark,
        },
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: mikePalette.grey[100],
        },
      },
    },
    MuiSvgIcon: {
      colorPrimary: {
        color: mikePalette.text.primary,
      },
    },
    MuiInputBase: {
      input: {
        '&$disabled': {
          color: mikePalette.grey[200],
        },
      },
    },
    MuiFilledInput: {
      input: {
        '&$disabled': {
          backgroundColor: mikePalette.grey[50],
        },
      },
    },
    MuiOutlinedInput: {
      input: {
        '&$disabled': {
          backgroundColor: mikePalette.grey[50],
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
        borderBottom: `2px solid ${mikePalette.divider}`,
        userSelect: 'none',
        cursor: 'pointer ',
      },
    },
    MuiTableRow: {
      root: {
        '&:hover, &:focus': {
          backgroundColor: mikePalette.grey[50],
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
            color: mikePalette.grey[500],
          },
          '&::after': {
            borderWidth: '0 11px 11px 11px',
            borderBottomColor: mikePalette.grey[100],
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
        backgroundColor: mikePalette.grey[100],
        border: `1px solid ${mikePalette.grey[500]}`,
        maxWidth: SPACING * 46, // 368px
        minHeight: SPACING * 4, // 32px
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
    MuiSwitch: {
      root: {
        width: 46,
        height: 22,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'inherit',
        float: 'right',
      },
      sizeSmall: {
        '& $colorPrimary': {
          color: `${mikePalette.primary.main}`,
          '&$disabled': {
            color: `${mikePalette.grey[100]}`,
            '& + $track': {
              borderColor: `${mikePalette.grey[600]}`,
              backgroundColor: `${mikePalette.grey[200]}`,
            },
            '&$checked': {
              '& + $track': {
                borderColor: `${mikePalette.grey[200]}`,
                backgroundColor: `${mikePalette.grey[200]}`,
              },
            },
          },
        },
        '& $switchBase': {
          transform: 'translateX(-2px)',
          '&$checked': {
            transform: 'translateX(18px)',
          },
        },
      },
      switchBase: {
        padding: 0,
        height: '100%',
        color: `${mikePalette.grey[500]}`,
        transform: 'translateX(5.6px)',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&$checked': {
          transform: 'translateX(29px)',
          color: `${mikePalette.success.dark}`,
          height: '100%',
          '& + $track': {
            opacity: 1,
            backgroundColor: `${mikePalette.success.light}`,
            borderColor: `${mikePalette.success.light}`,
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      colorPrimary: {
        color: `${mikePalette.primary.main}`,
        '& + $track': {
          backgroundColor: `${mikePalette.grey[50]}`,
          borderColor: `${mikePalette.primary.main}`,
        },
        '&$checked': {
          color: `${mikePalette.grey[50]}`,
          '& + $track': {
            backgroundColor: `${mikePalette.primary.main}`,
            borderColor: `${mikePalette.primary.main}`,
          },
        },
        '&$disabled': {
          color: `${mikePalette.grey[100]}`,
          '& + $track': {
            borderColor: `${mikePalette.grey[600]}`,
            backgroundColor: `${mikePalette.grey[200]}`,
          },
        },
      },
      colorSecondary: {
        color: `${mikePalette.grey[500]}`,
        '&$checked': {
          color: `${mikePalette.success.dark}`,
          '& + $track': {
            backgroundColor: `${mikePalette.success.light}`,
            borderColor: `${mikePalette.success.light}`,
          },
        },
        '&$disabled': {
          color: `${mikePalette.grey[100]}`,
          '& + $track': {
            borderColor: `${mikePalette.grey[600]}`,
            backgroundColor: `${mikePalette.grey[200]}`,
          },
        },
      },
      input: {
        left: '-50%',
        '&:checked': {
          left: '-150%',
        },
      },
      thumb: {
        width: 12.5,
        height: 12.5,
        boxShadow: 'none',
      },
      track: {
        border: `3px solid ${mikePalette.grey[500]}`,
        borderRadius: 16,
        opacity: 1,
        backgroundColor: mikePalette.grey[50],
      },
    },
  };
};

export default getOverrides;
