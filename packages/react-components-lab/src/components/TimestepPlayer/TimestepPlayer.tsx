import React, { useState, useEffect, FC } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import {
  PauseCircleFilled as PauseIcon,
  PlayCircleFilled as PlayIcon,
} from '@mui/icons-material';
import { TimestepPlayerProps } from './types';
import timestepStyles from './styles';
import ValueLabelComponent from './ValueLabel';
import CustomSlider from './CustomSlider';
import { formatDate } from './utils';

const TimestepPlayer: FC<TimestepPlayerProps> = ({
  timesteps,
  setTimestep,
  activeTimestep,
  type = 'daily',
  isPaused = false,
  interval = 2000,
}) => {
  const [play, setPlay] = useState(false);
  const [step, setStep] = useState(0); // index

  const isLastStep = step === timesteps?.length - 1;

  const classes = timestepStyles();

  useEffect(() => {
    let timer: number | undefined;
    if (play)
      timer = setInterval(() => {
        if (!isPaused) {
          setStep((previousStep) =>
            previousStep >= timesteps.length ? 0 : previousStep + 1
          );
        }
      }, interval) as unknown as number;
    else clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [play, isPaused]);

  useEffect(() => {
    if (step !== undefined) setTimestep(timesteps[step]);
  }, [step]);

  // Pauses if on last step
  useEffect(() => {
    if (isLastStep && play) setPlay(false);
  }, [isLastStep, play]);

  useEffect(() => {
    const indexDataset = timesteps.findIndex(
      (timestep) => timestep.valueOf() === activeTimestep.valueOf()
    );
    if (indexDataset !== undefined) {
      setStep(indexDataset);
    }
  }, [activeTimestep]);

  useEffect(() => {
    setStep(0);
    setPlay(false);
  }, [timesteps]);

  const handleClick = () => {
    setPlay(!play);
  };
  return (
    <Box p={2} onClick={(e) => e.stopPropagation()}>
      {timesteps && timesteps.length > 0 && (
        <Grid container alignItems="center">
          <Grid item>
            <Box mr={1}>
              <IconButton
                style={{ marginBottom: 18 }}
                aria-label="play/pause"
                onClick={handleClick}
                color="secondary"
                size="large"
              >
                {play ? (
                  <PauseIcon className={classes.icon} />
                ) : (
                  <PlayIcon className={classes.icon} />
                )}
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs>
            <Box ml={1} mr={3}>
              <CustomSlider
                value={step}
                step={1}
                min={0}
                max={timesteps.length - 1}
                defaultValue={0}
                onChange={(e, value) => setStep(Number(value))}
                valueLabelFormat={(value) =>
                  timesteps[value] && formatDate(activeTimestep, type)
                }
                aria-labelledby="timestep-slider"
                valueLabelDisplay={
                  [0, timesteps.length].includes(step) ? 'off' : 'on'
                }
                ValueLabelComponent={ValueLabelComponent}
                color="secondary"
              />
              <Box display="flex" justifyContent="space-between">
                <Typography color="secondary" className={classes.annotations}>
                  {timesteps[0] && formatDate(timesteps[0], type)}
                </Typography>
                <Typography color="secondary" className={classes.annotations}>
                  {timesteps[timesteps.length - 1] &&
                    formatDate(new Date(timesteps[timesteps.length - 1]), type)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TimestepPlayer;
