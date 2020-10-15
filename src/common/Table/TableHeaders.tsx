import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { TopTableSectionProps } from './types';

const useStyles = makeStyles({
  root: {
    marginRight: '0.5rem',
    maxHeight: 36,
  },
});

const TopTableSection = ({ title, filter, setFilter, onNew }: TopTableSectionProps) => {
  const classes = useStyles();

  return (
  <Box display="flex" justifyContent="space-between" py={1}>
    <Typography variant="h5">{title}</Typography>
    <Box>
      <TextField
        placeholder="Search"
        size="small"
        variant="outlined"
        value={filter}
        classes={{ root: classes.root }}
        onChange={({ target: { value } }: any) => setFilter(value)}
      />
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={onNew}>
        {title || 'New'}
      </Button>
    </Box>
  </Box>
)};

export default TopTableSection;
