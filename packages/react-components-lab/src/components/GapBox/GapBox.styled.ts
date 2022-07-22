import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Props } from './types';

const options = {
  shouldForwardProp: (prop) => prop !== 'gap',
};

const GapBoxStyled = styled(
  Box,
  options
)<Props>(({ gap, theme }) => ({
  gap: theme.spacing(Number(gap ?? 1)),
}));

export default GapBoxStyled;
