import { Divider } from '@material-ui/core';
import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { Dictionary, groupBy, sortBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { checkStatus, getDescriptions, getObjectProperty } from '../../utils/Utils';
import ScenarioItem from '../ScenarioItem/ScenarioItem';
import { IScenario } from '../types';
import IScenarioListProps from './types';
import useStyles from './useStyles';

const ScenarioList = (props: IScenarioListProps) => {
  const {
    selectedScenarioId,
    scenarios,
    showHour,
    showDate,
    menuItems,
    status,
    descriptionFields,
    onContextMenuClick,
    showStatus,
    showMenu,
    nameField,
    timeZone,
  } = props;
  const [groupedScenarios, setGroupedScenarios] = useState<Dictionary<IScenario[]>>();
  const [selectedId, setSelectedId] = useState(selectedScenarioId);
  const classes = useStyles();

  useEffect(() => {
    groupScenarios(scenarios);
  }, [scenarios]);

  const groupScenarios = (scenarios: IScenario[]) => {
    setGroupedScenarios(
      showHour || showDate
        ? groupBy(scenarios, (scenario) => {
            return scenario.dateTime ? format(parseISO(scenario.dateTime), 'yyyy-MM-dd') : '';
          })
        : groupBy(scenarios, (scenario) => scenario.dateTime),
    );
  };

  const buildMenu = (scenario: IScenario) => {
    return menuItems.filter((menuItem) =>
      !menuItem.condition || getObjectProperty(scenario, menuItem.condition.field) === menuItem.condition.value
        ? menuItem
        : null,
    );
  };

  const buildScenariosList = (scenarios: IScenario[]) => {
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
              name={getObjectProperty(scenario, nameField)}
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
            />
          </div>
        );
      });
  };

  const buildDateArea = (date: string) => {
    const dateObject = {
      day: format(parseISO(date), 'dd'),
      dayName: format(parseISO(date), 'EEE'),
      monthName: format(parseISO(date), 'MMM'),
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

  const onScenarioClick = (scenario: IScenario) => {
    if (scenario && selectedId !== getObjectProperty(scenario, 'id')) {
      setSelectedId(getObjectProperty(scenario, 'id'));
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

export default ScenarioList;
