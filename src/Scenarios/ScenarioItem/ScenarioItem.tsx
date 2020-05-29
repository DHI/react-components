import React, { FC, useState } from 'react';
import { CircularProgress, Grid, Tooltip, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { ScenarioMenu } from '../ScenarioMenu/ScenarioMenu';
import useStyles from './useStyles';
import IScenarioItemProps from './types';

const ScenarioItem: FC<IScenarioItemProps> = (props: IScenarioItemProps) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles();

  const scenarioHour = props.showHour && (
    <Grid item className={classes.scenarioHour}>
      <Typography component="div" className={classes.hourText}>
        {format(parseISO(props.date), 'HH:mm')}
      </Typography>
    </Grid>
  );

  const scenarioStatus = props.showStatus && (
    <Grid item className={classes.status}>
      <div className={classes.verticalLine} />
      <div
        style={{
          backgroundColor: props.isSelected || hover ? '#e8e8e8' : 'white',
          marginLeft: '-8px',
        }}
      >
        <div>
          <Tooltip title={props.status.message}>
            <CircularProgress
              style={{ color: props.status.color, display: 'grid' }}
              variant={props.status.progress ? 'indeterminate' : 'determinate'}
              value={props.status.progress ? props.status.progress : 100}
              size={16}
              thickness={props.status.progress ? 7 : 21}
            />
          </Tooltip>
        </div>
        <Typography component="span" className={classes.scenarioProgress}>
          {props.status.progress ? `${props.status.progress}%` : null}
        </Typography>
      </div>
    </Grid>
  );

  const scenarioDetails = (
    <Grid item className={classes.scenarioDetails}>
      <Typography
        component="span"
        color="primary"
        className={classes.scenarioTitle}
      >
        {props.name}
      </Typography>
      {props.description.map((item: { name: string; value: any }) => (
        <Typography
          key={item.name}
          component="span"
          className={classes.textFields}
        >
          {`${item.name}: ${item.value}`}
        </Typography>
      ))}
    </Grid>
  );

  return (
    <div
      className={classes.scenario}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      {scenarioHour}
      {scenarioStatus}
      {scenarioDetails}
      {
        //propData.showMenu && <ScenarioMenu functions={functions} menu={menu} scenario={scenario} />
      }
      {props.showMenu && (
        <ScenarioMenu
          onContextMenuClick={props.onContextMenuClick}
          menu={props.menu}
          scenario={props.scenario}
        />
      )}
    </div>
  );
};

export { IScenarioItemProps, ScenarioItem };
