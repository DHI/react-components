import React from 'react';
import { Login } from '..';
import { IToken, IUser } from './types';

export default {
  title: 'Auth',
  component: [Login],
};

export const LoginStory = () => {
  const onSuccesResultHandler = (user: IUser, token: IToken) => {
    alert(`Login Success !!! ${user.name} token : ${token.accessToken}`);
  };

  return (
    <Login
      host={process.env.ENDPOINT_URL}
      translations={{
        userNamePlaceholder: 'Username',
        passwordPlaceholder: 'Password',
        rememberMeLabelText: 'Remember me',
        resetPasswordLabelText: 'FORGOT PASSWORD?',
        resetPasswordButtonText: 'FORGOT PASSWORD',
        resetPasswordUserNamePlaceholder: 'E-Mail Address or User ID',
        loginButtonText: 'Login',
      }}
      showRememberMe={true}
      showResetPassword={true}
      onSuccess={onSuccesResultHandler}
      textFieldVariant={'outlined'}
    />
  );
};
