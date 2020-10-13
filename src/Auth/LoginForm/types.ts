import { Token, User } from '../types';

interface LoginFormProps {
  /** Authentication server */
  host: string;
  /** Callback on successful login */
  onSuccess?: (user: User, token: Token) => void;
  /** Callback on failed login */
  onError?: (error: string) => void;
  /** Should the remember me checkbox be displayed? */
  showRememberMe?: boolean;
  /** Local text translation for field */
  rememberMeLabelText?: string;
  /** Local text translation for field */
  loginButtonText?: string;
  /** Local text translation for field */
  backButtonText?: string;
  /** Placeholder text for user edit box. */
  userNamePlaceholder?: string;
  /** Placeholder text for password edit box. */
  passwordPlaceholder?: string;
  /** Local text translation for field */
  resetPasswordLabelText?: string;
  /** Action handler when reset password link clicked */
  onResetPassword?: (value: boolean) => void;
  /** Should the reset password checkbox be displayed? */
  showResetPassword?: boolean;
  /** Variant of text fields */
  textFieldVariant?: 'outlined' | 'standard' | 'filled';
  /** Placeholder text for OTP Authenticator input field. */
  otpAuthPlaceholder?: string;
}

export default LoginFormProps;
