import { CompositeLayer } from "@deck.gl/core";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers";
import { TileLayer } from "deck.gl";
import { AisFeatureCollection, AisLayerProps, Feature, VesselAttributeMapping, VesselColorPalette } from "./types";
import { createVesselFeatureCollection } from './vesselsToMapFeature';

// ==========================================
// Contents
// ==========================================
// 1. Point Layer
// 2. Text Layer
// 3. 3D GeoJSON Layer


/**
 * This DeckGL layer combines 3 separate layers into one, and shows the appropriate layer depending on the
 * zoom level. Layers:
 * 1. Point layer - to show the vessel location at a high level overview.
 * 2. Text layer - to show the name of the vessel as the user zooms in.
 * 3. GeoJSON layer (3D) - to show the general vessel shape.
 */
class AisLayer extends CompositeLayer<AisFeatureCollection, AisLayerProps> {
  shouldUpdateState({ changeFlags }: { changeFlags: any }) {
    return changeFlags.somethingChanged;
  }

  renderLayers() {
    const {
      fetchAisTileData,
      isVesselVisible,
      vesselAttributeMapping,
      colorPalette,
      minPointZoom,
      maxPointZoom,
      minLabelZoom,
      maxLabelZoom,
      min3DVesselZoom,
      max3DVesselZoom,
      getPointFillColor,
      getPointLineColor,
      getLabelText,
      getLabelTextColor,
      getLabelBackgroundColor,
      getLabelPosition,
      getLabelSize,
      get3DVesselElevation,
      triggerAisDataUpdate,
    } = this.props;
    const { zoom } = this.context.viewport;

    const pointMinZ = minPointZoom != null ? minPointZoom : 0;
    const pointMaxZ = maxPointZoom != null ? maxPointZoom : 20;
    const labelMinZ = minLabelZoom != null ? minLabelZoom : 12;
    const labelMaxZ = maxLabelZoom != null ? maxLabelZoom : 20;
    const vesselMinZ = min3DVesselZoom != null ? min3DVesselZoom : 12;
    const vesselMaxZ = max3DVesselZoom != null ? max3DVesselZoom : 20;

    return [

      // ==========================================
      // 1. Point Layer
      // ==========================================
      zoom >= pointMinZ && zoom <= pointMaxZ ?
        new TileLayer({
          id: 'tile-vessel-points',
          getTileData: async (tile: { x: number, y: number, z: number, signal: AbortSignal }): Promise<any> => {
            const { x, y, z, signal } = tile;
            if (signal.aborted) {
              return false;
            }
            return fetchAisTileData(x, y, z); 
          },
          renderSubLayers: (props: any) => {   
            const { x, y, z } = props.tile;

            return new GeoJsonLayer(props, {
              id: `Vessel-Points-${x}-${y}-${z}`,
              data: props.data,
              extruded: true,
              filled: true,
              getElevation: 5,
              getFillColor: (f: Feature) => {
                if (isVesselVisible(f.properties)) {
                  if (getPointFillColor) {
                    return getPointFillColor(f.properties);
                  }
                  return [186, 35, 63, 200];
                }
                return [255, 255, 255, 0];
              },
              getLineColor: (f: Feature) => {
                if (isVesselVisible(f.properties)) {
                  if (getPointLineColor) {
                    return getPointLineColor(f.properties);
                  }
                  return [100, 15, 43, 200];
                }
                return [255, 255, 255, 0];
              },
              pickable: true,
              getLineWidth: 10,
              pointRadiusMinPixels: 4,
              lineWidthMinPixels: 2,
              pointType: "circle",
              pointRadiusUnits: "meters",
              stroked: true,
              visible: true,
              updateTriggers: {
                getFillColor: isVesselVisible,
                getLineColor: isVesselVisible,
              }
            });
          },
          updateTriggers: {
            renderSubLayers: isVesselVisible,
            getTileData: triggerAisDataUpdate,
          }
        }) : null,

      // ==========================================
      // 2. Text Layer
      // ==========================================

      zoom >= labelMinZ && zoom <= labelMaxZ ?
        new TileLayer({
          id: 'tile-vessel-labels',
          getTileData: async (tile: { x: number, y: number, z: number, signal: AbortSignal }): Promise<any> => {
            const { x, y, z, signal } = tile;
            if (signal.aborted) {
              return;
            }
            return fetchAisTileData(x, y, z); 
          },
          renderSubLayers: ({ tile, data }: {tile: { x: number, y: number, z: number}, data: AisFeatureCollection}) => {
            const { x, y, z } = tile;

            return new TextLayer({
              id: `Vessel-Text-Layer-${x}-${y}-${z}`,
              data: data.features,
              visible: zoom >= 10,
              background: true,
              getPosition: (f: Feature): any => {
                if (getLabelPosition) {
                  return getLabelPosition(f);
                }
                
                return [
                  f.geometry.coordinates[0],
                  f.geometry.coordinates[1],
                  50,
                ];
              },
              getText: (f: Feature) => getLabelText(f.properties),
              getColor: (f: Feature): [number, number, number, number] => {
                if (isVesselVisible(f.properties)) {
                  if (getLabelTextColor) {
                    return getLabelTextColor(f.properties);
                  }
                  return [255, 255, 255, 255];
                }
                return [0, 0, 0, 0];
              },
              getBackgroundColor: (f: Feature): [number, number, number, number] => {
                if (isVesselVisible(f.properties)) {
                  if (getLabelBackgroundColor) {
                    return getLabelBackgroundColor(f.properties);
                  }
                  return [0, 0, 0, 200];
                }
                return [0, 0, 0, 0];
              },
              backgroundPadding: [5, 5],
              getSize: (f: Feature): number => {
                if (getLabelSize) {
                  return getLabelSize(f.properties);
                }
                return 12;
              },
              updateTriggers: {
                getColor: isVesselVisible,
                getBackgroundColor: isVesselVisible,
              }
            })
          },
          updateTriggers: {
            renderSubLayers: isVesselVisible,
            getTileData: triggerAisDataUpdate,
          }
        }) : null,


      // ==========================================
      // 3. 3D GeoJSON Layer
      // ==========================================
  
      zoom >= vesselMinZ && zoom <= vesselMaxZ ?
        new TileLayer({
          id: 'tile-vessel-3D',
          getTileData: async (tile: { x: number, y: number, z: number, signal: AbortSignal }): Promise<Feature[]> => {
            const { x, y, z, signal } = tile;
            if (signal.aborted) {
              return;
            }
            const data = fetchAisTileData(x, y, z); 
            const data3D = createVesselFeatureCollection(data, vesselAttributeMapping, colorPalette) as any;
            return data3D;
          },
          renderSubLayers: (props: any) => {   
            const { x, y, z, } = props.tile;
  
            return new GeoJsonLayer(props, {
              id: `Vessel-3D-${x}-${y}-${z}`,
              data: props.data,
              extruded: true,
              filled: true,
              getElevation: (f: Feature) => {
                if (get3DVesselElevation) {
                  return get3DVesselElevation(f.properties);
                }
                return 10;
              },
              getFillColor: (f: Feature) => {
                if (isVesselVisible(f.properties)) {
                  return f.properties.style.fillColor
                }
                return [0, 0, 0, 0];
              },
              getLineColor: (f: Feature) => {
                if (isVesselVisible(f.properties)) {
                  return [240, 160, 180, 200];
                }
                return [0, 0, 0, 0];
              },
              pickable: true,
              stroked: false,
              visible: zoom >= 12,
              updateTriggers: {
                getFillColor: isVesselVisible,
                getLineColor: isVesselVisible,
              }
            });
          },
          updateTriggers: {
            renderSubLayers: isVesselVisible,
            getTileData: triggerAisDataUpdate,
          }
        }) : null,
    ].filter(layer => layer != null);
  }
}

AisLayer.layerName = "AisLayer";

export { AisLayer };
