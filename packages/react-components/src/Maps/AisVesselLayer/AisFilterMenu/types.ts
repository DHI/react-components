
export interface GroupedMultiSelectedProps {
  label: string;
  placeholder: string;
  options: {
    label: string;
    values: number[];
  }[];
  onChange: (selection: number[]) => void;
}

export interface NavStatusFilterProps {
  onChange: (navStatusIDs: number[]) => void;
}

export interface RangeFilterProps {
  min: number;
  max: number;
  minorTick: number;
  majorTick: number;
  onChange: (newRange: [number, number]) => void;
}

export interface AisVesselTypeFilterProps {
  onChange: (shipTypeIDs: number[]) => void;
}