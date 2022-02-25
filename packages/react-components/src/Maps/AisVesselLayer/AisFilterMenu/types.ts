export interface AisFilterMenuProps {
  vesselTypeLabel: string;
  navStatusLabel: string;
  draftLabel: string;
  lengthLabel: string;
  vesselTypeOptions: { label: string; values: number[] }[];
  navStatusOptions: { label: string; values: number[] }[];
}

export interface AisVesselTypeFilterProps {
  label: string;
  vesselTypeOptions: { label: string; values: number[] }[];
  onChange: (shipTypeIDs: number[][]) => void;
}

export interface GroupedMultiSelectedProps {
  label: string;
  placeholder: string;
  options: {
    label: string;
    values: number[];
  }[];
  onChange: (selection: number[][]) => void;
}

export interface RangeFilterProps {
  min: number;
  max: number;
  minorTick: number;
  majorTick: number;
  onChange: (newRange: [number, number]) => void;
}
