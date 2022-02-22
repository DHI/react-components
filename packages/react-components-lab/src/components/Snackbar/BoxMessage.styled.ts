import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export default styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  [`& .MuiSvgIcon-root`]: {
    marginRight: 4,
  },
});
