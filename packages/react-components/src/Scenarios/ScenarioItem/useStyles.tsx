import { makeStyles } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/styles/withStyles';

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
    padding: '0 10px 15px',
  },
  scenarioHour: {
    padding: '10px',
    fontSize: 14,
    color: '#0B4566',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scenarioTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#0B4566',
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
    color: '#86A2B3',
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    padding: '0 10px',
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
