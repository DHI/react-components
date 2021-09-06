import { makeStyles, alpha } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    background: alpha(theme.palette.background.default, 0.9),
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(5),
    padding: theme.spacing(1),
    minWidth: 130,
  },
}));
