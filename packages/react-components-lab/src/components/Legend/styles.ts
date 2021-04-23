import { makeStyles } from '@material-ui/core/styles';

const LegendStyles = makeStyles(() => ({
  wrapper: {
    color: '#555',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: 'fit-content',
  },
  legendHeader: {
    fontWeight: 600,
    display: 'flex',
    color: '#0B4566',
    justifyContent: 'flex-end',
    fontSize: 12,
    padding: 5,
  },
  tick: {
    fontSize: 14,
    opacity: 1,
    color: '#0B4566',
    marginRight: 10,
  },
  color: {
    width: 22,
    height: 20,
  },
  colorTickWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'auto',
    height: 30,
  },
}));

export default LegendStyles;
