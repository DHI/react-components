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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SpeedIcon from '@material-ui/icons/Speed';

const AnimationPlaybackControls: React.FC<AnimationPlaybackControlsProps> = ({
  isPlaying,
  onSkipToStart,
  onSkipToEnd,
  onStepBackward,
  onStepForward,
  onPlay,
  onPause,
}) => {
  return (
    <>
      <ToggleButtonGroup size="small">
        <ToggleButton value="skip-to-start" onClick={onSkipToStart}>
          <SkipPreviousIcon />
        </ToggleButton>
        <ToggleButton value="step-backward" onClick={onStepBackward}>
          <NavigateBeforeIcon />
        </ToggleButton>
        {isPlaying ? (
          <ToggleButton value="pause" onClick={onPause}>
            <PauseIcon />
          </ToggleButton>
        ) : (
          <ToggleButton value="play" onClick={onPlay}>
            <PlayArrowIcon />
          </ToggleButton>
        )}
        <ToggleButton value="step-forward" onClick={() => onStepForward()}>
          <NavigateNextIcon />
        </ToggleButton>
        <ToggleButton value="skip-to-end" onClick={onSkipToEnd}>
          <SkipNextIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      {/* <ToggleButtonGroup size="small">
        <ToggleButton value={framesPerSecond} onClick={handlePlaybackSpeedClick}>
          <SpeedIcon />
          <ArrowDropDownIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Menu
        id="playback-speed-selection-menu"
        anchorEl={speedAnchorEl}
        keepMounted
        open={Boolean(speedAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>5 fps</MenuItem>
        <MenuItem onClick={handleClose}>10 fps</MenuItem>
        <MenuItem onClick={handleClose}>25 fps</MenuItem>
      </Menu>
      */}
    </>
  )
};

export default AnimationPlaybackControls;
