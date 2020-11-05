import { makeStyles, Theme } from '@material-ui/core/styles';

export const jobListTableStyles = (loadingDetail, tableBodyResponsive) =>
  makeStyles((theme: Theme) => ({
    td: {
      flexGrow: '1 !important' as any,
      flexBasis: '5px !important' as any,
      width: 'unset !important' as any,
      maxWidth: 'none !important' as any,
    },

    row: {
      'flexGrow': '1 !important' as any,
      'flexBasis': '5px !important' as any,
      'width': tableBodyResponsive ? 'auto' : ('unset !important' as any),
      'maxWidth': 'none !important' as any,
      '&.Mui-selected': {
        'backgroundColor': theme.palette.action.selected,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
    tdStatus: {
      marginLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
    tdContent: {
      marginLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
    jobDetail: {
      padding: '1rem 2rem',
      position: 'absolute',
      background: '#FFF',
      top: 0,
      bottom: 0,
      right: 0,
      width: '50%',
      transition: 'all, .5s',
      transform: loadingDetail ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
      boxShadow: loadingDetail ? '-20px 0px 19px -12px rgba(0,0,0,0.3)' : 'none',
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
  }));


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
    height: 'calc(100% - 140px)',
    marginTop: theme.spacing(2),
  },
}));