import { makeStyles, Theme } from '@material-ui/core/styles';

export const JobPanelStyles = (loadingDetail) => makeStyles((theme: Theme) => ({
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
}));