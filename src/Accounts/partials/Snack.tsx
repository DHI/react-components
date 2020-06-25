import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar } from '@material-ui/core';

const Snack = ({ open, handleClose, message }: any) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{message}</span>}
  />
);

Snack.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string,
};

export default Snack;
