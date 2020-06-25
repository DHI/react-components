import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

const styles = () => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  labels: { 'fontSize': 14, '& label': { fontSize: 14 } },
  rememberMe: { float: 'left', marginTop: 15 },
  rememberMeLink: { marginTop: 6, marginRight: 15 },
  submit: {
    float: 'right',
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
  },
});

const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
