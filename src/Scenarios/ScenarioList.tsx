import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
//import { withStyles, createStyles } from '@material-ui/core/styles';
import { Divider, makeStyles } from '@material-ui/core';
import { groupBy, sortBy, isEmpty, isObject } from 'lodash';
import { format, parseISO } from 'date-fns';
//import { getObjectProperty } from '@dhi/utils';
import { ScenarioItem } from './ScenarioItem';

interface IScenarioListProps {
  classes: any;
  functions: any;
  menuItems: {
    name: string;
    field: string;
    condition?: {
      field: string;
      value: string;
    };
  }[];
  scenarios: {
    id: string;
    lastJobStatus: string;
    lastJobId: string;
    dateTime: string;
    version: string;
    data: string;
    lastJobProgress?: number;
  }[];
  //idField: string;
  nameField: string;
  //dateField: string;
  descriptionFields: {
    field: string;
    name: string;
    condition?: {
      field: string;
      value: string;
    };
  }[];
  showDate: boolean;
  showHour: boolean;
  showMenu: boolean;
  showStatus: boolean;
  onSelectScenario: any;
  selectedScenarioId: string;
  status: {
    name: string;
    color: string;
    message: string;
  }[];
}

interface ObjectProperties {
  [key: string]: ObjectProperties | string;
}

const ScenarioList: FC<IScenarioListProps> = (propData: IScenarioListProps) => {
  const [groupedScenarios, setGroupedScenarios] = useState(Object);
  const [selectedId, setSelectedId] = useState(propData.selectedScenarioId);
  const useStyles = makeStyles(propData.classes);
  const classes = useStyles();

  useEffect(() => {
    groupScenarios(propData.scenarios);
  }, []);

  const getObjectProperty = (
    objectItem: ObjectProperties | string,
    property: string,
    compareValue?: any
  ) => {
    let valid = true;
    const properties = property.split('.');
    let value = objectItem;
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].indexOf('!') >= 0) {
        valid = !valid;
        properties[i] = properties[i].replace('!', '');
      }
      value = isObject(value) ? value[properties[i]] : '';
    }
    if (compareValue) {
      if (typeof compareValue === 'object') {
        for (let i = 0; i < compareValue.length; i++) {
          if (value === compareValue[i]) {
            return valid;
          }
        }
        return !valid;
      }
      return valid ? value === compareValue : !(value === compareValue);
    }
    return valid ? value : !value;
  };

  function groupScenarios(scenarios: any) {
    // group scenarios in an object with the date as key
    const groupedScenarios =
      propData.showHour || propData.showDate
        ? groupBy(scenarios, scenario =>
            format(
              'dateTime'
                ? parseISO(getObjectProperty(scenario, 'dateTime').toString())
                : parseISO(scenario.DateTime),
              'yyyy-MM-dd'
            )
          )
        : groupBy(scenarios, scenario =>
            getObjectProperty(scenario, 'dateTime')
          );
    setGroupedScenarios(groupedScenarios);
  }

  const buildMenu = (scenario: any) => {
    return propData.menuItems.filter(menuItem =>
      checkEnabled(scenario, menuItem.condition) ? menuItem : null
    );
  };

  const checkEnabled = (scenario: any, condition: any) => {
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

  const checkStatus = (scenario: any) => {
    const scenarioStatus = getObjectProperty(scenario, 'lastJobStatus');
    const progress = getObjectProperty(scenario, 'lastJobProgress');

    let currentStatus = {};
    propData.status.map(obj => {
      if (obj.name === scenarioStatus) {
        currentStatus = {
          ...obj,
          progress,
        };
      }
    });

    let result;
    if (scenarioStatus === undefined) {
      result = {
        color: 'red',
        message: 'Unknown Status Field',
      };
    } else if (currentStatus === null) {
      result = {
        color: 'red',
        message: 'Unknown Status',
      };
    } else {
      result = currentStatus;
    }

    return result;
  };

  const createDescriptionObject = (scenario: any, descriptionFields: any) => {
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
              value: getObjectProperty(scenario, descriptionFields[i].field),
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
            value: getObjectProperty(scenario, descriptionFields[i].field),
          };
          descriptionArray.push(descriptionObject);
          continue;
        }
      } else {
        let descriptionObject = {
          name: descriptionFields[i].name,
          value: getObjectProperty(scenario, descriptionFields[i].field),
        };
        descriptionArray.push(descriptionObject);
      }
    }
    return descriptionArray;
  };

  const buildScenariosList = (scenarios: any) => {
    return sortBy(scenarios, ['dateTime'])
      .reverse()
      .map(scenario => (
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
            classes={propData.classes.content}
            name={getObjectProperty(
              JSON.parse(scenario.data),
              'name'
            ).toString()}
            description={createDescriptionObject(
              JSON.parse(scenario.data),
              propData.descriptionFields
            )}
            date={
              propData.showDate
                ? getObjectProperty(scenario, 'dateTime').toString()
                : ''
            }
            key={scenario.id}
            isSelected={selectedId === getObjectProperty(scenario, 'id')}
            functions={propData.functions}
            menu={buildMenu(scenario)}
            showHour={propData.showHour}
            showMenu={propData.showMenu}
            showStatus={propData.showStatus}
            scenario={scenario}
            status={checkStatus(scenario)}
          />
        </div>
      ));
  };

  const buildDateArea = (date: string) => {
    const dateObject = {
      day: format(parseISO(date), 'dd'),
      dayName: format(parseISO(date), 'EEE'),
      monthName: format(parseISO(date), 'MMM'),
    };
    const dateBlockwidth = propData.showHour ? '97px' : '39px';
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

  const onScenarioClick = (scenario: any) => {
    if (scenario && selectedId !== getObjectProperty(scenario, 'id')) {
      setSelectedId(getObjectProperty(scenario, 'id').toString());
    }
  };

  return (
    <div className={classes.root}>
      {Object.keys(groupedScenarios)
        .sort()
        .reverse()
        .map(key => (
          <div key={key}>
            {propData.showDate && buildDateArea(key)}
            <div>
              {buildScenariosList(groupedScenarios[key])}
              <Divider variant="inset" className={classes.divider} />
            </div>
          </div>
        ))}
    </div>
  );
};

export { IScenarioListProps, ScenarioList };
