/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import Button, {
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import Snackbar, {
  SnackbarProps as MuiSnackbarProps,
} from '@material-ui/core/Snackbar';
import React from 'react';

interface DefaultSnackbarProps {
  message?: string;
  options?: unknown;
  action?: string;
  ButtonProps?: Partial<MuiButtonProps>;
  SnackbarProps?: Partial<MuiSnackbarProps>;
}

const DefaultSnackbar: React.FC<DefaultSnackbarProps> = ({
  message,
  action,
  ButtonProps,
  SnackbarProps = { autoHideDuration: 3000 },
}: DefaultSnackbarProps) => (
  <Snackbar
    {...SnackbarProps}
    message={message || undefined}
    action={
      action != null && (
        <Button color="secondary" size="small" {...ButtonProps}>
          {action}
        </Button>
      )
    }
  />
);

export default DefaultSnackbar;
