import { ReactNode } from 'react';

export interface CalendarItemProps {
  children: ReactNode;
  active?: boolean;
  variant: 'button' | 'semi-button';
  onClick?: () => void;
}
