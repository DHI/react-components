import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';
import { LegendBaseProps } from '../LegendBase/types';

export interface StaticLegendItem {
  color: string;
  label: string;
}
export interface StaticLegendProps extends Omit<LegendBaseProps, 'children'> {
  items: StaticLegendItem[];
  sx?: SxProps<Theme> | undefined;
}
