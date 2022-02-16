import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { CalendarBoxProps } from './types';

const CalendarBox: FC<CalendarBoxProps> = ({ children, title }) => (
  <Box>
    {title && (
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
    )}
    <Box width={1} display="flex" flexWrap="wrap" flexDirection="space-between">
      {children.map((comp) => comp)}
    </Box>
  </Box>
);

export default CalendarBox;
