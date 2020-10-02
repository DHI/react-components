import React, { MouseEvent, useEffect, useState } from 'react';
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  makeStyles,
  TextField,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Metadata } from '../common/Metadata/Metadata';
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

const UserGroupForm = ({ onSubmit, isEditing, selectedUserGroup, metadata, onCancel }: UserGroupFormProps) => {
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
            label="Username"
            variant="standard"
            value={form?.id}
            onChange={(e) => handleChange('id', e.target.value)}
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

        {selectedUserGroup?.users?.length > 0 && (
          <div className={classes.users}>
            <Typography variant="subtitle1">Users</Typography>
            {selectedUserGroup?.users?.length > 4 ? (
              <Typography>
                there are <strong>{selectedUserGroup.users.length}</strong> users under{' '}
                <strong>{selectedUserGroup.name}</strong>
              </Typography>
            ) : (
              selectedUserGroup?.users?.map((val, i) => (
                <Chip key={i} className={classes.chip} label={val} style={{ marginRight: 4 }} />
              ))
            )}
          </div>
        )}

        {handleMetadata()}
        <Metadata metadata={metadata} data={form.metadata} onChange={handleChange} onError={handleError} />

        {/* TODO: add ActionsButtons Component */}
        <DialogActions>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" onClick={(e) => handleSubmit(e)} disabled={error}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </DialogContent>
    </form>
  );
};

export default UserGroupForm;
