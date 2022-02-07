import { Meta } from '@storybook/react/types-6-0.d';
import * as React from 'react';

import DeckGL from '@deck.gl/react';
import { BitmapLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';
import AnimationLayer from './AnimationLayer/AnimationLayer';
import AnimationControl from './AnimationControl/AnimationControl';
import { viewStateToBBox } from './AnimationLayer/helpers';
import { Layer } from 'deck.gl';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { AisFilterMenu } from './AisVesselLayer/AisFilterMenu/AisFilterMenu';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { renderAisLayer } from './AisVesselLayer/AisLayer/AisLayer';
import { AisProvider, useAis } from './AisVesselLayer/AisContext';
import { fetchVessels } from '../api/Map/AisApi';

export default {
  title: 'Map Components',
} as Meta;

/**
 * File Contents
 * ===========================================
 * 1. Animation Layer Story
 * 2. Ais Layer Story
 */


// =====================================
// 1. Animation Layer Story
// =====================================


const INITIAL_VIEW_STATE_ANIMATION_STORY = {
  longitude: 12.623328,
  latitude: 55.686408,
  zoom: 9,
  pitch: 0,
  bearing: 0,
};

const timesteps = [
  '2018-09-12T12:00:00',
  '2018-09-12T12:30:00',
  '2018-09-12T13:00:00',
  '2018-09-12T13:30:00',
  '2018-09-12T14:00:00',
  '2018-09-12T14:30:00',
  '2018-09-12T15:00:00',
  '2018-09-12T15:30:00',
  '2018-09-12T16:00:00',
  '2018-09-12T16:30:00',
  '2018-09-12T17:00:00',
  '2018-09-12T17:30:00',
  '2018-09-12T18:00:00',
  '2018-09-12T18:30:00',
  '2018-09-12T19:00:00',
  '2018-09-12T19:30:00',
  '2018-09-12T20:00:00',
  '2018-09-12T20:30:00',
  '2018-09-12T21:00:00',
  '2018-09-12T21:30:00',
  '2018-09-12T22:00:00',
  '2018-09-12T22:30:00',
  '2018-09-12T23:00:00',
  '2018-09-12T23:30:00',
];

const tileLayer = new TileLayer({
  data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
  minZoom: 0,
  maxZoom: 19,
  tileSize: 256,

  renderSubLayers: (props: any) => {
    const {
      bbox: { west, south, east, north },
    } = props.tile;

    return new BitmapLayer(props, {
      data: null,
      image: props.data,
      bounds: [west, south, east, north],
    });
  },
});

export const AnimationLayerStory = () => {
  const [currentTimestepIndex, setCurrentTimestepIndex] = React.useState<number>(0);
  const [bbox, setBbox] = React.useState<[number, number, number, number] | null>();
  const [_, isMapLoaded] = React.useState<boolean>(false);

  const animationLayer = new AnimationLayer({
    id: 'AnimationLayer',
    apiHost: 'https://domainservices.dhigroup.com',
    connectionString: 'dfsu-mapsource',
    token: '',
    itemNumber: 3,
    style: 'Ecoli',
    shadingType: 'ShadedContour',
    filename: 'KBHEC3dF012.dfsu',
    timesteps: timesteps,
    currentTimestepIndex: currentTimestepIndex,
    scale: 1,
    bbox,
  });

  const layers: Layer<any>[] = [tileLayer, animationLayer];

  const handleDateTimeChange = (date: string) => {
    const index = timesteps.indexOf(date);
    setCurrentTimestepIndex(index);
  };

  const onViewStateChange = ({ viewState }) => {
    if (viewState) {
      const bbox = viewStateToBBox(viewState);
      setBbox(bbox);
    }
  };

  return (
    <div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE_ANIMATION_STORY}
        controller={true}
        layers={layers}
        onLoad={() => isMapLoaded(true)}
        onViewStateChange={onViewStateChange}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, padding: '1rem', width: '50ch', backgroundColor: 'white' }}>
        <AnimationControl
          playing={true}
          enabled={true}
          loop={true}
          onDateTimeChange={handleDateTimeChange}
          horizontal={false}
          hideControls={false}
          dateTimePostfix="UTC"
          framesPerSecond={8}
          dateTimes={timesteps}
          timezoneOffsetData={null}
          timezoneOffsetDisplay={null}
          dateTimeDisplayFormat="yyyy/MM/dd HH:mm:ss"
        />
      </div>
    </div>
  );
};


// =====================================
// 2. Ais Layer Story
// =====================================

const INITIAL_VIEW_STATE_AIS_STORY = {
  longitude: 153.145693,
  latitude: -27.409445,
  zoom: 9,
  pitch: 0,
  bearing: 0,
};

export const AisVesselLayerStory = () => {
  const [authToken, setAuthToken] = React.useState<string>();

  const login = async (username: string, password: string) => {
    const response = await fetch("https://auth-dev.seaportopx.com/api/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: username,
        password: password,
      }),
    });

    const authResponse = await response.json();
    setAuthToken(authResponse.accessToken.token);
  }

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as any;
    const username = target?.elements?.fusername?.value ?? '';
    const password = target?.elements?.fpassword?.value ?? '';
    login(username, password);
  };

  const fetchVesselData = async (boundingBox: [number, number, number, number]) => {
    return await fetchVessels(
      'MarineAid-Ais',
      'Live',
      7,
      null,
      null,
      'amsa',
      boundingBox,
      authToken
    );
  }

  return (
    <div>
      {authToken && (
        <AisProvider fetchVesselData={fetchVesselData}>
          <AisVesselMapLayer authToken={authToken} />
        </AisProvider>
      )}
      {!authToken && (
        <Box
          position="absolute"
          right="1rem"
          top="1rem"
          padding={2}
          width="25ch"
          component={Paper}
        >
          <LoginForm handleLoginSubmit={handleLoginSubmit} />
        </Box>
      )}
    </div>
  );
}

const AisVesselMapLayer = ({ authToken }) => {
  const [bbox, setBbox] = React.useState<[number, number, number, number] | null>();
  const { selectedVesselTypes, selectedNavStatus, draftRange, lengthRange, fetchAisTileData } = useAis(); 

  const onViewStateChange = ({ viewState }) => {
    if (viewState) {
      const bbox = viewStateToBBox(viewState);
      console.log('bbox', bbox);
      setBbox(bbox);
    }
  }

  const layers = [
    tileLayer,
    authToken ? renderAisLayer(
      selectedVesselTypes,
      selectedNavStatus,
      draftRange,
      lengthRange,
      fetchAisTileData,
    ) : null
  ].filter(layer => layer != null);

  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE_AIS_STORY}
        controller={true}
        layers={layers}
        onViewStateChange={onViewStateChange}
      />
      <Box
        position="absolute"
        left="1rem"
        top="1rem"
        padding="0.5rem 1rem 0rem 1rem"
        width="40ch"
        component={Paper}
      >
        <AisFilterMenu />
      </Box>
    </>
  );
}

const LoginForm = ({ handleLoginSubmit }) => {
  return (
    <form onSubmit={handleLoginSubmit}>
      <Typography variant='overline'>AIS Feed Login</Typography>
      <Box mb={1} >
        <TextField id="fusername" label="Username" variant="outlined" size="small" />
      </Box>
      <Box my={1}>
        <TextField id="fpassword" label="Password" type="password" variant="outlined" size="small" />
      </Box>
      <Box mt={1}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  )
}
