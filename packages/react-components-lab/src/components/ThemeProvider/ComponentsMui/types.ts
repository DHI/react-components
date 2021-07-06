import { ReactNode } from 'react';

type Component = {
  component: ReactNode;
  codeExample?: string;
};

export interface SubList {
  title: string;
  description: string;
  components?: Component[];
}

export interface ComponentList {
  title: string;
  description: string;
  pinned?: boolean;
  sub?: SubList[];
}

export interface ComponentsMuiProps {
  dataList: ComponentList[];
}

export interface ComponentItemProps {
  item: ComponentList;
  isLastItem?: boolean;
}
