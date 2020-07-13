import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

const styles = () => ({
  table: {
    minWidth: 650,
    height: 400,
  },
});
const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
