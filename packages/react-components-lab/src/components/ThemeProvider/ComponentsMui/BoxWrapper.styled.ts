import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { IMikeTheme } from '../types';

export default styled(Box)(({ theme }: { theme: IMikeTheme }) => ({
  border: `2px solid ${theme.palette.darkGrey.light}`,
  borderRadius: '0.3em',
  minHeight: 100,
  margin: 8,
  padding: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
}));
