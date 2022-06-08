import { makeStyles } from '@material-ui/core/styles';
import { IMikeTheme } from '../components/ThemeProvider/types';

export default makeStyles<IMikeTheme>((theme) => ({
  root: {
    backgroundColor: theme.palette.mediumGrey.main,
  },
  iconWrapper: {
    backgroundColor: theme.palette.lightGrey.light,
    borderRadius: 4,
    cursor: 'pointer',
    transition: theme.transitions[1],
    flexGrow: 1,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
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
