import React from 'react';
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
import Metadata from '../Metadata/Metadata';

const useStyles = makeStyles((theme: Theme) => ({
  users: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const UserGroupForm = ({
  onSubmit,
  isEditing,
  selectedUserGroup: selectedUser,
  onChange,
  onCancel,
  metadata,
}: UserGroupFormProps) => {
  const classes = useStyles();

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

    // setForm(
    //   isMetadata
    //     ? {
    //         ...form,
    //         metadata: {
    //           ...form.metadata,
    //           [key]: value,
    //         },
    //       }
    //     : {
    //         ...form,
    //         [key]: value,
    //       },
    // );
  };

  return (
    <form onSubmit={onSubmit}>
      <DialogContent>
        {!isEditing ? (
          <TextField
            required
            fullWidth
            autoFocus
            margin="dense"
            label="Username"
            variant="standard"
            value={selectedUser?.id}
            onChange={(e) => onChange('id', e.target.value)}
          />
        ) : (
          <NoBorderTextField
            fullWidth
            label="Username"
            margin="dense"
            variant="standard"
            value={selectedUser?.id}
            disabled={true}
          />
        )}

        <TextField
          required
          fullWidth
          label="Name"
          margin="dense"
          variant="standard"
          value={selectedUser?.name}
          onChange={(e) => onChange('name', e.target.value)}
        />

        <div className={classes.users}>
          <Typography variant="subtitle1">Users</Typography>
          {selectedUser.users.length > 4 ? (
            <Typography>
              there are <strong>{selectedUser.users.length}</strong> users under <strong>{selectedUser.name}</strong>
            </Typography>
          ) : (
            selectedUser.users.map((val, i) => <Chip key={i} label={val} style={{ marginRight: 4 }} />)
          )}
        </div>

        <Metadata metadata={metadata} data={selectedUser} handleChange={handleChange} />

        <DialogActions>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </DialogContent>
    </form>
  );
};

export default UserGroupForm;
