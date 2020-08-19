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

interface AccountTableHeaderProps {
  filter: string;
  setFilter: (event: any) => any;
  onNew: () => any;
}

const AccountTableHeader = ({ filter, setFilter, onNew }: AccountTableHeaderProps) => (
  <Box display="flex" justifyContent="space-between" py={1}>
    <Typography variant="h5">User Accounts</Typography>
    <Box>
      <SearchInput
        placeholder="Search"
        size="small"
        variant="outlined"
        value={filter}
        onChange={({ target: { value } }: any) => setFilter(value)}
      />
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={onNew}>
        New User
      </Button>
    </Box>
  </Box>
);

export default AccountTableHeader;
