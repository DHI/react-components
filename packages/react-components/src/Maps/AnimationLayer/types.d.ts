import { BitmapLayer } from "deck.gl";

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
}

interface AnimationTimestep {
  url: string;
}

interface AnimationLayerState {
  currentTimestamp: string;
  timestepLayers: BitmapLayer<AnimationTimestep>[];
  abortFetchController: AbortController | null;
}
