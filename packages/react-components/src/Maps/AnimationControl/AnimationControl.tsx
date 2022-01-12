import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import AnimationTimeline from './AnimationTimeline';
import AnimationPlaybackControls from './AnimationPlaybackControls';
import { format, parseISO, addHours } from 'date-fns';
import { AnimationControlProps } from './types';

/**
 * Simple controls for managing the current timestep of the DeckGL animation layer.
 * Provides both a slider and buttons for navigating between the time steps.
 *
 * Some flexibility has been added to allow a user specified date format as well as adding/subtracting any
 * time zone offsets if required.
 */
const AnimationControl: React.FC<AnimationControlProps> = ({
  dateTimes,
  framesPerSecond = 10,
  dateTimeDisplayFormat = 'yyyy/MM/dd HH:mm:ss',
  onDateTimeChange,
  horizontal = false,
  hideControls = false,
  dateTimePostfix = null,
  timezoneOffsetData = null,
  timezoneOffsetDisplay = null,
  playing = true,
  loop = true,
  enabled = true,
}) => {
  const [timestepIndex, setTimestepIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (dateTimes && dateTimes.length > 0) {
      setTimestepIndex(0);
    }
  }, [dateTimes]);

  useEffect(() => {
    if (playing) {
      play();
    } else {
      pause();
    }
  }, [playing]);

  useEffect(() => {
    if (!enabled) {
      pause();
    }
  }, [enabled]);

  // Creates the animation update timer based on the user specified frequency.
  useEffect(() => {
    const updateTimer = setInterval(() => {
      if (isPlaying) {
        stepForward(true);
      }
    }, 1000 / framesPerSecond);

    return () => {
      clearInterval(updateTimer);
    };
  }, [framesPerSecond, dateTimes, isPlaying]);

  useEffect(() => {
    if (timestepIndex !== null) {
      onDateTimeChange(dateTimes[timestepIndex]);
    }
  }, [timestepIndex]);

  const play = () => {
    setIsPlaying(true);
    if (!timestepIndex && timestepIndex !== 0) {
      setTimestepIndex(0);
    }
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const skipToStart = () => {
    if (isPlaying) {
      pause();
    }
    setTimestepIndex(0);
  };

  const skipToEnd = () => {
    if (isPlaying) {
      pause();
    }
    setTimestepIndex(dateTimes.length - 1);
  };

  const stepForward = (keepPlaying: boolean = false) => {
    if (!timestepIndex && timestepIndex !== 0) {
      return;
    }

    if (!keepPlaying && isPlaying) {
      pause();
    }

    setTimestepIndex((prevTimestepIndex) => {
      if (prevTimestepIndex < dateTimes.length - 1) {
        return prevTimestepIndex + 1;
      }

      if (loop) {
        return 0;
      }

      pause();
      return dateTimes.length - 1;
    });
  };

  const stepBackward = () => {
    if (!timestepIndex && timestepIndex !== 0) {
      return;
    }

    if (isPlaying) {
      pause();
    }

    setTimestepIndex((prevTimestepIndex) => (prevTimestepIndex > 0 ? prevTimestepIndex - 1 : 0));
  };

  const handleTimestepChange = (index: number) => {
    pause();
    setTimestepIndex(index);
  };

  const formatCurrentDate = () => {
    if (!timestepIndex && timestepIndex !== 0) {
      return dateTimeDisplayFormat.replace(/\w/g, '-');
    }

    let currentDate = parseISO(dateTimes[timestepIndex]);
    if (timezoneOffsetData && timezoneOffsetDisplay) {
      currentDate = addHours(currentDate, timezoneOffsetDisplay - timezoneOffsetData);
    }

    let formattedDate = format(currentDate, dateTimeDisplayFormat);
    if (dateTimePostfix) {
      formattedDate += ` ${dateTimePostfix}`;
    }

    return formattedDate;
  };

  let currentTimestepStr = formatCurrentDate();

  if (horizontal) {
    return (
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box>
          <AnimationPlaybackControls
            isPlaying={isPlaying}
            isEnabled={enabled}
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
            isEnabled={enabled}
            isHorizontal={horizontal}
            timestepLabel={currentTimestepStr}
            timestepIndex={timestepIndex ?? 0}
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
          isEnabled={enabled}
          isHorizontal={horizontal}
          timestepLabel={currentTimestepStr}
          timestepIndex={timestepIndex ?? 0}
          maxTimestepIndex={dateTimes.length - 1}
          onTimestepIndexChange={handleTimestepChange}
        />
        {!hideControls && (
          <Box display="flex" justifyContent="center">
            <AnimationPlaybackControls
              isPlaying={isPlaying}
              isEnabled={enabled}
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
