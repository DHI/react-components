import { Token, User } from '../types';

interface LoginProps {
  /** style used in the component */
  style?: any;
  /** Authentication server */
  host: string | string[];
  translations?: {
    /** Placeholder text for user edit box. */
    userNamePlaceholder?: string;
    /** Placeholder text for password edit box. */
    passwordPlaceholder?: string;
    /** Local text translation for field */
    rememberMeLabel?: string;
    /** Local text translation for field */
    resetPasswordLabel?: string;
    /** Local text translation for reset password button */
    resetPasswordButton?: string;
    /** Local text translation for when there is an error resetting password */
    resetPasswordError?: string;
    /** Placeholder text for password reset edit box. */
    resetPasswordUserNamePlaceholder?: string;
    /** Local text translation for field */
    loginButton?: string;
  };
  /** Should the remember me checkbox be displayed? */
  showRememberMe?: boolean;
  /** Should the reset password checkbox be displayed? */
  showResetPassword?: boolean;
  /** The mail template to use for reset password (if using), utilised by server */
  resetPasswordMailTemplate?: string;
  /** Variant of text fields */
  textFieldVariant?: 'outlined' | 'standard' | 'filled';
  /** Callback on successful login */
  onSuccess?: (user: User, token: Token) => void;
  /** Callback on failed login */
  onError?: (error: string) => void;
}

export default LoginProps;
