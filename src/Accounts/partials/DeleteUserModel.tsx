import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteUserModel = ({ open, onClose, onCancel, onConfirm }: any) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Are you sure you?</DialogTitle>
    <DialogContent>
      <DialogContentText>Once you delete a user they are gone for good. This action cannot be undone.</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" color="secondary" onClick={onConfirm}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteUserModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default DeleteUserModel;
