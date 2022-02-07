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
    onBackToLogin,
    newPasswordPlaceholder = 'New Password',
    confirmPasswordPlaceholder = 'Confirm New Password',
    updatePasswordButtonText = 'Reset Password',
    errorText = 'The has been an error resetting your password. Please contact support if this problem continues.',
    successText = 'Your password has been reset successfully.',
    textFieldVariant,
  } = props;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const classes = useStyles();
  const auth = new AuthService(host);
  const validate = () => form.password !== '' && form.confirmPassword !== '' && form.password === form.confirmPassword;
  const handleChange = (name: string, value: string) => setForm({ ...form, [name]: value });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setSubmitted(true);

    if (validate()) {
      setLoading(true);

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
    }
  };

  const passwordsMatch = () =>
    !submitted || (form.password !== '' && form.confirmPassword !== '' && form.password === form.confirmPassword);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          type="password"
          margin="dense"
          value={form.password}
          error={!passwordsMatch()}
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
          error={!passwordsMatch()}
          helperText={!passwordsMatch() ? 'Passwords do not match' : ''}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          label={confirmPasswordPlaceholder}
          variant={textFieldVariant as any}
        />

        <div className={classes.resetBox}>
          <Button className={classes.backButton} onClick={onBackToLogin ? () => onBackToLogin(false) : undefined}>
            <Typography className={classes.labels}>LOGIN</Typography>
          </Button>
          <Button type="submit" color="primary" variant="contained" disabled={loading}>
            {loading ? <CircularProgress color="inherit" size={24} /> : updatePasswordButtonText.toUpperCase()}
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
