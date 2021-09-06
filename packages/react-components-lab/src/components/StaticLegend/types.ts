export interface StaticLegendItem {
  color: string;
  label: string;
}
export interface StaticLegendProps {
  items: StaticLegendItem[];
  title?: string;
  unit?: string;
}
