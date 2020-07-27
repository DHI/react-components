import { DataSource } from '../../DataServices/types';

interface LogListProps {
  /** Time interval to fetch data in second */
  frequency: number;
  /** Data source to get the logs data */
  dataSources: DataSource[];
  /** Authorization header to backend call */
  token: string;
  /** The date time format that the dates shown in */
  dateTimeFormat: string;
  /** Selected date for log entries from */
  startTimeUtc: string;
  /** Time zone to display data from the server to user time */
  timeZone: string;
}

interface LogData {
  /** Date time of log data created */
  dateTime: string;
  /** Id of log data */
  id: string;
  /** Status of log data level */
  logLevel: string;
  /** Name of the machine of the log data */
  machineName: string;
  /** Source of log data */
  source: string;
  /** Tag of log data */
  tag: string;
  /** Log data detail */
  text: string;
}

interface BaseFilter {
  column: {
    /** Value that use to filter the data */
    filterValue: string;
    /** Function to set the filter value data */
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    /** Row before data filtered */
    preFilteredRows: any;
    /** The id of column to be filtered */
    id: string;
  };
}

export default LogListProps;
export { LogData, BaseFilter };