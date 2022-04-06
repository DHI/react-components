import React from 'react';
import { LoaderProps } from './types';
declare const _default: {
    title: string;
    component: React.FC<LoaderProps>;
    argTypes: {
        isLoading: {
            control: string;
        };
        variant: {
            control: string;
        };
    };
};
export default _default;
export declare const Blocking: import("@storybook/csf").AnnotatedStoryFn<import("@storybook/react/types-6-0").ReactFramework, LoaderProps>;
export declare const TopBar: import("@storybook/csf").AnnotatedStoryFn<import("@storybook/react/types-6-0").ReactFramework, LoaderProps>;
