import { BitmapLayer } from "deck.gl";
import { DataSource } from '../../api/types';

interface AnimationLayerProps {
  id: string,
  apiHost: string;
  connectionString: string;
  token: string,
  filename: string;
  style: string;
  shadingType: string;
  timesteps: string[];
  itemNumber: number;
  scale: number;
  currentTimestepIndex: number;
  flagBoundingBoxUpdate: number;
}

interface AnimationLayerState {
  currentTimestamp: string;
  timestepLayers: BitmapLayer<BitmapLayerData>[];
  abortFetchController: AbortController | null;
}

interface AnimationImageRequest {
  requestDataSource: DataSource;
  requestConfig: any;
  token: string;
  bboxWGS84: number[];
  bbox: string;
  timestepIndex: number;
}

interface BitmapLayerData {}