import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 15,
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 12,
    color: 'grey',
  },
  checkIcon: {
    width: 26,
    height: 26,
    marginLeft: 6,
    marginRight: 6,
    color: theme.palette.primary.dark,
  },
  checkIconActive: {
    color: '#61C051',
  },
  image: {
    width: '90%',
    height: 'auto',
  },
}));
