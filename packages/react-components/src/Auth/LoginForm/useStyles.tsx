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
  rememberMe: { float: 'left', marginTop: 12 },
  rememberMeLink: { marginRight: 15 },
  submit: {
    float: 'right',
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginRight: 15,
  },
  shrink: {
    backgroundColor: '#FFF',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
