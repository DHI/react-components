import * as React from 'react';
import Box from '@material-ui/core/Box';
import AnimationTimeline from './AnimationTimeline';
import AnimationPlaybackControls from './AnimationPlaybackControls';
import { format } from 'date-fns';
import { AnimationControlProps } from './types';

const AnimationControl: React.FC<AnimationControlProps> = ({ 
  dateTimes,
  framesPerSecond = 10,
  dateTimeDisplayFormat = 'yyyy/MM/dd HH:mm:ss',
  onDateTimeChange,
  horizontal = true,
  hideControls = false,
  dateTimePostfix = null,
  loop = true,
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

  React.useEffect(() => {
    if (timestepIndex.current !== null) {
      onDateTimeChange(dateTimes[timestepIndex.current]);
      flagRerender();
    }
  }, [timestepIndex.current]);

  const flagRerender = () => {
    setDirtyFlag(prev => prev + 1);
  }

  const play = () => {
    isPlaying.current = true;
    if (!timestepIndex.current && timestepIndex.current !== 0) {
      timestepIndex.current = 0;
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
    flagRerender();
  };

  const skipToEnd = () => {
    if (isPlaying) {
      pause();
    }
    timestepIndex.current = dateTimes.length - 1;
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
      if (loop) {
        timestepIndex.current = 1;
      } else {
        timestepIndex.current = dateTimes.length - 1;
        pause();
      }
    }
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
    flagRerender();
  };

  const handleTimestepChange = (index: number) => {
    pause();
    timestepIndex.current = index;
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
