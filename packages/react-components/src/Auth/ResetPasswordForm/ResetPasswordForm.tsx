import { Button, CircularProgress, TextField, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from 'react';
import AuthService from '../AuthService';
import ResetPasswordFormProps from './types';
import useStyles from './useStyles';

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const {
    host,
    mailTemplate,
    onResetPassword,
    onBackToLogin,
    resetPasswordUserNamePlaceholder = 'Email Address',
    resetPasswordButtonText = 'Reset Password',
    resetPasswordErrorText = 'The has been an error sending your password reset request. Please contact support if this problem continues.',
    resetPasswordRequestSentText = 'Your password reset request has been sent to the above email address.',
    textFieldVariant,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    emailAddress: '',
  });
  const classes = useStyles();
  const auth = new AuthService(host);
  const validate = () => form.emailAddress;
  const handleChange = (name: string, value: string) => setForm({ ...form, [name]: value });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);

      auth.requestResetPassword(
        mailTemplate,
        form.emailAddress,
        () => {
          if (onResetPassword) onResetPassword();

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          margin="dense"
          value={form.emailAddress}
          error={error}
          onChange={(e) => handleChange('emailAddress', e.target.value)}
          label={resetPasswordUserNamePlaceholder}
          variant={textFieldVariant as any}
        />

        <div className={classes.resetBox}>
          <Button className={classes.backButton} onClick={onBackToLogin ? () => onBackToLogin(false) : undefined}>
            <Typography className={classes.labels}>Back</Typography>
          </Button>
          <Button type="submit" color="primary" variant="contained" disabled={loading}>
            {loading ? <CircularProgress color="inherit" size={24} /> : resetPasswordButtonText}
          </Button>
        </div>
        <div className={classes.messages}>
          {success && <Alert severity="success">{resetPasswordRequestSentText}</Alert>}
          {error && <Alert severity="error">{resetPasswordErrorText}</Alert>}
        </div>
      </form>
    </>
  );
};

export { ResetPasswordFormProps, ResetPasswordForm };
