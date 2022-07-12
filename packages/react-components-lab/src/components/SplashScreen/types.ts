import { ReactNode } from 'react';

export interface SplashScreenProps {
  image?: ReactNode;
  header?: string;
  description?: string;
  button?: ReactNode;
}
