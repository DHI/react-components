import { TileLayer } from "@deck.gl/geo-layers";
import { VisualizationConfig } from "../types";
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
  triggerAisDataUpdate: number,
  triggerAisSelectionUpdate: number,
  visualizationConfig: VisualizationConfig,
) => {
  return new AisCompositeLayer({
    id: 'vessel-layer',
    selectedShipTypes,
    selectedNavStatus,
    draftRange,
    lengthRange,
    fetchAisTileData,
    triggerAisDataUpdate,
    triggerAisSelectionUpdate,
    visualizationConfig,
  });
}