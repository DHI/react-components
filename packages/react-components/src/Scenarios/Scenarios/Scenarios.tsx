import { CircularProgress } from '@material-ui/core';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { clone } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
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
    multipleSelection,
    actionButton,
    showReportButton,
    showEditButton,
    selectedScenarioId,
    showDate = true,
    showYear = false,
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
    checkJobStatus = true,
    showLoading = false,
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
  const [selectedScenarios, setSelectedScenarios] = useState<Scenario[]>([]);
  const [fetchedScenarios, setFetchedScenarios] = useState<Scenario[]>([]);
  const classes = useStyles();
  const latestScenarios = useRef(null);
  const mounted = useRef(false);

  latestScenarios.current = scenarios;

  useEffect(() => {
    mounted.current = true;
    console.debug('Scenarios component mounted');
    return () => {
      mounted.current = false;
      console.debug('Scenarios component unmounted');
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
    }
    if (descriptionFields) {
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

  /**
   * Fetch JsonDocument by id
   *
   * @param {string} id
   * @returns Observable<Scenario[]>
   */
  const getScenarioEx = (id: string) => {
    return fetchJsonDocument(
      {
        host,
        connection: scenarioConnection,
      },
      token,
      id,
    ).pipe(
      map((res) => {
        res.data = res.data && JSON.parse(res.data);
        return res;
      }),
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

  const onContextMenuClickHandler = (menuItem: MenuItem, scenario: Scenario) =>
    getScenarioEx(scenario.fullName!).subscribe({
      next: (res) => {
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
      },
    });

  const onScenarioSelectedHandler = (scenario: Scenario | Scenario[], multiSelectKeyPressed: boolean) => {
    if (scenario === undefined) return null;

    if (multipleSelection) {
      /*
       * This handler will always be called per select or de-select click, consequently the difference between
       * the previous and next selection will always only differ by 1 scenario.
       *
       * But scenario argument will be an array of all selected items regardless.
       *
       * So here we check if current list of selected scenarios has been added to or de-selected (removed from)
       * because we only want to send requests for new additions to the list, not repeat requests for the
       * whole selected list of items.
       *
       * Note: when scenarios have been removed, there is no need to send any requests, simply return the
       * the updated list of previously requested scenarios
       */

      const nextSelection = scenario as Scenario[];

      setSelectedScenarios((prevSelectedScenarios) => {
        // if multiSelectKey has not been pressed then it simply behaves like a single select
        // thats is - there is no previous selection
        const cachedSelection = multiSelectKeyPressed ? prevSelectedScenarios : [];
        const newlyAddedScenarios = nextSelection.filter(
          (s) => !cachedSelection.some((p) => p.fullName === s.fullName),
        );
        const newlyRemovedScenarios = prevSelectedScenarios.filter(
          (p) => !nextSelection.some((s) => s.fullName === p.fullName),
        );

        if (multiSelectKeyPressed && newlyRemovedScenarios.length > 0) {
          // remove scenarios from fetchedScenarios list
          const remainingFetchedScenarios = fetchedScenarios.filter((p) =>
            nextSelection.some((s) => s.fullName === p.fullName),
          );
          onScenarioReceived(remainingFetchedScenarios);
          onScenarioSelected(nextSelection);

          multiSelectKeyPressed
            ? setFetchedScenarios([...remainingFetchedScenarios])
            : setFetchedScenarios([...newlyRemovedScenarios]); // ie removed becomes the single select
          return nextSelection;
        }

        const scenariosRecieved = newlyAddedScenarios.map((s) => getScenarioEx(s.fullName));
        forkJoin(scenariosRecieved).subscribe({
          next: (res: Scenario[]) => {
            //* Can/should set a loading var and clear it in complete()
            if (multiSelectKeyPressed) {
              onScenarioReceived([...fetchedScenarios, ...res]);
              setFetchedScenarios([...fetchedScenarios, ...res]);
            } else {
              onScenarioReceived([...res]);
              setFetchedScenarios([...res]);
            }
            onScenarioSelected(nextSelection);
          },
          complete: () => console.debug(`multiple scenarios fetched`),
        });

        return nextSelection;
      });
    } else {
      onScenarioSelected(scenario);
      getScenarioEx((scenario as Scenario).fullName).subscribe({
        next: (res: Scenario[]) => {
          //* Can/should set a loading var and clear it in complete()
          onScenarioReceived(res);
        },
        complete: () => console.debug(`single scenario fetched`),
      });
    }
  };

  const JsonDocumentAddedScenario = (added) => {
    if (!mounted.current) {
      return;
    }

    if (debug) {
      console.log({ added });
    }

    setScenarios([...latestScenarios.current, added]);
  };

  const jobUpdated = (jobAdded) => {
    if (!mounted.current) {
      return;
    }

    const job = JSON.parse(jobAdded.data);

    if (debug) {
      console.log({ job });
      console.log({ latestScenarios });
    }

    const updateScenario = latestScenarios.current.map((scenario) =>
      scenario.fullName === job.parameters && job.parameters[jobQueryItemKey] && scenario.lastJob.status !== 'Completed'
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

  if (showLoading && !scenarios)
    return (
      <div className={classes && classes.loading}>
        <CircularProgress />
      </div>
    );

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
          showYear={showYear}
          showDateGroups={showDateGroups}
          showHour={showHour}
          showMenu={showMenu}
          showStatus={showStatus}
          status={status}
          highlightNameOnStatus={highlightNameOnStatus}
          timeZone={timeZone}
          multipleSelection={multipleSelection}
          actionButton={actionButton}
          showReportButton={showReportButton}
          showEditButton={showEditButton}
          checkJobStatus={checkJobStatus}
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
