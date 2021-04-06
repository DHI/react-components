import { makeStyles } from '@material-ui/core/styles';

const SnackbarStyles = makeStyles(() => ({
  messageWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& $messageIcon': {
      paddingRight: 5,
    },
  },
  messageIcon: {},
  normal: {
    backgroundColor: '#000000',
  },
  info: {
    backgroundColor: '#0B4566',
  },
  success: {
    backgroundColor: '#61C051',
  },
  warning: {
    backgroundColor: '#FFC20A',
  },
  error: {
    backgroundColor: '#FD3F75',
  },
  actionButton: {
    color: '#fff',
    borderColor: '#fff',
    textTransform: 'none',
  },
}));

export { SnackbarStyles };
export default SnackbarStyles;
