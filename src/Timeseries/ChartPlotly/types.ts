import { Config, Layout, PlotData } from 'plotly.js';

interface IChartPlotlyProps {
  /**
   * A list of time series
   */
  data: ITimeseriesData[];
  /**  Customising config
   * @url: https://plot.ly/javascript/configuration-options/
   */
  config?: Partial<IChartPlotlyConfig>;
  /**  Customizing layout
   * @url: https://plot.ly/javascript/reference/#layout
   */
  layout?: Partial<Layout>;
  /**
   * Customizing data series
   * @url: https://plot.ly/javascript/reference/
   * Passed timeseries configs must be in the same order as the data, e.g. first object in timeseries array will correspond to the first data object specified in the data array
   */
  timeseries?: Partial<IChartPlotlyPlotData>[];
  /**
   * The style object to be set on the plot
   */
  style: any;
}

interface ITimeseriesData {
  /**
   * The id of the time series
   */
  id: string;
  /**
   * The time series data
   */
  data: number[][];
}

interface IChartPlotlyConfig extends Config {
  /**
   * Indicates if the time series should be presented as short names
   */
  useShortNames: boolean;
}

interface IChartPlotlyPlotData extends PlotData {
  /**
   * Defines the number of arrows to show on the chart at any point in time
   */
  arrowMaxCount: number;
  /**
   * Is this time series an arrow series
   */
  isArrow: boolean;
  /**
   * A value that the number will be offset with
   */
  offset?: number;
  /**
   * A value that the arrow will be scaled with
   */
  arrowScale?: number;
  /**
   * The value that the arrows are placed at on the y axis
   */
  arrowYValue?: number;
}

export {
  ITimeseriesData,
  IChartPlotlyConfig,
  IChartPlotlyPlotData,
  IChartPlotlyProps,
};
