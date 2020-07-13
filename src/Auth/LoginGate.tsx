import * as React from 'react';
import { ILoginProps, Login } from './Login/Login';
import { IToken, IUser } from './types';

export type ILoginState = { user?: IUser; token?: IToken };

/** See ../Accounts/Accounts.stories.tsx for example usage */
export const LoginGate = (props: ILoginProps & { children(login: Required<ILoginState>): React.ReactNode }) => {
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
