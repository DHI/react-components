import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';

const useStyles = makeStyles(() => ({
  shading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, .3)',
  },
  loading: {
    position: 'absolute',
    fontSize: 20,
    top: 'calc(45% - 10px)',
    left: 'calc(50% - 10px)',
  },
}));

export const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.shading}>
      <CircularProgress className={classes.loading} />
    </div>
  );
};
