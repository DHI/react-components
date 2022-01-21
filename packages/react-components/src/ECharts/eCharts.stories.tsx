import { Meta } from '@storybook/react/types-6-0.d';
import React from 'react';
import { BaseChart } from './BaseChart';
import mikeColors from '../ThemeProvider/mikeColors';

export default {
  title: 'Chart Components',
  component: BaseChart,
} as Meta;

export const eChartBase = () => {
  const nameTextStyle = {
    fontSize: 20,
    padding: 20,
  };

  const options = {
    title: {
      text: 'ECharts Base example',
      textStyle: {
        color: mikeColors.BRANDBLUE_DEFAULT,
        fontSize: 20,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
    },
    tooltip: {},
    legend: {
      data: ['Bench Levels', 'Time'],
    },
    xAxis: {
      name: 'Time',
      nameLocation: 'center',
      nameTextStyle,
      data: ['Oct 31', 'Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5'],
    },
    yAxis: {
      name: 'Bench Levels',
      nameLocation: 'center',
      nameTextStyle,
    },
    series: [
      {
        name: 'Bench Levels',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
      {
        name: 'Time',
        type: 'line',
        data: [2, 1, 10, 0, 0, 18],
      },
    ],
  };

  return <BaseChart className="standard_chat" chartHeightFunc={() => window.innerHeight * 0.4} options={options} />;
};
