/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

// #region Local imports
import SnackbarContext from './SnackbarContext';
import {
  SeverityType,
  SnackbarContexValue,
  SnackbarOptions,
  SnackbarProps,
  renderTransitionComponent,
  DEFAULT_TRANSITION,
  DEFAULT_DURATION,
} from './types';
import useStyles from './styles';
// #endregionend

interface SnackbarProviderState {
  open?: boolean;
  message?: any;
  options?: SnackbarOptions;
}

const SnackbarProvider: React.FC<SnackbarProps> = ({
  children,
  autoHideDuration,
  transitionComponent,
  severity,
}: SnackbarProps) => {
  const classes = useStyles();

  const [state, setState] = useState<SnackbarProviderState>({
    open: false,
    message: undefined,
    options: undefined,
  });

  const existingSnackbarProps = {
    autoHideDuration,
    TransitionComponent: transitionComponent,
    severity,
  };

  const showMessage = (message: string, options: SnackbarOptions) => {
    setState({ open: true, message, options });
  };

  const [stateContextValue] = useState<SnackbarContexValue>({ showMessage });

  const handleClose = (
    e: React.SyntheticEvent | MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({ open: false, options: undefined });
  };

  const handleActionClick = (
    e: React.SyntheticEvent | MouseEvent,
    reason?: string,
  ) => {
    handleClose(e, reason);
    if (state.options && state.options.handleAction) {
      state.options.handleAction();
    }
  };

  const handleMessage = (svr: SeverityType, msg: any) => {
    switch (svr) {
      case 'normal':
        return msg;
      case 'info':
        return (
          <div className={classes.messageWrapper}>
            <InfoOutlinedIcon className={classes.messageIcon} />
            {msg}
          </div>
        );
      case 'success':
        return (
          <div className={classes.messageWrapper}>
            <CheckCircleOutlinedIcon className={classes.messageIcon} />
            {msg}
          </div>
        );
      case 'warning':
        return (
          <div className={classes.messageWrapper}>
            <ReportProblemOutlinedIcon className={classes.messageIcon} />
            {msg}
          </div>
        );
      case 'error':
        return (
          <div className={classes.messageWrapper}>
            <ErrorOutlineOutlinedIcon className={classes.messageIcon} />
            {msg}
          </div>
        );
      default:
        return msg;
    }
  };

  return (
    <>
      <SnackbarContext.Provider value={stateContextValue}>
        {children}
        <Snackbar
          {...existingSnackbarProps}
          message={handleMessage(severity, state.message)}
          open={state.open}
          autoHideDuration={
            state.options && state.options?.autoHideDuration
              ? state.options?.autoHideDuration
              : existingSnackbarProps.autoHideDuration
                ? existingSnackbarProps.autoHideDuration
                : DEFAULT_DURATION
          }
          TransitionComponent={renderTransitionComponent(
            state.options && state.options?.transitionComponent
              ? state.options?.transitionComponent
              : existingSnackbarProps.TransitionComponent
                ? existingSnackbarProps.TransitionComponent
                : DEFAULT_TRANSITION,
          )}
          ContentProps={{
            className: classes[severity],
          }}
          onClose={handleClose}
          action={
            state.options
            && state.options.actionLabel && (
              <Button
                color="secondary"
                size="small"
                onClick={handleActionClick}
              >
                {state.options.actionLabel}
              </Button>
            )
          }
        />
      </SnackbarContext.Provider>
    </>
  );
};

export default SnackbarProvider;
