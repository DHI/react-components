import { Layout, PlotData, Shape } from 'plotly.js';
import React, { FC, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { IChartPlotlyConfig, IChartPlotlyPlotData, IChartPlotlyProps, ITimeseriesData } from './types';

const ChartPlotly: FC<IChartPlotlyProps> = (props: IChartPlotlyProps) => {
  const defaultLayout = {
    autosize: true,
    title: 'Chart',
    showlegend: false,
    xaxis: {
      title: 'X Axis Title',
    },
    yaxis: {
      title: 'Y Axis Title',
    },
  } as Partial<Layout>;

  const defaultConfig = {
    responsive: true,
    useShortNames: false,
    displayModeBar: false,
  } as Partial<IChartPlotlyConfig>;

  const [config, setConfig] = useState<Partial<IChartPlotlyConfig>>({
    ...defaultConfig,
    ...props.config,
  });
  const [layout, setLayout] = useState<Partial<Layout>>({
    ...defaultLayout,
    ...props.layout,
  });
  const [plotData, setPlotData] = useState<Partial<PlotData>[]>([]);

  useEffect(() => {
    setConfig({ ...defaultConfig, ...props.config });
    formatData();
  }, [props.config]);

  useEffect(() => {
    setLayout({ ...defaultLayout, ...props.layout });
    formatData();
  }, [props.layout]);

  useEffect(() => {
    formatData();
  }, [props.data]);

  const defineSeriesFormat = (timeseries: ITimeseriesData, index: number): Partial<IChartPlotlyPlotData> =>
    ({
      mode: 'markers',
      type: 'scattergl',
      name: props.config?.useShortNames ? timeseries.id.substring(timeseries.id.lastIndexOf('/') + 1) : timeseries.id,
      ...(props.timeseries && props.timeseries[index]),
    } as Partial<IChartPlotlyPlotData>);

  const getArrowValues = (timeseriesIndex: number): number[][] => {
    if (props.timeseries) {
      const baseIndex = props.timeseries.findIndex((timeseries) => timeseries.arrowMaxCount);

      if (baseIndex === timeseriesIndex) {
        const arrowMaxCount = props.timeseries[baseIndex]?.arrowMaxCount
          ? props.timeseries[baseIndex]?.arrowMaxCount!
          : 16;

        return props.data[baseIndex].data.filter(
          (_, valueIndex: number) => valueIndex % Math.floor(props.data[baseIndex].data.length / arrowMaxCount) === 0,
        );
      }

      const baseArrowValues = getArrowValues(baseIndex);
      const points = props.data[timeseriesIndex].data;
      const result: number[][] = [];

      baseArrowValues.forEach((baseArrow: number[]) => {
        for (let i = 1; i < points.length; i++) {
          const x0: number = new Date(points[i - 1][0]).getTime();
          const x1: number = new Date(points[i][0]).getTime();
          const x = new Date(baseArrow[0]).getTime();

          if (x0 <= x && x <= x1) {
            let y0 = points[i - 1][1];
            let y1 = points[i][1];

            if (Math.abs(y1 - y0) > 180) {
              if (y1 > y0) {
                y0 += 360;
              } else {
                y1 += 360;
              }
            }

            const value = (y0 * (x1 - x) + y1 * (x - x0)) / (x1 - x0);

            result.push([points[i][0], value]);
            break;
          }
        }
      });

      return result;
    }

    return [];
  };

  const formatData = () => {
    let plotDataList: Partial<PlotData>[] = [];
    let shapes: Partial<Shape>[] = [];

    if (props.data) {
      props.data.forEach((timeseriesData: ITimeseriesData, index: number) => {
        const series: Partial<IChartPlotlyPlotData> = defineSeriesFormat(timeseriesData, index);

        if (!series.isArrow) {
          series.x = timeseriesData.data.map((dateAndValue: number[]) => dateAndValue[0]);

          series.y = timeseriesData.data.map(
            (dateAndValue: number[]) =>
              dateAndValue[1] * (series.multiplier ? series.multiplier : 1) + (series.offset ? series.offset : 0),
          );

          plotDataList = [...plotDataList, series];
        } else {
          shapes = [
            ...shapes,
            ...getArrowValues(index).map(
              (point: number[]) =>
                ({
                  type: 'path',
                  path: drawArrow(
                    point[1] * (series.multiplier ? series.multiplier : 1) + (series.offset ? series.offset : 0),
                    series.arrowScale,
                  ),
                  xref: 'x',
                  yref: 'y',
                  fillcolor: series.fillcolor ? series.fillcolor : 'black',
                  xsizemode: 'pixel',
                  ysizemode: 'pixel',
                  xanchor: point[0],
                  yanchor: series.arrowYValue ? series.arrowYValue : -1.5,
                  line: {
                    width: 0,
                  },
                } as Partial<Shape>),
            ),
          ];
        }
      });

      const layoutList = { ...defaultLayout, ...props.layout };

      if (shapes.length > 0) {
        layoutList.shapes = shapes;
      }

      setLayout(layoutList);

      setPlotData(plotDataList);
    }
  };

  const rotatePath = (path: number[][], angle: number) => {
    const radians = -((angle + 180) * Math.PI) / 180;

    return path.map((coordinate) => {
      const [x, y] = coordinate;

      return [x * Math.cos(radians) - y * Math.sin(radians), x * Math.sin(radians) + y * Math.cos(radians)];
    });
  };

  const drawArrow = (angle: number, scale?: number) => {
    const points = [
      [-3, -12],
      [-3, -1],
      [-9, -4],
      [0, 12],
      [9, -4],
      [3, -1],
      [3, -12],
    ];

    points.forEach((point) => {
      point[0] *= scale || 1;
      point[1] *= scale || 1;
    });

    const rotatedArray = rotatePath(points, angle);

    return `M${rotatedArray[0].join(' ')} L${rotatedArray[1].join(' ')} L${rotatedArray[2].join(
      ' ',
    )} L${rotatedArray[3].join(' ')} L${rotatedArray[4].join(' ')} L${rotatedArray[5].join(
      ' ',
    )} L${rotatedArray[6].join(' ')} Z`;
  };

  return <Plot style={props.style} data={plotData} config={config} layout={layout} />;
};

export { IChartPlotlyProps, ChartPlotly };
