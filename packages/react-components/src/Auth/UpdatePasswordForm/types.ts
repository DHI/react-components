interface UpdatePasswordFormProps {
  /** Authentication server */
  host: string | string[];
  /** The reset password token */
  token: string;
  /** Action handler when reset password button clicked */
  onPasswordUpdated?: () => void;
  /** Local text translation for reset password button */
  updatePasswordButtonText?: string;
  /** Local text translation for when there is an error resetting password */
  errorText?: string;
  /** Local text translation for when the request has been sent successfully */
  successText?: string;
  /** Placeholder text for new password field */
  newPasswordPlaceholder?: string;
  /** Placeholder text for confirm password field */
  confirmPasswordPlaceholder?: string;
  /** Variant of text fields */
  textFieldVariant?: string;
}

export default UpdatePasswordFormProps;
