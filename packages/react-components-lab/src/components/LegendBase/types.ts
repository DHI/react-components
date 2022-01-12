import { ReactNode } from 'react';

export interface LegendBaseProps {
  title?: string;
  unit?: string;
  position?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';
  defaultCollapsed?: boolean;
  collapsable?: boolean;
  children: ReactNode;
}
