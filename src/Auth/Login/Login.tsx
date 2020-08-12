import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import DHITheme from '../../theme';
import { LoginForm } from '../LoginForm/LoginForm';
import { ResetPasswordForm } from '../ResetPasswordForm/ResetPasswordForm';
import LoginProps from './types';

const Login = (props: LoginProps) => {
  const { host, onSuccess, onError, showRememberMe, showResetPassword, textFieldVariant, translations } = props;
  const [showingResetPassword, setShowingResetPassword] = useState(false);

  const togglePasswordResetForm = (value: boolean) => {
    setShowingResetPassword(value);
  };

  return (
    <ThemeProvider theme={DHITheme}>
      {showingResetPassword ? (
        <ResetPasswordForm
          host={host}
          onBackToLogin={(value) => togglePasswordResetForm(value)}
          resetPasswordButtonText={translations?.resetPasswordButton ?? 'FORGOT PASSWORD'}
          resetPasswordUserNamePlaceholder={
            translations?.resetPasswordUserNamePlaceholder ?? 'E-Mail Address or User ID'
          }
          onResetPassword={() => console.log('Reset password not implemented.')}
          textFieldVariant={textFieldVariant}
        />
      ) : (
        <LoginForm
          host={host}
          onSuccess={onSuccess}
          onError={onError}
          userNamePlaceholder={translations?.userNamePlaceholder ?? 'Username'}
          passwordPlaceholder={translations?.passwordPlaceholder ?? 'Password'}
          showRememberMe={showRememberMe}
          rememberMeLabelText={translations?.rememberMeLabel ?? 'Remember me'}
          showResetPassword={showResetPassword}
          resetPasswordLabelText={translations?.resetPasswordLabel ?? 'FORGOT PASSWORD?'}
          onResetPassword={(value) => togglePasswordResetForm(value)}
          loginButtonText={translations?.loginButton ?? 'Login'}
          textFieldVariant={textFieldVariant}
        />
      )}
      <div style={{ clear: 'both' }}></div>
    </ThemeProvider>
  );
};

export { LoginProps, Login };
