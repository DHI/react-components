import ReactEcharts from 'echarts-for-react';
import {
  // LineChart,
  BarChart,
} from 'echarts/charts';
import {
  // GridSimpleComponent,
  GridComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useState } from 'react';
import { StandardChartData } from './types';

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

interface Props {
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
   * Set debug mode
   */
  debug?: boolean;
}

export const StandardChart = ({ className, options, chartHeightFunc, debug }: Props) => {
  const [chartSize, setChartSize] = useState({ width: '100%', height: chartHeightFunc() });

  useEffect(() => {
    const handleResize = () => setChartSize({ width: '100%', height: chartHeightFunc() });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  if (debug) {
    console.log('chart config', { data: options, raw: JSON.stringify(options) });
  }

  return (
    options?.series && (
      <div className={className}>
        <ReactEcharts style={{ width: chartSize.width, height: chartSize.height }} option={options} />
      </div>
    )
  );
};
