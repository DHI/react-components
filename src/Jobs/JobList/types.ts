import { DataSource } from '../../DataServices/types';
import { LogData } from '../../Logs/LogList/types';

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
  /** Logs based on the connectionJobLog */
  logs?: LogData[];
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

interface JobDetailProps {
  detail: JobData;
  /** Location timezone */
  timeZone: string;
  /** Date format to be converted to */
  dateTimeFormat: string;
  onClose: () => void;
}

interface JobListTableProps {
  /** Authorization header to backend call */
  token: string;
  /** Data source to get the logs data */
  dataSources: DataSource[];
  /** Location timezone */
  timeZone: string;
  /** Date format to be converted to */
  dateTimeFormat: string;
  columns: any;
  data: JobData[];
  translations: any;
  /**  Boolean to inform is the data fetched. */
  loading: boolean;
  hiddenColumns: string[];
  /** Current window height in pixels */
  windowHeight: number;
  /** check if table is wider than the current window width */
  isTableWiderThanWindow: (size: boolean) => void;
}

export default JobListProps;
export { JobData, FilterProps, JobDetailProps, JobListTableProps };
