import { RefObject } from 'react';
import { ComponentList } from '../ComponentsMui/types';
export interface SideNavProps {
    data: ComponentList[];
    contentList?: ChildRef[];
    onScroll?: () => void;
}
export interface ChildRef {
    id: string;
    element: RefObject<HTMLElement>;
}
