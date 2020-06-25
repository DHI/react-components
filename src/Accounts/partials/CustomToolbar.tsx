import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const CustomToolbar = ({ onClick }: any) => (
  <Button color="primary" variant="contained" onClick={() => onClick(null)}>
    <AddIcon />
    Add User
  </Button>
);

CustomToolbar.propTypes = {
  onClick: PropTypes.func,
};

export default CustomToolbar;
