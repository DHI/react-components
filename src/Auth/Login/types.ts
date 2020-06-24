import { IToken, IUser } from '../types';

interface ILoginProps {
  /** style used in the component */
  style?: any;
  /** Authentication server */
  host: string;
  /** Callback on successful login */
  onSuccess?: (user: IUser, token: IToken) => void;
  /** Callback on failed login */
  onError?: (error: string) => void;
  /** Placeholder text for user edit box. */
  userNamePlaceholder?: string;
  /** Placeholder text for password edit box. */
  passwordPlaceholder?: string;
  /** Should the remember me checkbox be displayed? */
  showRememberMe?: boolean;
  /** Local text translation for field */
  rememberMeLabelText?: string;
  /** Should the reset password checkbox be displayed? */
  showResetPassword?: boolean;
  /** Local text translation for field */
  resetPasswordLabelText?: string;
  /** Local text translation for field */
  resetPasswordButtonText?: string;
  /** Placeholder text for password reset edit box. */
  resetPasswordUserNamePlaceholder?: string;
  /** Local text translation for field */
  loginButtonText?: string;
  /** Variant of text fields */
  textFieldVariant?: string;
}

export default ILoginProps;
