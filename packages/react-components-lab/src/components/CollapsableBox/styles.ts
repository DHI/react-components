import makeStyles from '@mui/styles/makeStyles';

export default makeStyles({
  collapsable: {
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
    width: '100%',
    bottom: 0,
    background:
      'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
  },
  collapsedOverlay: {
    height: 50,
    opacity: 1,
  },
  icon: {
    transform: 'rotateX(180deg)',
  },
  button: {
    height: 'unset',
    padding: 'unset',
  },
});
