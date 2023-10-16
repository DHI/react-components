import { DataSource } from '../../api/types';
import { LogData } from '../../Logs/LogList/types';
import { DateProps } from '../../common/types';
import { Filter } from '@devexpress/dx-react-grid';

interface JobListProps {
  /** Data source to get the logs data */
  dataSources: DataSource[];
  /** Hide or show columns */
  disabledColumns?: string[];
  /** Hide or show columns */
  defaultFilter?: Filter[];
  /** Data source to get the logs specific parameters */
  parameters?: Parameters[];
  /** Spesific paremeters position */
  positionToInsert?: number;
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
  /** Name to populate Jobs table matching the payload */
  parameter: string;
  /** Label to populate Jobs table */
  label: string;
}

interface JobData {
  /** Id of job */
  id: string;
  /** Task Id of job */
  taskId: string;
  /** Account ID of the job */
  accountId: string;
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
  /** Token for the job log */
  tokenJobLog: string;
  /** Host for the job log job log */
  hostJobLog: string;
  /** From where the connection job log is */
  connectionJobLog: string;
  /** Logs based on the connectionJobLog */
  logs?: LogData[];
  /** Token */
  token: string;
  /** Host */
  host: string;
  /** Connection */
  connection: string;
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
  /** Button to close Job Detail container */
  onClose: () => void;
}

interface DateFilterProps {
  dateTimeFormat: string;
  startTimeUtc: string;
  timeZone: string;
  date: DateProps;
  onSetDate: (date: DateProps) => void;
  onClearDateFilter: () => void;
}

type SortingDirection = 'asc' | 'desc';
type Sorting = { columnName: string; direction: SortingDirection; };

export default JobListProps;
export { JobData, FilterProps, JobDetailProps, DateFilterProps, Parameters, Sorting };
