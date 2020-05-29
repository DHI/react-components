import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

const styles = () => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    marginTop: '30px',
  },
  dateBlock: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  dateArea: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    marginTop: '-25px',
    marginBottom: '-37px',
    fontFamily: ['Source Sans Pro', 'sans-serif'],
    fontSize: '16px',
    lineHeight: 1.6,
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: '15px',
    color: 'gray',
  },
  textFields: {
    fontSize: '12px',
    color: 'gray',
  },
  divider: {
    marginLeft: '30px',
    borderTop: '1px solid #c9c9c9',
  },
  listItem: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginLeft: '30px',
    '&:hover': {
      cursor: 'pointer',
      background: '#ebebeb',
    },
  },
  selectedItem: {
    background: '#e8e8e8',
  },
});
const useStyles = makeStyles(
  styles as any,
  { withTheme: true } as WithStylesOptions<{}>
);
export default useStyles;
