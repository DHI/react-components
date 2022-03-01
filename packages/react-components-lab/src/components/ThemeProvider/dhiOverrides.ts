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
const SPACING = 8;
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
        WebkitBorderRadius: '100px',
      },
      '*::-webkit-scrollbar-thumb:active': {
        backgroundColor: dhiPalette.darkGrey.main,
        WebkitBorderRadius: '100px',
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
      // not sure if this is really desireable
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
  MuiStepIcon: {
    styleOverrides: {
      root: {
        fill: dhiPalette.background.paper,
        color: dhiPalette.text.secondary,
        border: 'solid',
        borderColor: dhiPalette.text.secondary,
        borderRadius: 25,
        borderWidth: 1,
        '&.Mui-active': {
          border: 'none',
          fill: dhiPalette.secondary.main,
          '& .MuiStepIcon-text': {
            fill: `${dhiPalette.background.paper}`,
          },
        },
        '&.Mui-completed': {
          border: 'none',
          fill: dhiPalette.secondary.main,
        },
      },
      text: {
        fill: dhiPalette.text.secondary,
        fontSize: 15, // for vertical alignment
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      arrow: {
        color: dhiPalette.primary.main,
      },
      popperArrow: {
        '& .MuiTooltip-tooltipPlacementBottom .MuiTooltip-arrow': {
          // // this seems to break the component, not sure why it was here.
          // '&::before': {
          //   borderWidth: '0 12px 12px 12px',
          //   marginTop: '-7px',
          //   marginLeft: '-6px',
          //   color: dhiPalette.darkGrey.main,
          // },
          // '&::after': {
          //   borderWidth: '0 11px 11px 11px',
          //   borderBottomColor: dhiPalette.mediumGrey.main,
          //   borderLeftColor: 'transparent',
          //   borderRightColor: 'transparent',
          //   borderTopColor: 'transparent',
          //   borderStyle: 'solid',
          //   marginTop: '-29px',
          //   marginLeft: '-5px',
          //   color: 'transparent',
          //   backgroundColor: 'transparent',
          //   width: 0,
          //   content: 'open-quote',
          //   position: 'absolute',
          //   display: 'block',
          // },
        },
      },
      tooltip: {
        backgroundColor: dhiPalette.mediumGrey.main,
        border: `1px solid ${dhiPalette.darkGrey.main}`,
        maxWidth: SPACING * 46, // 368px
        minHeight: SPACING * 4, // 32px
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: FONT_FAMILY,
        padding: SPACING,
        color: dhiPalette.primary.main,
        boxSizing: 'border-box',
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 46,
        height: 22,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'inherit',
        float: 'right',
        '&.MuiSwitch-sizeSmall': {
          width: 40,
          height: 24,
          padding: 7,
          '& .MuiSwitch-colorPrimary': {
            '&.Mui-disabled': {
              color: dhiPalette.mediumGrey.main,
              '& + .MuiSwitch-track': {
                borderColor: dhiPalette.darkGrey.dark,
                backgroundColor: dhiPalette.darkGrey.light,
              },
              '&.Mui-checked': {
                '& + .MuiSwitch-track': {
                  borderColor: dhiPalette.darkGrey.light,
                  backgroundColor: dhiPalette.darkGrey.light,
                },
              },
            },
          },
          '& .MuiSwitch-colorSecondary': {
            '&.Mui-checked': {
              '& .MuiSwitch-thumb': {
                backgroundColor: dhiPalette.secondary.main,
              },
            },
          },
          '& .MuiSwitch-switchBase': {
            transform: 'translateX(-2px)',
            '&.Mui-checked': {
              transform: 'translateX(18px)',
            },
          },
        },
      },
      switchBase: {
        padding: 0,
        height: '100%',
        color: dhiPalette.darkGrey.main,
        transform: 'translateX(5.6px)',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&.Mui-checked': {
          transform: 'translateX(29px)',
          color: dhiPalette.success.dark,
          height: '100%',
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: dhiPalette.success.light,
            borderColor: dhiPalette.success.light,
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      colorSecondary: {
        color: dhiPalette.primary.main,
        '& + .MuiSwitch-track': {
          backgroundColor: dhiPalette.lightGrey.dark,
          borderColor: dhiPalette.primary.main,
        },
        '&.Mui-checked': {
          color: dhiPalette.lightGrey.dark,
          '& + .MuiSwitch-track': {
            backgroundColor: dhiPalette.primary.main,
            borderColor: dhiPalette.primary.main,
          },
        },
        '&.Mui-disabled': {
          color: dhiPalette.mediumGrey.main,
          '& + .MuiSwitch-track': {
            borderColor: dhiPalette.darkGrey.dark,
            backgroundColor: dhiPalette.darkGrey.light,
          },
        },
      },
      colorPrimary: {
        color: dhiPalette.darkGrey.main,
        '&.Mui-checked': {
          color: dhiPalette.success.dark,
          '& + .MuiSwitch-track': {
            backgroundColor: dhiPalette.success.light,
            borderColor: dhiPalette.success.light,
          },
        },
        '&.Mui-disabled': {
          color: dhiPalette.mediumGrey.main,
          '& + .MuiSwitch-track': {
            borderColor: dhiPalette.darkGrey.dark,
            backgroundColor: dhiPalette.darkGrey.light,
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
        border: `3px solid ${dhiPalette.darkGrey.main}`,
        borderRadius: 16,
        opacity: 1,
        backgroundColor: dhiPalette.lightGrey.main,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontSize: '0.75rem', // 12px
        fontWeight: 'normal',
        paddingLeft: '0.75rem', // 12px
        paddingRight: '0.75rem',
        minWidth: '0',
        '&:hover, &:focus': {
          color: dhiPalette.primary.main,
        },
        '&.Mui-selected': {
          fontWeight: 'bold', // todo hevo: should we use theme.typography.fontWeight instead?
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      scrollButtons: {
        minWidth: 0,
        width: 'auto',
        '& svg': {
          width: 40,
        },
      },
    },
  },
};

export default mikeOverrides;
