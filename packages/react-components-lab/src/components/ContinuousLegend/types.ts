import { LegendBaseProps } from '../LegendBase/types';

export type ColorsArr = string[];

export interface LegendProps extends Omit<LegendBaseProps, 'children'> {
  min: number;
  max: number;
  colors: ColorsArr;
  doMixColors?: boolean;
  maxItems?: number;
}
