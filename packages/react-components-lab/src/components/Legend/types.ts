import { StaticLegendProps } from '../StaticLegend/types';

export type ColorsArr = string[];

export interface LegendProps extends StaticLegendProps {
  min: number;
  max: number;
  colors: ColorsArr;
  doMixColors?: boolean;
  maxItems?: number;
}
