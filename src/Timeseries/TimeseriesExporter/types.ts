interface ITimeseriesExporterProps {
  // A list of time series
  data: ITimeseriesData[];
  // Extra information on allowing defining overrideing name as well as number of decimal
  timeseries: ITimeseriesExporterTimeseries[];
  // The file name that the data should be exported to, defaults to the format in the example here 'Timeseries 2018-10-31 11-43-21.csv'
  exportFileName?: string;
  // The date time format, defaults to MM/DD-YYYY HH:mm:ss
  dateTimeFormat?: string;
  // The color of the button. Defaults to primary
  color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
  // The button type. Defaults to contained
  variant: 'text' | 'outlined' | 'contained' | undefined;
  // The injected text. Defaults to Download
  caption?: string;
}

interface ITimeseriesData {
  // The id of the time series
  id: string;
  // The time series data
  data: (string | number)[][];
}

interface ITimeseriesExporterTimeseries {
  // An optional name to override the columns with
  name?: string;
  // Defines the number of decimals to export
  decimals?: number;
}

export {
  ITimeseriesData,
  ITimeseriesExporterTimeseries,
  ITimeseriesExporterProps,
};
