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
  translations: {
    /** Placeholder text for user edit box. */
    userNamePlaceholder?: string;
    /** Placeholder text for password edit box. */
    passwordPlaceholder?: string;
    /** Local text translation for field */
    rememberMeLabelText?: string;
    /** Local text translation for field */
    resetPasswordLabelText?: string;
    /** Local text translation for field */
    resetPasswordButtonText?: string;
    /** Placeholder text for password reset edit box. */
    resetPasswordUserNamePlaceholder?: string;
    /** Local text translation for field */
    loginButtonText?: string;
  };
  /** Should the remember me checkbox be displayed? */
  showRememberMe?: boolean;
  /** Should the reset password checkbox be displayed? */
  showResetPassword?: boolean;
  /** Variant of text fields */
  textFieldVariant?: string;
}

export default LoginProps;
