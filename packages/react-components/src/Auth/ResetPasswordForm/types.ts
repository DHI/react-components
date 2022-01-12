interface ResetPasswordFormProps {
  /** Authentication server */
  host: string | string[];
  /** The mail template to use, utilised by server */
  mailTemplate: string;
  /** Action handler when back to login link clicked */
  onBackToLogin?: (value: boolean) => void;
  /** Action handler when reset password button clicked */
  onResetPassword?: () => void;
  /** Local text translation for reset password button */
  resetPasswordButtonText?: string;
  /** Local text translation for when there is an error resetting password */
  errorText?: string;
  /** Local text translation for when the request has been sent successfully */
  successText?: string;
  /** Placeholder text for password reset edit box. */
  userNamePlaceholder?: string;
  /** Variant of text fields */
  textFieldVariant?: string;
}

export default ResetPasswordFormProps;
