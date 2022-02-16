import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(() => ({
  blocking: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    height: '100vh',
    zIndex: 2000,
    backgroundColor: 'rgba(13,57,88,0.9)',
    color: '#ffffff',
  },
  topbar: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    height: '4px',
    zIndex: 2000,
    color: 'white',
  },
}));
