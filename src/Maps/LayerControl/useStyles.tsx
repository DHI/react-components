import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

const styles = () => ({
  root: {
    paddingLeft: '25px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    paddingLeft: '28px',
  },
  slider: {
    padding: '22px 0px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
  },
});

const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
