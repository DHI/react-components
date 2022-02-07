import { FC } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { RangeFilter } from './RangeFilter';
import { AisVesselTypeFilter } from './AisVesselTypeFilter';
import { NavStatusFilter } from './NavStatusFilter';
import { useAis } from '../AisContext';

export const AisFilterMenu: FC<{}> = ({}) => {
  const {
    onVesselTypeChange,
    onNavStatusChange,
    onDraftChange,
    onLengthChange,
  } = useAis();

  return (
    <>
      <Typography variant="overline">Filter</Typography>
      <Divider />
      <Box py={1}>
        <AisVesselTypeFilter onChange={onVesselTypeChange} />
      </Box>
      <Box py={1}>
        <NavStatusFilter onChange={onNavStatusChange} />
      </Box>
      <Box display="flex" flexDirection="row" my={1}>
        <Box width="8ch" mt={0.5}>
          <Typography variant="overline">Draft</Typography>
        </Box>
        <Box flexGrow={1}>
          <RangeFilter
            min={0}
            max={15}
            minorTick={0.5}
            majorTick={2.5}
            onChange={onDraftChange}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" my={1}>
        <Box width="8ch" mt={0.5}>
          <Typography variant="overline">Length</Typography>
        </Box>
        <Box flexGrow={1}>
          <RangeFilter
            min={0}
            max={400}
            minorTick={25}
            majorTick={100}
            onChange={onLengthChange}
          />
        </Box>
      </Box>
    </>
  );
};
