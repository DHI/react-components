import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export default styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  [`& .MuiSvgIcon-root`]: {
    marginRight: 4,
  },
});
