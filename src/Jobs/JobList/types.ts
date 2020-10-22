import { DataSource } from '../../DataServices/types';

interface JobListProps {
  /** Time interval to fetch data in second */
  frequency: number;
  /** Data source to get the logs data */
  dataSources: DataSource[];
  /** Data source to get the logs specific parameters */
  parameters?: Parameters[];
  /** Authorization header to backend call */
  token: string;
  /** The date time format that the dates shown in */
  dateTimeFormat: string;
  /** Selected date for log entries from */
  startTimeUtc: string;
  /** Time zone to display data from the server to user time */
  timeZone: string;
  translations?: {
    /** Message when no data entries. */
    noEntriesData?: string;
    /** Message when no data entries. */
    noEntriesFilter?: string;
  };
  /** Emit event to client when jobs received from the server */
  onReceived?: (data: any) => void;
}

interface Parameters {
  parameter: string;
  label: string;
}

interface JobData {
  /** Id of job */
  id: string;
  /** Task Id of job */
  taskId: string;
  /** Status of job */
  status: string;
  /** Host of job  */
  hostId: string;
  /** Time difference between started and finished */
  duration: string;
  /** Time difference between requested and started */
  delay: string;
  /** Datetime when job is requested */
  requested: string;
  /** Datetime when job is started */
  started: string;
  /** Datetime when job is finished */
  finished: string;
  /** Progress when job status still in progress */
  progress: number;
  /** From where the connection job log is */
  connectionJobLog: string;
}

interface FilterProps {
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

interface JobDetail {
  detail: {
    id: string;
    connectionJobLog: string;
  };

  onClose: () => void;
}

export default JobListProps;
export { JobData, FilterProps, JobDetail };
