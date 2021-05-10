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
    border: `2px solid ${theme.palette.darkGrey.light}`,
    borderRadius: 6,
  },
}));

export default SnackbarStyles;
