import { makeStyles } from '@material-ui/core/styles';
import { IMikeTheme } from '../ThemeProvider/types';

export default makeStyles<IMikeTheme>((theme) => ({
  root: {
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 15,
    position: 'relative',
  },
  isClickable: {
    cursor: 'pointer',
  },
  disabled: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    borderRadius: 4,
    backgroundColor: theme.palette.lightGrey?.main,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 12,
    color: 'grey',
  },
  checkIcon: {
    width: 26,
    height: 26,
    color: theme.palette.primary.dark,
  },
  checkIconActive: {
    color: '#61C051',
  },
  image: {
    width: '90%',
    height: 'auto',
  },
}));
