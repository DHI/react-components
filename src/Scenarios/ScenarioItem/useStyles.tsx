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
    fontSize: '18px',
    color: 'gray',
  },
  hourText: {
    fontSize: '15px',
    color: 'gray',
  },
  scenarioHour: {
    padding: '10px',
  },
  scenarioTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  scenarioProgress: {
    fontSize: '10px',
    color: 'gray',
  },
  scenarioDetails: {
    padding: '10px',
    width: '100%',
    display: 'grid',
  },
  textFields: {
    padding: '3px',
    fontSize: '12px',
    color: 'gray',
  },
  status: {
    display: 'contents',
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
