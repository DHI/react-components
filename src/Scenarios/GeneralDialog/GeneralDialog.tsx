import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import GeneralDialogProps from './types';

const GeneralDialog = (props: GeneralDialogProps) => {
  const { mainSection, title, message, cancelLabel, confirmLabel, command, showDialog, closeDialog } = props;

  const setCloseDialog = () => {
    closeDialog && closeDialog();
  };

  const setCommandDialog = () => {
    command && command();
  };

  return (
    <Dialog
      id={`${mainSection}-dialog`}
      open={showDialog}
      onClose={() => closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '24px', margin: '0px' }}>
        <Button onClick={setCloseDialog} variant="outlined">
          {cancelLabel}
        </Button>
        <Button onClick={setCommandDialog} color="primary" variant="contained">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { GeneralDialogProps, GeneralDialog };
