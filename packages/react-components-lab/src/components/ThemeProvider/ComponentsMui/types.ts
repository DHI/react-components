import { ReactNode } from 'react';

type Component = {
  component: ReactNode;
  codeExample: string;
};

export interface ComponentList {
  title: string;
  description: string;
  components: Component[];
}

export interface ComponentsMuiProps {
  dataList: ComponentList[];
}
