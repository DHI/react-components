export interface AisContextProps {
  selectedVesselTypes: number[];
  selectedNavStatus: number[];
  draftRange: [number, number] | null;
  lengthRange: [number, number] | null;
  onVesselTypeChange: (shipTypeIDs: number[]) => void;
  onNavStatusChange: (navStatusIDs: number[]) => void;
  onDraftChange: (range: [number, number]) => void;
  onLengthChange: (range: [number, number]) => void;
  fetchAisTileData: (x: number, y: number, z: number, bbox: { west: number, south: number, east: number, north: number }) => void;
}

export interface AisProviderProps {
  fetchVesselData: (boundingBox: [number, number, number, number]) => Promise<any>;
}
