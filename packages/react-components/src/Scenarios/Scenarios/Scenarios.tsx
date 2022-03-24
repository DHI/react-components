import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { clone } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import {
  cancelJob,
  deleteJsonDocument,
  executeJob,
  executeJobQuery,
  fetchJsonDocument,
  fetchJsonDocuments,
  postJsonDocuments,
} from '../../api';
import { JobParameters } from '../../api/types';
import AuthService from '../../Auth/AuthService';
import GeneralDialog from '../../common/GeneralDialog/GeneralDialog';
import GeneralDialogProps from '../../common/GeneralDialog/types';
import { checkConditions, getObjectProperty, uniqueId } from '../../utils/Utils';
import { ScenarioList } from '../ScenarioList/ScenarioList';
import { MenuItem, Scenario } from '../types';
import ScenariosProps from './types';
import useStyles from './useStyles';

const Scenarios = (props: ScenariosProps) => {
  const {
    host,
    jobHost,
    token,
    jobToken,
    scenarioConnection,
    queryBody,
    jobConnection,
    jobParameters,
    jobQueryItemKey,
    module,
    dataFilterbyProperty,
    signalRConnectionHubUrl,
    taskId,
    hostGroup,
    nameField,
    descriptionFields,
    extraFields,
    menuItems,
    actionButton,
    showReportButton,
    showEditButton,
    selectedScenarioId,
    showDate = true,
    showDateGroups = true,
    showHour,
    showMenu,
    showStatus,
    status,
    highlightNameOnStatus,
    queryDates,
    onContextMenuClick,
    onScenarioSelected,
    onScenarioReceived,
    onScenariosReceived,
    onRenderScenarioItem,
    onRenderScenarioIcon,
    onRowRefsUpdated,
    addScenario,
    translations,
    timeZone,
    debug,
  } = props;

  const [dialog, setDialog] = useState<GeneralDialogProps>({
    showDialog: false,
    cancelLabel: translations?.cancelLabel || 'Cancel',
    confirmLabel: translations?.confirmLabel || 'Confirm',
    dialogId: '',
    title: '',
    message: '',
    onConfirm: null,
  });
  const [scenarios, setScenarios] = useState<Scenario[]>();
  const [scenario, setScenario] = useState<Scenario>();
  const classes = useStyles();
  const latestScenarios = useRef(null);
  const mounted = useRef(false);

  latestScenarios.current = scenarios;

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
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

  const fetchScenariosList = () => {
    let obj = {};

    if (queryDates) {
      obj = {
        ...obj,
        from: queryDates?.from || '',
        to: queryDates?.to || '',
      };
    } else if (descriptionFields) {
      obj = {
        ...obj,
        dataSelectors:
          [
            nameField,
            ...descriptionFields!.map((descriptionField) => descriptionField.field),
            ...extraFields!.map((descriptionField) => descriptionField.field),
          ] || [],
      };
    }

    fetchJsonDocuments(
      {
        ...obj,
        host,
        connection: scenarioConnection,
      },
      token,
    ).subscribe(
      (res) => {
        if (!mounted.current) {
          return;
        }

        const rawScenarios = res.map((s: { data: string }) => {
          s.data = s.data ? JSON.parse(s.data) : s.data;

          return s;
        });
        const updatedScenarios = [];
        const newScenarios = rawScenarios.filter((scenario) => checkConditions(scenario, dataFilterbyProperty));

        if (!jobConnection) {
          setScenarios(newScenarios);

          if (onScenariosReceived) {
            onScenariosReceived(newScenarios);
          }

          return;
        }

        const values = newScenarios.map((item) => item.fullName);

        const query = [
          {
            item: jobQueryItemKey,
            queryOperator: 'Any',
            values,
          },
        ];

        const jobSources = {
          token: token || jobToken,
          host: jobHost || host,
          connection: jobConnection,
        };

        try {
          executeJobQuery(jobSources, query).subscribe((jobs) => {
            if (!mounted.current) {
              return;
            }

            newScenarios.map((scenario) => {
              const latestJob = filterToLastJob(scenario, jobs);
              let sce = {};

              if (latestJob && latestJob.data) {
                sce = { ...scenario, lastJob: latestJob.data };
              } else {
                sce = scenario;
              }

              updatedScenarios.push(sce);
            });

            if (debug) {
              console.log({ updatedScenarios });
            }

            setScenarios(updatedScenarios);

            if (onScenariosReceived) {
              onScenariosReceived(updatedScenarios);
            }
          });
        } catch (err) {
          console.log('Error retrieving Jobs: ', err);
        }
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const filterToLastJob = (scenario, jobs) => {
    if (jobs) {
      const latestJobByScenario = jobs
        .filter((job) => job.data.parameters[jobQueryItemKey] === scenario.fullName)
        .sort((a, b) => b.requested - a.requested);

      return latestJobByScenario[0];
    } else {
      return null;
    }
  };

  const onAddScenario = (newScenario: Scenario) => {
    if (newScenario) {
      postJsonDocuments(
        {
          host,
          connection: scenarioConnection,
        },
        token,
        newScenario,
      ).subscribe((res) => {
        if (!mounted.current) {
          return;
        }

        res && fetchScenariosList();
      });
    }
  };

  const onExecuteScenario = (scenario: Scenario, menuItem: MenuItem) => {
    closeDialog();

    // Define Job Parameter with jobQueryItemKey
    const parameters = {
      [jobQueryItemKey]: scenario.fullName,
    } as JobParameters;

    // Append Job Parameters from Menu Item
    if (menuItem.jobParameters) {
      for (const key in menuItem.jobParameters) {
        parameters[key] = getObjectProperty(scenario, menuItem.jobParameters[key]);
      }
    }

    // Append Job Parameters Props
    Object.assign(parameters, jobParameters);

    executeJob(
      {
        host: jobHost || host,
        connection: menuItem.connection || jobConnection,
      },
      jobToken || token,
      menuItem.taskId || taskId,
      parameters,
      menuItem.hostGroup || hostGroup,
    ).subscribe((job) => {
      if (!mounted.current) {
        return;
      }

      if (debug) {
        console.log('Execute: ', job);
      }

      const newScenarios = scenarios.map((sce) =>
        sce.fullName === job.parameters[jobQueryItemKey] ? { ...sce, lastJob: job } : { ...sce },
      );

      setScenarios(newScenarios);
    });
  };

  const onTerminateScenario = (scenario: Scenario, menuItem: MenuItem) => {
    closeDialog();

    if (debug) {
      console.log('onTerminateScenario: ', scenario);
    }

    cancelJob(
      {
        host: jobHost || host,
        connection: menuItem.connection || jobConnection,
      },
      jobToken || token,
      scenario.lastJob.id,
    );
  };

  const onCloneScenario = (scenario: Scenario) => {
    closeDialog();

    const clonedScenario = {
      ...scenario,
      fullName: `scenario-${uniqueId()}`,
      data: {
        ...scenario.data,
        name: `Clone of ${getObjectProperty(scenario.data, nameField)}`,
      },
    };

    clonedScenario.data = JSON.stringify(clonedScenario.data);

    postJsonDocuments(
      {
        host,
        connection: scenarioConnection,
      },
      token,
      clonedScenario,
    ).subscribe((res) => {
      if (!mounted.current) {
        return;
      }

      res && fetchScenariosList();
    });
  };

  const onEditScenario = (scenario: Scenario) => {
    closeDialog();
    const updatedScenario = scenarios.map((sce) => {
      if (sce.fullName === scenario.fullName) {
        if (new Date(sce.added).getTime() <= new Date().getTime()) {
          delete sce.lastJob;
        }
      }

      return sce;
    });

    setScenarios(updatedScenario);
  };

  const getScenarios = (id: string, resultCallback: (data: any) => void) => {
    fetchJsonDocument(
      {
        host,
        connection: scenarioConnection,
      },
      token,
      id,
    ).subscribe(
      (res) => {
        if (!mounted.current) {
          return;
        }

        res.data = res.data ? JSON.parse(res.data) : res.data;
        resultCallback(res);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const modalMessage = (action, translations, job) => {
    switch (action) {
      case 'delete':
        return translations && translations.deleteConfirmation
          ? translations.deleteConfirmation.replace('%job%', job)
          : `This will delete the selected scenario from the list. After it is deleted you cannot retrieve the data. Are you sure you want to delete ${job}?`;

      case 'execute':
        return translations && translations.executeConfirmation
          ? translations.executeConfirmation.replace('%job%', job)
          : `This will start a new job in the background. The status will change after job completion. Are you sure you want to execute ${job}?`;

      case 'clone':
        return translations && translations.cloneConfirmation
          ? translations.cloneConfirmation.replace('%job%', job)
          : `This will start a new job in the background. You can delete this cloned scenario later. Are you sure you want to clone ${job}?`;

      case 'edit':
        return translations && translations.editConfirmation
          ? translations.editConfirmation.replace('%job%', job)
          : `This will Edit ${job}?`;

      case 'terminate':
        return translations && translations.terminateConfirmation
          ? translations.terminateConfirmation.replace('%job%', job)
          : `This will cancel the job currently executing. The status will change after job cancelation. Are you sure you want to terminate ${job}?`;
      default:
        return '';
    }
  };

  const executeDialog = (scenario: Scenario, menuItem: MenuItem) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      ...dialog,
      showDialog: true,
      dialogId: 'execute',
      title: `${menuItem.label} ${job}`,
      message: modalMessage('execute', translations, job),
      onConfirm: () => onExecuteScenario(scenario, menuItem),
    });
  };

  const terminateDialog = (scenario: Scenario, menuItem: MenuItem) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      ...dialog,
      showDialog: true,
      dialogId: 'terminate',
      title: `${menuItem.label} ${job}`,
      message: modalMessage('terminate', translations, job),
      onConfirm: () => onTerminateScenario(scenario, menuItem),
    });
  };

  const cloneDialog = (scenario: Scenario) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      ...dialog,
      showDialog: true,
      dialogId: 'clone',
      title: `${translations?.cloneTitle || 'Clone'} ${job}`,
      message: modalMessage('clone', translations, job),
      onConfirm: () => onCloneScenario(scenario),
    });
  };

  const deleteDialog = (scenario: Scenario) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      ...dialog,
      showDialog: true,
      dialogId: 'delete',
      title: `${translations?.deleteTitle || 'Delete'} ${job}`,
      message: modalMessage('delete', translations, job),
      onConfirm: () => onDeleteScenario(scenario),
    });
  };

  const editDialog = (scenario: Scenario) => {
    const job = getObjectProperty(scenario.data, nameField);

    setDialog({
      ...dialog,
      showDialog: true,
      dialogId: 'edit',
      title: `${translations?.deleteTitle || 'Edit'} ${job}`,
      message: modalMessage('edit', translations, job),
      onConfirm: () => onEditScenario(scenario),
    });
  };

  const onDeleteScenario = (scenario: Scenario) => {
    closeDialog();

    deleteJsonDocument(
      {
        host,
        connection: scenarioConnection,
      },
      token,
      scenario.fullName,
    ).subscribe((res) => {
      if (!mounted.current) {
        return;
      }

      res.ok && fetchScenariosList();
    });
  };

  const closeDialog = () => {
    setDialog({
      ...dialog,
      showDialog: false,
    });
  };

  const onContextMenuClickHandler = (menuItem: MenuItem, scenario: Scenario) => {
    getScenarios(scenario.fullName!, (res) => {
      switch (menuItem.id) {
        case 'execute':
          return executeDialog(res, menuItem);
        case 'delete':
          return deleteDialog(res);
        case 'clone':
          return cloneDialog(res);
        case 'edit':
          return editDialog(res);
        case 'terminate':
          return terminateDialog(
            {
              ...res,
              lastJob: scenario.lastJob,
            },
            menuItem,
          );
        default:
          return onContextMenuClick(menuItem, res);
      }
    });
  };

  const onScenarioSelectedHandler = (scenario: Scenario[]) => {
    if (scenario[0] === undefined) return null;

    if (scenario.length > 1) {
      const currentSelectedScenarios = [];

      const promise = new Promise((resolve, reject) => {
        scenario.map((sce) => getScenarios(sce.fullName!, (res) => currentSelectedScenarios.push(res)));
        resolve(currentSelectedScenarios);
      });

      promise.then((res) => onScenarioReceived(res as Scenario[]));

      onScenarioSelected(scenario);
    } else {
      onScenarioSelected(scenario[0]);

      getScenarios(scenario[0].fullName!, (res) => onScenarioReceived(res));
    }
  };

  const JsonDocumentAddedScenario = (added) => {
    if (debug) {
      console.log({ added });
    }

    setScenarios([...scenarios, added]);
  };

  const jobUpdated = (jobAdded) => {
    const job = JSON.parse(jobAdded.data);

    if (debug) {
      console.log({ job });
      console.log({ latestScenarios });
    }

    const updateScenario = latestScenarios.current.map((scenario) =>
      scenario.fullName === job.Parameters[jobQueryItemKey] && scenario.lastJob.status !== 'Completed'
        ? {
            ...scenario,
            lastJob: {
              ...scenario.lastJob,
              status: job.Status,
              progress: job.Progress,
            },
          }
        : scenario,
    );

    if (debug) {
      console.log({ updateScenario });
    }

    setScenarios(updateScenario);
  };

  const connectToSignalR = async () => {
    const auth = new AuthService(process.env.ENDPOINT_URL);
    const session = auth.getSession();

    // Open connections
    try {
      if (!auth) {
        throw new Error('Not Authorised.');
      }

      const connection = new HubConnectionBuilder()
        .withUrl(signalRConnectionHubUrl, {
          accessTokenFactory: () => session.accessToken,
        })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      connection
        .start()
        .then(() => {
          if (debug) {
            console.log('SignalR Connected!');
          }

          connection.on('JsonDocumentAdded', JsonDocumentAddedScenario);
          connection.on('JobUpdated', jobUpdated);

          if (jobConnection) {
            connection.invoke('AddJobFilter', jobConnection, []);
          }

          connection.invoke('AddJsonDocumentFilter', scenarioConnection, []);
        })
        .catch((e) => console.log('Connection failed: ', e));
    } catch (err) {
      console.log('SignalR connection failed: ', err);
    }
  };

  useEffect(() => {
    connectToSignalR();
    fetchScenariosList();
  }, [queryDates]);

  return (
    <div className={classes && classes.root}>
      {scenarios && (
        <ScenarioList
          nameField={nameField}
          extraFields={extraFields}
          descriptionFields={descriptionFields}
          menuItems={menuItems}
          scenarios={scenarios as any}
          selectedScenarioId={selectedScenarioId}
          onScenarioSelected={onScenarioSelectedHandler}
          onContextMenuClick={onContextMenuClickHandler}
          onRenderScenarioItem={onRenderScenarioItem}
          onRenderScenarioIcon={onRenderScenarioIcon}
          onRowRefsUpdated={onRowRefsUpdated}
          showDate={showDate}
          showDateGroups={showDateGroups}
          showHour={showHour}
          showMenu={showMenu}
          showStatus={showStatus}
          status={status}
          highlightNameOnStatus={highlightNameOnStatus}
          timeZone={timeZone}
          actionButton={actionButton}
          showReportButton={showReportButton}
          showEditButton={showEditButton}
        />
      )}
      {dialog && (
        <GeneralDialog
          dialogId={dialog.dialogId}
          title={dialog.title}
          message={dialog.message}
          cancelLabel={dialog.cancelLabel}
          confirmLabel={dialog.confirmLabel}
          showDialog={dialog.showDialog}
          onConfirm={dialog.onConfirm}
          onCancel={closeDialog}
        />
      )}
    </div>
  );
};

export { ScenariosProps, Scenarios };
