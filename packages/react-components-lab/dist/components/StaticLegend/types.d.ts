import { LegendBaseProps } from '../LegendBase/types';
export interface StaticLegendItem {
    color: string;
    label: string;
}
export interface StaticLegendProps extends Omit<LegendBaseProps, 'children'> {
    items: StaticLegendItem[];
}
