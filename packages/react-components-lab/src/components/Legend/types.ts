import { CSSProperties } from 'react';

export type ColorsArr = string[];

export interface LegendProps {
  title?: string,
  unit?: string,
  min: number,
  max: number,
  colors: ColorsArr,
  doMixColors?: boolean,
  maxItems?: number,
  style?: CSSProperties,
  headerBackground?: string,
  legendBackground?: string,
}
