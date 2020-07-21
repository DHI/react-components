import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import DHITheme from '../../theme';
import { LoginForm } from '../LoginForm/LoginForm';
import { ResetPasswordForm } from '../ResetPasswordForm/ResetPasswordForm';
import ILoginProps from './types';

const Login = (props: ILoginProps) => {
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
          resetPasswordButtonText={translations.resetPasswordButtonText}
          resetPasswordUserNamePlaceholder={translations.resetPasswordUserNamePlaceholder}
          onResetPassword={() => console.log('Reset password not implemented.')}
          textFieldVariant={textFieldVariant}
        />
      ) : (
        <LoginForm
          host={host}
          onSuccess={onSuccess}
          onError={onError}
          userNamePlaceholder={translations.userNamePlaceholder}
          passwordPlaceholder={translations.passwordPlaceholder}
          showRememberMe={showRememberMe}
          rememberMeLabelText={translations.rememberMeLabelText}
          showResetPassword={showResetPassword}
          resetPasswordLabelText={translations.resetPasswordLabelText}
          onResetPassword={(value) => togglePasswordResetForm(value)}
          loginButtonText={translations.loginButtonText}
          textFieldVariant={textFieldVariant}
        />
      )}
      <div style={{ clear: 'both' }}></div>
    </ThemeProvider>
  );
};

export { ILoginProps, Login };
