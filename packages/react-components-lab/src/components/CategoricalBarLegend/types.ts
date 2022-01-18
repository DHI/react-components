export interface CategoricalBarLegendProps {
  items: LegendCategoricalItem[];
}

export type LegendCategoricalItem = {
  label?: string | undefined;
  color: string;
};
