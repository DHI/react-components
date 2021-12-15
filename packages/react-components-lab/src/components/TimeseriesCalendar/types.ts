export type TimeseriesVariant =
  | 'daily'
  | 'monthly'
  | 'seasonal'
  | 'annual'
  | 'multiannual';

export interface TimeseriesCalendarProps {
  dates: Date[];
  activeDate: Date | undefined;
  variant: TimeseriesVariant | TimeseriesVariant[];
  onChangeDataset?: (d: Date) => void;
}

export type DailyData = Record<string, Record<string, Date[]>>;
