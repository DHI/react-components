import React, { ReactNode, useState, SyntheticEvent, FC } from 'react';
import {
  Button,
  Snackbar as MuiSnackbar,
  Fade,
  Grow,
  Slide,
  SnackbarCloseReason,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import BoxMessageStyled from './BoxMessage.styled';
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
// #endregion

interface SnackbarState {
  open?: boolean;
  message?: string | ReactNode;
  options?: SnackbarProps;
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({
  children,
  autoHideDuration = DEFAULT_DURATION,
  transitionComponent = DEFAULT_TRANSITION,
  severity = DEFAULT_SEVERITY,
  action = null,
  onActionClick = null,
}: SnackbarProviderProps) => {
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

  const handleClose = (reason: SnackbarCloseReason) => {
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
          <BoxMessageStyled>
            <InfoOutlinedIcon className="messageIcon" />
            {msg}
          </BoxMessageStyled>
        );
      case 'success':
        return (
          <BoxMessageStyled>
            <CheckCircleOutlinedIcon className="messageIcon" />
            {msg}
          </BoxMessageStyled>
        );
      case 'warning':
        return (
          <BoxMessageStyled>
            <ReportProblemOutlinedIcon className="messageIcon" />
            {msg}
          </BoxMessageStyled>
        );
      case 'error':
        return (
          <BoxMessageStyled>
            <ErrorOutlineOutlinedIcon className="messageIcon" />
            {msg}
          </BoxMessageStyled>
        );
      default:
        return msg;
    }
  };

  const handleActionClick = (e: SyntheticEvent | MouseEvent) => {
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

  const severityColorMapping = {
    normal: {
      backgroundColor: 'primary.main',
    },
    info: {
      backgroundColor: 'secondary.main',
    },
    success: {
      backgroundColor: 'success.main',
    },
    warning: {
      backgroundColor: 'warning.main',
    },
    error: {
      backgroundColor: 'error.main',
    },
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
          sx: severityColorMapping[newSeverity],
        }}
        action={
          newAction && (
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: 'background.paper',
                borderColor: 'background.paper',
                textTransform: 'none',
              }}
              onClick={handleActionClick}
            >
              {newAction}
            </Button>
          )
        }
        onClose={(e, r) => handleClose(r)}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
