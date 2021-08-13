import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import DHITheme from '../../theme';
import { LoginForm } from '../LoginForm/LoginForm';
import { ResetPasswordForm } from '../ResetPasswordForm/ResetPasswordForm';
import LoginProps from './types';

const Login = (props: LoginProps) => {
  const {
    host,
    showRememberMe,
    showResetPassword,
    resetPasswordMailTemplate,
    textFieldVariant,
    translations,
    onSuccess,
    onError,
  } = props;
  const [showingResetPassword, setShowingResetPassword] = useState(false);

  const togglePasswordResetForm = (value: boolean) => {
    setShowingResetPassword(value);
  };

  return (
    <ThemeProvider theme={DHITheme}>
      {showingResetPassword ? (
        <ResetPasswordForm
          host={host}
          mailTemplate={resetPasswordMailTemplate}
          onBackToLogin={(value) => togglePasswordResetForm(value)}
          resetPasswordUserNamePlaceholder={
            translations?.resetPasswordUserNamePlaceholder ?? 'E-Mail Address or User ID'
          }
          resetPasswordButtonText={translations?.resetPasswordButton ?? 'FORGOT PASSWORD'}
          resetPasswordErrorText={translations?.resetPasswordError}
          textFieldVariant={textFieldVariant}
        />
      ) : (
        <LoginForm
          host={host}
          onSuccess={onSuccess}
          onError={onError}
          showRememberMe={showRememberMe}
          showResetPassword={showResetPassword}
          onResetPassword={(value) => togglePasswordResetForm(value)}
          textFieldVariant={textFieldVariant}
          userNamePlaceholder={translations?.userNamePlaceholder ?? 'Username'}
          passwordPlaceholder={translations?.passwordPlaceholder ?? 'Password'}
          loginButtonText={translations?.loginButton ?? 'Login'}
          rememberMeLabelText={translations?.rememberMeLabel ?? 'Remember me'}
          resetPasswordLabelText={translations?.resetPasswordLabel ?? 'FORGOT PASSWORD?'}
        />
      )}
      <div style={{ clear: 'both' }}></div>
    </ThemeProvider>
  );
};

export { LoginProps, Login };
