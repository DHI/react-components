import { makeStyles, Theme } from '@material-ui/core/styles';
import DHITheme from '../../theme';

export const TimeseriesStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    width: '100%',
  },
  paper: {
    display: 'flex',
    padding: '16px 0',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    justifyContent: 'space-evenly',
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },

  sidebar: {
    'overflow': 'auto',

    '& p': {
      whiteSpace: 'nowrap',
    },
  },
  skeleton: {
    backgroundColor: DHITheme.palette.secondary.main,
    opacity: 0.2,
  },
  typography: {
    textAlign: 'center',
  },
}));
