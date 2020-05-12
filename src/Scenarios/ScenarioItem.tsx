import React, { FC, useState } from 'react';
//import { withStyles, createStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Tooltip, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { ScenarioMenu } from './ScenarioMenu';

interface IScenarioItemProps {
  classes: any;
  menu: any;
  scenario: any;
  functions: any;
  status: any;
  showHour: boolean;
  showMenu: boolean;
  showStatus: boolean;
  isSelected: boolean;
  name: string;
  date: string;
  description: any
}

const ScenarioItem: FC<IScenarioItemProps> = (propData: IScenarioItemProps) => {
  const [hover, setHover] = useState(false);

  const scenarioHour = propData.showHour && (
    <Grid item style={propData.classes.scenarioHour}>
      <Typography component="div" style={propData.classes.hourText}>
        {format(parseISO(propData.date), 'HH:mm')}
      </Typography>
    </Grid>
  );

  const scenarioStatus = propData.showStatus && (
    <Grid item style={propData.classes.status}>
      <div style={propData.classes.verticalLine} />
      <div
        className={propData.classes.scenarioStatus}
        style={{
          backgroundColor: propData.isSelected || hover ? '#e8e8e8' : 'white',
        }}
      >
        <div>
          <Tooltip title={propData.status.message}>
            <CircularProgress
              style={{ color: propData.status.color }}
              variant={propData.status.progress ? 'indeterminate' : 'determinate'}
              value={propData.status.progress ? propData.status.progress : 100}
              size={16}
              thickness={propData.status.progress ? 7 : 21}
            />
          </Tooltip>
        </div>
        <Typography component="span" style={propData.classes.scenarioProgress}>
          {propData.status.progress ? `${propData.status.progress}%` : null}
        </Typography>
      </div>
    </Grid>
  );

  const scenarioDetails = (
    <Grid item style={propData.classes.scenarioDetails}>
      <Typography component="span" color="primary" style={propData.classes.scenarioTitle}>
        {propData.name}
      </Typography>
      {propData.description.map((item: { name: string; value: any; }) => (
        <Typography key={item.name} component="span" style={propData.classes.textFields}>
          {`${item.name}: ${item.value}`}
        </Typography>
      ))}
    </Grid>
  );

  return (
    <div
      style={propData.classes.scenario}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onFocus={() => { }}
      onBlur={() => { }}
    >
      {scenarioHour}
      {scenarioStatus}
      {scenarioDetails}
      {//propData.showMenu && <ScenarioMenu functions={functions} menu={menu} scenario={scenario} />
      }
      {propData.showMenu && <ScenarioMenu menu={propData.menu} />}
    </div>
  );
}


export { IScenarioItemProps, ScenarioItem };