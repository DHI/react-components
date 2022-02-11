import { CompositeLayer } from "@deck.gl/core";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers";
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
      data,
      tileX,
      tileY,
      tileZ,
      selectedShipTypes,
      selectedNavStatus,
      draftRange,
      lengthRange,
    } = this.props;
    const { zoom } = this.context.viewport;

    const dataToShow = {
      ...data,
      features: data.features.filter((feature: any) =>
        isSelectedVessel(
          feature.properties,
          selectedShipTypes,
          selectedNavStatus,
          draftRange,
          lengthRange
        )
      ),
    };

    let vessel3DFeature;
    let textLayerData;
    if (zoom >= 12) {
      vessel3DFeature = vesselsToGeoJson3D(dataToShow);
      textLayerData = vesselsToTextLayerData(dataToShow);
    }

    return [
      zoom >= 12
        ? new GeoJsonLayer({
            id: `Vessel-GeoJSON-3D-${tileX}-${tileY}-${tileZ}`,
            data: vessel3DFeature,
            extruded: true,
            filled: true,
            getElevation: (ship: any) => ship.properties.elevation,
            getFillColor: (ship: any) => ship.properties.style.fillColor,
            getLineColor: [240, 160, 180, 200],
            pickable: true,
            stroked: false,
            visible: zoom >= 12,
          })
        : null,
      zoom >= 12
        ? new TextLayer({
            id: `Vessel-Text-Layer-${tileX}-${tileY}-${tileZ}`,
            data: textLayerData,
            visible: zoom >= 10,
            getPosition: (f: any) => {
              return [
                f.geometry.coordinates[0],
                f.geometry.coordinates[1],
                50,
              ] as any;
            },
            getText: (f: any) => {
              if (f.properties.Name) {
                return f.properties.Name;
              }
              return "";
            },
            background: true,
            getColor: (f: any) => {
              if (f.properties.Name) {
                return [255, 255, 255, 255];
              }
              return [0, 0, 0, 0];
            },
            getBackgroundColor: (f: any) => {
              if (f.properties.Name) {
                return [0, 0, 0, 200];
              }
              return [0, 0, 0, 0];
            },
            backgroundPadding: [5, 5],
            getSize: 12,
            // TODO: Update triggers.
          })
        : null,
      new GeoJsonLayer({
        id: `Vessel-Points-${tileX}-${tileY}-${tileZ}`,
        data: data,
        extruded: true,
        filled: true,
        getElevation: 5,
        getFillColor: [186, 35, 63, 200],
        getLineColor: [100, 15, 43, 200],
        pickable: true,
        getLineWidth: 10,
        pointRadiusMinPixels: 4,
        lineWidthMinPixels: 2,
        pointType: "circle",
        pointRadiusUnits: "meters",
        stroked: true,
        visible: true,
      }),
    ].filter((layer) => layer != null);
  }
}

AisCompositeLayer.layerName = "AisLayer";

export { AisCompositeLayer };
