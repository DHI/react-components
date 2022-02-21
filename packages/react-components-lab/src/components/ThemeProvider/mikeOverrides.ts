import { createTheme, Components } from '@mui/material/styles';

// #region Local imports
import { MIKE_COLORS } from './mikeColors';
import { SPACING, FONT_SIZE, FONT_FAMILY } from './types';
import mikePalette from './dhiPallete';
// #endregion

// const defaultTheme = createTheme();

const mikeOverrides: Components = {
  // MuiCssBaseline: {
  //   '@global': {
  //     '*::-webkit-scrollbar': {
  //       width: '8px',
  //       height: '8px',
  //       backgroundColor: MIKE_COLORS.MEDIUMGREY_DEFAULT,
  //       borderRadius: '100px',
  //     },
  //     '*::-webkit-scrollbar:hover': {
  //       backgroundColor: 'rgba(0, 0, 0, 0.2)',
  //     },
  //     '*::-webkit-scrollbar-thumb': {
  //       background: MIKE_COLORS.DARKGREY_DEFAULT,
  //       '-webkit-border-radius': '100px',
  //     },
  //     '*::-webkit-scrollbar-thumb:active': {
  //       background: MIKE_COLORS.DARKGREY_DEFAULT,
  //       '-webkit-border-radius': '100px',
  //     },
  //   },
  // },
  // MuiAppBar: {
  //   colorPrimary: {
  //     backgroundColor: MIKE_COLORS.MEDIUMGREY_LIGHT,
  //     height: '60px',
  //     borderBottom: '4px solid #DBE4E9', // MEDIUMGREY
  //   },
  // },
  // MuiToolbar: {
  //   root: {
  //     height: '60px',
  //     minHeight: '0 !important',
  //   },
  // },
  // MuiDialog: {},
  // MuiDialogTitle: {
  //   root: {
  //     padding: '0 !important',
  //   },
  // },
  // MuiDialogContent: {
  //   root: {
  //     position: 'relative',
  //     padding: '0 !important',
  //     backgroundColor: MIKE_COLORS.XLIGHTGREY,
  //     '&::before': {
  //       content: '""',
  //       display: 'block',
  //       position: 'absolute',
  //       top: 0,
  //       left: 0,
  //       right: 0,
  //       width: '100%',
  //       height: 1,
  //       boxShadow: '0 0 10px #000000',
  //     },
  //     '&::after': {
  //       content: '""',
  //       display: 'block',
  //       position: 'absolute',
  //       bottom: 0,
  //       left: 0,
  //       right: 0,
  //       width: '100%',
  //       height: 1,
  //       boxShadow: '0 0 10px #000000',
  //     },
  //   },
  // },
  // MuiDialogActions: {
  //   root: {
  //     padding: '0 !important',
  //   },
  // },
  // MuiDialogContentText: {
  //   root: {
  //     color: mikePalette.text.primary,
  //   },
  // },
  // MuiButton: {
  //   root: {
  //     fontWeight: 500,
  //     letterSpacing: 0.1,
  //     textTransform: 'none',
  //     height: '3rem', // 48px
  //     '&:disabled': {
  //       height: '3rem', // 48px
  //     },
  //   },
  //   sizeLarge: {
  //     minWidth: 328,
  //   },
  //   sizeSmall: {
  //     height: '2.5rem', // 40px
  //     '&:disabled': {
  //       height: '2.5rem', // 48px
  //     },
  //     minWidth: 0,
  //     padding: '0 1rem', // 16px
  //   },
  //   outlined: {
  //     minWidth: 156,
  //     border: '2px solid',
  //   },
  //   contained: {
  //     minWidth: 156,
  //   },
  //   containedPrimary: {
  //     '&:disabled': {
  //       backgroundColor: mikePalette.primary.light,
  //       color: '#fff',
  //     },
  //   },
  //   containedSecondary: {
  //     '&:disabled': {
  //       backgroundColor: mikePalette.secondary.light,
  //       color: '#fff',
  //     },
  //   },
  //   outlinedPrimary: {
  //     border: '2px solid',
  //     '&:hover': {
  //       border: '2px solid',
  //       borderColor: mikePalette.primary.dark,
  //     },
  //     '&:disabled': {
  //       border: '2px solid',
  //       color: mikePalette.primary.light,
  //       borderColor: mikePalette.primary.light,
  //     },
  //   },
  //   outlinedSecondary: {
  //     border: '2px solid',
  //     '&:hover': {
  //       border: '2px solid',
  //       borderColor: mikePalette.secondary.dark,
  //     },
  //     '&:disabled': {
  //       border: '2px solid',
  //       color: mikePalette.secondary.light,
  //       borderColor: mikePalette.secondary.light,
  //     },
  //   },
  //   textPrimary: {
  //     '&:disabled': {
  //       color: mikePalette.primary.light,
  //     },
  //   },
  //   textSecondary: {
  //     '&:disabled': {
  //       color: mikePalette.secondary.light,
  //     },
  //   },
  // },
  // MuiBadge: {
  //   colorPrimary: {
  //     backgroundColor: mikePalette.error.main,
  //   },
  // },
  // MuiBreadcrumbs: {},
  // MuiCheckbox: {
  //   indeterminate: {
  //     color: MIKE_COLORS.GREEN_DEFAULT,
  //   },
  //   colorSecondary: {
  //     '&$checked': {
  //       color: MIKE_COLORS.GREEN_DEFAULT,
  //     },
  //   },
  // },
  // MuiRadio: {
  //   root: {
  //     boxSizing: 'content-box',
  //   },
  //   colorPrimary: {
  //     // ==...muiRadioStyles,
  //     color: mikePalette.primary.main,
  //     '&$checked': {
  //       '& svg:nth-of-type(2)': {
  //         transform: 'scale(0.8)',
  //         fill: mikePalette.primary.main,
  //       },
  //     },
  //   },
  //   colorSecondary: {
  //     // ==...muiRadioStyles,
  //     color: mikePalette.ultimate.main,
  //     '&$checked': {
  //       '& svg:nth-of-type(2)': {
  //         transform: 'scale(0.8)',
  //         fill: mikePalette.ultimate.main,
  //       },
  //     },
  //   },
  // },
  // MuiFormControlLabel: {
  //   root: {
  //     '& .MuiTypography-root, .MuiTypography-root.Mui-disabled': {
  //       fontSize: '90%',
  //       color: mikePalette.darkGrey.main,
  //     },
  //   },
  // },
  // MuiFab: {
  //   primary: {
  //     '&:disabled': {
  //       backgroundColor: mikePalette.primary.light,
  //       color: '#fff',
  //     },
  //     '&:hover': {
  //       backgroundColor: mikePalette.primary.dark,
  //     },
  //   },
  //   secondary: {
  //     '&:disabled': {
  //       backgroundColor: mikePalette.secondary.light,
  //       color: '#fff',
  //     },
  //     '&:hover': {
  //       backgroundColor: mikePalette.secondary.dark,
  //     },
  //   },
  // },
  // MuiIconButton: {
  //   root: {
  //     '&:hover': {
  //       backgroundColor: MIKE_COLORS.MEDIUMGREY_DEFAULT,
  //     },
  //   },
  // },
  // MuiInputBase: {
  //   input: {
  //     '&$disabled': {
  //       color: MIKE_COLORS.MEDIUMGREY_DARK,
  //     },
  //   },
  // },
  // MuiFilledInput: {
  //   input: {
  //     '&$disabled': {
  //       backgroundColor: MIKE_COLORS.MEDIUMGREY_LIGHT,
  //     },
  //   },
  // },
  // MuiOutlinedInput: {
  //   input: {
  //     '&$disabled': {
  //       backgroundColor: MIKE_COLORS.MEDIUMGREY_LIGHT,
  //     },
  //   },
  // },
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
  // MuiTabs: {
  //   scrollButtons: {
  //     [defaultTheme.breakpoints.up('xs')]: {
  //       minWidth: 0,
  //       width: 'auto',
  //       '&&& > *:first-child': {
  //         width: 40,
  //       },
  //     },
  //   },
  // },
  // MuiTable: {
  //   root: { overflowX: 'auto' },
  // },
  // MuiTableCell: {
  //   body: {
  //     height: '44px',
  //     color: mikePalette.primary.main,
  //     padding: '0',
  //     userSelect: 'none',
  //     width: '300px',
  //   },
  //   head: {
  //     padding: '0',
  //     height: '44px',
  //     backgroundColor: 'white',
  //     borderBottom: `2px solid ${mikePalette.divider}`,
  //     userSelect: 'none',
  //     cursor: 'pointer ',
  //   },
  // },
  // MuiTableRow: {
  //   root: {
  //     '&:hover, &:focus': {
  //       backgroundColor: mikePalette.lightGrey.main,
  //     },
  //   },
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
  // MuiStepConnector: {
  //   line: {
  //     borderColor: mikePalette.text.secondary,
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
  // MuiStepper: {
  //   root: {
  //     padding: '0.5rem', // 8px
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
