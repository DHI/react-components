import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const SearchInput = styled(TextField)`
  .MuiInputBase-root {
    margin-right: 0.5rem;
    max-height: 36px;
  }
`;

const TableHeaders = ({ title, filter, setFilter, onNew }: TableHeadersProps) => (
  <Box display="flex" justifyContent="space-between" py={1}>
    <Typography variant="h5">{title}</Typography>
    <Box>
      <SearchInput
        placeholder="Search"
        size="small"
        variant="outlined"
        value={filter}
        onChange={({ target: { value } }: any) => setFilter(value)}
      />
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={onNew}>
        New {title}
      </Button>
    </Box>
  </Box>
);

export default TableHeaders;
