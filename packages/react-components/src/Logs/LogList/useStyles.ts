import { makeStyles, Theme } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

const styles = (theme: Theme) => ({
  table: {
    height: 350,
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    // overflow: loadingDetail ? 'hidden' : 'visible',
  },
});
const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
