import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';
import mikeColors from '../../ThemeProvider/mikeColors';

const styles = () => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    marginTop: '30px',
  },
  listBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  dateBlock: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  dateArea: {
    'display': 'flex',
    'backgroundColor': mikeColors.MEDIUMGREY_LIGHT,
    'color': mikeColors.BRANDBLUE_DEFAULT,
    'padding': '5px 10px',
    'fontFamily': ['Source Sans Pro', 'sans-serif'],
    'fontSize': 16,
    'lineHeight': 1.6,
    '& span': {
      fontWeight: 'normal',
    },
  },
  textFields: {
    fontSize: '12px',
    color: 'gray',
  },
  divider: {
    marginLeft: '30px',
  },
  listItem: {
    'display': 'flex',
    'flex': 1,
    'flexDirection': 'column',
    'borderBottom': '1px solid #c3c3c3',
    '&:hover': {
      cursor: 'pointer',
      background: '#ebebeb',
    },
  },
  selectedItem: {
    background: '#e8e8e8',
  },
});
const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
