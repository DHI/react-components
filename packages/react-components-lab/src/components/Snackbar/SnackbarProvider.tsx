import React, { useState } from 'react';
import { Button, Snackbar as MuiSnackbar } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';

// #region Local imports
import SnackbarContext from './SnackbarContext';
import {
  TransitionType,
  SeverityType,
  SnackbarContextValue,
  SnackbarProviderProps,
  SnackbarProps,
  DEFAULT_TRANSITION,
  DEFAULT_DURATION,
} from './types';
import useStyles from './styles';
// #endregion

interface SnackbarState {
  open?: boolean;
  message?: any;
  options?: SnackbarProps;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  autoHideDuration,
  transitionComponent,
  severity,
  action,
  onActionClick,
}: SnackbarProviderProps) => {
  const classes = useStyles();

  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: undefined,
    options: undefined,
  });

  const existingSnackbarProps = {
    autoHideDuration: autoHideDuration || DEFAULT_DURATION,
    TransitionComponent: transitionComponent || DEFAULT_TRANSITION,
    severity,
    action,
  };

  const newAutoHideDuration =
    state.options?.autoHideDuration || existingSnackbarProps.autoHideDuration;

  const newTransitionComponent =
    state.options?.transitionComponent ||
    existingSnackbarProps.TransitionComponent;

  const showMessage = (message: string, options: SnackbarProps) => {
    setState({ open: true, message, options });
  };

  const [stateContextValue] = useState<SnackbarContextValue>({ showMessage });

  const handleClose = (
    e: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({ open: false, options: undefined });
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

  const handleActionClick = (e: React.SyntheticEvent | MouseEvent) => {
    if (state.options && state.options.onActionClick) {
      state.options.onActionClick(e);
    } else {
      onActionClick(e);
    }
  };

  const renderTransitionComponent = (transitionType?: TransitionType): any => {
    let transition = Slide;
    switch (transitionType) {
      case 'fade':
        transition = Fade;
        break;
      case 'grow':
        transition = Grow;
        break;
      case 'slide':
        transition = Slide;
        break;
      default:
        transition = Slide;
    }
    return transition;
  };

  return (
    <>
      <SnackbarContext.Provider value={stateContextValue}>
        {children}
        <MuiSnackbar
          {...existingSnackbarProps}
          message={handleMessage(severity, state.message)}
          open={state.open}
          autoHideDuration={newAutoHideDuration}
          TransitionComponent={renderTransitionComponent(
            newTransitionComponent
          )}
          ContentProps={{
            className: classes[severity],
          }}
          action={
            action != null && (
              <Button
                variant="outlined"
                size="small"
                className={classes.actionButton}
                onClick={handleActionClick}
              >
                {action}
              </Button>
            )
          }
          onClose={handleClose}
        />
      </SnackbarContext.Provider>
    </>
  );
};

export default SnackbarProvider;
