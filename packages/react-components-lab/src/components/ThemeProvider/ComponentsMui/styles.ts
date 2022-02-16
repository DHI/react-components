import makeStyles from '@mui/styles/makeStyles';

// #region Local imports
import { IMikeTheme } from '../types';
import mikePalette from '../mikePallete';
// #endregion

const SnackbarStyles = makeStyles<IMikeTheme>((theme) => ({
  container: {
    margintop: 50,
  },
  desc: {
    margin: '20px 0 10px 0',
  },
  subtitle: {
    margin: '30px 0 10px 0',
  },
  subDesc: {
    margin: '20px 0 10px 0',
  },
  highlightText: {
    backgroundColor: mikePalette.primary.light,
    borderRadius: 5,
    padding: '2px 4px 2px 4px',
  },
  exampleWrapper: {
    border: `2px solid ${theme.palette.darkGrey.light}`,
    borderRadius: '0.3em',
    minHeight: 100,
    margin: 8,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  colorBox: {
    height: 100,
    width: 150,
  },
}));

export default SnackbarStyles;
