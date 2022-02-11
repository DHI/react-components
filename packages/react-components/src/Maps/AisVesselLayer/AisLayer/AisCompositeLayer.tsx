import { CompositeLayer } from "@deck.gl/core";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers";
import { TileLayer } from "deck.gl";
import { isSelectedVessel } from "./helpers";
import { vesselsToGeoJson3D, vesselsToTextLayerData } from './vesselsToMapFeature';

/**
 * This DeckGL layer combines 3 separate layers into one, and shows the appropriate layer depending on the
 * zoom level. Layers:
 * 1. Point layer - to show the vessel location at a high level overview.
 * 2. Text layer - to show the name of the vessel as the user zooms in.
 * 3. GeoJSON layer (3D) - to show the general vessel shape.
 */
class AisCompositeLayer extends CompositeLayer<any, any> {
  shouldUpdateState({ props, oldProps, changeFlags }: { props: any, oldProps: any, changeFlags: any }) {
    return changeFlags.somethingChanged;
  }

  renderLayers() {
    const {
      selectedShipTypes,
      selectedNavStatus,
      draftRange,
      lengthRange,
      fetchAisTileData,
      triggerAisDataUpdate,
      triggerAisSelectionUpdate,
      visualizationConfig,
    } = this.props;
    const { zoom } = this.context.viewport;

    return [
      new TileLayer({
        id: 'tile-vessel-points',
        getTileData: async (tile: any) => {
          const { x, y, z, signal, bbox } = tile;
          if (signal.aborted) {
            return false;
          }
          return await fetchAisTileData(x, y, z); 
        },
        renderSubLayers: (props: any) => {   
          const { x, y, z, signal, bbox } = props.tile;

          return new GeoJsonLayer(props, {
            id: `Vessel-Points-${x}-${y}-${z}`,
            data: props.data,
            extruded: true,
            filled: true,
            getElevation: 5,
            getFillColor: (f: any) => {
              if (isSelectedVessel(f.properties, selectedShipTypes, selectedNavStatus, draftRange, lengthRange)) {
                return [186, 35, 63, 200];
              }
              return [255, 255, 255, 0];
            },
            getLineColor: (f: any) => {
              if (isSelectedVessel(f.properties, selectedShipTypes, selectedNavStatus, draftRange, lengthRange)) {
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
              getFillColor: triggerAisSelectionUpdate,
              getLineColor: triggerAisSelectionUpdate,
            }
          });
        },
        updateTriggers: {
          renderSubLayers: triggerAisSelectionUpdate,
          getTileData: triggerAisDataUpdate,
        }
      }),
      zoom >= 12 ?
        new TileLayer({
          id: 'tile-vessel-labels',
          getTileData: async (tile: any) => {
            const { x, y, z, signal, bbox } = tile;
            if (signal.aborted) {
              return false;
            }
            const data = await fetchAisTileData(x, y, z); 
            return data.features;
          },
          renderSubLayers: (props: any) => {
            const { x, y, z, signal, bbox } = props.tile;

            return new TextLayer({
              id: `Vessel-Text-Layer-${x}-${y}-${z}`,
              data: props.data,
              visible: zoom >= 10,
              getPosition: (f: any) => {
                return [
                  f.geometry.coordinates[0],
                  f.geometry.coordinates[1],
                  50,
                ] as any;
              },
              getText: (f: any) => visualizationConfig.vesselLabel(f.properties),
              background: true,
              getColor: (f: any): any => {
                if (f.properties.Name && isSelectedVessel(f.properties, selectedShipTypes, selectedNavStatus, draftRange, lengthRange)) {
                  return [255, 255, 255, 255];
                }
                return [0, 0, 0, 0];
              },
              getBackgroundColor: (f: any) => {
                if (f.properties.Name && isSelectedVessel(f.properties, selectedShipTypes, selectedNavStatus, draftRange, lengthRange)) {
                  return [0, 0, 0, 200];
                }
                return [0, 0, 0, 0];
              },
              backgroundPadding: [5, 5],
              getSize: 12,
              updateTriggers: {
                getColor: triggerAisSelectionUpdate,
                getBackgroundColor: triggerAisSelectionUpdate,
              }
            })
          },
          updateTriggers: {
            renderSubLayers: triggerAisSelectionUpdate,
            getTileData: triggerAisDataUpdate,
          }
        }) : null,
      zoom >= 12 ?
        new TileLayer({
          id: 'tile-vessel-3D',
          getTileData: async (tile: any) => {
            const { x, y, z, signal, bbox } = tile;
            if (signal.aborted) {
              return false;
            }
            const data = await fetchAisTileData(x, y, z); 
            const data3D = vesselsToGeoJson3D(data);
            return data3D;
          },
          renderSubLayers: (props: any) => {   
            const { x, y, z, } = props.tile;
  
            return new GeoJsonLayer(props, {
              id: `Vessel-3D-${x}-${y}-${z}`,
              data: props.data,
              extruded: true,
              filled: true,
              getElevation: (f: any) => f.properties.elevation,
              getFillColor: (f: any) => {
                if (isSelectedVessel(f.properties, selectedShipTypes, selectedNavStatus, draftRange, lengthRange)) {
                  return f.properties.style.fillColor
                }
                return [0, 0, 0, 0];
              },
              getLineColor: (f: any) => {
                if (isSelectedVessel(f.properties, selectedShipTypes, selectedNavStatus, draftRange, lengthRange)) {
                  return [240, 160, 180, 200];
                }
                return [0, 0, 0, 0];
              },
              pickable: true,
              stroked: false,
              visible: zoom >= 12,
              updateTriggers: {
                getFillColor: triggerAisSelectionUpdate,
                getLineColor: triggerAisSelectionUpdate,
              }
            });
          },
          updateTriggers: {
            renderSubLayers: triggerAisSelectionUpdate,
            getTileData: triggerAisDataUpdate,
          }
        }) : null,
    ].filter(layer => layer != null);
  }
}

AisCompositeLayer.layerName = "AisLayerV2";

export { AisCompositeLayer };
