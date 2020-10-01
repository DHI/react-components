import { Button, DialogActions } from '@material-ui/core';
import React from 'react';

const ActionsButtons = ({
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onSubmit,
  isEditing,
}: ActionsButtonsProps) => {
  return (
    <DialogActions>
      <Button variant="outlined" onClick={onCancel}>
        {cancelButtonText || 'Cancel'}
      </Button>
      <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>
        {isEditing ? 'Update' : confirmButtonText}
      </Button>
    </DialogActions>
  );
};

export default ActionsButtons;
