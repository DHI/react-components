import { RefObject } from 'react';

// #region Local imports
import { ComponentList } from '../ComponentsMui/types';
// #endregion

export interface SideNavProps {
  data: ComponentList[];
  contentList?: ChildRef[];
  onScroll?: () => void;
}

export interface ChildRef {
  id: string;
  element: RefObject<HTMLElement>;
}
