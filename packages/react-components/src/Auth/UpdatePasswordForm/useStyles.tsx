import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

const styles = () => ({
  resetBox: {
    display: 'flex',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  messages: {
    flex: 1,
    marginTop: 15,
  },
  labels: { 'fontSize': 14, '& label': { fontSize: 14 } },
});

const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
