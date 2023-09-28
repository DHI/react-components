import { CSSProperties } from 'react';

export interface StandardChartData {
  series: any[];
  dataset?: any;
  title?: Record<any, any>;
  xAxis?: Record<any, any>;
  yAxis?: Record<any, any>;
  polar?: Record<any, any>;
  grid?: Record<any, any>;
  tooltip?: Record<any, any>;
}

export interface StandardChartProps {
  /**
   * A class name to update the outter div
   */
  className?: string;
  /**
   * The options to draw the charts
   */
  options: StandardChartData;
  /**
   * A function to set Height and Width of the Graph
   */
  chartHeightFunc: () => number;
  /**
   * A function to return back the ECharts instance ref
   */
  getRefFunc?: (instance: any) => void;
  /**
   * Set debug mode
   */
  debug?: boolean;
  /**
   * Not merge data, default is false
   */
  notMerge?: boolean;
  /**
   * Lazy update the data, default is false
   */
  lazyUpdate?: boolean;
  /**
   * echarts theme config, can be:
   * 1. theme name string
   * 2. theme object
   */
  theme?: string | Record<string, any>;
  /**
   * `style` for container
   */
  style?: CSSProperties;
  /**
   * Display loading on data change
   */
  showLoading?: boolean;
  /**
   * Trigger Event on ReactEChart
   */
  onEvents?: {
    click: (params: any) => void;
    mousemove?: (params: any) => void;
  };
}
