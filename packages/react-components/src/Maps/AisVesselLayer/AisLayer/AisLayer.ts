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
  fetchAisTileData: (x: number, y: number, z: number) => Promise<any>,
) => {
  return new TileLayer({
    id: "ais-layer",
    maxCacheByteSize: 0,
    extent: [-179, -89, 179, 89],
    getTileData: async (tile: any): Promise<any> => {
      const { x, y, z, signal, bbox } = tile;

      if (signal.aborted) {
        return false;
      }

      const data = await fetchAisTileData(x, y, z, bbox); 

      return data;
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