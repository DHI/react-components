import { CompositeLayer, BitmapLayer } from 'deck.gl';
import { convertWGS84ToEPSG3857 } from './utils';

type AnimationLayerProps = {
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
};

type AnimationTimestep = {
  url: string;
};

type AnimationLayerState = {
  currentTimestamp: string;
  timestepLayers: BitmapLayer<AnimationTimestep>[];
  abortFetchController: AbortController | null;
};

class AnimationLayerDeckGL extends CompositeLayer<AnimationLayerState, AnimationLayerProps> {

  initializeState() {
    this.fetchTimestepData();
  }

  fetchTimestepData() {
    const { apiHost, connectionString, filename, timesteps, styles, shadingType, itemNumber, scale } = this.props;

    this.state = {
      currentTimestamp: new Date().getTime().toString(),
      timestepLayers: [],
      abortFetchController: null,
    };

    const nw = this.context.viewport.unproject([0, 0]);
    const se = this.context.viewport.unproject([this.context.viewport.width, this.context.viewport.height]);
    const bbox: any = [nw[0], se[1], se[0], nw[1]];

    const epsg3857se = convertWGS84ToEPSG3857(se[0], se[1]);
    const epsg3857nw = convertWGS84ToEPSG3857(nw[0], nw[1]);

    // Fetching base64 encoded images from the domain services API.
    // TODO: Move this over to use the MapApi function instead.
    const queryParams: any = {
      width: this.context.viewport.width,
      height: this.context.viewport.height,
      bbox: [epsg3857nw[0], epsg3857se[1], epsg3857se[0], epsg3857nw[1]].join(','),
      styles: styles,
      items: itemNumber,
      shadingtype: shadingType,
      scale: scale,
    };
    const query = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
    const endpoint = `${apiHost}/api/maps/${connectionString}?${query}`;

    const requestBody: any = {};
    timesteps.forEach((timestep: string) => {
      requestBody[timestep] = filename;
    });

    const abortController = new AbortController();

    this.state.abortFetchController = abortController;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: this.state.abortFetchController.signal,
    })
      .then(response => response.json())
      .then(encodedImages => {
        this.state.abortFetchController = null;

        const timestepImageData = Object.entries(encodedImages)
          .map(([timestepStr, encodedImage]) => {
            return {
              timestep: timestepStr,
              imageURL:  `data:image/png;base64,${encodedImage}`, 
            }
          });
        timestepImageData.sort((a, b) => {
          if (a.timestep < b.timestep)
            return -1;
          if (a.timestep > b.timestep)
            return 1;
          return 0;
        });

        this.state.timestepLayers = timestepImageData.map((imageData, idx) => {
          return new BitmapLayer({
            id: `AnimationLayer-${this.state.currentTimestamp}-timestep=${idx}`,
            image: imageData.imageURL,
            visible: false,
            bounds: bbox,
          });
        });
      })
      .catch(() => {
        this.state.abortFetchController = null;
        console.error('Cancelled API request');
      });
  }

  updateState({props, oldProps, context, changeFlags}: {props: any, oldProps: any, context: any, changeFlags: any}) {
    if (Object.keys(oldProps).length === 0) {
      return;
    }
    
    if (changeFlags.viewportChanged) {
      if (this.state.abortFetchController) {
        this.state.abortFetchController.abort();
      }
      this.finaliseState();
      this.fetchTimestepData();
    }

    if (changeFlags.dataChanged) {

    }

    if (changeFlags.propsOrDataChanged) {

    }
  }

  finaliseState() {
    if (this.state.timestepLayers) {
      this.state.timestepLayers = [];
    }
  }

  renderLayers() {
    this.state.timestepLayers = this.state.timestepLayers.map((layer: any, index: number) => {
      if (layer.lifecycle === 'Awaiting state' || layer.props.image === null || layer.props.bounds === null) {
        return layer;
      }

      const isVisible = index === this.props.currentTimestepIndex;

      return new BitmapLayer({
        id: layer.props.id,
        image: layer.props.image,
        visible: isVisible,
        bounds: layer.props.bounds,
      });
    });
    return this.state.timestepLayers;
  }
}

export default AnimationLayerDeckGL;
