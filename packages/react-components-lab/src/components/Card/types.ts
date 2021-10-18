import { ReactNode } from 'react';

export interface CardProps {
  description?: string[] | string | ReactNode;
  title: string;
  isOpen?: boolean;
  subTitle?: string | null;
  setIsOpen?: (d: boolean) => void;
  image?: string;
  children?: ReactNode;
  isClickable?: boolean;
}
