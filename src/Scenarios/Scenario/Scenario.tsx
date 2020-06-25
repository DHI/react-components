import { clone } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import {
  cancelJob,
  deleteScenario,
  executeJob,
  fetchScenarios,
  fetchScenariosByDate,
  postScenario,
  updateScenario,
} from '../../DataServices/DataServices';
import { changeObjectProperty, getObjectProperty, uniqueId } from '../../Utils/Utils';
import { ScenarioDialog } from '../ScenarioDialog/ScenarioDialog';
import { ScenarioList } from '../ScenarioList/ScenarioList';
import IScenariosProps, { IDialog, IMenuItem, IQueryDates, IScenario } from './types';
import useStyles from './useStyles';

const Scenario: FC<IScenariosProps> = (props: IScenariosProps) => {
  const {
    host,
    token,
    scenarioConnection,
    nameField,
    jobConnection,
    taskId,
    descriptionFields,
    menuItems,
    selectedScenarioId,
    showDate,
    showHour,
    showMenu,
    showStatus,
    status,
    queryDates,
    frequency,
    onContextMenuClick,
    addScenario,
    translations,
  } = props;

  const [dialog, setDialog] = useState<IDialog>();
  const [scenarios, setScenarios] = useState<IScenario[]>();
  const [scenario, setScenario] = useState<IScenario>();
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
      let newScenario: IScenario;

      if (addScenario.data) {
        newScenario = clone(addScenario);

        newScenario = {
          ...newScenario,
          id: uniqueId(),
          data: addScenario.data,
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

  const fetchScenariosByDateList = (queryDates: IQueryDates) => {
    fetchScenariosByDate(
      {
        host,
        connection: scenarioConnection,
        from: queryDates.windowStart,
        to: queryDates.windowEnd,
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
      () => {},
    );
  };

  const onAddScenario = (newScenario: IScenario) => {
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

  const executeDialog = (scenario: IScenario, menuItem: IMenuItem) => {
    setDialog({
      showDialog: true,
      dialogTitle: `${menuItem.label} ${getObjectProperty(scenario.data, nameField)}`,
      dialogMessage:
        translations && translations.executeConfirmation
          ? `${translations.executeConfirmation} 
        ${getObjectProperty(scenario.data, nameField)} ?`
          : `This will start a new job in the background. The status will change after job completion. Are you sure you want to execute ${getObjectProperty(
              scenario.data,
              nameField,
            )} ?`,
      dialogCancelLabel: translations && translations.cancelLabel ? translations.cancelLabel : 'Cancel',
      dialogConfirmLabel: translations && translations.confirmLabel ? translations.confirmLabel : 'Confirm',
      dialogCommand: () => onExecuteScenario(scenario, menuItem),
    });
  };

  const onExecuteScenario = (scenario: IScenario, menuItem: IMenuItem) => {
    closeDialog();

    executeJob(
      {
        host,
        connection: menuItem.connection || jobConnection,
      },
      token,
      menuItem.taskId || taskId,
      {
        ScenarioId: scenario.id,
      },
    );
  };

  const terminateDialog = (scenario: IScenario, menuItem: IMenuItem) => {
    setDialog({
      showDialog: true,
      dialogTitle: `${menuItem.label} ${getObjectProperty(scenario.data, nameField)}`,
      dialogMessage:
        translations && translations.terminateConfirmation
          ? `${translations.terminateConfirmation} 
          ${getObjectProperty(scenario.data, nameField)} ?`
          : `This will cancel the job currently executing. The status will change after job cancelation. Are you sure you want to terminate ${getObjectProperty(
              scenario.data,
              nameField,
            )} ?`,
      dialogCancelLabel: translations && translations.cancelLabel ? translations.cancelLabel : 'Cancel',
      dialogConfirmLabel: translations && translations.confirmLabel ? translations.confirmLabel : 'Confirm',
      dialogCommand: () => onTerminateScenario(scenario, menuItem),
    });
  };

  const onTerminateScenario = (scenario: IScenario, menuItem: IMenuItem) => {
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

  const cloneDialog = (scenario: IScenario) => {
    setDialog({
      showDialog: true,
      dialogTitle: `Clone ${getObjectProperty(scenario.data, nameField)}`,
      dialogMessage:
        translations && translations.cloneConfirmation
          ? `${translations.cloneConfirmation} ?`
          : `This will start a new job in the background. You can delete this cloned scenario later. Are you sure you want to clone ?`,
      dialogCancelLabel: translations && translations.cancelLabel ? translations.cancelLabel : 'Cancel',
      dialogConfirmLabel: translations && translations.confirmLabel ? translations.confirmLabel : 'Confirm',
      dialogCommand: () => onCloneScenario(scenario),
    });
  };

  const onCloneScenario = (scenario: IScenario) => {
    closeDialog();
    let clonedScenario = {
      data: scenario.data,
    };
    const clonedNamed = `Clone of ${getObjectProperty(scenario, nameField)}`;

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

  const deleteDialog = (scenario: IScenario) => {
    setDialog({
      showDialog: true,
      dialogTitle: `Delete ${getObjectProperty(scenario.data, nameField)}`,
      dialogMessage:
        translations && translations.deleteConfirmation
          ? `${translations.deleteConfirmation} 
          ${getObjectProperty(scenario.data, nameField)} ?`
          : `This will delete the selected scenario from the list. After it is deleted you cannot retrieve the data. Are you sure you want to delete ${getObjectProperty(
              scenario.data,
              nameField,
            )} ?`,
      dialogCancelLabel: translations && translations.cancelLabel ? translations.cancelLabel : 'Cancel',
      dialogConfirmLabel: translations && translations.confirmLabel ? translations.confirmLabel : 'Confirm',
      dialogCommand: () => onDeleteScenario(scenario),
    });
  };

  const onDeleteScenario = (scenario: IScenario) => {
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

  const onContextMenuClickHandler = (menuItem: IMenuItem, scenario: IScenario) => {
    switch (menuItem.id) {
      case 'execute':
        return executeDialog(scenario, menuItem);
      case 'delete':
        return deleteDialog(scenario);
      case 'clone':
        return cloneDialog(scenario);
      case 'terminate':
        return terminateDialog(scenario, menuItem);
      default:
        return onContextMenuClick(scenario, menuItem.id);
    }
  };

  let printedScenarios = null;
  let printedDialog = null;

  if (scenarios) {
    printedScenarios = (
      <ScenarioList
        nameField={nameField}
        descriptionFields={descriptionFields}
        menuItems={menuItems}
        scenarios={scenarios as any}
        selectedScenarioId={selectedScenarioId}
        onContextMenuClick={onContextMenuClickHandler}
        showDate={showDate}
        showHour={showHour}
        showMenu={showMenu}
        showStatus={showStatus}
        status={status}
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

export { IScenariosProps, Scenario };
