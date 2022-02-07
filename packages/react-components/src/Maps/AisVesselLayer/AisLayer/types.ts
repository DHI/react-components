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