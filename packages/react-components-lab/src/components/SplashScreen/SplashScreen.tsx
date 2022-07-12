import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { SplashScreenProps } from './types';

const SplashScreen: FC<SplashScreenProps> = ({
  image,
  header,
  description,
  button,
}) => (
  <Box
    alignItems="center"
    display="flex"
    flexDirection="column"
    height="75%"
    justifyContent="center"
    ml={3}
    mr={3}
  >
    {image && <Box>{image}</Box>}
    <Typography align="center" color="secondary.dark" mt={4} variant="h2">
      {header}
    </Typography>
    <Typography align="center" color="grey.500" mt={2} variant="body2">
      {description}
    </Typography>

    {button && <Box mt={3}>{button}</Box>}
  </Box>
);

export default SplashScreen;
