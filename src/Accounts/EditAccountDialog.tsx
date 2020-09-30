import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FiberManualRecord } from '@material-ui/icons';
import React, { FormEvent, useEffect, useState } from 'react';
import { passwordStrength } from '../utils/Utils';
import { fetchUserGroups } from '../DataServices/DataServices';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Metadata from '../Metadata/Metadata';

export const EditAccountDialog = ({
  user,
  isEditing,
  dialogOpen = false,
  metadata,
  onSubmit,
  onCancel,
  token,
  host,
}: {
  token: string;
  host: string;
  user: Record<any, any>;
  metadata?: Metadata[];
  isEditing?: boolean;
  dialogOpen?: boolean;
  onCancel(): void;
  onSubmit(details: EditUser, onCompleteCallback: () => void, closeCallback: () => void): void;
}) => {
  const [state, setState] = useState({
    passwordValid: true,
    passwordStrengthColor: 'red',
    loading: false,
  });
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const userTemplate = {
    id: '',
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    userGroups: [],
    metadata: {},
  };
  const [form, setForm] = useState<EditUser>(userTemplate);
  user = isEditing ? user : userTemplate;

  useEffect(() => {
    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      repeatPassword: '',
      userGroups: user.userGroups,
      metadata: user.metadata,
    } as EditUser);
  }, [open]);

  const handleMetadata = () => {
    metadata?.forEach((item, index) => {
      if (form.metadata[metadata[index].key] === undefined) {
        setForm({
          ...form,
          metadata: {
            ...form.metadata,
            [metadata[index].key]: metadata[index].default,
          },
        });
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setState({
      ...state,
      loading: true,
    });

    if (form.password && form.password !== form.repeatPassword) {
      setState({ ...state, passwordValid: false });

      return;
    }

    const userDetails = {
      id: form.id,
      name: form.name,
      email: form.email || '',
      password: form.password,
      repeatPassword: form.repeatPassword,
      userGroups: form.userGroups || [],
      metadata: form.metadata || [],
    } as EditUser;

    onSubmit(
      userDetails,
      () => {
        setState({
          ...state,
          loading: false,
        });
      },
      onCancel,
    );
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

  const handleChange = (key: string, value: MetadataDefault) => {
    let isMetadata = true;

    if (key === 'password') {
      updatePasswordStrengthIndicator(value as string);
    }

    if (key === 'id' || key === 'password' || key === 'repeatPassword' || key === 'name' || key === 'email') {
      isMetadata = false;
    }

    setForm(
      isMetadata
        ? {
            ...form,
            metadata: {
              ...form.metadata,
              [key]: value,
            },
          }
        : {
            ...form,
            [key]: value,
          },
    );
  };

  const handleError = (boolean) => {
    setError(boolean);
  };

  const endAdornment = (
    <InputAdornment position="end">
      <FiberManualRecord style={{ color: state.passwordStrengthColor }} />
    </InputAdornment>
  );

  const NoBorderTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        'color': 'rgba(0, 0, 0, 0.87); !important',
        '& fieldset': {
          border: 'none',
        },
      },
    },
  })(TextField);

  const content = (
    <DialogContent>
      {!isEditing ? (
        <TextField
          required
          fullWidth
          autoFocus
          margin="dense"
          label="Username"
          variant="standard"
          value={form.id}
          onChange={(e) => handleChange('id', e.target.value)}
        />
      ) : (
        <NoBorderTextField
          fullWidth
          label="Username"
          margin="dense"
          variant="standard"
          value={form.id}
          disabled={true}
        />
      )}
      <TextField
        fullWidth
        name="newPassword"
        margin="dense"
        type="password"
        label="Password"
        variant="standard"
        required={!isEditing}
        value={form.password}
        error={!state.passwordValid}
        InputProps={{ endAdornment }}
        onChange={(e) => handleChange('password', e.target.value)}
        autoComplete="new-password"
      />
      {/* Must be 'new-password' to avoid autoComplete. https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Browser_compatibility */}
      <TextField
        fullWidth
        name="repeatPassword"
        margin="dense"
        type="password"
        variant="standard"
        required={!isEditing}
        label="Repeat Password"
        value={form.repeatPassword}
        error={!state.passwordValid}
        onChange={(e) => handleChange('repeatPassword', e.target.value)}
        helperText={!state.passwordValid && 'Passwords do not match'}
        autoComplete="new-password"
      />
      <TextField
        required
        fullWidth
        label="Name"
        margin="dense"
        variant="standard"
        value={form.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        margin="dense"
        variant="standard"
        value={form.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <UserGroupsInput
        userId={user.id}
        token={token}
        host={host}
        onChange={(groups) => {
          setUserGroups(groups);

          setForm({
            ...form,
            userGroups: groups,
          });
        }}
      />
      {handleMetadata()}
      <Metadata metadata={metadata} data={form.metadata} onChange={handleChange} onError={handleError} />
    </DialogContent>
  );

  return (
    <Dialog open={dialogOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">{isEditing ? 'Edit Account Details' : 'Create New Account'}</DialogTitle>
        {content}
        <DialogActions>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
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
  const [isLoading, setLoading] = useState(true);
  const [groups, setGroups] = useState<UserGroups[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!token) return;

    fetchUserGroups(host, token).subscribe(async (body) => {
      setGroups(body);
      setSelectedOptions(getGroupsUserBelongsTo(body, userId));
      setLoading(false);
    });
  }, [token]);

  useEffect(() => {
    setOptions(groups.map(({ id }) => id));
  }, [groups]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <Autocomplete
      disabled={isLoading}
      placeholder={isLoading ? 'Loading user groups...' : 'Select user group(s)'}
      options={options}
      value={selectedOptions}
      onChange={(e, values) => {
        setSelectedOptions(values as string[]);
      }}
      multiple={true as any}
      renderInput={(props) => (
        <TextField
          {...props}
          name="groups"
          variant="standard"
          label="User group(s)"
          placeholder="Select"
          autoComplete="off"
        />
      )}
      style={{
        marginTop: 8,
      }}
    />
  );
};

function getGroupsUserBelongsTo(groups: UserGroups[], userId: string) {
  return groups.filter(({ users }) => users.includes(userId)).map(({ id }) => id);
}
