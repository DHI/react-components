import { Box, Chip, Avatar, IconButton, Menu, MenuItem, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { MoreVert, EditOutlined, DeleteOutline } from '@material-ui/icons';

const ActionsCell = ({ item, onEdit, onDelete }: ActionCell) => {
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
          <EditOutlined color="secondary" style={{ marginRight: '0.5rem' }} fontSize="small" />
          Edit User
        </MenuItem>
        <Box my={1}>
          <Divider />
        </Box>
        <MenuItem onClick={() => onDelete(accountData)}>
          <DeleteOutline color="secondary" style={{ marginRight: '0.5rem' }} fontSize="small" />
          Delete User
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionsCell;
