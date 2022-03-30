import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  colorBox: {
    width: 22,
    height: 22,
    marginLeft: theme.spacing(1),
  },
}));
