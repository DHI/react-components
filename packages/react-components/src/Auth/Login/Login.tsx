import React, { useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { ResetPasswordForm } from '../ResetPasswordForm/ResetPasswordForm';
import { UpdatePasswordForm } from '../UpdatePasswordForm/UpdatePasswordForm';
import LoginProps from './types';
import ThemeProvider from '../../ThemeProvider/ThemeProvider';

const Login = (props: LoginProps) => {
  const {
    host,
    showRememberMe,
    showResetPassword,
    showUpdatePassword,
    resetPasswordMailTemplate,
    resetPasswordToken,
    textFieldVariant,
    translations,
    onBackToLogin,
    onSuccess,
    onError,
  } = props;
  const [showingResetPassword, setShowingResetPassword] = useState(false);

  const togglePasswordResetForm = (value: boolean) => {
    setShowingResetPassword(value);
  };

  return (
    <ThemeProvider>
      {showingResetPassword && (
        <ResetPasswordForm
          host={host}
          mailTemplate={resetPasswordMailTemplate}
          onBackToLogin={(value) => togglePasswordResetForm(value)}
          userNamePlaceholder={translations?.updatePasswordEmailPlaceholder}
          resetPasswordButtonText={translations?.resetPasswordButton}
          errorText={translations?.resetPasswordError}
          textFieldVariant={textFieldVariant}
        />
      )}
      {showUpdatePassword && (
        <UpdatePasswordForm
          host={host}
          token={resetPasswordToken}
          newPasswordPlaceholder={translations?.updatePasswordNewPasswordPlaceholder}
          confirmPasswordPlaceholder={translations?.updatePasswordConfirmPasswordPlaceholder}
          updatePasswordButtonText={translations?.updatePasswordConfirmButton}
          errorText={translations?.resetPasswordError}
          textFieldVariant={textFieldVariant}
          onBackToLogin={onBackToLogin}
        />
      )}
      {!showingResetPassword && !showUpdatePassword && (
        <LoginForm
          host={host}
          onSuccess={onSuccess}
          onError={onError}
          showRememberMe={showRememberMe}
          showResetPassword={showResetPassword}
          onResetPassword={(value) => togglePasswordResetForm(value)}
          textFieldVariant={textFieldVariant}
          userNamePlaceholder={translations?.userNamePlaceholder}
          passwordPlaceholder={translations?.passwordPlaceholder}
          loginButtonText={translations?.loginButton}
          rememberMeLabelText={translations?.rememberMeLabel}
          resetPasswordLabelText={translations?.resetPasswordLabel}
        />
      )}
      <div style={{ clear: 'both' }}></div>
    </ThemeProvider>
  );
};

export { LoginProps, Login };
