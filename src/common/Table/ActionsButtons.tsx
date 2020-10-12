import { Button, DialogActions } from '@material-ui/core';
import React from 'react';
import { ActionsButtonsProps } from './types';

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
      <Button
        type="submit"
        variant="contained"
        color={confirmButtonText === 'Delete' ? 'secondary' : 'primary'}
        onClick={onSubmit}
      >
        {isEditing ? 'Update' : confirmButtonText}
      </Button>
    </DialogActions>
  );
};

export default ActionsButtons;
