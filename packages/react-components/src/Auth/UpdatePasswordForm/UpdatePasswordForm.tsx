import { Button, CircularProgress, TextField, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from 'react';
import AuthService from '../AuthService';
import UpdatePasswordFormProps from './types';
import useStyles from './useStyles';

const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
  const {
    host,
    token,
    onPasswordUpdated,
    newPasswordPlaceholder = 'New Password',
    confirmPasswordPlaceholder = 'Confirm New Password',
    updatePasswordButtonText = 'Confirm',
    errorText = 'The has been an error resetting your password. Please contact support if this problem continues.',
    successText = 'Your password has been reset successfully.',
    textFieldVariant,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const classes = useStyles();
  const auth = new AuthService(host);
  const validate = () => form.password && form.confirmPassword;
  const handleChange = (name: string, value: string) => setForm({ ...form, [name]: value });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
    }

    auth.confirmResetPassword(
      token,
      form.password,
      () => {
        if (onPasswordUpdated) onPasswordUpdated();

        setError(false);
        setSuccess(true);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
        setSuccess(false);
        setError(true);
      },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          type="password"
          margin="dense"
          value={form.password}
          error={error}
          onChange={(e) => handleChange('password', e.target.value)}
          label={newPasswordPlaceholder}
          variant={textFieldVariant as any}
        />
        <TextField
          required
          fullWidth
          type="password"
          margin="dense"
          value={form.confirmPassword}
          error={error}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          label={confirmPasswordPlaceholder}
          variant={textFieldVariant as any}
        />

        <div className={classes.resetBox}>
          <Button type="submit" color="primary" variant="contained" disabled={loading}>
            {loading ? <CircularProgress color="inherit" size={24} /> : updatePasswordButtonText}
          </Button>
        </div>
        <div className={classes.messages}>
          {success && <Alert severity="success">{successText}</Alert>}
          {error && <Alert severity="error">{errorText}</Alert>}
        </div>
      </form>
    </>
  );
};

export { UpdatePasswordFormProps, UpdatePasswordForm };
