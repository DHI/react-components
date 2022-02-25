import { fetchAccount, fetchToken, resetPassword, updatePassword } from '../api';
import { Form, OtpInfo, Token, User } from './types';

export default class AuthService {
  host: string[];

  constructor(host: string | string[]) {
    this.host = Array.isArray(host) ? host : [host];
  }

  login = (
    form: Form,
    onOtpRequired: (otpInfo: OtpInfo) => void,
    onSuccess: (user: User, token: Token) => void,
    onError: (err: string) => void,
  ) => {
    const accessTokenList = [];

    this.host.forEach((host) => {
      fetchToken(host, {
        id: form.id,
        password: form.password,
        otp: form.otp,
        otpAuthenticator: form.otpAuthenticator,
      }).subscribe(
        (response) => {
          if ((response as OtpInfo).otpRequired && !form.otp) {
            onOtpRequired(response as OtpInfo);
          } else {
            fetchAccount(host, response.accessToken.token, 'me').subscribe(
              (user) => {
                const loggedInUser: User = {
                  ...user,
                  userGroups: user.userGroups,
                  metadata: user.metadata ? user.metadata : {},
                };

                accessTokenList.push({ ...response, host });

                if (accessTokenList.length === this.host.length) {
                  this.setSession(accessTokenList[0], loggedInUser, form.rememberMe, accessTokenList);

                  if (onSuccess != null) {
                    onSuccess(loggedInUser, response);
                  }
                }
              },
              (err) => {
                if (onError != null) {
                  onError(err);
                }
              },
            );
          }
        },
        (error) => onError(error),
      );
    });
  };

  requestResetPassword = (
    mailBody: string,
    emailAddress: string,
    onSuccess: () => void,
    onError: (err: string) => void,
  ) => {
    return resetPassword(this.host[0] as string, mailBody, emailAddress).subscribe(
      (response) => {
        if (onSuccess != null) {
          onSuccess();
        }
      },
      (error) => onError(error),
    );
  };

  confirmResetPassword = (
    token: string,
    newPassword: string,
    onSuccess: () => void,
    onError: (err: string) => void,
  ) => {
    return updatePassword(this.host[0] as string, token, newPassword).subscribe(
      (response) => {
        if (onSuccess != null) {
          onSuccess();
        }
      },
      (error) => onError(error),
    );
  };

  // Get user details in local storage
  getSession = () => {
    const storage = localStorage.getItem('accessToken') != null ? localStorage : sessionStorage;
    const userStorage = storage.getItem('user');
    const accessTokenList = storage.getItem('accessTokenList');

    return {
      accessToken: storage.getItem('accessToken'),
      refreshToken: storage.getItem('refreshToken'),
      user: userStorage ? JSON.parse(userStorage) : null,
      expiration: storage.getItem('expiration'),
      accessTokenList: accessTokenList ? JSON.parse(accessTokenList) : null,
    };
  };

  // Sets user details in localStorage
  setSession = (authResult: Token, user: User, useLocalStorage: boolean, list?: any) => {
    // Set the time that the access token will expire at
    // const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    const storage = useLocalStorage ? localStorage : sessionStorage;

    storage.setItem('accessToken', authResult.accessToken.token);

    storage.setItem('refreshToken', authResult.refreshToken.token);

    storage.setItem('user', JSON.stringify(user));

    storage.setItem('expiration', authResult.accessToken.expiration);

    if (list) {
      storage.setItem('accessTokenList', JSON.stringify(list));
    }
  };

  // checks if the user is authenticated
  isAuthenticated = (): boolean => {
    const storage = localStorage.getItem('accessToken') != null ? localStorage : sessionStorage;
    const expirationStorage = storage.getItem('expiration');
    const accessToken = storage.getItem('accessToken');

    if (expirationStorage && accessToken) {
      // Check whether the current time is past the
      // access token's expiry time (in UTC, but once it goes into new Date() it will be converted to local time)
      const expiresAt = new Date(expirationStorage);
      const now = new Date();
      // Get and check against UTC date
      // const nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

      return now < expiresAt;
    }

    return false;
  };

  // removes user details from localStorage
  logout = () => {
    const storage = localStorage.getItem('accessToken') != null ? localStorage : sessionStorage;
    // Clear access token and ID token from local storage

    storage.removeItem('accessToken');
    storage.removeItem('refreshToken');
    storage.removeItem('user');
    storage.removeItem('expiration');
    storage.removeItem('accessTokenList');
  };
}
