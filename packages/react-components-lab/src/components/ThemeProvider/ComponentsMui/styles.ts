import { makeStyles } from '@material-ui/core/styles';
import { IMikeTheme } from '../types';

const SnackbarStyles = makeStyles<IMikeTheme>((theme) => ({
  container: {
    margintop: 50,
  },
  desc: {
    margin: '20px 0 10px 0',
  },
  exampleWrapper: {
    // width: '100%',
    border: `2px solid ${theme.palette.darkGrey.light}`,
    borderRadius: '0.3em',
    minHeight: 100,
    margin: 8,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default SnackbarStyles;
