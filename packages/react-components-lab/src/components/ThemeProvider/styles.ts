import makeStyles from '@mui/styles/makeStyles';

// #region Local imports
import dhiPalette from './dhiPallete';
// #endregion

const Styles = makeStyles((theme) => ({
  root: {
    marginLeft: '2em',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  mainContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    width: 'calc(100% - 230px)',
    paddingTop: 20,
    paddingBottom: 15,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  content: {
    flexBasis: 0,
    flexGrow: 300,
    minWidth: '40%',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
  highlightText: {
    backgroundColor: dhiPalette.primary.light,
    borderRadius: 5,
    padding: '2px 4px 2px 4px',
  },
  codeContainer: {
    borderRadius: 5,
    backgroundColor: '#000',
  },
}));

export default Styles;

// const muiRadioStyles = {
//   background: 'transparent',
//   height: '20px',
//   width: '20px',
//   margin: '-4px 0px',
//   '& svg:nth-of-type(1)': {
//     transform: 'scale(0.9)',
//   },
//   '& svg:nth-of-type(1) > path': {
//     fill: mikePalette.darkGrey.main,
//   },
//   '&$disabled': {
//     '& svg:nth-of-type(1) > path': {
//       fill: mikePalette.darkGrey.light,
//     },
//   },
//   /*  JSS `:after` won't apply to target unless there is a valid value for content: */
//   '&:after': {
//     content: 'open-quote',
//     color: mikePalette.mediumGrey.light,
//     background: mikePalette.mediumGrey.light,
//     display: 'block',
//     height: '20px',
//     width: '20px',
//     marginLeft: '-20px',
//     borderRadius: '10px',
//   },
// };

// export default muiRadioStyles;
