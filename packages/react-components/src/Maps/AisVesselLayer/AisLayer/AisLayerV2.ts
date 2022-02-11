import { TileLayer } from "@deck.gl/geo-layers";
import { AisCompositeLayerV2 } from "./AisCompositeLayerV2";

/**
 * Updates the AIS map layer based on the provided information.
 */
export const renderAisLayer = (
  selectedShipTypes: number[],
  selectedNavStatus: number[],
  draftRange: [number, number] | null,
  lengthRange: [number, number] | null,
  fetchAisTileData: (x: number, y: number, z: number) => Promise<any>,
  triggerLayerUpdate: number,
) => {
  return new AisCompositeLayerV2({
    id: 'vessel-layer',
    selectedShipTypes,
    selectedNavStatus,
    draftRange,
    lengthRange,
    fetchAisTileData,
    triggerLayerUpdate,
  });
}