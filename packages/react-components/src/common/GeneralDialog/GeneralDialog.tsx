import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import GeneralDialogProps from './types';

const GeneralDialog = (props: GeneralDialogProps) => {
  const {
    dialogId,
    title,
    message,
    cancelLabel,
    confirmLabel,
    showDialog,
    onConfirm,
    onCancel,
    isLoading,
    button = {
      cancel: {
        color: 'default',
        variant: 'outlined'
      },
      submit: {
        color: 'primary',
        variant: 'contained'
      },
    }
  } = props;

  const setCancel = () => {
    onCancel && onCancel();
  };

  const setConfirm = () => {
    onConfirm && onConfirm();
  };

  return (
    <Dialog
      id={`${dialogId}-dialog`}
      open={showDialog}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '24px', margin: '0px' }}>
        <Button onClick={setCancel} color={button.cancel.color} variant={button.cancel.variant}>
          {cancelLabel || 'Cancel'}
        </Button>
        <Button onClick={setConfirm} color={button.submit.color} variant={button.submit.variant} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : confirmLabel || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralDialog;
