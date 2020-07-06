interface LogListProps {
  /** Time interval to fetch data in second */
  frequency: number;
  dataSources: {
    /** Backend host */
    host: string;
    /** Connection to fetch data */
    connection: string;
  }[];
  /** Authorization header to backend call */
  token: string;
  /** The date time format that the dates shown in */
  dateTimeFormat: string;
  /** Selected date for log entries from */
  startTimeUtc: string;
  /** Time zone to display data from the server to user time */
  timezone: string;
}

interface LogData {
  dateTime: string;
  id: string;
  logLevel: string;
  machineName: string;
  source: string;
  tag: string;
  text: string;
}

interface Column {
  Header: string;
  accessor: string;
}

export default LogListProps;
export { LogData, Column };
