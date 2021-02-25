import ReactEcharts from 'echarts-for-react';
import { BarChart, LineChart, PieChart, RadarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useState } from 'react';
import { StandardChartProps } from './types';

//  move this out
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  ScatterChart,
  LineChart,
  PieChart,
  RadarChart,
  CanvasRenderer,
]);

export const BaseChart = ({ className, options, chartHeightFunc, debug }: StandardChartProps) => {
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
      <div className={className} style={{ display: 'flex', width: '100%' }}>
        <ReactEcharts style={{ width: chartSize.width, height: chartSize.height }} option={options} />
      </div>
    )
  );
};
