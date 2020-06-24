import { ThemeProvider } from '@material-ui/styles';
import React, { FC, useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { ResetPasswordForm } from '../ResetPasswordForm/ResetPasswordForm';
import DHITheme from '../theme';
import ILoginProps from './types';

const Login: FC<ILoginProps> = (props: ILoginProps) => {
  const {
    host,
    onSuccess,
    onError,
    userNamePlaceholder,
    passwordPlaceholder,
    showRememberMe,
    rememberMeLabelText,
    showResetPassword,
    resetPasswordLabelText,
    resetPasswordButtonText,
    resetPasswordUserNamePlaceholder,
    loginButtonText,
    textFieldVariant,
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
          onBackToLogin={value => togglePasswordResetForm(value)}
          resetPasswordButtonText={resetPasswordButtonText}
          resetPasswordUserNamePlaceholder={resetPasswordUserNamePlaceholder}
          onResetPassword={() => console.log('Reset password not implemented.')}
          textFieldVariant={textFieldVariant}
        />
      ) : (
        <LoginForm
          host={host}
          onSuccess={onSuccess}
          onError={onError}
          userNamePlaceholder={userNamePlaceholder}
          passwordPlaceholder={passwordPlaceholder}
          showRememberMe={showRememberMe}
          rememberMeLabelText={rememberMeLabelText}
          showResetPassword={showResetPassword}
          resetPasswordLabelText={resetPasswordLabelText}
          onResetPassword={value => togglePasswordResetForm(value)}
          loginButtonText={loginButtonText}
          textFieldVariant={textFieldVariant}
        />
      )}
      <div style={{ clear: 'both' }}></div>
    </ThemeProvider>
  );
};

export { ILoginProps, Login };
