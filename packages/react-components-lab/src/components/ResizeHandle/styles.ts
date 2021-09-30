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
    transform: 'translate(0, -2px)',
  },
  iconBox: {
    zIndex: 10,
    padding: theme.spacing(1, 1, 0.1, 1),
    width: 20,
    height: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: '#85A2B3',
    position: 'relative',
    borderRadius: '20px 20px 0 0',
  },
}));
