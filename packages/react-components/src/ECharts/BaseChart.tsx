import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { StandardChartProps } from './types';

const BaseChart = (props: StandardChartProps) => {
  const { className, options, chartHeightFunc, getRefFunc, debug } = props;
  const [chartSize, setChartSize] = useState({ width: '100%', height: chartHeightFunc() });

  useEffect(() => {
    const handleResize = () => setChartSize({ width: '100%', height: chartHeightFunc() });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    setChartSize({ width: '100%', height: chartHeightFunc() });
  }, [chartHeightFunc]);

  if (debug) {
    console.log('chart config', { data: options, raw: JSON.stringify(options) });
  }

  return (
    options?.series && (
      <div className={className} style={{ display: 'flex', width: '100%' }}>
        <ReactEcharts
          ref={(e) => {
            if (getRefFunc) getRefFunc(e);
          }}
          style={{ width: chartSize.width, height: chartSize.height }}
          option={options}
          {...props}
        />
      </div>
    )
  );
};

export { BaseChart, StandardChartProps };
