import * as React from 'react';
import { AnimationTimelineProps } from './types';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

/**
 * Creates a timelime that the user can scrub through for the AnimationControls component
 */
const AnimationTimeline: React.FC<AnimationTimelineProps> = ({
  timestepIndex,
  maxTimestepIndex,
  timestepLabel,
  onTimestepIndexChange,
  isHorizontal,
  isEnabled,
}) => {
  return (
    <Box display="flex" flexDirection={isHorizontal ? "row" : "column"} justifyContent="center" alignItems="center">
      <Box textAlign="center" mx={isHorizontal ? 2 : 0}> 
        <Typography component="span" variant="caption" style={{ fontSize: '0.9rem',  }}>{timestepLabel}</Typography>
      </Box>
      <Slider
        value={timestepIndex}
        min={0}
        max={maxTimestepIndex}
        disabled={!isEnabled}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        onChange={(_, index) => onTimestepIndexChange(index as number)}
      />
    </Box>
  );
};

export default AnimationTimeline;
