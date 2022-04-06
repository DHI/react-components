import { ReactNode } from 'react';
export interface CardProps {
    title: string | ReactNode;
    description?: string[] | string | ReactNode;
    isOpen?: boolean;
    subTitle?: string | null;
    setIsOpen?: (d: boolean) => void;
    image?: string;
    children?: ReactNode;
    isClickable?: boolean;
    disabled?: boolean;
    customCheckbox?: any;
}
