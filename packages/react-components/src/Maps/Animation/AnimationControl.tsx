import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SpeedIcon from '@material-ui/icons/Speed';

import { format } from 'date-fns';

export type AnimationControlProps = {
  // Status of whether the component is currently playing or not
  playing: boolean,
  // Element is enabled if this is set to true. Disabled if set to false.
  enabled: boolean,
  // Returns current datetime out of all the time steps.
  onDateTimeChange: (date: string) => void,
  // Orientation of control.
  horizontal: boolean,
  // Hide controls.
  hideControls: boolean,

  // Required proptype by ESLint for React Material Library
  // classes: shape({}),

  // Datetime postfix appended to date to indicate the timezone
  dateTimePostfix: string,
  // Rate of change of selected value on slider when the animation is playing
  framesPerSecond: number,
  // Datetimes available for stepping to in animation control.
  dateTimes: string[],
  // Time offset for data from UTC in hours
  timezoneOffsetData: number,
  // Time offset from UTC in hours
  timezoneOffsetDisplay: number,
  // Datetime display format. Default: 'YYYY/MM/DD HH:mm:ss'.
  dateTimeDisplayFormat: string,
};

const AnimationControl: React.FC<AnimationControlProps> = ({ 
  dateTimes,
  framesPerSecond = 10,
  dateTimeDisplayFormat = 'yyyy/MM/dd HH:mm:ss',
  onDateTimeChange,
}) => {
  const timestepIndex = React.useRef<number | null>(null);
  const isPlaying = React.useRef(false);
  const [_, setDirtyFlag] = React.useState<number>(0);
  const [speedAnchorEl, setSpeedAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    if (dateTimes && dateTimes.length > 0) {
      timestepIndex.current = 0;
      flagRerender();
    }
  }, [dateTimes]);

  // Creates the animation update timer based on the user specified frequency.
  React.useEffect(() => {
    const updateTimer = setInterval(() => {
      if (isPlaying.current) {
        onStepForward(true);
        flagRerender();
      }
    }, 1000 / framesPerSecond);

    return () => {
      clearInterval(updateTimer);
    };
  }, [framesPerSecond, dateTimes]);

  const flagRerender = () => {
    setDirtyFlag(prev => prev + 1);
  }

  const onPlay = () => {
    isPlaying.current = true;
    if (!timestepIndex.current && timestepIndex.current !== 0) {
      timestepIndex.current = 0;
      onDateTimeChange(dateTimes[timestepIndex.current]);
    }
    flagRerender();
  };

  const onPause = () => {
    isPlaying.current = false;
    flagRerender();
  };

  const onSkipToStart = () => {
    if (isPlaying.current) {
      onPause();
    }
    timestepIndex.current = 0;
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const onSkipToEnd = () => {
    if (isPlaying) {
      onPause();
    }
    timestepIndex.current = dateTimes.length - 1;
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const onStepForward = (keepPlaying: boolean = false) => {
    if (!timestepIndex.current && timestepIndex.current !== 0) {
      return;
    }

    if (!keepPlaying && isPlaying.current) {
      onPause();
    }

    timestepIndex.current = timestepIndex.current < dateTimes.length - 1 ? timestepIndex.current + 1 : dateTimes.length - 1;
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const onStepBackward = () => {
    if (!timestepIndex.current && timestepIndex.current !== 0) {
     return;
    }

    if (isPlaying) {
      onPause();
    }

    timestepIndex.current = timestepIndex.current > 0 ? timestepIndex.current - 1 : 0;
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const handleTimestepChange = (_: React.ChangeEvent<{}>, newValue: number | number[]) => {
    onPause();
    timestepIndex.current = newValue as number;
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const handlePlaybackSpeedClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSpeedAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSpeedAnchorEl(null);
  };

  const formatCurrentDate = () => {
    if (!timestepIndex.current && timestepIndex.current !== 0) {
      return ;
    }

    const currentDate = new Date(dateTimes[timestepIndex.current]);
    return format(currentDate, dateTimeDisplayFormat);
  };

  const currentTimestepStr = formatCurrentDate();
  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={1}>
        <Box> 
          <Typography>{currentTimestepStr}</Typography>
        </Box>
        <Box px={5} width="calc(100% - 2rem)">
          <Slider
            value={timestepIndex?.current ?? 0}
            min={0}
            max={dateTimes.length - 1}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            onChange={handleTimestepChange}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box>
          <ToggleButtonGroup size="small" style={{ marginRight: '1ch' }}>
            <ToggleButton value="skip-to-start" onClick={onSkipToStart}>
              <SkipPreviousIcon />
            </ToggleButton>
            <ToggleButton value="step-backward" onClick={onStepBackward}>
              <NavigateBeforeIcon />
            </ToggleButton>
            {isPlaying.current ? (
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
          <ToggleButtonGroup size="small">
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
        </Box>
      </Box>
    </Box>
  );
};

export default AnimationControl;
