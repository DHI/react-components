import { Box, IconButton, Menu, MenuItem, Divider, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { MoreVert, EditOutlined, DeleteOutline } from '@material-ui/icons';
import { AccountData } from '../../../Accounts/types';
import { ActionCellProps } from '../types';

const useStyles = makeStyles({
  root: {
    top: -10,
    position: 'relative',
  },
});

const ActionsCell = ({ item, onEdit, onDelete, category }: ActionCellProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const accountData = item as AccountData;
  const classes = useStyles();

  return (
    <Box alignItems="center" justifyContent="flex-end">
      <IconButton aria-haspopup="true" aria-label="Present action buttons" onClick={handleClick} classes={{root: classes.root}} >
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => onEdit(accountData)}>
          <EditOutlined color="primary" style={{ marginRight: '0.5rem' }} fontSize="small" />
          Edit {category || 'User'}
        </MenuItem>
        <Box my={1}>
          <Divider />
        </Box>
        <MenuItem onClick={() => onDelete(accountData)}>
          <DeleteOutline color="primary" style={{ marginRight: '0.5rem' }} fontSize="small" />
          Delete {category || 'User'}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionsCell;
