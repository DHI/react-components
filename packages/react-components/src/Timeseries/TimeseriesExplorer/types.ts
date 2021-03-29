import { DataSource } from '../../api/types';

export interface TimeseriesProps {
  token: string;
  dataSources: DataSource[];
  title: string;
  legendPosition?: 'left' | 'right';
  legendPositionOffset?: number;
}
