import { Button, CircularProgress, Grid, Tooltip, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { utcToTz } from '../../utils/Utils';
import { ScenarioMenu } from '../ScenarioMenu/ScenarioMenu';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import useStyles from './useStyles';
import ScenarioItemProps from './types';

const ScenarioItem = ({
  showHour,
  date,
  showStatus,
  isSelected,
  status,
  name,
  nameAccentColour,
  description,
  showMenu,
  onClick,
  onContextMenuClick,
  onRenderScenarioItem,
  onRenderScenarioIcon,
  menu,
  scenario,
  timeZone,
  actionButton,
  showReportButton,
  showEditButton,
}: ScenarioItemProps) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles();

  const rowIcon = () => {
    if (status.Icon) {
      const { Icon } = status;

      return (
        <Typography className={classes.icon}>
          <>
            {onRenderScenarioIcon ? (
              onRenderScenarioIcon(scenario)
            ) : (
              <>
                <Icon style={{ color: status.color }} />
                <span style={{ color: status.color }}>{status.name}</span>
              </>
            )}
          </>
        </Typography>
      );
    } else {
      return (
        <Typography className={classes.icon}>
          <span style={{ color: status.color }}>{status.name}</span>
        </Typography>
      );
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
            <Typography
              component="div"
              className={classes.hourText}
              style={{ paddingBottom: status.Icon ? '10px' : '' }}
            >
              {format(timeZone ? utcToTz(date, timeZone) : parseISO(date), 'HH:mm')}
            </Typography>
            {status.progress ? showStatus && showSpinner() : rowIcon()}
          </Grid>
        )}
        {date && <div className={classes.verticalLine} />}
        <Grid item className={classes.scenarioDetails}>
          <Typography
            component="span"
            color="primary"
            className={classes.scenarioTitle}
            style={{ color: nameAccentColour }}
          >
            {name}
          </Typography>
          {onRenderScenarioItem
            ? onRenderScenarioItem(scenario)
            : description.map((item: { name: string; value: string }) => (
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
            showEditButton={showEditButton}
            showReportButton={showReportButton}
          />
        )}

        {actionButton && (
          <Button
            style={{ color: actionButton.color }}
            classes={{
              label: classes.buttonLabel,
            }}
            endIcon={<ArrowForwardOutlinedIcon />}
            onClick={actionButton.handleActionButton}
          >
            <span>{actionButton.name}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export { ScenarioItemProps, ScenarioItem };
