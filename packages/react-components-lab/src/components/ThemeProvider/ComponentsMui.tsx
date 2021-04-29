import React, { FC } from 'react';
import { Box, Typography, Switch } from '@material-ui/core';

const ComponentsMui: FC = () => (
  <Box p={2} width={1} height={1}>
    <Box display="flex" alignItems="flex-start" flexDirection="column">
      <Typography variant="h4">Switch</Typography>
      <Box mt={2}>
        <Switch />
      </Box>
    </Box>
  </Box>
);

export default ComponentsMui;
