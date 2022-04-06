import { CSSProperties, ReactNode } from 'react';
export interface CollapsableBoxProps {
    expandLabel: string;
    collapseLabel: string;
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}
