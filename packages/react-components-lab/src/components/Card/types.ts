import { ReactNode } from 'react';

interface Props {
  description?: string[] | string | ReactNode;
  title: string;
  isOpen?: boolean;
  subTitle?: string | null;
  setIsOpen?: (d: boolean) => void;
  image?: string;
  children?: ReactNode;
  isClickable?: boolean;
}

export default Props;
