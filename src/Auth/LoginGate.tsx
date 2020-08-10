import * as React from 'react';
import { Login, LoginProps } from './Login/Login';
import { Token, User } from './types';

export type ILoginState = { user?: User; token?: Token };

/** See ../Accounts/Accounts.stories.tsx for example usage */
export const LoginGate = (
  props: LoginProps & {
    children(login: Required<ILoginState>): React.ReactNode;
  },
) => {
  const [state, setState] = React.useState<ILoginState>({});

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
