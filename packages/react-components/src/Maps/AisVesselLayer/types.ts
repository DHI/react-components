import { CompositeLayerProps } from "@deck.gl/core/lib/composite-layer";

export interface AisContextProps {
  selectedVesselTypes: number[];
  selectedNavStatus: number[];
  draftRange: [number, number] | null;
  lengthRange: [number, number] | null;
  onVesselTypeChange: (shipTypeIDs: number[][]) => void;
  onNavStatusChange: (navStatusIDs: number[][]) => void;
  onDraftChange: (range: [number, number]) => void;
  onLengthChange: (range: [number, number]) => void;
  fetchAisTileData: (x: number, y: number, z: number) => AisFeatureCollection;
  triggerAisDataUpdate: number,
}

export interface AisProviderProps {
  fetchVesselData: (boundingBox: [number, number, number, number]) => Promise<any>;
  refreshIntervalSeconds?: number;
}

export interface AisLayerProps extends CompositeLayerProps<AisFeatureCollection> {
  fetchAisTileData: (x: number, y: number, z: number) => AisFeatureCollection

  // Visibility
  isVesselVisible: (properties: any) => boolean;
  minPointZoom?: number;
  maxPointZoom?: number;
  minLabelZoom?: number;
  maxLabelZoom?: number;
  min3DVesselZoom?: number;
  max3DVesselZoom?: number;

  // Point styling.
  getPointFillColor?: (properties: any) => [number, number, number, number];
  getPointLineColor?: (properties: any) => [number, number, number, number];

  // Label styling.
  getLabelText: (properties: any) => string;
  getLabelTextColor?: (properties: any) => [number, number, number, number];
  getLabelBackgroundColor?: (properties: any) => [number, number, number, number];
  getLabelPosition?: (feature: any) => [number, number, number];
  getLabelSize?: (properties: any) => number;

  // 3D GeoJSON styling.
  get3DVesselElevation?: (properties: any) => number;

  // Update Triggers.
  triggerAisDataUpdate: number;
}

export interface VesselViewDefinition {
  pick?: boolean;
  from?: number;
  to?: number;
  polygons: Polygon[];
  points?: {
    fairleadCoefficients: PointCoefficient[];
    winchCoefficients: PointCoefficient[];
  };
}

export interface Polygon {
  isHull?: boolean;
  isAccomodation?: boolean;
  color: string;
  outlineColor: string;
  coordinates: Coordinate[];
}

type Coordinate = [number, number];
type PointCoefficient = [number, number];


export interface AisFeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
}

export interface Feature {
  type: 'Feature',
  geometry: PointGeometry;
  properties: any;
}

export interface PointGeometry {
  type: 'Point'
  coordinates: number[];
}
