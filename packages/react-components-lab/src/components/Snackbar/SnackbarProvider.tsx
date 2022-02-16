import React, { ReactNode, useState } from 'react';
import { Button, Snackbar as MuiSnackbar } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';

// #region Local imports
import SnackbarContext from './SnackbarContext';
import {
  TransitionType,
  SeverityType,
  SnackbarContextValue,
  SnackbarProviderProps,
  SnackbarProps,
  DEFAULT_SEVERITY,
  DEFAULT_TRANSITION,
  DEFAULT_DURATION,
} from './types';
import useStyles from './styles';
// #endregion

interface SnackbarState {
  open?: boolean;
  message?: string | ReactNode;
  options?: SnackbarProps;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  autoHideDuration = DEFAULT_DURATION,
  transitionComponent = DEFAULT_TRANSITION,
  severity = DEFAULT_SEVERITY,
  action = null,
  onActionClick = null,
}: SnackbarProviderProps) => {
  const classes = useStyles();

  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: undefined,
    options: undefined,
  });

  const existingSnackbarProps = {
    autoHideDuration,
    transitionComponent,
    severity,
    action,
    onActionClick,
  };

  const newAutoHideDuration =
    state.options?.autoHideDuration || existingSnackbarProps.autoHideDuration;

  const newTransitionComponent =
    state.options?.transitionComponent ||
    existingSnackbarProps.transitionComponent;

  const newSeverity = state.options?.severity || existingSnackbarProps.severity;

  const newAction = state.options?.action || existingSnackbarProps.action;

  const newOnActionClick =
    state.options?.onActionClick || existingSnackbarProps.onActionClick;

  const showMessage = (message: string, options: SnackbarProps) => {
    setState({ open: true, message, options });
  };

  const [stateContextValue] = useState<SnackbarContextValue>({ showMessage });

  const handleClose = (
    e: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason && reason === 'clickaway') {
      return;
    }
    setState((prev) => ({ ...prev, open: false }));
  };

  const handleMessage = (svr: SeverityType, msg: string | ReactNode) => {
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
    if (newOnActionClick) {
      newOnActionClick(e);
    }
  };

  const handleTransitionComponent = (transitionType?: TransitionType) => {
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
    <SnackbarContext.Provider value={stateContextValue}>
      {children}
      <MuiSnackbar
        // {...existingSnackbarProps}
        message={handleMessage(newSeverity, state.message)}
        open={state.open}
        autoHideDuration={newAutoHideDuration}
        TransitionComponent={handleTransitionComponent(newTransitionComponent)}
        ContentProps={{
          className: classes[newSeverity],
        }}
        action={
          newAction && (
            <Button
              variant="outlined"
              size="small"
              className={classes.actionButton}
              onClick={handleActionClick}
            >
              {newAction}
            </Button>
          )
        }
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
