import { DialogContent, makeStyles, TextField, Theme, withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { MouseEvent, useEffect, useState } from 'react';
import { Metadata } from '../common/Metadata/Metadata';
import { ActionsButtons } from '../common/Table';
import { UserGroupFormProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  users: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}));

const UserGroupForm = ({
  onSubmit,
  isEditing,
  selectedUserGroup,
  listOfUsers,
  metadata,
  onCancel,
}: UserGroupFormProps) => {
  const classes = useStyles();
  const userGroupTemplate = {
    id: '',
    name: '',
    users: [],
    metadata: {},
  };
  const [form, setForm] = useState(userGroupTemplate);
  const [error, setError] = useState(false);
  selectedUserGroup = isEditing ? selectedUserGroup : userGroupTemplate;
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

  const handleChange = (key: string, value: string) => {
    let isMetadata = true;

    if (key === 'id' || key === 'name') {
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

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleError = (error) => {
    setError(error);
  };

  const handleUsers = (users) => {
    setForm({
      ...form,
      users,
    });
  };

  useEffect(() => {
    setForm({
      ...selectedUserGroup,
      metadata: selectedUserGroup?.metadata || {},
    });
  }, []);

  return (
    <form>
      <DialogContent>
        {!isEditing ? (
          <TextField
            required
            fullWidth
            autoFocus
            margin="dense"
            label="ID"
            variant="standard"
            value={form?.id}
            onChange={(e) => handleChange('id', e.target.value.trim())}
          />
        ) : (
          <NoBorderTextField
            fullWidth
            label="Username"
            margin="dense"
            variant="standard"
            value={form?.id}
            disabled={true}
          />
        )}

        <TextField
          required
          fullWidth
          label="Name"
          margin="dense"
          variant="standard"
          value={form?.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <Autocomplete
          disabled={!listOfUsers}
          placeholder={!listOfUsers ? 'Loading users...' : 'Select user(s)'}
          options={listOfUsers}
          value={form?.users}
          onChange={(e, values) => handleUsers(values)}
          multiple={true as any}
          renderInput={(props) => (
            <TextField
              {...props}
              name="users"
              variant="standard"
              label="User(s)"
              placeholder="Select"
              autoComplete="off"
            />
          )}
        />

        {handleMetadata()}
        <Metadata metadata={metadata} data={form.metadata} onChange={handleChange} onError={handleError} />

        <ActionsButtons
          confirmButtonText="Create"
          onCancel={onCancel}
          onSubmit={(e) => handleSubmit(e)}
          isEditing={isEditing}
        />
      </DialogContent>
    </form>
  );
};

export default UserGroupForm;
