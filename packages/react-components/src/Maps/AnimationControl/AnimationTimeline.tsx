import * as React from 'react';
import { AnimationTimelineProps } from './types';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const AnimationTimeline: React.FC<AnimationTimelineProps> = ({
  timestepIndex,
  maxTimestepIndex,
  timestepLabel,
  onTimestepIndexChange,
  isHorizontal,
}) => {
  return (
    <Box display="flex" flexDirection={isHorizontal ? "row" : "column"} justifyContent="center" alignItems="center">
      <Box textAlign="center" mx={isHorizontal ? 2 : 0}> 
        <Typography component="span" variant="caption" style={{ fontSize: '0.9rem' }}>{timestepLabel}</Typography>
      </Box>
      <Slider
        value={timestepIndex}
        min={0}
        max={maxTimestepIndex}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        onChange={(event, index) => onTimestepIndexChange(index as number)}
      />
    </Box>
  );
};

export default AnimationTimeline;
