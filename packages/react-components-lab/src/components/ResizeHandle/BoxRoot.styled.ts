import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { HandleProps } from './types';

export default styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<Partial<HandleProps>>(({ isCollapsed, vertical }) => {
  const getCursor = () => {
    if (isCollapsed) return 'pointer !important';
    if (!vertical) return 's-resize';
    return 'w-resize';
  };
  return {
    cursor: getCursor(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  };
});
