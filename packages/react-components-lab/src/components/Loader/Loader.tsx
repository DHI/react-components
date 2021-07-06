import React, { FC } from 'react';
import { CircularProgress, LinearProgress, Grid } from '@material-ui/core';
import useStyles from './styles';
import { LoaderProps } from './types';

const Loader: FC<LoaderProps> = ({
  isLoading = false,
  variant = 'blocking',
  style,
}) => {
  const classes = useStyles();
  if (isLoading) {
    if (variant === 'blocking')
      return (
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.blocking}
          style={{ ...style }}
        >
          <CircularProgress color="inherit" size={50} thickness={5} />
        </Grid>
      );

    return (
      <div className={classes.topbar} style={{ ...style }}>
        <LinearProgress color="primary" />
      </div>
    );
  }

  return null;
};

export default Loader;
