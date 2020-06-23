interface IGeneralDialogProps {
  mainSection: string;
  title?: string;
  message?: string;
  showDialog: boolean;
  closeDialog?: Function;
  command?: Function;
}

export default IGeneralDialogProps;
