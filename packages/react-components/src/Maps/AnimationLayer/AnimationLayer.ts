import { CompositeLayer, BitmapLayer } from 'deck.gl';
import { fetchMapAnimationFiles } from '../../api/Map/MapApi';
import { convertWGS84ToEPSG3857 } from './helpers';
import { AnimationLayerState, AnimationLayerProps } from './types';
import { debounceTime, switchMap, catchError, mergeMap, map } from 'rxjs/operators';
import { Subject, of, forkJoin } from 'rxjs';

type MapRequest = {
  requestDataSource: any;
  requestConfig: any;
  token: string;
  bboxWGS84: number[];
  bbox: string;
}

class AnimationLayer extends CompositeLayer<AnimationLayerState, AnimationLayerProps> {

  initializeState() {
    // Setup pipeline for fetching map animation images.
    const fetchPipeline = new Subject<any>();
    fetchPipeline
      .pipe(
        debounceTime(500),
        switchMap((imageRequest: any) => {
          return fetchMapAnimationFiles(imageRequest.requestDataSource, imageRequest.requestConfig, imageRequest.token)
            .pipe(
              switchMap((response) => forkJoin(
                of(imageRequest),
                response.json()
              ),
            )
          )
        }),
      )
      .subscribe({
        next: ([request, encodedImages]) => {     
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
              bounds: request.bboxWGS84,
            });
          });
      },
      error: e => console.log(e),
      complete: () => console.log('Done'),
    });

    this.state = {
      currentTimestamp: new Date().getTime().toString(),
      timestepLayers: [],
      abortFetchController: null,
      fetchPipeline: fetchPipeline,
    };

    this.fetchTimestepData();
  }

  fetchTimestepData() {
    const { apiHost, connectionString, token, filename, timesteps, style, shadingType, itemNumber, scale } = this.props;

    // Create EPSG:3857 bounding box for use with domain services.
    const nw = this.context.viewport.unproject([0, 0]);
    const se = this.context.viewport.unproject([this.context.viewport.width, this.context.viewport.height]);
    const epsg3857se = convertWGS84ToEPSG3857(se[0], se[1]);
    const epsg3857nw = convertWGS84ToEPSG3857(nw[0], nw[1]);

    // Create WGS84 bounding box for use with DeckGL.
    const bbox: any = [nw[0], se[1], se[0], nw[1]];

    // Generate the request body to retrieve the images for the timesteps of interest.
    const requestBody: any = {};
    timesteps.forEach((timestep: string) => {
      requestBody[timestep] = filename;
    });

    // Fetch data from backend.
    const { width, height } = this.context.viewport;

    this.state.fetchPipeline.next({
      requestDataSource: {
        host: apiHost,
        connection: connectionString,
        ids: requestBody
      },
      requestConfig: {
        style: style,
        item: itemNumber,
        width: width,
        height: height,
        bbox: [epsg3857nw[0], epsg3857se[1], epsg3857se[0], epsg3857nw[1]].join(','),
        shadingType: shadingType,
        scale: scale,
      },
      bboxWGS84: bbox,
      token,
    });
  }

  updateState({props, oldProps, context, changeFlags}: {props: any, oldProps: any, context: any, changeFlags: any}) {
    if (Object.keys(oldProps).length === 0) {
      return;
    }
    
    if (changeFlags.viewportChanged) {
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
      if (layer.lifecycle === 'Awaiting state' || layer.props.image == null || layer.props.bounds == null) {
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

export default AnimationLayer;
