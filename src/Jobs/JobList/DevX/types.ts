interface DateFilterProps {
  dateTimeFormat: string;
  startTimeUtc: string;
  timeZone: string;
  date: DateProps;
  onSetDate: (date: DateProps) => void;
  onSetDateFilter: () => void;
  onClearDateFilter: () => void;
}

interface DateProps {
  to: string;
  from: string;
}

export { DateFilterProps };
