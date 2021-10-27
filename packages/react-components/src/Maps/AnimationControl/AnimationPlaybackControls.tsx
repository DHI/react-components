import * as React from 'react';
import { AnimationPlaybackControlsProps } from './types';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

/**
 * Set of playback control buttons for navigating timesteps in the AnimationLayer.
 * Allows pausing, playing, and stepping through timesteps.
 */
const AnimationPlaybackControls: React.FC<AnimationPlaybackControlsProps> = ({
  isPlaying,
  isEnabled,
  onSkipToStart,
  onSkipToEnd,
  onStepBackward,
  onStepForward,
  onPlay,
  onPause,
}) => {
  return (
    <ToggleButtonGroup size="small">
      <ToggleButton value="skip-to-start" disabled={!isEnabled} onClick={onSkipToStart}>
        <SkipPreviousIcon />
      </ToggleButton>
      <ToggleButton value="step-backward" disabled={!isEnabled} onClick={onStepBackward}>
        <NavigateBeforeIcon />
      </ToggleButton>
      {isPlaying ? (
        <ToggleButton value="pause" disabled={!isEnabled} onClick={onPause}>
          <PauseIcon />
        </ToggleButton>
      ) : (
        <ToggleButton value="play" disabled={!isEnabled} onClick={onPlay}>
          <PlayArrowIcon />
        </ToggleButton>
      )}
      <ToggleButton value="step-forward" disabled={!isEnabled} onClick={() => onStepForward()}>
        <NavigateNextIcon />
      </ToggleButton>
      <ToggleButton value="skip-to-end" disabled={!isEnabled} onClick={onSkipToEnd}>
        <SkipNextIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default AnimationPlaybackControls;
