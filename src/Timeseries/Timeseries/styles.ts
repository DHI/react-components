import { makeStyles, Theme } from '@material-ui/core/styles';

export const TimeseriesStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
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
  item: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.typography.fontFamily,
    fontSize: 12,
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    position: 'absolute',
    right: '0',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    minHeight: 400,
    overflow: 'scroll',
    whiteSpace: 'nowrap',
    height: 'calc(100% - 180px)',
    marginTop: theme.spacing(2),
  },
}));
