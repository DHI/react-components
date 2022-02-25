import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { RangeFilter } from './RangeFilter';
import { useAis } from '../AisContext';
import { AisFilterMenuProps } from './types';
import { GroupedMultiSelect } from './GroupedMultiSelect';

/**
 * Creates a simple menu for filtering vessel attributes in AisLayer map component.
 * Used for toggling the visibility of the vessels based on the user's preferences.
 */
export const AisFilterMenu: FC<AisFilterMenuProps> = ({
  vesselTypeLabel,
  navStatusLabel,
  draftLabel,
  lengthLabel,
  vesselTypeOptions,
  navStatusOptions,
}) => {
  const { onVesselTypeChange, onNavStatusChange, onDraftChange, onLengthChange } = useAis();

  return (
    <>
      <Box py={1}>
        <GroupedMultiSelect
          label={vesselTypeLabel}
          placeholder={vesselTypeLabel}
          options={vesselTypeOptions}
          onChange={onVesselTypeChange}
        />
      </Box>
      <Box py={1}>
        <GroupedMultiSelect
          label={navStatusLabel}
          placeholder={navStatusLabel}
          options={navStatusOptions}
          onChange={onNavStatusChange}
        />
      </Box>
      <Box display="flex" flexDirection="row" my={1} mr={1}>
        <Box width="8ch" mt={0.5}>
          <Typography>{draftLabel}</Typography>
        </Box>
        <Box flexGrow={1}>
          <RangeFilter min={0} max={15} minorTick={0.5} majorTick={2.5} onChange={onDraftChange} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" my={1} mr={1}>
        <Box width="8ch" mt={0.5}>
          <Typography>{lengthLabel}</Typography>
        </Box>
        <Box flexGrow={1}>
          <RangeFilter min={0} max={400} minorTick={25} majorTick={100} onChange={onLengthChange} />
        </Box>
      </Box>
    </>
  );
};
