interface IForm {
  /** Id field to use as login payload */
  id: string;
  /** Password field to use as login payload */
  password: string;
  /** Remember the login session */
  rememberMe: boolean;
}

interface IUser {
  /** Id of user */
  id: string;
  /** Name of user */
  name: string;
  /** Roles of user */
  roles: string[];
  /** Metadata of user */
  metadata: any;
}

interface IToken {
  accessToken: {
    /** Access token when successfully login */
    token: string;
    /** Token expiration when successfully login */
    expiration: string;
  };
  refreshToken: {
    /** Refresh token when access token expired */
    token: string;
  };
}

export { IForm, IUser, IToken };
