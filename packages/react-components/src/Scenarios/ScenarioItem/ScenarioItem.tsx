import { CircularProgress, Grid, Tooltip, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { utcToTz } from '../../utils/Utils';
import { ScenarioMenu } from '../ScenarioMenu/ScenarioMenu';
import ScenarioItemOLDProps from './types';
import useStyles from './useStyles';

const ScenarioItem = (props: ScenarioItemOLDProps) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles();
  const {
    showHour,
    date,
    showStatus,
    isSelected,
    status,
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
          <Tooltip title={status.message ? status.message : ''}>
            <CircularProgress
              style={{
                color: status.color,
                display: 'grid',
              }}
              variant={status.progress ? 'indeterminate' : 'determinate'}
              value={status.progress ? status.progress : 100}
              size={16}
              thickness={status.progress ? 7 : 21}
            />
          </Tooltip>
        </div>
        <Typography component="span" className={classes.scenarioProgress}>
          {status.progress ? `${status.progress}%` : null}
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
    </Grid>
  );

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={classes.scenario}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onFocus={() => undefined}
        onBlur={() => undefined}
        onClick={onClick}
      >
        {scenarioHour}
        {scenarioStatus}
        {scenarioDetails}
      </div>
      {showMenu && <ScenarioMenu onContextMenuClick={onContextMenuClick} menu={menu} scenario={scenario} />}
    </div>
  );
};

export { ScenarioItemOLDProps as ScenarioItemProps, ScenarioItem };
