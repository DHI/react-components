import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const ActionsColumn = ({ onDelete, onEdit }: any) => (
  <div>
    <Tooltip title="Delete user">
      <IconButton aria-label="Delete" onClick={onDelete}>
        <Delete />
      </IconButton>
    </Tooltip>
    <Tooltip title="Edit user">
      <IconButton aria-label="Edit" onClick={onEdit}>
        <Edit />
      </IconButton>
    </Tooltip>
  </div>
);

ActionsColumn.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ActionsColumn;
