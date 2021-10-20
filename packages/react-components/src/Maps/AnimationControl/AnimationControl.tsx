import * as React from 'react';
import Box from '@material-ui/core/Box';
import AnimationTimeline from './AnimationTimeline';
import AnimationPlaybackControls from './AnimationPlaybackControls';

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
  dateTimePostfix?: string,
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
  horizontal = true,
  hideControls = false,
  dateTimePostfix = null,
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
        stepForward(true);
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

  const play = () => {
    isPlaying.current = true;
    if (!timestepIndex.current && timestepIndex.current !== 0) {
      timestepIndex.current = 0;
      onDateTimeChange(dateTimes[timestepIndex.current]);
    }
    flagRerender();
  };

  const pause = () => {
    isPlaying.current = false;
    flagRerender();
  };

  const skipToStart = () => {
    if (isPlaying.current) {
      pause();
    }
    timestepIndex.current = 0;
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const skipToEnd = () => {
    if (isPlaying) {
      pause();
    }
    timestepIndex.current = dateTimes.length - 1;
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const stepForward = (keepPlaying: boolean = false) => {
    if (!timestepIndex.current && timestepIndex.current !== 0) {
      return;
    }

    if (!keepPlaying && isPlaying.current) {
      pause();
    }

    if (timestepIndex.current < dateTimes.length - 1) {
      timestepIndex.current = timestepIndex.current + 1
    } else {
      timestepIndex.current = dateTimes.length - 1;
      pause();
    }
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const stepBackward = () => {
    if (!timestepIndex.current && timestepIndex.current !== 0) {
     return;
    }

    if (isPlaying) {
      pause();
    }

    timestepIndex.current = timestepIndex.current > 0 ? timestepIndex.current - 1 : 0;
    onDateTimeChange(dateTimes[timestepIndex.current]);
    flagRerender();
  };

  const handleTimestepChange = (index: number) => {
    pause();
    timestepIndex.current = index;
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

  let currentTimestepStr = formatCurrentDate();
  if (dateTimePostfix) {
    currentTimestepStr += ` ${dateTimePostfix}`;
  }

  if (horizontal) {
    return (
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box>
          <AnimationPlaybackControls 
            isPlaying={isPlaying.current}
            onPlay={play}
            onPause={pause}
            onSkipToStart={skipToStart}
            onSkipToEnd={skipToEnd}
            onStepForward={stepForward}
            onStepBackward={stepBackward}
          />
        </Box>
        <Box flexGrow={1}>
          <AnimationTimeline
            isHorizontal={horizontal}
            timestepLabel={currentTimestepStr}
            timestepIndex={timestepIndex?.current ?? 0}
            maxTimestepIndex={dateTimes.length - 1}
            onTimestepIndexChange={handleTimestepChange}
          />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center">
        <AnimationTimeline
          isHorizontal={horizontal}
          timestepLabel={currentTimestepStr}
          timestepIndex={timestepIndex?.current ?? 0}
          maxTimestepIndex={dateTimes.length - 1}
          onTimestepIndexChange={handleTimestepChange}
        />
        {!hideControls && (
          <Box display="flex" justifyContent="center">
            <AnimationPlaybackControls 
              isPlaying={isPlaying.current}
              onPlay={play}
              onPause={pause}
              onSkipToStart={skipToStart}
              onSkipToEnd={skipToEnd}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
            />
          </Box>
        )}
      </Box>
    );
  }
};

export default AnimationControl;
