import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Meta } from '@storybook/react/types-6-0.d';
import addDays from 'date-fns/addDays';
import React, { useState } from 'react';
import { LoginGate } from '../Auth/LoginGate';
import { uniqueId } from '../utils/Utils';
import { MENU_ITEMS, ROUTES, STATUS, TRANSLATIONS } from './ScenarioList/scenarioListConstants';
import { Scenarios } from './Scenarios/Scenarios';
import { ScenariosOLD } from './ScenariosOLD/Scenarios';
import { MenuItem, Scenario, ScenarioOLD } from './types';

export default {
  title: 'Scenarios Components',
  component: ScenariosOLD,
} as Meta;

export const ScenariosStory = () => {
  const [newScenario, setNewScenario] = useState<ScenarioOLD>();

  const onAddScenario = () => {
    setNewScenario({
      data: `{"testProperty":true,"name":"My Scenario","startTime":"${new Date().toISOString()}","vessel":{"vesselName":"MSC Pamela"},"mooring":{"berthName":"VIG Berth 2"}}`,
    });
  };

  const queryDates = {
    from: addDays(new Date(), -3).toISOString(),
    to: addDays(new Date(), 1).toISOString(),
  };

  return (
    <div>
      <Typography align="left" component="div" style={{ marginBottom: '20px' }}>
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '24px',
            color: '#0D3958',
          }}
        >
          Scenarios
        </span>
      </Typography>
      <LoginGate host={process.env.ENDPOINT_URL} showRememberMe={true} textFieldVariant={'outlined'}>
        {({ token }) => (
          <>
            <Typography align="left" component="div" style={{ marginBottom: '10px' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#0D3958' }}
                startIcon={<AddIcon />}
                onClick={onAddScenario}
              >
                <span>Add new scenario</span>
              </Button>
            </Typography>
            <ScenariosOLD
              frequency={10}
              token={token.accessToken.token}
              host={process.env.ENDPOINT_URL}
              queryDates={queryDates}
              scenarioConnection={'postgres-scenarios'}
              jobConnection={'wf-jobs'}
              dataFilterbyProperty={[
                {
                  field: 'data.mooring',
                },
                {
                  field: 'data.stillShowListWithNoExistantProperty',
                  value: 'false',
                },
                {
                  field: 'data.testProperty',
                  value: 'false',
                },
              ]}
              nameField="name"
              descriptionFields={[
                {
                  field: 'data.vessel.vesselName',
                  name: 'Vessel Name',
                },
                {
                  field: 'data.mooring.berthName',
                  name: 'Berth Name',
                  condition: {
                    field: 'status',
                    value: 'Completed',
                  },
                },
                {
                  field: 'data.startTime',
                  name: 'Start Date',
                  dataType: 'dateTime',
                  condition: {
                    field: 'data.startTime',
                  },
                },
                {
                  field: 'dateTime',
                  name: 'Creation Date',
                  dataType: 'dateTime',
                  format: 'dd-MMM-yyyy h:mm:ss a',
                },
                {
                  field: 'testProperty',
                  name: 'Test Property',
                },
              ]}
              extraFields={[
                {
                  field: 'data.vessel.loa',
                  name: 'Vessel LOA',
                },
              ]}
              taskId={'workflow'}
              timeZone="Australia/Brisbane"
              menuItems={[
                {
                  id: 'execute',
                  label: 'Execute',
                  disabled: true,
                  condition: {
                    field: '!lastJobStatus', // Prefix with exclamation if you wish to inverse the condition test
                    value: ['Pending', 'InProgress', 'Completed'],
                  },
                  taskId: 'workflow',
                },
                {
                  id: 'clone',
                  label: 'Clone',
                },
                {
                  id: 'delete',
                  label: 'Delete',
                },
                {
                  id: 'terminate',
                  label: 'Terminate',
                },
                {
                  id: 'openPdf',
                  label: 'Open PDF',
                  condition: {
                    field: 'data.mooring.berthName',
                    value: 'VIG Berth 2',
                  },
                },
              ]}
              onContextMenuClick={(menuItem: MenuItem, scenario: ScenarioOLD) =>
                console.log('Scenario menu item clicked', {
                  menuItem,
                  scenario,
                })
              }
              onScenarioSelected={(scenario: ScenarioOLD) => {
                console.log('Scenario selected', scenario);
              }}
              onScenarioReceived={(scenario: ScenarioOLD) => {
                console.log('Full Scenario received', scenario);
              }}
              onScenariosReceived={(scenarios: ScenarioOLD[]) => {
                console.log('Received new scenarios!', scenarios);
              }}
              showDate
              showHour
              showMenu
              showStatus
              status={[
                {
                  name: 'Pending',
                  color: 'orange',
                  message: 'Pending',
                },
                {
                  name: 'InProgress',
                  color: 'orange',
                  message: 'Running',
                },
                {
                  name: 'Unknown',
                  color: 'black',
                  message: 'Unknown',
                },
                {
                  name: 'ReadyToInitiate',
                  color: 'red',
                  message: 'Ready',
                },
                {
                  name: 'Completed',
                  color: 'green',
                  message: 'Completed',
                },
                {
                  name: 'Error',
                  color: 'black',
                  message: 'Error',
                },
                {
                  name: 'Default',
                  color: 'black',
                  message: 'Unknown',
                },
              ]}
              addScenario={newScenario}
              translations={{
                executeConfirmation:
                  'Ini akan memulai pekerjaan baru di latar belakang. Status akan berubah setelah penyelesaian pekerjaan. Anda yakin ingin mengeksekusi',
                terminateConfirmation:
                  'Ini akan membatalkan pekerjaan yang sedang dieksekusi. Status akan berubah setelah pembatalan pekerjaan. Anda yakin ingin mengakhiri',
                cloneConfirmation:
                  'Ini akan memulai pekerjaan baru di latar belakang. Anda dapat menghapus skenario kloning ini nanti. Anda yakin ingin mengkloning',
                deleteConfirmation:
                  'Ini akan menghapus skenario yang dipilih dari daftar. Setelah dihapus, Anda tidak dapat mengambil data. Anda yakin ingin menghapus',
                cancelLabel: 'Batal',
                confirmLabel: 'Lanjut',
              }}
            />
          </>
        )}
      </LoginGate>
    </div>
  );
};

