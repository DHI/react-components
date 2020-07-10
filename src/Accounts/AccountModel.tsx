import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField
} from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { passwordStrength } from '../Utils/Utils';

const AccountModel = ({
  user,
  editing,
  open = false,
  onSubmit,
  onToggle,
}: {
  user: Record<any, any>;
  editing?: boolean;
  open?: boolean;
  onSubmit(details: any): void;
  onToggle(data?: any, isEditing?: boolean): () => void;
}) => {
  const [state, setState] = useState({
    passwordValid: true,
    passwordStrengthColor: 'red',
  });
  const [form, setForm] = useState({
    id: '',
    name: '',
    roles: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  useEffect(() => {
    setForm({
      id: user.id,
      name: user.name,
      roles: user.roles,
      email: user.email,
      password: '',
      repeatPassword: '',
    });
  }, [open]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      setState({ ...state, passwordValid: false });

      return;
    }

    const userDetails = {
      id: form.id,
      name: form.name,
      roles: form.roles || '',
      email: form.email || '',
      password: form.password,
      repeatPassword: form.repeatPassword,
    };

    onSubmit(userDetails);
  };

  const updatePasswordStrengthIndicator = (password: string) => {
    let passwordStrengthColor = 'red';

    switch (passwordStrength(password)) {
      case 0:
        passwordStrengthColor = 'red';
        break;
      case 1:
        passwordStrengthColor = 'yellow';
        break;
      case 2:
        passwordStrengthColor = 'orange';
        break;
      case 3:
        passwordStrengthColor = 'green';
        break;
      default:
        passwordStrengthColor = '';
    }

    setState({ ...state, passwordStrengthColor });
  };

  const handleChange = (param: string) => (e: any) => {
    if (param === 'password') {
      updatePasswordStrengthIndicator(e.target.value);
    }

    setForm({
      ...form,
      [param]: e.target.value.trim(),
    });
  };

  const endAdornment = (
    <InputAdornment position="end">
      <FiberManualRecord style={{ color: state.passwordStrengthColor }} />
    </InputAdornment>
  );

  const content = (
    <DialogContent>
      <TextField
        required
        fullWidth
        autoFocus
        margin="dense"
        label="User name"
        variant="outlined"
        value={form.id}
        onChange={handleChange('id')}
      />
      <TextField
        fullWidth
        margin="dense"
        type="password"
        label="Password"
        variant="outlined"
        required={!editing}
        value={form.password}
        error={!state.passwordValid}
        InputProps={{ endAdornment }}
        onChange={handleChange('password')}
      />
      <TextField
        fullWidth
        margin="dense"
        type="password"
        variant="outlined"
        required={!editing}
        label="Repeat Password"
        value={form.repeatPassword}
        error={!state.passwordValid}
        onChange={handleChange('repeatPassword')}
        helperText={!state.passwordValid && 'Passwords do not match'}
      />
      <TextField
        required
        fullWidth
        label="Name"
        margin="dense"
        variant="outlined"
        value={form.name}
        onChange={handleChange('name')}
      />
      <TextField
        fullWidth
        label="Email"
        margin="dense"
        variant="outlined"
        value={form.email}
        onChange={handleChange('email')}
      />
      <TextField
        required
        fullWidth
        type="text"
        label="Roles"
        margin="dense"
        variant="outlined"
        value={form.roles}
        onChange={handleChange('roles')}
      />
    </DialogContent>
  );

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">{editing ? 'Edit Account Details' : 'Create New Account'}</DialogTitle>
        {content}
        <DialogActions>
          <Button variant="outlined" onClick={onToggle(null, false)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {editing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AccountModel;
