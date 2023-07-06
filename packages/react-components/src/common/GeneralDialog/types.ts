import { PropTypes } from "@material-ui/core";

type Variant = 'text' | 'outlined' | 'contained'

interface GeneralDialogProps {
  /**
   * Value to be set as dialog id
   */
  dialogId: string;
  /**
   * Title of the dialog
   */
  title?: string;
  /**
   * Message content of the dialog
   */
  message?: string;
  /**
   * Value to be add as a cancel button text
   */
  cancelLabel?: string;
  /**
   * Value to be add as a confirm button text
   */
  confirmLabel?: string;
  /**
   * Show/Hide dialog
   */
  showDialog: boolean;
  /**
   * Handler when dialog cancelled
   */
  onCancel?: () => void;
  /**
   * Handler when dialog confirmed
   */
  onConfirm?: () => void;
  /**
   * when state is Loading
   */
  isLoading?: boolean;
  /**
   * Color of button dialog
   */
  button?: {
    cancel: {
      color: PropTypes.Color
      variant: Variant
    },
    submit: {
      color: PropTypes.Color
      variant: Variant
    },
  };
  
}

export default GeneralDialogProps;
