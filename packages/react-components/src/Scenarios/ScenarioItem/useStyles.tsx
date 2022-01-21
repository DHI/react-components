import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';
import mikeColors from '../../ThemeProvider/mikeColors';

const styles = () => ({
  scenario: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    direction: 'ltr',
    justify: 'flex-start',
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
  },
  hourText: {
    fontSize: 15,
    padding: '0 15px',
  },
  scenarioHour: {
    padding: '10px',
    fontSize: 14,
    color: mikeColors.BRANDBLUE_DEFAULT,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scenarioTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: mikeColors.BRANDBLUE_DEFAULT,
  },
  scenarioProgress: {
    fontSize: 10,
    color: 'gray',
  },
  scenarioDetails: {
    padding: '10px',
    width: '100%',
    display: 'grid',
  },
  buttonLabel: {
    textTransform: 'capitalize',
  },
  textFields: {
    fontSize: 14,
    color: mikeColors.DARKGREY_DARK,
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    padding: '5px 0px',
    justifyContent: 'space-between',
  },
  icon: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    '& span': {
      fontSize: 10,
    },
  },
  verticalLine: {
    marginLeft: '8px',
    borderLeft: '1px solid #c9c9c9',
    alignSelf: 'stretch',
    height: 'auto',
  },
  scenarioStatus: {
    paddingTop: 5,
    width: 50,
    textAlign: 'center',
    display: 'grid',
    marginLeft: -15,
  },
});
const useStyles = makeStyles(styles as any, { withTheme: true } as WithStylesOptions<{}>);

export default useStyles;
