import { Token, User } from '../types';

interface LoginProps {
  /** style used in the component */
  style?: any;
  /** Authentication server */
  host: string;
  /** Callback on successful login */
  onSuccess?: (user: User, token: Token) => void;
  /** Callback on failed login */
  onError?: (error: string) => void;
  translations?: {
    /** Placeholder text for user edit box. */
    userNamePlaceholder?: string;
    /** Placeholder text for password edit box. */
    passwordPlaceholder?: string;
    /** Local text translation for field */
    rememberMeLabel?: string;
    /** Local text translation for field */
    resetPasswordLabel?: string;
    /** Local text translation for field */
    resetPasswordButton?: string;
    /** Placeholder text for password reset edit box. */
    resetPasswordUserNamePlaceholder?: string;
    /** Local text translation for field */
    loginButton?: string;
  };
  /** Should the remember me checkbox be displayed? */
  showRememberMe?: boolean;
  /** Should the reset password checkbox be displayed? */
  showResetPassword?: boolean;
  /** Variant of text fields */
  textFieldVariant?: 'outlined' | 'standard' | 'filled';
}

export default LoginProps;
