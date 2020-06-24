import { fetchAccount, fetchToken } from '..';
import { IForm, IToken, IUser } from './types';

export default class AuthService {
  host: string;
  constructor(host: string) {
    this.host = host;
  }

  login = (
    form: IForm,
    onSuccess: (user: IUser, token: IToken) => void,
    onError: (err: string) => void
  ) => {
    fetchToken(this.host, form).subscribe(
      token => {
        fetchAccount(this.host, token.accessToken.token, form.id).subscribe(
          user => {
            const loggedInUser: IUser = {
              ...user,
              roles: user.roles
                ? user.roles.split(',').map((role: string) => role.trim())
                : [],
              metadata: user.metadata ? user.metadata : {},
            };
            this.setSession(token, loggedInUser, form.rememberMe);
            if (onSuccess != null) {
              onSuccess(loggedInUser, {
                accessToken: token.accessToken.token,
                refreshToken: token.refreshToken.token,
              } as IToken);
            }
          },
          err => {
            if (onError != null) {
              onError(err);
            }
          }
        );
      },
      err => {
        onError(err);
      }
    );
  };

  // Get user details in local storage
  getSession = () => {
    const storage =
      localStorage.getItem('accessToken') != null
        ? localStorage
        : sessionStorage;
    let userStorage = storage.getItem('user');
    return {
      accessToken: storage.getItem('accessToken'),
      refreshToken: storage.getItem('refreshToken'),
      user: userStorage ? JSON.parse(userStorage) : null,
      expiration: storage.getItem('expiration'),
    };
  };

  // Sets user details in localStorage
  setSession = (authResult: IToken, user: IUser, useLocalStorage: boolean) => {
    // Set the time that the access token will expire at
    // const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    const storage = useLocalStorage ? localStorage : sessionStorage;
    storage.setItem('accessToken', authResult.accessToken.token);
    storage.setItem('refreshToken', authResult.refreshToken.token);
    storage.setItem('user', JSON.stringify(user));
    storage.setItem('expiration', authResult.accessToken.expiration);
  };

  // checks if the user is authenticated
  isAuthenticated = () => {
    const storage =
      localStorage.getItem('accessToken') != null
        ? localStorage
        : sessionStorage;
    let expirationStorage = storage.getItem('expiration');
    if (expirationStorage) {
      // Check whether the current time is past the
      // access token's expiry time (in UTC, but once it goes into new Date() it will be converted to local time)
      const expiresAt = new Date(expirationStorage);
      const now = new Date();
      // Get and check against UTC date
      // const nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      return now < expiresAt;
    }
    return;
  };

  // removes user details from localStorage
  logout = () => {
    const storage =
      localStorage.getItem('accessToken') != null
        ? localStorage
        : sessionStorage;
    // Clear access token and ID token from local storage
    storage.removeItem('accessToken');
    storage.removeItem('refreshToken');
    storage.removeItem('user');
    storage.removeItem('expiration');
  };
}
