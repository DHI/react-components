import { makeStyles } from '@material-ui/core/styles';
import { IMikeTheme } from '../components/ThemeProvider/types';

export default makeStyles<IMikeTheme>((theme) => ({
  root: {
    backgroundColor: theme.palette.mediumGrey.main,
  },
  iconWrapper: {
    backgroundColor: theme.palette.lightGrey.light,
    cursor: 'pointer',
    transition: theme.transitions[1],
    flexGrow: 1,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconText: {
    fontSize: 10,
    textAlign: 'center',
  },
}));
