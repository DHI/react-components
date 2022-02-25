import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { RangeFilterProps } from './types';
import { createSliderMarks } from './helpers';

/**
 * Creates a simple slider for selecting between a range of values.
 * E.g. Limiting the vessels visible to be between a certain length.
 */
export const RangeFilter: React.FC<RangeFilterProps> = ({ min, max, minorTick, majorTick, onChange }) => {
  const [value, setValue] = React.useState<[number, number]>([min, max]);
  const [marks, setMarks] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    setMarks(createSliderMarks(min, max, minorTick, majorTick));
  }, [min, max, minorTick, majorTick]);

  const handleChange = (event: any, newRange: number | number[]) => {
    setValue(newRange as [number, number]);
  };

  const handleChangeCommitted = (event: any, newRange: number | number[]) => {
    onChange(newRange as [number, number]);
  };

  if (!marks) {
    return null;
  }

  return (
    <Slider
      min={min}
      max={max}
      step={minorTick}
      marks={marks}
      value={value}
      onChange={handleChange}
      onChangeCommitted={handleChangeCommitted}
    />
  );
};
