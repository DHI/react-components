import { CompositeLayerProps } from '@deck.gl/core/lib/composite-layer';

export interface AisContextProps {
  // Used in conjunction with the AIS Filter Menu.
  // The selected types are based on the standard AIS Vessel type numbers.
  selectedVesselTypes: number[];

  // Allows filtering vessels based on the current navigation status of the vessel.
  selectedNavStatus: number[];

  // Allows filtering based on a draft of a vessel (between [minDraft, maxDraft]).
  draftRange: [number, number] | null;

  // Allows filtering based on the length of a vessel (between [minLength, maxLength]).
  lengthRange: [number, number] | null;

  // Update the vessel types that are to be displayed.
  onVesselTypeChange: (shipTypeIDs: number[][]) => void;

  // Update the navigation status types that are to be displayed.
  onNavStatusChange: (navStatusIDs: number[][]) => void;

  // Update the draft range to be displayed.
  onDraftChange: (range: [number, number]) => void;

  // Update the length range to be displayed.
  onLengthChange: (range: [number, number]) => void;

  // Function for fetching data from the API. The AIS Context will handle refetching of the data on the
  // user defined refresh interval. You can supply a bounding box to this to limit the area that is
  // fetched/displayed to the user.
  fetchAisTileData: (x: number, y: number, z: number) => AisFeatureCollection;

  // Trigger to notify DeckGL to update the AIS data for the layer.
  triggerAisDataUpdate: number;
}

export interface AisProviderProps {
  // Function for fetching the AIS tile data fro the API.
  fetchVesselData: (boundingBox: [number, number, number, number]) => Promise<AisFeatureCollection>;

  // How frequently the data is refreshed from the AIS feed. If you wish to only have static data,
  // this property can be ignored.
  refreshIntervalSeconds?: number;

  // Bounding box for fetching of Vessel AIS data to limit the area/amount of data that is fetched
  // with each refresh. Format: [west, south, east, north]
  bbox?: [number, number, number, number];

  // Callback to retrieve the AIS feature collection after the data has been refreshed.
  onDataUpdated?: (updatedGeoJson: AisFeatureCollection) => void;
}

export interface AisLayerProps extends CompositeLayerProps<AisFeatureCollection> {
  // Function that is used to retrieve the AIS data (in the form of a GeoJSON feature collection).
  // This can directly call an API or go through an intermediate layer to prevent too many requests
  // from occurring (as this is a Tile Layer based component).
  fetchAisTileData: (x: number, y: number, z: number) => AisFeatureCollection;

  // Function that is used to toggle the visibility of a vessel.
  // Properties comes directly from the GeoJSON feature properties.
  // Useful for toggling vessel visibility based on certain criteria (vessel type, length, beam, draft, etc).
  isVesselVisible: (properties: any) => boolean;

  // The vessel 'points' layer will appear between these two map zoom levels.
  // If you wish to remove the points entirely, this can be set to an invalid range.
  minPointZoom?: number;
  maxPointZoom?: number;

  // The vessel 'labels' layer will appear between these two map zoom levels.
  // If you wish to remove the labels of the vessel entirely, this can be set to an invalid range.
  minLabelZoom?: number;
  maxLabelZoom?: number;

  // The 3D vessel model layer will appear between these two map zoom levels.
  // If you wish to remove the 3D models of the vessel entirely, this can be set to an invalid range.
  min3DVesselZoom?: number;
  max3DVesselZoom?: number;

  // Allows the user to set the styling of the vessel based on the Feature properties in the GeoJSON.
  // These functions are connected directly to the DeckGL GeoJsonLayer component if supplied.
  // Return format is a color in the form of [r, g, b, a] (0 - 255).
  getPointFillColor?: (properties: any) => [number, number, number, number];
  getPointLineColor?: (properties: any) => [number, number, number, number];

  // Allows the user to set the styling of the vessel labels on the Feature properties in the GeoJSON.
  // These functions are connected directly to the DeckGL GeoJsonLayer component if supplied.
  getLabelText: (properties: any) => string;
  getLabelTextColor?: (properties: any) => [number, number, number, number];
  getLabelBackgroundColor?: (properties: any) => [number, number, number, number];
  getLabelPosition?: (feature: any) => [number, number, number];
  getLabelSize?: (properties: any) => number;

  // If you wish to have the 3D vessels without the internal shapes (e.g. shipping containers), you can
  // directly set the elevation/height of the vessel with this function.
  get3DVesselElevation?: (properties: any) => number;

  // Used for mapping the AIS feature collection's property keys to each of the required values of the
  // components. Used to prevent requiring to transform the data between pascal and camel case from
  // the API.
  vesselAttributeMapping: VesselAttributeMapping;

  // Color palette supplied for coloring the vessels.
  colorPalette: VesselColorPalette;

  // Update Triggers to detech changes to the AIS data feed.
  triggerAisDataUpdate: number;
}

export interface VesselView {
  defaultParams: VesselDefaultParams;
  geometry: VesselComponentView[];
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
  type: 'Feature';
  geometry: PointGeometry;
  properties: any;
}

export interface MultiPolygon {
  type: 'MultiPolygon';
  coordinates: number[][][][];
  style: any;
}

export interface PointGeometry {
  type: 'Point';
  coordinates: number[];
}

export type VesselType =
  | 'CruiseLiner'
  | 'GeneralCargo'
  | 'Tanker'
  | 'Yacht'
  | 'ContainerVessel'
  | 'BulkCarrier'
  | 'Roro';

// Used for mapping the AIS feature collection's property keys to each of the required values of the
// components. Used to prevent requiring to transform the data between pascal and camel case from
// the API.
export interface VesselAttributeMapping {
  shipType: string;
  heading: string;
  length: string;
  width: string;
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
  secondary: string;
  tertiary: string;
}
