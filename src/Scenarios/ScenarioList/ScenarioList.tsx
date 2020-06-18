import { Divider } from '@material-ui/core';
import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { Dictionary, groupBy, isEmpty, sortBy } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { getObjectProperty } from '../../Utils/Utils';
import { ScenarioItem } from '../ScenarioItem/ScenarioItem';
import IScenarioListProps, {
  Condition,
  DescriptionFields,
  Scenario,
} from './types';
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
    dateField,
  } = props;
  const [groupedScenarios, setGroupedScenarios] = useState<
    Dictionary<Scenario[]>
  >();
  const [selectedId, setSelectedId] = useState(selectedScenarioId);

  const classes = useStyles();

  useEffect(() => {
    groupScenarios(scenarios);
  }, []);

  const groupScenarios = (scenarios: Scenario[]) => {
    setGroupedScenarios(
      showHour || showDate
        ? groupBy(scenarios, scenario => {
            return format(parseISO(scenario.dateTime), 'yyyy-MM-dd');
          })
        : groupBy(scenarios, scenario => scenario.dateTime)
    );
  };

  const buildMenu = (scenario: Scenario) => {
    return menuItems.filter(menuItem =>
      checkEnabled(scenario, menuItem.condition) ? menuItem : null
    );
  };

  const checkEnabled = (scenario: Scenario, condition?: Condition) => {
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

  const checkStatus = (scenario: Scenario) => {
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
    scenario: Scenario,
    descriptionFields: DescriptionFields[]
  ) => {
    const descriptionArray = [];
    for (let i = 0; i < descriptionFields.length; i++) {
      if (descriptionFields[i].condition) {
        if (typeof descriptionFields[i].condition === 'object') {
          const condtion = getObjectProperty(
            scenario,
            descriptionFields[i].condition.field,
            descriptionFields[i].condition.value
          );
          if (condtion) {
            let descriptionObject = {
              name: descriptionFields[i].name,
              value: getObjectProperty(
                scenario,
                descriptionFields[i].field
              ).toString(),
            };
            descriptionArray.push(descriptionObject);
            continue;
          }
        }
        if (
          getObjectProperty(
            scenario,
            descriptionFields[i].field,
            descriptionFields[i].condition
          )
        ) {
          let descriptionObject = {
            name: descriptionFields[i].name,
            value: getObjectProperty(
              scenario,
              descriptionFields[i].field
            ).toString(),
          };
          descriptionArray.push(descriptionObject);
          continue;
        }
      } else {
        let descriptionObject = {
          name: descriptionFields[i].name,
          value: getObjectProperty(
            scenario,
            descriptionFields[i].field
          ).toString(),
        };
        descriptionArray.push(descriptionObject);
      }
    }
    return descriptionArray;
  };

  const buildScenariosList = (scenarios: Scenario[]) => {
    return sortBy(scenarios, ['dateTime'])
      .reverse()
      .map(scenario => {
        const date = showDate ? scenario.dateTime.toString() : '';
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
              name={getObjectProperty(
                JSON.parse(scenario.data),
                nameField
              ).toString()}
              description={createDescriptionObject(
                JSON.parse(scenario.data),
                descriptionFields as any
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

  const onScenarioClick = (scenario: Scenario) => {
    if (scenario && selectedId !== getObjectProperty(scenario, 'id')) {
      setSelectedId(getObjectProperty(scenario, 'id').toString());
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
