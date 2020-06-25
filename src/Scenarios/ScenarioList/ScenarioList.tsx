import { Divider } from '@material-ui/core';
import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { Dictionary, groupBy, isEmpty, sortBy } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { ICondition, IDescriptionField, IScenario } from 'Scenarios/types';
import { getObjectProperty } from '../../Utils/Utils';
import { ScenarioItem } from '../ScenarioItem/ScenarioItem';
import IScenarioListProps from './types';
import useStyles from './useStyles';

const ScenarioList: FC<IScenarioListProps> = (props: IScenarioListProps) => {
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
  } = props;
  const [groupedScenarios, setGroupedScenarios] = useState<
    Dictionary<IScenario[]>
  >();
  const [selectedId, setSelectedId] = useState(selectedScenarioId);

  const classes = useStyles();

  useEffect(() => {
    groupScenarios(scenarios);
  }, [scenarios]);

  const groupScenarios = (scenarios: IScenario[]) => {
    setGroupedScenarios(
      showHour || showDate
        ? groupBy(scenarios, scenario => {
            return scenario.dateTime
              ? format(parseISO(scenario.dateTime), 'yyyy-MM-dd')
              : '';
          })
        : groupBy(scenarios, scenario => scenario.dateTime)
    );
  };

  const buildMenu = (scenario: IScenario) => {
    return menuItems.filter(menuItem =>
      checkEnabled(scenario, menuItem.condition) ? menuItem : null
    );
  };

  const checkEnabled = (scenario: IScenario, condition?: ICondition) => {
    if (!isEmpty(scenario)) {
      if (condition) {
        const check =
          typeof condition === 'object'
            ? getObjectProperty(scenario, condition.field, condition.value)
            : getObjectProperty(scenario, condition);
        return check;
      }
      return true;
    }
    return false;
  };

  const checkStatus = (scenario: IScenario) => {
    const scenarioStatus = getObjectProperty(scenario, 'lastJobStatus');
    const progress = Number(getObjectProperty(scenario, 'lastJobProgress'));

    let currentStatus = {
      ...status.find(s => s.name === scenarioStatus),
      progress,
    };

    let result;
    if (!scenarioStatus) {
      result = {
        color: 'red',
        message: 'Unknown Status Field',
      };
    } else {
      result = currentStatus;
    }

    return result;
  };

  const createDescriptionObject = (
    scenarioData: string,
    descriptionFields: IDescriptionField[]
  ) => {
    const descriptionArray = [];
    for (let i = 0; i < descriptionFields.length; i++) {
      let descriptionFieldCondition = descriptionFields[i].condition;
      if (descriptionFieldCondition) {
        if (typeof descriptionFieldCondition === 'object') {
          const condition = getObjectProperty(
            scenarioData,
            descriptionFieldCondition.field,
            descriptionFieldCondition.value
          );
          if (condition) {
            let descriptionObject = {
              name: descriptionFields[i].name,
              value: getObjectProperty(
                scenarioData,
                descriptionFields[i].field
              ),
            };
            descriptionArray.push(descriptionObject);
            continue;
          }
        }
        if (
          getObjectProperty(
            scenarioData,
            descriptionFields[i].field,
            descriptionFields[i].condition
          )
        ) {
          let descriptionObject = {
            name: descriptionFields[i].name,
            value: getObjectProperty(scenarioData, descriptionFields[i].field),
          };
          descriptionArray.push(descriptionObject);
          continue;
        }
      } else {
        let descriptionObject = {
          name: descriptionFields[i].name,
          value: getObjectProperty(scenarioData, descriptionFields[i].field),
        };
        descriptionArray.push(descriptionObject);
      }
    }
    return descriptionArray;
  };

  const buildScenariosList = (scenarios: IScenario[]) => {
    return sortBy(scenarios, ['dateTime'])
      .reverse()
      .map(scenario => {
        const date = showDate
          ? scenario.dateTime
            ? scenario.dateTime.toString()
            : ''
          : '';
        return (
          <div
            key={scenario.id}
            onClick={() => onScenarioClick(scenario)}
            onKeyPress={() => onScenarioClick(scenario)}
            role="presentation"
            className={classNames(classes.listItem, {
              [classes.selectedItem]:
                selectedId === getObjectProperty(scenario, 'id'),
            })}
          >
            <ScenarioItem
              name={getObjectProperty(scenario.data, nameField)}
              description={createDescriptionObject(
                scenario.data,
                descriptionFields
              )}
              date={date}
              key={scenario.id}
              isSelected={selectedId === getObjectProperty(scenario, 'id')}
              onContextMenuClick={onContextMenuClick}
              menu={buildMenu(scenario)}
              showHour={showHour}
              showMenu={showMenu}
              showStatus={showStatus}
              scenario={scenario}
              status={checkStatus(scenario)}
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
      .map(key => (
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

export { IScenarioListProps, ScenarioList };
