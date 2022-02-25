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
  onDataUpdated?: (updatedGeoJson: AisFeatureCollection) => void; 
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

export interface VesselView {
  geometry: VesselComponentView[];
  defaultParams: VesselDefaultParams;
}

export interface VesselDefaultParams {
  length: number;
  width: number;
  draft: number;
  hullHeight: number;
}

export interface VesselComponentView {
  isHull?: boolean;
  color: string;
  colorOutline: string;
  elevation?: number;
  coordinates: number[][];
}

export interface Polygon {
  isHull?: boolean;
  isAccomodation?: boolean;
  color: string;
  outlineColor: string;
  coordinates: Coordinate[];
}

type Coordinate = [number, number];

export interface AisFeatureCollection {
  type: 'FeatureCollection';
  features: Feature[] | MultiPolygon[][];
}

export interface Feature {
  type: 'Feature',
  geometry: PointGeometry;
  properties: any;
}

export interface MultiPolygon {
  type: 'MultiPolygon',
  coordinates: number[][][][],
  style: any
}

export interface PointGeometry {
  type: 'Point'
  coordinates: number[];
}

export type VesselType = 'CruiseLiner' | 'GeneralCargo' | 'Tanker' | 'Yacht' | 'ContainerVessel' | 'BulkCarrier' | 'Roro';

export interface VesselAttributeMapping {
  shipType: string;
  heading: string;
  length: string;
  width:  string;
  draft: string;
  toBow: string | null;
  toStern: string | null;
  toPort: string | null;
  toStarboard: string | null;
  hullOverride?: string | null;
  showInnerVesselLayout?: boolean;
}

export interface VesselColorPalette {
  primary: string;
  secondary: string,
  tertiary: string;
}