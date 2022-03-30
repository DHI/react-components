import { makeStyles } from '@material-ui/core';
import { IMikeTheme } from '../ThemeProvider/types';

export default makeStyles<IMikeTheme>((theme) => ({
  root: {
    boxShadow: theme.shadows[5],
    position: 'absolute',
    margin: theme.spacing(5),
    maxWidth: 240, // max according to specs
    transition: theme.transitions.create(['box-shadow']),
  },
  rootCollapsed: {
    boxShadow: 'unset',
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 75,
  },
  buttonBase: {
    width: '100%',
    height: theme.spacing(5),
    display: 'flex',
    gap: theme.spacing(1),
    justifyContent: 'flex-end',
    '&.MuiButtonBase-root': {
      background: theme.palette.background.default,
      padding: theme.spacing(1),
    },
  },
  contentBox: {
    margin: theme.spacing(1),
  },
  legendBox: {
    background: theme.palette.lightGrey.main,
  },
  colorBox: {
    width: 22,
    height: 22,
    marginLeft: theme.spacing(1),
  },
  icon: {
    width: 24,
    height: 24,
    transition: theme.transitions.create(['transform']),
  },
  iconRotated: {
    transform: 'rotate(180deg)',
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
}));
