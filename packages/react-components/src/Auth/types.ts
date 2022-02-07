interface OtpValidation {
  /** 2FA/OTP code  */
  otp?: string;
  /** 2FA Authenticator */
  otpAuthenticator?: string;
}
interface Form extends OtpValidation {
  /** Id field to use as login payload */
  id: string;
  /** Password field to use as login payload */
  password: string;
  /** Remember the login session */
  rememberMe: boolean;
}

interface User extends OtpInfo {
  /** Id of user */
  id: string;
  /** Name of user */
  name: string;
  /** Roles of user */
  userGroups: string[];
  /** Metadata of user */
  metadata: any;
}

interface Token {
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

interface OtpInfo {
  /** Check if credentials have 2FA authenticator */
  otpRequired?: boolean;
  /** List of Authenticator services */
  otpAuthenticatorIds?: string[];
}

export { Form, User, Token, OtpInfo };
