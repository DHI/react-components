import { ReactNode } from 'react';
declare type TransitionType = 'fade' | 'grow' | 'slide';
declare type SeverityType = 'normal' | 'info' | 'success' | 'warning' | 'error';
interface SnackbarContextValue {
    /**
     * Display a message with this snackbar.
     * @param {string} message message to display
     * @param {object} options options parameters that will be passed to the snackbar renderer
     */
    showMessage(message: string, options?: SnackbarProps): void;
}
interface SnackbarProps {
    /**
     * Display a message with this snackbar.
     * @param {number} [autoHideDuration] numbers for auto hide duration
     * @param {TransitionType} [transitionComponent] type of transition will be use on show/hide snackbar
     * @param {SeverityType} [severity] conditions level that indicates with background color
     * @param {string} [action] label for the action button
     * @param {function} [onActionClick] click handler for the action button
     */
    autoHideDuration?: number;
    transitionComponent?: TransitionType;
    severity?: SeverityType;
    action?: string;
    onActionClick?: (e: React.SyntheticEvent | MouseEvent) => void;
}
interface SnackbarProviderProps extends SnackbarProps {
    children?: ReactNode;
}
export type { TransitionType, SeverityType, SnackbarContextValue, SnackbarProviderProps, SnackbarProps, };
export declare const DEFAULT_SEVERITY: SeverityType;
export declare const DEFAULT_TRANSITION: TransitionType;
export declare const DEFAULT_DURATION = 3000;
