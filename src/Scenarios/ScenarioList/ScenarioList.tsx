import { Divider } from '@material-ui/core';
import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { Dictionary, groupBy, sortBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { checkCondition, checkStatus, getDescriptions, getObjectProperty, utcToTz } from '../../utils/Utils';
import { ScenarioItem } from '../ScenarioItem/ScenarioItem';
import { Scenario } from '../types';
import ScenarioListProps from './types';
import useStyles from './useStyles';

const ScenarioList = (props: ScenarioListProps) => {
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
  } = props;
  const [groupedScenarios, setGroupedScenarios] = useState<Dictionary<Scenario[]>>();
  const [selectedId, setSelectedId] = useState(selectedScenarioId);
  const classes = useStyles();

  useEffect(() => {
    groupScenarios(scenarios);
  }, [scenarios]);

  const groupScenarios = (scenarios: Scenario[]) => {
    setGroupedScenarios(
      showHour || showDate
        ? groupBy(scenarios, (scenario) => {
            return scenario.dateTime ? format(parseISO(scenario.dateTime), 'yyyy-MM-dd') : '';
          })
        : groupBy(scenarios, (scenario) => scenario.dateTime),
    );
  };

  const buildMenu = (scenario: Scenario) => {
    return menuItems.filter((menuItem) => {
      return !menuItem.condition || checkCondition(scenario, menuItem.condition) ? menuItem : null;
    });
  };

  const buildScenariosList = (scenarios: Scenario[]) => {
    return sortBy(scenarios, ['dateTime'])
      .reverse()
      .map((scenario) => {
        return (
          <div
            key={scenario.id}
            onClick={() => onScenarioClick(scenario)}
            onKeyPress={() => onScenarioClick(scenario)}
            role="presentation"
            className={classNames(classes.listItem, {
              [classes.selectedItem]: selectedId === getObjectProperty(scenario, 'id'),
            })}
          >
            <ScenarioItem
              name={getObjectProperty(scenario.data, nameField)}
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
              status={checkStatus(scenario, status)}
              timeZone={timeZone}
            />
          </div>
        );
      });
  };

  const buildDateArea = (date: string) => {
    const isoDate = timeZone ? utcToTz(date, timeZone) : parseISO(date);
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

  const onScenarioClick = (scenario: Scenario) => {
    if (scenario && selectedId !== getObjectProperty(scenario, 'id')) {
      setSelectedId(getObjectProperty(scenario, 'id'));

      if (onScenarioSelected) {
        onScenarioSelected(scenario);
      }
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

export { ScenarioListProps, ScenarioList };
