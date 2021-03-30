/* eslint-disable max-len */
import { ReactNode } from 'react';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';

type TransitionType = 'fade' | 'grow' | 'slide';
type SeverityType = 'normal' | 'info' | 'success' | 'warning' | 'error';

interface SnackbarContexValue {
  /**
   * Display a message with this snackbar.
   * @param {any} message message to display
   * @param {object} options options parameters that will be passed to the snackbar renderer
   */
  showMessage(message: any, options?: SnackbarOptions): void
}

interface SnackbarOptions extends SnackbarProps {
  /**
   * Display a message with this snackbar.
   * @param {string} [actionLabel] label for the action button
   * @param {function} [handleAction] click handler for the action button
   */
  actionLabel?: string
  handleAction?: () => void
}

interface SnackbarProps {
  /**
   * Display a message with this snackbar.
   * @param {number} [autoHideDuration] numbers for auto hide duration
   * @param {TransitionType} [transitionComponent] type of transition will be use on show/hide snackbar
   * @param {SeverityType} [severity] conditions level that indicates with background color
   */
  children?: ReactNode;
  autoHideDuration?: number;
  transitionComponent?: TransitionType;
  severity?: SeverityType;
}

export type {
  TransitionType, SeverityType, SnackbarContexValue, SnackbarOptions, SnackbarProps,
};

export const DEFAULT_TRANSITION: TransitionType = 'slide';
export const DEFAULT_DURATION: number = 3000;

export const renderTransitionComponent = (transitionType?: TransitionType): any => {
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
