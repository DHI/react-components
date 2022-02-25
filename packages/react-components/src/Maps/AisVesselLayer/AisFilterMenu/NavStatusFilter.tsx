import React from "react";
import { GroupedMultiSelect } from "./GroupedMultiSelect";
import { NavStatusFilterProps } from './types';

const navStatusOptions = [
  {
    label: "Underway",
    values: [0],
  },
  {
    label: "Anchored",
    values: [1, 5],
  },
  {
    label: "Not Under Command",
    values: [2],
  },
  {
    label: "Other",
    values: [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
];

export const NavStatusFilter: React.FC<NavStatusFilterProps> = ({
  label,
  onChange,
}) => {
  return (
    <GroupedMultiSelect
      label={label}
      placeholder={label}
      options={navStatusOptions}
      onChange={onChange}
    />
  );
};