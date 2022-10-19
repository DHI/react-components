import { Divider } from '@material-ui/core';
import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { Dictionary, groupBy, sortBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { checkCondition, checkStatus, getDescriptions, getObjectProperty, utcToTz } from '../../utils/Utils';
import { Scenario, ScenarioOLD } from '../types';
import { ScenarioItemOLD } from '../ScenarioItemOLD/ScenarioItem';
import ScenarioListOLDProps from './types';
import useStyles from './useStyles';

const ScenarioListOLD = (props: ScenarioListOLDProps) => {
  const {
    selectedScenarioId,
    scenarios,
    showHour,
    showDate,
    menuItems,
    status,
    descriptionFields,
    onContextMenuClick,
    onScenarioSelected,
    showStatus,
    showMenu,
    nameField,
    timeZone,
    statusOverride,
  } = props;
  const [groupedScenarios, setGroupedScenarios] = useState<Dictionary<ScenarioOLD[]>>();
  const [selectedId, setSelectedId] = useState(selectedScenarioId);
  const classes = useStyles();

  useEffect(() => {
    groupScenarios(scenarios);
  }, [scenarios]);

  useEffect(() => {
    setSelectedId(selectedScenarioId);
  }, [selectedScenarioId]);

  const groupScenarios = (scenarios: ScenarioOLD[]) => {
    setGroupedScenarios(
      showHour || showDate
        ? groupBy(scenarios, (scenario) => {
            return scenario.dateTime && timeZone
              ? format(utcToTz(scenario.dateTime, timeZone), 'yyyy-MM-dd')
              : format(parseISO(scenario.dateTime), 'yyyy-MM-dd') || '';
          })
        : groupBy(scenarios, (scenario) => scenario.dateTime),
    );
  };

  const buildMenu = (scenario: Scenario) => {
    return menuItems.filter((menuItem) => {
      return !menuItem.condition || checkCondition(scenario, menuItem.condition) ? menuItem : null;
    });
  };

  const buildScenariosList = (scenarios: ScenarioOLD[]) => {
    return sortBy(scenarios, ['dateTime'])
      .reverse()
      .map((scenario) => {
        return (
          <div
            key={scenario.id}
            onKeyPress={() => onScenarioClick(scenario)}
            role="presentation"
            className={classNames(classes.listItem, {
              [classes.selectedItem]: selectedId === getObjectProperty(scenario, 'id'),
            })}
          >
            <ScenarioItemOLD
              name={getObjectProperty(scenario.data, nameField)}
              onClick={onScenarioClick}
              description={getDescriptions(scenario, descriptionFields, timeZone)}
              date={showDate ? (scenario.dateTime ? scenario.dateTime.toString() : '') : null}
              key={scenario.id}
              isSelected={selectedId === getObjectProperty(scenario, 'id')}
              onContextMenuClick={onContextMenuClick}
              menu={buildMenu(scenario)}
              showHour={showHour}
              showMenu={showMenu}
              showStatus={showStatus}
              scenario={scenario}
              status={checkStatus(scenario, status, true, statusOverride)}
              statusOverride={statusOverride}
              timeZone={timeZone}
            />
          </div>
        );
      });
  };

  const buildDateArea = (date: string) => {
    const isoDate = parseISO(date);

    const dateObject = {
      day: format(isoDate, 'dd'),
      dayName: format(isoDate, 'EEE'),
      monthName: format(isoDate, 'MMM'),
    };
    const dateBlockwidth = showHour ? '97px' : '39px';

    return (
      <div className={classes.dateBlock} style={{ width: dateBlockwidth }}>
        <div className={classes.dateArea}>
          <div className={classes.dayText}>{dateObject.day}</div>
          <div className={classes.textFields}>{dateObject.monthName}</div>
          <div className={classes.textFields}>{dateObject.dayName}</div>
        </div>
      </div>
    );
  };

  const onScenarioClick = (scenario: ScenarioOLD) => {
    if (scenario && selectedId !== getObjectProperty(scenario, 'id')) {
      setSelectedId(getObjectProperty(scenario, 'id'));
    }

    if (onScenarioSelected) {
      onScenarioSelected(scenario);
    }
  };

  let printedScenarios = null;

  if (groupedScenarios) {
    printedScenarios = Object.keys(groupedScenarios)
      .sort()
      .reverse()
      .map((key) => (
        <div key={key}>
          {showDate && buildDateArea(key)}
          <div>
            {buildScenariosList(groupedScenarios[key])}
            <Divider variant="inset" className={classes.divider} />
          </div>
        </div>
      ));
  }

  return <div className={classes.root}>{printedScenarios}</div>;
};

export { ScenarioListOLDProps, ScenarioListOLD };
