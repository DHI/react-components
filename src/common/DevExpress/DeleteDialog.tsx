import React from 'react';
import ActionsButtons from './ActionsButtons';
import Dialog from './Dialog';
import { DeleteDialogProps } from './types';

const DeleteDialog = ({ selectedRow, showDialog, closeDialog, handleDelete }: DeleteDialogProps) => {
  return (
    <Dialog
      dialogId="userGroupsDelete"
      title={`Delete ${selectedRow[0]?.name}`}
      message={`This will delete the selected user group ${selectedRow[0]?.name}, after it is deleted you cannot retrieve the data. Are you sure you want to delete this user group?`}
      showDialog={showDialog}
    >
      <ActionsButtons
        confirmButtonText="Delete"
        onCancel={() => closeDialog()}
        onSubmit={() => handleDelete(selectedRow[0])}
      />
    </Dialog>
  );
};

export default DeleteDialog;
