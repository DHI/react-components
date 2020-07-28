import { clone } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  cancelJob,
  deleteScenario,
  executeJob,
  fetchScenario,
  fetchScenarios,
  fetchScenariosByDate,
  postScenario,
  updateScenario,
} from '../../DataServices/DataServices';
import { JobParameters } from '../../DataServices/types';
import { changeObjectProperty, getObjectProperty } from '../../utils/Utils';
import { ScenarioDialog } from '../ScenarioDialog/ScenarioDialog';
import { ScenarioList } from '../ScenarioList/ScenarioList';
import { Dialog, MenuItem, QueryDates, Scenario } from '../types';
import ScenariosProps from './types';
import useStyles from './useStyles';

const Scenarios = (props: ScenariosProps) => {
  const {
    host,
    token,
    scenarioConnection,
    nameField,
    jobConnection,
    jobParameters,
    taskId,
    descriptionFields,
    extraFields,
    menuItems,
    selectedScenarioId,
    showDate,
    showHour,
    showMenu,
    showStatus,
    status,
    queryDates,
    frequency = 10,
    onContextMenuClick,
    onScenarioSelected,
    onScenarioReceived,
    onScenariosReceived,
    addScenario,
    translations,
    timeZone,
  } = props;

  const [dialog, setDialog] = useState<Dialog>();
  const [scenarios, setScenarios] = useState<Scenario[]>();
  const [scenario, setScenario] = useState<Scenario>();
  const classes = useStyles();

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (queryDates) {
      fetchScenariosByDateList(queryDates);

      interval = setInterval(() => fetchScenariosByDateList(queryDates), frequency * 1000);
    } else {
      fetchScenariosList();

      interval = setInterval(() => fetchScenariosList(), frequency * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (addScenario !== scenario) {
      let newScenario: Scenario;

      if (addScenario!.data) {
        newScenario = clone(addScenario) as Scenario;

        newScenario = {
          ...newScenario,
          data: addScenario!.data,
        };
      } else {
        newScenario = {
          data: JSON.stringify(addScenario),
        };
      }

      setScenario(newScenario);
      onAddScenario(newScenario);
    }
  }, [addScenario]);

  const fetchScenariosByDateList = (queryDates: QueryDates) => {
    fetchScenariosByDate(
      {
        host,
        connection: scenarioConnection,
        from: queryDates.windowStart,
        to: queryDates.windowEnd,
        dataSelectors: [
          nameField,
          ...descriptionFields!.map((descriptionField) => descriptionField.field),
          ...extraFields!.map((descriptionField) => descriptionField.field),
        ],
      },
      token,
    ).subscribe(
      (res) => {
        const rawScenarios = res.map((s: { data: string }) => {
          s.data = s.data ? JSON.parse(s.data) : s.data;

          return s;
        });

        setScenarios(rawScenarios);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const fetchScenariosList = () => {
    fetchScenarios(
      {
        host,
        connection: scenarioConnection,
        dataSelectors: [
          nameField,
          ...descriptionFields!.map((descriptionField) => descriptionField.field),
          ...extraFields!.map((descriptionField) => descriptionField.field),
        ],
      },
      token,
    ).subscribe(
      (res) => {
        const rawScenarios = res.map((s: { data: string }) => {
          s.data = s.data ? JSON.parse(s.data) : s.data;

          return s;
        });

        setScenarios(rawScenarios);

        if (onScenariosReceived) {
          onScenariosReceived(rawScenarios);
        }
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const onAddScenario = (newScenario: Scenario) => {
    if (newScenario) {
      postScenario(
        {
          host,
          connection: scenarioConnection,
        },
        token,
        newScenario,
      ).subscribe((res) => res && fetchScenariosList());
    }
  };

  const onExecuteScenario = (scenario: Scenario, menuItem: MenuItem) => {
    closeDialog();

    // Define Job Parameter with ScenarioId
    const parameters = {
      ScenarioId: scenario.id,
    } as JobParameters;

    // Append Job Parameters from Menu Item
    if (menuItem.jobParameters) {
      menuItem.jobParameters.forEach((item: JobParameters) => {
        parameters[item.id] = getObjectProperty(scenario, item.field);
      });
    }

    // Append Job Parameters Props
    Object.assign(parameters, jobParameters);

    executeJob(
      {
        host,
        connection: menuItem.connection || jobConnection,
      },
      token,
      menuItem.taskId || taskId,
      parameters,
    );
  };

  const onTerminateScenario = (scenario: Scenario, menuItem: MenuItem) => {
    closeDialog();

    cancelJob(
      {
        host,
        connection: menuItem.connection || jobConnection,
      },
      token,
      scenario.lastJobId,
    ).subscribe(
      (res) =>
        res &&
        updateScenario(
          {
            host,
            connection: scenarioConnection,
          },
          token,
          {
            id: scenario.id,
            lastJobId: res.id,
            data: JSON.stringify(scenario.data),
          },
        ).subscribe((res) => res && fetchScenariosList()),
    );
  };

  const onCloneScenario = (scenario: Scenario) => {
    closeDialog();
    let clonedScenario = {
      data: scenario.data,
    };
    const clonedNamed = `Clone of ${getObjectProperty(scenario.data, nameField)}`;

    clonedScenario = changeObjectProperty(clonedScenario, nameField, clonedNamed);

    clonedScenario.data = JSON.stringify(clonedScenario.data);

    postScenario(
      {
        host,
        connection: scenarioConnection,
      },
      token,
      clonedScenario,
    ).subscribe((res) => res && fetchScenariosList());
  };

  const getScenario = (id: string, resultCallback: (data: any) => void) => {
    fetchScenario(
      {
        host,
        connection: scenarioConnection,
      },
      token,
      id,
    ).subscribe(
      (res) => {
        res.data = res.data ? JSON.parse(res.data) : res.data;

        resultCallback(res);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const executeDialog = (scenario: Scenario, menuItem: MenuItem) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      showDialog: true,
      dialogTitle: `${menuItem.label} ${job}`,
      dialogMessage:
        translations && translations.executeConfirmation
          ? translations.executeConfirmation.replace('{job}', job)
          : `This will start a new job in the background. The status will change after job completion. Are you sure you want to execute ${job}?`,
      dialogCancelLabel: translations?.cancelLabel || 'Cancel',
      dialogConfirmLabel: translations?.confirmLabel || 'Confirm',
      dialogCommand: () => onExecuteScenario(scenario, menuItem),
    });
  };

  const terminateDialog = (scenario: Scenario, menuItem: MenuItem) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      showDialog: true,
      dialogTitle: `${menuItem.label} ${job}`,
      dialogMessage:
        translations && translations.terminateConfirmation
          ? translations.terminateConfirmation.replace('{job}', job)
          : `This will cancel the job currently executing. The status will change after job cancelation. Are you sure you want to terminate ${job}?`,
      dialogCancelLabel: translations?.cancelLabel || 'Cancel',
      dialogConfirmLabel: translations?.confirmLabel || 'Confirm',
      dialogCommand: () => onTerminateScenario(scenario, menuItem),
    });
  };

  const cloneDialog = (scenario: Scenario) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      showDialog: true,
      dialogTitle: `Clone ${job}`,
      dialogMessage:
        translations && translations.cloneConfirmation
          ? translations.cloneConfirmation.replace('{job}', job)
          : `This will start a new job in the background. You can delete this cloned scenario later. Are you sure you want to clone ${job}?`,
      dialogCancelLabel: translations?.cancelLabel || 'Cancel',
      dialogConfirmLabel: translations?.confirmLabel || 'Confirm',
      dialogCommand: () => onCloneScenario(scenario),
    });
  };

  const deleteDialog = (scenario: Scenario) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      showDialog: true,
      dialogTitle: `Delete ${job}`,
      dialogMessage:
        translations && translations.deleteConfirmation
          ? translations.deleteConfirmation.replace('{job}', job)
          : `This will delete the selected scenario from the list. After it is deleted you cannot retrieve the data. Are you sure you want to delete ${job}?`,
      dialogCancelLabel: translations?.cancelLabel || 'Cancel',
      dialogConfirmLabel: translations?.confirmLabel || 'Confirm',
      dialogCommand: () => onDeleteScenario(scenario),
    });
  };

  const onDeleteScenario = (scenario: Scenario) => {
    closeDialog();

    deleteScenario(
      {
        host,
        connection: scenarioConnection,
      },
      token,
      scenario.id,
    ).subscribe((res) => res.ok && fetchScenariosList());
  };

  const closeDialog = () => {
    setDialog({ showDialog: false });
  };

  const onContextMenuClickHandler = (menuItem: MenuItem, scenario: Scenario) => {
    getScenario(scenario.id!, (res) => {
      switch (menuItem.id) {
        case 'execute':
          return executeDialog(res, menuItem);
        case 'delete':
          return deleteDialog(res);
        case 'clone':
          return cloneDialog(res);
        case 'terminate':
          return terminateDialog(res, menuItem);
        default:
          return onContextMenuClick(menuItem, res);
      }
    });
  };

  const onScenarioSelectedHandler = (scenario: Scenario) => {
    onScenarioSelected(scenario);

    getScenario(scenario.id!, (res) => onScenarioReceived(res));
  };

  let printedScenarios = null;
  let printedDialog = null;

  if (scenarios) {
    printedScenarios = (
      <ScenarioList
        nameField={nameField}
        descriptionFields={descriptionFields}
        extraFields={extraFields}
        menuItems={menuItems}
        scenarios={scenarios as any}
        selectedScenarioId={selectedScenarioId}
        onScenarioSelected={onScenarioSelectedHandler}
        onContextMenuClick={onContextMenuClickHandler}
        showDate={showDate}
        showHour={showHour}
        showMenu={showMenu}
        showStatus={showStatus}
        status={status}
        timeZone={timeZone}
      />
    );
  }

  if (dialog) {
    printedDialog = (
      <ScenarioDialog
        title={dialog.dialogTitle}
        message={dialog.dialogMessage}
        cancelLabel={dialog.dialogCancelLabel}
        confirmLabel={dialog.dialogConfirmLabel}
        command={dialog.dialogCommand}
        showDialog={dialog.showDialog}
        closeDialog={closeDialog}
      />
    );
  }

  return (
    <div className={classes && classes.root}>
      {printedScenarios} {printedDialog}
    </div>
  );
};

export { ScenariosProps, Scenarios };
