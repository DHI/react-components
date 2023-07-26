import { makeStyles, Theme } from '@material-ui/core/styles';

export const JobDetailStyles = makeStyles((theme: Theme) => ({
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
  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    textAlign: 'center',
    width: '100%',
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

export const JobPanelStyles = (loadingDetail) =>
  makeStyles(() => ({
    wrapper: {
      display: 'flex',
      position: 'relative',
      overflow: loadingDetail ? 'hidden' : 'visible',
    },
    loadJobDetail: {
      display: 'flex',
      position: 'absolute',
      zIndex: 1200,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    jobPanel: {
      zIndex: 999,
      padding: '1rem 2rem',
      background: '#FFF',
      top: 0,
      bottom: 0,
      right: 0,
      width: '50%',
      transition: 'all, .5s',
      position: loadingDetail ? 'absolute' : 'fixed',
      transform: loadingDetail ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
      boxShadow: loadingDetail ? '-20px 0px 19px -12px rgba(0,0,0,0.3)' : 'none',
      visibility: loadingDetail ? 'visible' : 'hidden',
    },
  }));
