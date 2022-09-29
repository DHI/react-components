import { Divider } from '@material-ui/core';
import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { Dictionary, groupBy, sortBy } from 'lodash';
import React, { createRef, MutableRefObject, useEffect, useState } from 'react';
import { checkCondition, checkStatus, getDescriptions, getObjectProperty, utcToTz } from '../../utils/Utils';
import { ScenarioItem } from '../ScenarioItem/ScenarioItem';
import { Scenario } from '../types';
import ScenarioListProps from './types';
import useStyles from './useStyles';

const ScenarioList = (props: ScenarioListProps) => {
  const {
    nameField,
    descriptionFields,
    selectedScenarioId,
    scenarios,
    showHour,
    showDate,
    showDateGroups,
    menuItems,
    actionButton,
    showReportButton,
    showEditButton,
    onContextMenuClick,
    onScenarioSelected,
    onRenderScenarioItem,
    onRenderScenarioIcon,
    onRowRefsUpdated,
    showStatus,
    status,
    highlightNameOnStatus,
    showMenu,
    timeZone,
    multipleSelection,
    showYear,
    checkJobStatus = true,
  } = props;
  const [groupedScenarios, setGroupedScenarios] = useState<Dictionary<Scenario[]>>();
  const classes = useStyles();
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [multiselectCtrlKey, setMultiselectCtrlKey] = useState<boolean>(false);
  const elRowRefs = React.useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    elRowRefs.current = [];
    groupScenarios(scenarios);
  }, [scenarios]);

  useEffect(() => {
    if (onRowRefsUpdated && elRowRefs.current.length > 0) {
      onRowRefsUpdated(elRowRefs.current);
    }
  }, [elRowRefs.current]);

  useEffect(() => {
    if (onScenarioSelected) {
      const filterScenarios = scenarios.filter((item) => selectedScenarios.indexOf(item.fullName) > -1);

      selectedScenarios.length > 0 && onScenarioSelected(multipleSelection ? filterScenarios : filterScenarios[0], multiselectCtrlKey);
    }
  }, [selectedScenarios]);

  const groupScenarios = (scenarios: Scenario[]) => {
    setGroupedScenarios(
      showHour || showDate || showDateGroups
        ? groupBy(scenarios, (scenario) => {
            return scenario.dateTime ? format(parseISO(scenario.dateTime.split('.')[0]), 'yyyy-MM-dd') : '';
          })
        : groupBy(scenarios, (scenario) => scenario.dateTime),
    );
  };

  const buildMenu = (scenario: Scenario) => {
    return menuItems.filter((menuItem) => {
      return !menuItem.condition || checkCondition(scenario, menuItem.condition) ? menuItem : null;
    });
  };

  const buildScenariosList = (scenarioGroup: Scenario[]) => {
    return sortBy(scenarioGroup, ['dateTime'])
      .reverse()
      .map((scenario, index) => {
        const itemStatus = checkJobStatus
          ? checkStatus(scenario.lastJob, status)
          : {
              name: 'Completed',
              color: '#81C784',
              message: 'Completed',
            };

        return (
          <div
            key={`${scenario.fullName}_${index}`}
            ref={(el) => elRowRefs.current.push(el)}
            onClick={(e) => handleMultiSelection(e, scenario)}
            onKeyPress={(e) => handleMultiSelection(e, scenario)}
            role="presentation"
            className={classNames(classes.listItem, {
              [classes.selectedItem]: selectedScenarioId
                ? scenario.fullName.includes(selectedScenarioId)
                : selectedScenarios.includes(getObjectProperty(scenario, 'fullName')),
            })}
          >
            <ScenarioItem
              name={getObjectProperty(scenario.data, nameField)}
              nameAccentColour={highlightNameOnStatus === itemStatus.name ? itemStatus.color : null}
              description={getDescriptions(scenario, descriptionFields, timeZone)}
              date={showDate ? (scenario.dateTime ? scenario.dateTime.toString() : '') : null}
              key={scenario.fullName}
              isSelected={
                selectedScenarioId
                  ? scenario.fullName.includes(selectedScenarioId)
                  : selectedScenarios.includes(getObjectProperty(scenario, 'fullName'))
              }
              onContextMenuClick={onContextMenuClick}
              menu={buildMenu(scenario)}
              showHour={showHour}
              showMenu={showMenu}
              showStatus={showStatus}
              scenario={scenario}
              status={itemStatus}
              timeZone={timeZone}
              onRenderScenarioItem={onRenderScenarioItem}
              onRenderScenarioIcon={onRenderScenarioIcon}
              onClick={() => onScenarioClick(scenario)}
              actionButton={actionButton}
              showReportButton={showReportButton}
              showEditButton={showEditButton}
            />
          </div>
        );
      });
  };

  const buildDateArea = (date: string, showYear: boolean) => {
    const isoDate = timeZone ? utcToTz(date, timeZone) : parseISO(date);
    const dateObject = {
      day: format(isoDate, 'dd'),
      dayName: format(isoDate, 'EEEE'),
      monthName: format(isoDate, 'MMM'),
      year: format(isoDate, 'yyyy'),
    };

    return (
      <div className={classes.dateBlock}>
        <div className={classes.dateArea}>
          <strong>
            {showYear
              ? `${dateObject.day} ${dateObject.monthName} ${dateObject.year}`
              : `${dateObject.day} ${dateObject.monthName}`}
            <span>{` - ${dateObject.dayName}`} </span>
          </strong>
        </div>
      </div>
    );
  };

  const handleMultiSelection = (e, scenario) => {
    if (multipleSelection) {
      setMultiselectCtrlKey(!!e.ctrlKey);
      if (e.ctrlKey) {
        setSelectedScenarios((prevState) => {
          if (prevState.includes(scenario.fullName)) {
            return prevState.filter((item) => item !== scenario.fullName);
          } else {
            return [...prevState, scenario.fullName];
          }
        });
      } else {
        setSelectedScenarios([scenario.fullName]);
      }
    } else {
      setSelectedScenarios(scenario.fullName);
    }
  };

  const onScenarioClick = (scenario: Scenario) => {
    console.log('ScenarioItem clicked: ', scenario);
  };

  let printedScenarios = null;

  if (groupedScenarios) {
    printedScenarios = Object.keys(groupedScenarios)
      .sort()
      .reverse()
      .map((key, index) => {
        return (
          <div key={key} className={classes.listBlock}>
            {showDateGroups && key && buildDateArea(key, showYear)}
            <div>{key && buildScenariosList(groupedScenarios[key])}</div>
          </div>
        );
      });
  }

  return <div className={classes.root}>{printedScenarios}</div>;
};

export { ScenarioListProps, ScenarioList };
