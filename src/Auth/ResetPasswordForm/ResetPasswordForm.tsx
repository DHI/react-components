import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import IResetPasswordFormProps from './types';
import useStyles from './useStyles';

const ResetPasswordForm: FC<IResetPasswordFormProps> = (
  props: IResetPasswordFormProps
) => {
  const {
    //host,
    onBackToLogin,
    //onResetPassword,
    resetPasswordUserNamePlaceholder,
    resetPasswordButtonText,
    textFieldVariant,
  } = props;
  const [loading, setLoading] = useState(false);
  const error = false;
  const [form, setForm] = useState({
    Id: '',
  });
  const classes = useStyles();
  const validate = () => form.Id;
  const handleChange = (name: string, value: string) =>
    setForm({ ...form, [name]: value });
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
    }
    alert('Reset Password Clicked');
    setLoading(false);
    // @todo: complete password reset form. Current webAPIDemo does not seem to have this endpoint
    // resetPassword(host, form).subscribe(
    //   json => {
    //     setLoading(false);
    //     onResetPassword(json);
    //   },
    //   err => {
    //     setLoading(false);
    //     setError(err);
    //   },
    // );
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        fullWidth
        margin="dense"
        value={form.Id}
        error={error}
        onChange={e => handleChange('Id', e.target.value)}
        helperText={error ? 'Account Not Found' : ''}
        label={resetPasswordUserNamePlaceholder || 'E-Mail Address or User ID'}
        variant={textFieldVariant as any}
      />

      <div className={classes.divStyle}>
        <Button
          className={classes.backButton}
          onClick={onBackToLogin ? () => onBackToLogin(false) : undefined}
        >
          <Typography className={classes.labels}>Back</Typography>
        </Button>
        <Button type="submit" color="primary" variant="contained">
          {loading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            resetPasswordButtonText || 'Reset Password'
          )}
        </Button>
      </div>
    </form>
  );
};

export { IResetPasswordFormProps, ResetPasswordForm };
