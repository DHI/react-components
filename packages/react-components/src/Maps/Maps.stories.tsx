import { Meta } from '@storybook/react/types-6-0.d';
import * as React from 'react';

import DeckGL from '@deck.gl/react';
import { BitmapLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';
import AnimationLayerDeckGL from './AnimationLayer/AnimationLayer';
import AnimationControl from './AnimationControl/AnimationControl';

export default {
  title: 'Animation',
} as Meta;

const INITIAL_VIEW_STATE = {
  longitude: 12.623328,
  latitude: 55.686408,
  zoom: 9,
  pitch: 0,
  bearing: 0
};

const timesteps = [
  '2018-09-12T12:00:00', '2018-09-12T12:30:00', '2018-09-12T13:00:00', '2018-09-12T13:30:00', '2018-09-12T14:00:00',
  '2018-09-12T14:30:00', '2018-09-12T15:00:00', '2018-09-12T15:30:00', '2018-09-12T16:00:00', '2018-09-12T16:30:00',
  '2018-09-12T17:00:00', '2018-09-12T17:30:00', '2018-09-12T18:00:00', '2018-09-12T18:30:00', '2018-09-12T19:00:00',
  '2018-09-12T19:30:00', '2018-09-12T20:00:00', '2018-09-12T20:30:00', '2018-09-12T21:00:00', '2018-09-12T21:30:00',
  '2018-09-12T22:00:00', '2018-09-12T22:30:00', '2018-09-12T23:00:00', '2018-09-12T23:30:00',
];

export const BasicLayerAndControls = () => {
  const [currentTimestepIndex, setCurrentTimestepIndex] = React.useState<number>(0);

  const tileLayer = new TileLayer({
    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: (props: any) => {
      const {
        bbox: {west, south, east, north}
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north]
      });
    }
  });

  const animationLayer = new AnimationLayerDeckGL({
    id: 'AnimationLayer',
    apiHost: 'https://domainservices.dhigroup.com',
    connectionString: 'dfsu-mapsource',
    itemNumber: 3,
    styles: 'Ecoli',
    shadingType: 'ShadedContour',
    filename: 'KBHEC3dF012.dfsu',
    timesteps: timesteps,
    currentTimestepIndex: currentTimestepIndex,
    scale: 1,
  });

  const layers: any = [tileLayer, animationLayer];

  const handleDateTimeChange = (date: string) => {
    const index = timesteps.indexOf(date);
    setCurrentTimestepIndex(index);
  }

  return (
    <div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, padding: '1rem', width: "40ch", backgroundColor: 'white' }}>
        <AnimationControl
          playing={false}
          enabled={true}
          onDateTimeChange={handleDateTimeChange}
          horizontal={true}
          hideControls={false}
          dateTimePostfix=""
          framesPerSecond={10}
          dateTimes={timesteps}
          timezoneOffsetData={0}
          timezoneOffsetDisplay={0}
          dateTimeDisplayFormat="yyyy/MM/dd HH:mm:ss"
        />
      </div>
    </div>
  );
};
