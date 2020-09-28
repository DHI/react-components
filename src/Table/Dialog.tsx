import React from 'react';
import { Dialog as MUDialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const Dialog = (props) => {
  const { dialogId, title, message, showDialog, onConfirm, onCancel } = props;

  const setCancel = () => {
    onCancel && onCancel();
  };

  const setConfirm = () => {
    onConfirm && onConfirm();
  };

  return (
    <MUDialog
      id={`${dialogId}-dialog`}
      open={showDialog}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      {message && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
      )}
      {props.children}
    </MUDialog>
  );
};

export default Dialog;
