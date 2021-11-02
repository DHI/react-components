import { BitmapLayer } from 'deck.gl';
import { DataSource } from '../../api/types';

export interface AnimationLayerProps {
  id: string;
  apiHost: string;
  connectionString: string;
  token: string;
  filename: string;
  style: string;
  shadingType: string;
  timesteps: string[];
  itemNumber: number;
  scale: number;
  currentTimestepIndex: number;

  // Note: The updateState DeckGL lifecycle method has a viewportChanged flag to check for changes to the
  // viewport while the user is panning and zooming. This event isn't triggered until a re-render occurs in
  // the parent component and the DeckGL component is updated. To ensure this occurs and that the bounding 
  // box is up to date, the bounding box must be provided to the component.
  bbox: [number, number, number, number];
}

export interface AnimationLayerState {
  currentTimestamp: string;
  timestepLayers: BitmapLayer<BitmapLayerData>[];
  abortFetchController: AbortController | null;
}

export interface AnimationImageRequest {
  requestDataSource: DataSource;
  requestConfig: any;
  token: string;
  bboxWGS84: number[];
  bbox: string;
  timestepIndex: number;
}

export interface BitmapLayerData {}
