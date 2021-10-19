import { BitmapLayer } from "deck.gl";

interface AnimationLayerProps {
  id: string,
  apiHost: string;
  connectionString: string;
  filename: string;
  styles: string;
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
