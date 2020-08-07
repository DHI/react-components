import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import React, { FormEvent, useEffect, useState } from 'react';
import { passwordStrength } from '../utils/Utils';
import { fetchUserGroups } from '../DataServices/DataServices';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const EditAccountDialog = ({
  user,
  editing,
  open = false,
  onSubmit,
  onToggle,
  token,
  host,
}: {
  token: string;
  host: string;
  user: Record<any, any>;
  editing?: boolean;
  open?: boolean;
  onSubmit(details: any, groups: string[]): void;
  onToggle(data?: any, isEditing?: boolean): () => void;
}) => {
  const [state, setState] = useState({
    passwordValid: true,
    passwordStrengthColor: 'red',
  });
  const [userGroups, setUserGroups] = React.useState<string[]>([]);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      form,
      user,
    });

    if (form.password && form.password !== form.repeatPassword) {
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

    onSubmit(userDetails, userGroups);
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

  const handleChange = (param: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <UserGroupsInput
        userId={user.id}
        token={token}
        host={host}
        onChange={(groups) => {
          setUserGroups(groups);

          setForm({
            ...form,
            roles: groups.join(', '),
          });
        }}
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

type IUserGroups = {
  id: string;
  name: string;
  users: string[];
};

const UserGroupsInput = ({
  token,
  host,
  onChange,
  userId,
}: {
  userId: string;
  host: string;
  token: string;
  onChange(selectedGroups: string[]): void;
}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [groups, setGroups] = React.useState<IUserGroups[]>([]);
  const [options, setOptions] = React.useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!token) return;

    console.log('reee', { host, token });

    fetchUserGroups(host, token).subscribe(async (body) => {
      setGroups(body);
      setSelectedOptions(getGroupsUserBelongsTo(body, userId));
      setLoading(false);
    });
  }, [token]);

  React.useEffect(() => {
    setOptions(groups.map(({ id }) => id));
  }, [groups]);

  React.useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <Autocomplete
      disabled={isLoading}
      placeholder={isLoading ? 'Loading user groups...' : undefined}
      options={options}
      value={selectedOptions}
      onChange={(e, values) => {
        setSelectedOptions(values as string[]);
      }}
      multiple={true as any}
      renderInput={(props) => <TextField name="userGroups" {...props} />}
    />
  );
};

function getGroupsUserBelongsTo(groups: IUserGroups[], userId: string) {
  return groups.filter(({ users }) => users.includes(userId)).map(({ id }) => id);
}
