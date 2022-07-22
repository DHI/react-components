import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export default styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 75,
});
