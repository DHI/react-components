import { Box, IconButton, Menu, MenuItem, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { MoreVert, EditOutlined, DeleteOutline } from '@material-ui/icons';
import { AccountData } from '../../../Accounts/types';
import { ActionCellProps } from '../types';

const ActionsCell = ({ item, onEdit, onDelete }: ActionCellProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const accountData = item as AccountData;

  return (
    <Box alignItems="center" justifyContent="flex-end">
      <IconButton aria-haspopup="true" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => onEdit(accountData)}>
          <EditOutlined color="primary" style={{ marginRight: '0.5rem' }} fontSize="small" />
          Edit User
        </MenuItem>
        <Box my={1}>
          <Divider />
        </Box>
        <MenuItem onClick={() => onDelete(accountData)}>
          <DeleteOutline color="primary" style={{ marginRight: '0.5rem' }} fontSize="small" />
          Delete User
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionsCell;
