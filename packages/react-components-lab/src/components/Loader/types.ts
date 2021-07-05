import { CSSProperties } from 'react';

export interface LoaderProps {
  isLoading?: boolean;
  variant?: 'topbar' | 'blocking';
  style: CSSProperties;
}
