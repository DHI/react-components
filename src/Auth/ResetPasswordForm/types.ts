interface IResetPasswordFormProps {
  /** Authentication server */
  host: string;
  /** Action handler when back to login link clicked */
  onBackToLogin?: (value: boolean) => void;
  /** Action handler when reset password button clicked */
  onResetPassword?: (json: string) => void;
  /** Local text translation for field */
  resetPasswordButtonText?: string;
  /** Placeholder text for password reset edit box. */
  resetPasswordUserNamePlaceholder?: string;
  /** Variant of text fields */
  textFieldVariant?: string;
}

export default IResetPasswordFormProps;
