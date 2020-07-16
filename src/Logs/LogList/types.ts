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
  timeZone: string;
}

interface LogData {
  dateTime: string;
  id: string;
  logLevel: string;
  logLevelIcon: JSX.Element;
  machineName: string;
  source: string;
  tag: string;
  text: string;
}

interface Column {
  header: string;
  accessor: string;
}

export default LogListProps;
export { LogData, Column };
