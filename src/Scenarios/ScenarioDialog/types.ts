interface IScenarioDialogProps {
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
   * Handler when dialog closed
   */
  closeDialog?: (value: boolean) => void;
  /**
   * Handler when dialog confirmed
   */
  command?: Function;
}

export default IScenarioDialogProps;
