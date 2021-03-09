import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

const styles = () => ({
  divStyle: {
    float: 'right',
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
  },
  labels: { 'fontSize': 14, '& label': { fontSize: 14 } },
  backButton: { marginTop: 5, marginRight: 15 },
});

const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
