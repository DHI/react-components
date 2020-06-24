import { IToken, IUser } from '../types';

interface ILoginFormProps {
  /** Authentication server */
  host: string;
  /** Callback on successful login */
  onSuccess?: (user: IUser, token: IToken) => void;
  /** Callback on failed login */
  onError?: (error: string) => void;
  /** Should the remember me checkbox be displayed? */
  showRememberMe?: boolean;
  /** Local text translation for field */
  rememberMeLabelText?: string;
  /** Should the reset password checkbox be displayed? */
  showResetPassword?: boolean;
  /** Local text translation for field */
  resetPasswordLabelText?: string;
  /** Action handler when reset password link clicked */
  onResetPassword?: (value: boolean) => void;
  /** Local text translation for field */
  loginButtonText?: string;
  /** Placeholder text for user edit box. */
  userNamePlaceholder?: string;
  /** Placeholder text for password edit box. */
  passwordPlaceholder?: string;
  /** Variant of text fields */
  textFieldVariant?: string;
}

export default ILoginFormProps;