export const ScenariosJSONStory = () => {
  const [newScenario, setNewScenario] = useState<Scenario>();

  const onAddScenario = () => {
    setNewScenario({
      fullName: `scenario-${uniqueId()}`,
      data: `{"name":"My Scenario JSON","startTime":"${new Date().toISOString()}","vessel":{"vesselName":"MSC Pamela"},"mooring":{"berthName":"VIG Berth 2"}}`,
      dateTime: new Date().toISOString(),
      permissions: [
        {
          principals: ['Administrators', 'Editors', 'Users'],
          operation: 'read',
        },
        {
          principals: ['Administrators', 'Editors'],
          operation: 'update',
        },
        {
          principals: ['Administrators'],
          operation: 'delete',
        },
      ],
    });
  };

  const queryDates = {
    from: addDays(new Date(), -3).toISOString(),
    to: addDays(new Date(), 1).toISOString(),
  };

  return (
    <div>
      <Typography align="left" component="div" style={{ marginBottom: '20px' }}>
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '24px',
            color: '#0D3958',
          }}
        >
          Scenarios JSON
        </span>
      </Typography>
      <LoginGate host={process.env.ENDPOINT_URL} showRememberMe={true} textFieldVariant={'outlined'}>
        {({ token }) => (
          <>
            <Typography align="left" component="div" style={{ marginBottom: '10px' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#0D3958' }}
                startIcon={<AddIcon />}
                onClick={onAddScenario}
              >
                <span>Add new scenario</span>
              </Button>
            </Typography>
            <Scenarios
              frequency={10}
              token={token.accessToken.token}
              // queryDates={queryDates}
              host={process.env.ENDPOINT_URL}
              scenarioConnection={'postgres-jsondocuments-scenarios'}
              jobConnection={'wf-jobs'}
              dataFilterbyProperty={[
                {
                  field: 'data.mooring',
                },
                {
                  field: 'data.stillShowListWithNoExistantProperty',
                  value: 'false',
                },
              ]}
              nameField="name"
              descriptionFields={[
                {
                  field: 'data.vessel.vesselName',
                  name: 'Vessel Name',
                },
                {
                  field: 'data.mooring.berthName',
                  name: 'Berth Name',
                  condition: {
                    field: 'lastJob.status',
                    value: 'Completed',
                  },
                },
                {
                  field: 'data.startTime',
                  name: 'Start Date',
                  dataType: 'dateTime',
                  condition: {
                    field: 'data.startTime',
                  },
                },
                {
                  field: 'dateTime',
                  name: 'Creation Date',
                  dataType: 'dateTime',
                  format: 'dd-MMM-yyyy h:mm:ss a',
                },
              ]}
              extraFields={[
                {
                  field: 'data.vessel.loa',
                  name: 'Vessel LOA',
                },
              ]}
              taskId={'workflowJsonDocument'}
              timeZone="Australia/Brisbane"
              menuItems={MENU_ITEMS}
              routes={ROUTES}
              onContextMenuClick={(menuItem: MenuItem, scenario: Scenario) =>
                console.log('Scenario menu item clicked', {
                  menuItem,
                  scenario,
                })
              }
              onScenarioSelected={(scenario: Scenario) => {
                console.log('Scenario selected', scenario);
              }}
              onScenarioReceived={(scenario: Scenario) => {
                console.log('Full Scenario received', scenario);
              }}
              onScenariosReceived={(scenarios: Scenario[]) => {
                console.log('Received new scenarios!', scenarios);
              }}
              showDate
              showHour
              showMenu
              showStatus
              status={STATUS}
              highlightNameOnStatus="Error"
              addScenario={newScenario}
              translations={TRANSLATIONS}
              debug
            />
          </>
        )}
      </LoginGate>
    </div>
  );
};
