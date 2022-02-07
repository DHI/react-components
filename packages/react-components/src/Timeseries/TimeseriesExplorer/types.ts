import { DataSource } from '../../api/types';

export interface TimeseriesProps {
  dataSource: DataSource;
  title: string;
  legendPosition?: 'left' | 'right';
  legendPositionOffset?: number;
  /** The date time format that the dates shown in */
  dateTimeFormat: string;
  /** Selected date for log entries from */
  startTimeUtc: string;
  /** Time zone to display data from the server to user time */
  timeZone: string;
}
