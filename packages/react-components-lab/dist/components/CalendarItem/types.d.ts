import { ReactNode } from 'react';
export interface CalendarItemProps {
    children: ReactNode;
    variant: 'button' | 'semi-button';
    active?: boolean;
    onClick?: () => void;
    disabled?: boolean;
}
