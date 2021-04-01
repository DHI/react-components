/* eslint-disable max-len */
import { ReactNode } from 'react';

type TransitionType = 'fade' | 'grow' | 'slide';
type SeverityType = 'normal' | 'info' | 'success' | 'warning' | 'error';

interface SnackbarContexValue {
  /**
   * Display a message with this snackbar.
   * @param {any} message message to display
   * @param {object} options options parameters that will be passed to the snackbar renderer
   */
  showMessage(message: any, options?: SnackbarProps): void
}

interface SnackbarProps {
  /**
   * Display a message with this snackbar.
   * @param {number} [autoHideDuration] numbers for auto hide duration
   * @param {TransitionType} [transitionComponent] type of transition will be use on show/hide snackbar
   * @param {SeverityType} [severity] conditions level that indicates with background color
   * @param {string} [actionLabel] label for the action button
   * @param {function} [handleAction] click handler for the action button
  */
  autoHideDuration?: number;
  transitionComponent?: TransitionType;
  severity?: SeverityType;
}

interface SnackbarProviderProps extends SnackbarProps {
  children?: ReactNode;
}

export type {
  TransitionType, SeverityType, SnackbarContexValue, SnackbarProviderProps, SnackbarProps,
};

export const DEFAULT_TRANSITION: TransitionType = 'slide';
export const DEFAULT_DURATION: number = 3000;
