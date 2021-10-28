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
  // the parent component. To ensure this occurs and that the image data is fetched the "flagBoundingBoxUpdate"
  // property was added.
  flagBoundingBoxUpdate: number;
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
