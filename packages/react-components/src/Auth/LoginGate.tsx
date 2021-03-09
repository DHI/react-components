import * as React from 'react';
import { Login, LoginProps } from './Login/Login';
import { Token, User } from './types';

export type LoginState = { user?: User; token?: Token };

/** See ../Accounts/Accounts.stories.tsx for example usage */
export const LoginGate = (
  props: LoginProps & {
    children(login: Required<LoginState>): React.ReactNode;
  },
) => {
  const [state, setState] = React.useState<LoginState>({});

  if (!state.token?.accessToken?.token)
    return (
      <Login
        {...props}
        onSuccess={(user, token) => {
          setState({ user, token });
          props.onSuccess && props.onSuccess(user, token);
        }}
      />
    );

  return <>{props.children(state as Required<typeof state>)}</>;
};
