import { TileLayer } from "@deck.gl/geo-layers";
import { AisCompositeLayer } from "./AisCompositeLayer";

/**
 * Updates the AIS map layer based on the provided information.
 */
export const renderAisLayer = (
  selectedShipTypes: number[],
  selectedNavStatus: number[],
  draftRange: [number, number] | null,
  lengthRange: [number, number] | null,
  fetchAisTileData: (x: number, y: number, z: number, bbox: { west: number, south: number, east: number, north: number }) => void,
) => {
  console.log('RENDER AIS: ', selectedShipTypes, selectedNavStatus, draftRange, lengthRange);

  return new TileLayer({
    id: "tilelayertest", // TODO: Should not have hardcoded AIS Layer.
    minZoom: 2,
    maxZoom: 10,
    maxRequests: 20,
    extent: [-179, -89, 179, 89],
    getTileData: (tile: any): any => {
      const { x, y, z, signal, bbox } = tile;

      if (signal.aborted) {
        return false;
      }

      return fetchAisTileData(x, y, z, bbox); 
    },
    renderSubLayers: (props: any) => {
      const { x, y, z } = props.tile;

      return new AisCompositeLayer({
        id: `AisTile-${x}-${y}-${z}`,
        data: props.tile.content,
        tileX: x,
        tileY: y,
        tileZ: z,
        selectedShipTypes,
        selectedNavStatus,
        draftRange,
        lengthRange,
      });
    },
  });
}