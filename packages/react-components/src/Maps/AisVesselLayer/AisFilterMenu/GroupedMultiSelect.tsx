import React, { FC } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
import { GroupedMultiSelectedProps } from './types';

/**
 * Component that allows selecting groups of 'ID's in a menu.
 * E.g. For a vessel, selecting 'Cargo' will return all the AIS IDs that are associated with
 * cargo vessel (from 70 to 79).
 */
export const GroupedMultiSelect: FC<GroupedMultiSelectedProps> = ({ label, placeholder, options, onChange }) => {
  return (
    <Autocomplete
      multiple
      size="small"
      id={`${label}-filter-id`}
      options={options}
      disableCloseOnSelect
      onChange={(_, selectedGroups) => {
        const selected = selectedGroups as any;
        onChange(
          selected.map((group) => {
            if (group && group.values) {
              return group.values.flat();
            }
          }),
        );
      }}
      getOptionLabel={(option) => option.label}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </>
      )}
      fullWidth
      renderInput={(params) => <TextField {...params} variant="outlined" label={label} placeholder={placeholder} />}
    />
  );
};
