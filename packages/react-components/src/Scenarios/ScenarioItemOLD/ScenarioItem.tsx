import { CircularProgress, Grid, Tooltip, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { utcToTz } from '../../utils/Utils';
import { ScenarioMenuOLD } from '../ScenarioMenuOLD/ScenarioMenu';
import ScenarioItemOLDProps from './types';
import useStyles from './useStyles';

const ScenarioItemOLD = (props: ScenarioItemOLDProps) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles();
  const {
    showHour,
    date,
    showStatus,
    isSelected,
    currentStatus,
    name,
    description,
    showMenu,
    onClick,
    onContextMenuClick,
    menu,
    scenario,
    timeZone,
  } = props;

  const scenarioHour = date && showHour && (
    <Grid item className={classes.scenarioHour}>
      <Typography component="div" className={classes.hourText}>
        {format(timeZone ? utcToTz(date, timeZone) : parseISO(date), 'HH:mm')}
      </Typography>
      {currentStatus.override && (
        <Typography className={classes.icon}>
          <span style={{ width: 50 }}>{currentStatus.message}</span>
        </Typography>
      )}
    </Grid>
  );

  const scenarioStatus = showStatus && (
    <Grid item className={classes.status}>
      <div className={classes.verticalLine} />
      <div
        style={{
          backgroundColor: isSelected || hover ? '#e8e8e8' : 'white',
          marginLeft: '-8px',
        }}
      >
        <div>
          <Tooltip disableHoverListener={Boolean(currentStatus.override)} title={currentStatus.message}>
            <CircularProgress
              style={{
                color: currentStatus.override?.color ?? currentStatus.color,
                display: 'grid',
              }}
              variant={currentStatus.progress ? 'indeterminate' : 'determinate'}
              value={currentStatus.progress ? currentStatus.progress : 100}
              size={16}
              thickness={currentStatus.progress ? 7 : 21}
            />
          </Tooltip>
        </div>
        <Typography component="span" className={classes.scenarioProgress}>
          {currentStatus.progress ? `${currentStatus.progress}%` : null}
        </Typography>
      </div>
    </Grid>
  );

  const scenarioDetails = (
    <Grid item className={classes.scenarioDetails}>
      <Typography component="span" color="primary" className={classes.scenarioTitle}>
        {name}
      </Typography>
      {description.map((item: { name: string; value: string }) => (
        <Typography key={item.name} component="span" className={classes.textFields}>
          {`${item.name}: ${item.value}`}
        </Typography>
      ))}
      {currentStatus.override && (
        <Typography className={classes.textFields}>
          <span style={{ color: currentStatus.override.color }}>{currentStatus.override.message}</span>
        </Typography>
      )}
    </Grid>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        className={classes.scenario}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onFocus={() => undefined}
        onBlur={() => undefined}
        onClick={() => onClick(scenario)}
      >
        {scenarioHour}
        {scenarioStatus}
        {scenarioDetails}
      </div>
      {showMenu && (
        <ScenarioMenuOLD
          onContextMenuClick={onContextMenuClick}
          onClick={() => onClick(scenario)}
          menu={menu}
          scenario={scenario}
        />
      )}
    </div>
  );
};

export { ScenarioItemOLDProps, ScenarioItemOLD };
