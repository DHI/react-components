import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

const styles = () => ({
  table: {
    height: 350,
  },
});
const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
