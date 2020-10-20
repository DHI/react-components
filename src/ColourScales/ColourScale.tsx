import { makeStyles, Theme } from '@material-ui/core';
import { uniq } from 'lodash';
import React from 'react';
import { InterpolateIntensityColor } from './ColourScaleHelper';
import { ColourScaleProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({}));

const ColourScale = ({
  type = 'intensity',
  mode = 'blocks',
  intervals = [],
  height = 24,
  markers = true,
  borderColour = 'transparent',
}: ColourScaleProps) => {
  const classes = useStyles();
  let colours = [];

  if (type === 'intensity') {
    for (let i = 0; i < 100; i++) {
      const fillColor = InterpolateIntensityColor((i + 1) / 100);

      if (fillColor !== '#FFFFFF') {
        colours.push(fillColor);
      }
    }
  }

  // Only unique
  colours = uniq(colours);

  if (intervals.length === 0) {
    for (let i = 0; i < colours.length; i++) {
      intervals.push((i / colours.length) * 10);
    }
  }

  const markerStrip = markers && (
    <div
      style={{
        width: '100%',
        height: height,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {colours.map((c, index) => (
        <div
          key={index}
          style={{ display: 'inline-block', flex: 1, textAlign: 'center', marginTop: 2, fontSize: '0.9em' }}
        >
          {intervals[index]}
        </div>
      ))}
    </div>
  );

  if (mode === 'gradient') {
    return (
      <div>
        <div
          style={{
            width: '100%',
            height: height,
            border: `solid 1px ${borderColour}`,
            background: `linear-gradient(to right, ${colours.join(',')})`,
          }}
        ></div>
        {markerStrip}
      </div>
    );
  }
  if (mode === 'blocks')
    return (
      <div>
        <div
          style={{
            width: '100%',
            height: height,
            border: `solid 1px ${borderColour}`,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {colours.map((c, index) => (
            <div key={index} style={{ display: 'inline-block', flex: 1, background: c }}></div>
          ))}
        </div>
        {markerStrip}
      </div>
    );

  return <></>;
};

export { ColourScale, ColourScaleProps };
