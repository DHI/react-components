import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    cursor: 's-resize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  collapsedRoot: {
    cursor: 'pointer',
  },
  icon: {
    color: theme.palette.primary.main,
    transform: 'translate(0, -5px)',
    width: 18,
  },
  iconBox: {
    zIndex: 10,
    padding: theme.spacing(2, 2, 0.2, 2),
    width: 20,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: '#85A2B3',
    position: 'relative',
    borderRadius: '20px 20px 0 0',
  },
  sizeSmall: {
    width: 20,
    height: 16,
    padding: theme.spacing(1, 1, 0.1, 1),
  },
  iconSmall: {
    transform: 'translate(0, -3px)',
  },
  sizeLarge: {
    width: 20,
    height: 34,
    padding: theme.spacing(3, 3, 0.3, 3),
  },
  iconLarge: {
    transform: 'translate(0, -8px)',
  },
}));
