import { Button, CircularProgress, Grid, Tooltip, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { utcToTz } from '../../utils/Utils';
import { ScenarioMenu } from '../ScenarioMenu/ScenarioMenu';
import { ScenarioItemProps } from './types';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import useStyles from './useStyles';
import { Routes } from '../types';

const ScenarioItem = ({
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
  routes,
}: ScenarioItemProps) => {
  const [hover, setHover] = useState(false);
  const [menuLinks] = useState<Routes[]>(routes);
  const classes = useStyles();

  const newIcon = () => {
    if (status.Icon) {
      const { Icon } = status;

      return (
        <Typography className={classes.icon}>
          <Icon />
          <span>{status.name}</span>
        </Typography>
      );
    } else {
      return null;
    }
  };

  const showSpinner = () => {
    return (
      <Grid item className={classes.status}>
        <div
          style={{
            backgroundColor: isSelected || hover ? '#e8e8e8' : 'white',
          }}
        >
          <div>
            <Tooltip title={status.message ? status.message : ''}>
              <CircularProgress
                style={{
                  color: status.color,
                  display: 'grid',
                }}
                variant="indeterminate"
                value={status.progress || 0}
                size={16}
                thickness={7}
              />
            </Tooltip>
          </div>
          <Typography component="span" className={classes.scenarioProgress}>
            {status.progress ? `${status.progress}%` : null}
          </Typography>
        </div>
      </Grid>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        className={classes.scenario}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onFocus={() => undefined}
        onBlur={() => undefined}
        onClick={() => onClick(scenario)}
      >
        {date && showHour && (
          <Grid item className={classes.scenarioHour}>
            <Typography component="div" className={classes.hourText}>
              {format(timeZone ? utcToTz(date, timeZone) : parseISO(date), 'HH:mm')}
            </Typography>
            {status.progress ? showStatus && showSpinner() : newIcon()}
          </Grid>
        )}
        <div className={classes.verticalLine} />
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
      </div>
      <div className={classes.actions}>
        {showMenu && (
          <ScenarioMenu
            onContextMenuClick={onContextMenuClick}
            onClick={() => onClick(scenario)}
            menu={menu}
            scenario={scenario}
          />
        )}

        {menuLinks.some((item) => item.id === 'operationalView') && (
          <Button
            style={{ color: '#00A4EC' }}
            classes={{
              label: classes.buttonLabel,
            }}
            endIcon={<ArrowForwardOutlinedIcon />}
            onClick={() => console.log('clicked')}
          >
            <span>Operational View</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export { ScenarioItemProps, ScenarioItem };
