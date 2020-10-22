import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { JobDetail } from './types';

const JobDetail = ({ detail, onClose }: JobDetail) => {
  return (
    <Grid>
      <Typography variant="h2">
        Job Detail <button onClick={onClose}>x</button>
      </Typography>
      <p>Job id: {detail.id}</p>
      <p>Job log: {detail.connectionJobLog}</p>
    </Grid>
  );
};

export default JobDetail;
