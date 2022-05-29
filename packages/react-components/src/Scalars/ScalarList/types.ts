import { DataSource } from '../../api/types';

interface ScalarListProps {
  /** Time interval to fetch data in second */
  frequency?: number;
  /** Data source to get the logs data */
  dataSources: DataSource[];
  /** Authorization header to backend call */
  token: string;
  /** The date time format that the dates shown in */
  dateTimeFormat: string;
  /** Time zone to display data from the server to user time */
  timeZone: string;
}

interface ScalarData {
  /** The full name of the scalar */
  fullName: string;
  /** The value type of the scalar */
  valueTypeName: string;
  /** The value */
  value: object;
  /** The date time it was last updated */
  dateTime: string;
}

export default ScalarListProps;
export { ScalarData };
