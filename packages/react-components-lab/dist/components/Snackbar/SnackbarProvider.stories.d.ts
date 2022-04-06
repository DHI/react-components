import { SnackbarProviderProps } from './types';
export declare const Default: {
    (args: SnackbarProviderProps): JSX.Element;
    args: {
        autoHideDuration: number;
        transitionComponent: string;
        severity: string;
        onActionClick: import("@storybook/addon-actions").HandlerFunction;
    };
};
