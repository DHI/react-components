import { ComponentsProps } from '@material-ui/core/styles/props';

const mikeComponentsProps: ComponentsProps = {
  MuiDialogTitle: {
    disableTypography: true,
  },
  MuiDialogActions: {
    disableSpacing: true,
  },
  MuiAppBar: {
    position: 'fixed',
    elevation: 0,
  },
  MuiButton: {
    color: 'secondary', // set the default color prop for  buttons to secondary.
  },
  MuiCircularProgress: {
    color: 'secondary', // set the default color prop for spinners to secondary.
  },
  MuiFab: {
    color: 'secondary',
  },
  MuiTabs: {
    indicatorColor: 'primary',
    textColor: 'primary',
  },
  MuiTableCell: {
    align: 'left',
  },
  MuiLink: {
    color: 'secondary',
  },
};

export default mikeComponentsProps;
