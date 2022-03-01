import { Components } from '@mui/material/styles';

// #region Local imports
import dhiPalette from './dhiPallete';
// #endregion
const FONT_FAMILY = [
  'Roboto',
  '-apple-system',
  'BlinkMacSystemFont',
  'Arial',
  'sans-serif',
].join(',');

// const defaultTheme = createTheme();

const mikeOverrides: Components = {
  MuiCssBaseline: {
    styleOverrides: {
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
        backgroundColor: dhiPalette.mediumGrey.main,
        borderRadius: '100px',
      },
      '*::-webkit-scrollbar:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: dhiPalette.darkGrey.main,
        '-webkit-border-radius': '100px',
      },
      '*::-webkit-scrollbar-thumb:active': {
        backgroundColor: dhiPalette.darkGrey.main,
        '-webkit-border-radius': '100px',
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: FONT_FAMILY,
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: dhiPalette.mediumGrey.light,
        height: '60px',
        borderBottom: '4px solid', // MEDIUMGREY
        borderColor: dhiPalette.mediumGrey.main,
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      // root: {
      //   height: '60px',
      //   minHeight: '0 !important',
      // }
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: 24,
        backgroundColor: dhiPalette.lightGrey.light,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        position: 'relative',
        padding: 'unset',
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: 0,
        marginBottom: 8,
      },
    },
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: {
        color: dhiPalette.text.primary,
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: 0,
        marginTop: 16,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
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
          height: '2.5rem', // 40px
        },
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
          backgroundColor: dhiPalette.primary.light,
          color: '#fff',
        },
      },
      containedSecondary: {
        '&:disabled': {
          backgroundColor: dhiPalette.secondary.light,
          color: '#fff',
        },
      },
      outlinedPrimary: {
        border: '2px solid',
        '&:hover': {
          border: '2px solid',
          borderColor: dhiPalette.primary.dark,
        },
        '&:disabled': {
          border: '2px solid',
          color: dhiPalette.primary.light,
          borderColor: dhiPalette.primary.light,
        },
      },
      outlinedSecondary: {
        border: '2px solid',
        '&:hover': {
          border: '2px solid',
          borderColor: dhiPalette.secondary.dark,
        },
        '&:disabled': {
          border: '2px solid',
          color: dhiPalette.secondary.light,
          borderColor: dhiPalette.secondary.light,
        },
      },
      textPrimary: {
        '&:disabled': {
          color: dhiPalette.primary.light,
        },
      },
      textSecondary: {
        '&:disabled': {
          color: dhiPalette.secondary.light,
        },
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: dhiPalette.error.main,
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      indeterminate: {
        color: dhiPalette.darkGrey.main,
        '&.Mui-checked': {
          color: dhiPalette.success.main,
        },
      },
      colorPrimary: {
        '&.Mui-checked': {
          color: dhiPalette.success.main,
        },
      },
      colorSecondary: {
        '&.Mui-checked': {
          color: dhiPalette.secondary.main,
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        boxSizing: 'content-box',
        '&.Mui-checked': {
          '& svg:nth-of-type(2)': {
            transform: 'scale(0.8)',
          },
        },
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        '&.Mui-disabled': {
          color: dhiPalette.mediumGrey.main,
        },
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        backgroundColor: dhiPalette.mediumGrey.main,
        color: dhiPalette.darkGrey.dark,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: dhiPalette.mediumGrey.dark,
        },
      },
      primary: {
        backgroundColor: dhiPalette.primary.main,
        color: dhiPalette.background.paper,
        '&:disabled': {
          backgroundColor: dhiPalette.primary.light,
          color: '#fff',
        },
        '&:hover': {
          backgroundColor: dhiPalette.primary.dark,
        },
      },
      secondary: {
        backgroundColor: dhiPalette.secondary.main,
        color: dhiPalette.background.paper,
        '&:disabled': {
          backgroundColor: dhiPalette.secondary.light,
          color: '#fff',
        },
        '&:hover': {
          backgroundColor: dhiPalette.secondary.dark,
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: dhiPalette.mediumGrey.main,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        '&.Mui-disabled': {
          color: dhiPalette.mediumGrey.dark,
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      input: {
        '&.Mui-disabled': {
          backgroundColor: dhiPalette.mediumGrey.light,
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        '&.Mui-disabled': {
          backgroundColor: dhiPalette.mediumGrey.light,
        },
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: { overflowX: 'auto' },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      body: {
        height: '44px',
        color: dhiPalette.primary.main,
        padding: '0',
        userSelect: 'none',
        width: '300px',
      },
      head: {
        padding: '0',
        height: '44px',
        backgroundColor: 'white',
        borderBottom: `2px solid ${dhiPalette.divider}`,
        userSelect: 'none',
        cursor: 'pointer ',
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:hover, &:focus': {
          backgroundColor: dhiPalette.lightGrey.main,
        },
      },
    },
  },
  MuiStepper: {
    styleOverrides: {
      root: {
        padding: '0.5rem', // 8px
      },
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: {
        borderColor: dhiPalette.text.secondary,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      scrollButtons: {
        //   [defaultTheme.breakpoints.up('xs')]: {
        //     minWidth: 0,
        //     width: 'auto',
        //     '&&& > *:first-child': {
        //       width: 40,
        //     },
        //   },
      },
    },
  },
  // MuiTab: {
  //   root: {
  //     textTransform: 'none',
  //     [defaultTheme.breakpoints.up('xs')]: {
  //       fontSize: '0.75rem', // 12px
  //       fontWeight: 'normal',
  //       paddingLeft: '0.75rem', // 12px
  //       paddingRight: '0.75rem',
  //       minWidth: '0',
  //     },
  //     '&:hover, &:focus': {
  //       color: mikePalette.primary.main,
  //     },
  //     '&$selected': {
  //       fontWeight: 'bold', // todo hevo: should we use theme.typography.fontWeight instead?
  //     },
  //   },
  //   selected: {},
  // },
  // MuiTooltip: {
  //   arrow: {
  //     color: mikePalette.primary.main,
  //   },
  //   popperArrow: {
  //     '&[x-placement*="bottom"] span[class*="MuiTooltip-arrow"]': {
  //       '&::before': {
  //         borderWidth: '0 12px 12px 12px',
  //         marginTop: '-7px',
  //         marginLeft: '-6px',
  //         color: mikePalette.darkGrey.main,
  //       },
  //       '&::after': {
  //         borderWidth: '0 11px 11px 11px',
  //         borderBottomColor: mikePalette.mediumGrey.main,
  //         borderLeftColor: 'transparent',
  //         borderRightColor: 'transparent',
  //         borderTopColor: 'transparent',
  //         borderStyle: 'solid',
  //         marginTop: '-29px',
  //         marginLeft: '-5px',
  //         color: 'transparent',
  //         backgroundColor: 'transparent',
  //         width: 0,
  //         content: 'open-quote',
  //         position: 'absolute',
  //         display: 'block',
  //       },
  //     },
  //   },
  //   tooltip: {
  //     backgroundColor: mikePalette.mediumGrey.main,
  //     border: `1px solid ${mikePalette.darkGrey.main}`,
  //     maxWidth: SPACING * 46, // 368px
  //     minHeight: SPACING * 4, // 32px
  //     fontSize: FONT_SIZE,
  //     fontWeight: 'normal',
  //     fontFamily: FONT_FAMILY,
  //     padding: SPACING,
  //     color: mikePalette.primary.main,
  //     boxSizing: 'border-box',
  //   },
  // },

  // MuiStepIcon: {
  //   root: {
  //     fill: mikePalette.background.paper,
  //     color: mikePalette.text.secondary,
  //     border: 'solid',
  //     borderColor: mikePalette.text.secondary,
  //     borderRadius: 25,
  //     borderWidth: 1,
  //     '&$active': {
  //       border: 'none',
  //       fill: mikePalette.secondary.main,
  //       '& $text': {
  //         fill: mikePalette.secondary.contrastText,
  //       },
  //     },
  //     '&$completed': {
  //       border: 'none',
  //       fill: mikePalette.secondary.main,
  //     },
  //   },
  //   text: {
  //     fill: mikePalette.text.secondary,
  //     fontSize: '1rem', // 16px
  //   },
  // },

  // MuiSwitch: {
  //   root: {
  //     width: 46,
  //     height: 22,
  //     padding: 0,
  //     display: 'flex',
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     overflow: 'inherit',
  //     float: 'right',
  //   },
  //   sizeSmall: {
  //     '& $colorPrimary': {
  //       color: `${mikePalette.primary.main}`,
  //       '&$disabled': {
  //         color: `${mikePalette.mediumGrey.main}`,
  //         '& + $track': {
  //           borderColor: `${mikePalette.darkGrey.dark}`,
  //           backgroundColor: `${mikePalette.darkGrey.light}`,
  //         },
  //         '&$checked': {
  //           '& + $track': {
  //             borderColor: `${mikePalette.darkGrey.light}`,
  //             backgroundColor: `${mikePalette.darkGrey.light}`,
  //           },
  //         },
  //       },
  //     },
  //     '& $switchBase': {
  //       transform: 'translateX(-2px)',
  //       '&$checked': {
  //         transform: 'translateX(18px)',
  //       },
  //     },
  //   },
  //   switchBase: {
  //     padding: 0,
  //     height: '100%',
  //     color: `${mikePalette.darkGrey.main}`,
  //     transform: 'translateX(5.6px)',
  //     '&:hover': {
  //       backgroundColor: 'transparent',
  //     },
  //     '&$checked': {
  //       transform: 'translateX(29px)',
  //       color: `${mikePalette.success.dark}`,
  //       height: '100%',
  //       '& + $track': {
  //         opacity: 1,
  //         backgroundColor: `${mikePalette.success.light}`,
  //         borderColor: `${mikePalette.success.light}`,
  //       },
  //       '&:hover': {
  //         backgroundColor: 'transparent',
  //       },
  //     },
  //   },
  //   colorPrimary: {
  //     color: `${mikePalette.primary.main}`,
  //     '& + $track': {
  //       backgroundColor: `${mikePalette.lightGrey.dark}`,
  //       borderColor: `${mikePalette.primary.main}`,
  //     },
  //     '&$checked': {
  //       color: `${mikePalette.lightGrey.dark}`,
  //       '& + $track': {
  //         backgroundColor: `${mikePalette.primary.main}`,
  //         borderColor: `${mikePalette.primary.main}`,
  //       },
  //     },
  //     '&$disabled': {
  //       color: `${mikePalette.mediumGrey.main}`,
  //       '& + $track': {
  //         borderColor: `${mikePalette.darkGrey.dark}`,
  //         backgroundColor: `${mikePalette.darkGrey.light}`,
  //       },
  //     },
  //   },
  //   colorSecondary: {
  //     color: `${mikePalette.darkGrey.main}`,
  //     '&$checked': {
  //       color: `${mikePalette.success.dark}`,
  //       '& + $track': {
  //         backgroundColor: `${mikePalette.success.light}`,
  //         borderColor: `${mikePalette.success.light}`,
  //       },
  //     },
  //     '&$disabled': {
  //       color: `${mikePalette.mediumGrey.main}`,
  //       '& + $track': {
  //         borderColor: `${mikePalette.darkGrey.dark}`,
  //         backgroundColor: `${mikePalette.darkGrey.light}`,
  //       },
  //     },
  //   },
  //   input: {
  //     left: '-50%',
  //     '&:checked': {
  //       left: '-150%',
  //     },
  //   },
  //   thumb: {
  //     width: 12.5,
  //     height: 12.5,
  //     boxShadow: 'none',
  //   },
  //   track: {
  //     border: `3px solid ${mikePalette.darkGrey.main}`,
  //     borderRadius: 16,
  //     opacity: 1,
  //     backgroundColor: mikePalette.lightGrey.main,
  //   },
  // },
};

export default mikeOverrides;
