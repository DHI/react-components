import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Meta } from '@storybook/react/types-6-0.d';
import addDays from 'date-fns/addDays';
import React, { useState } from 'react';
import { LoginGate } from '../Auth/LoginGate';
import { uniqueId } from '../utils/Utils';
import { MENU_ITEMS, STATUS, TRANSLATIONS } from './ScenarioList/scenarioListConstants';
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
      data: `{"testProperty":false,"name":"My Scenario test","startTime":"${new Date().toISOString()}","vessel":{"vesselName":"MSC Pamela"},"mooring":{"berthName":"VIG Berth 2"}}`,
    });
  };

  const queryDates = {
    from: addDays(new Date(), -1).toISOString(),
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
                  // disabled: true,
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
                  name: 'Starting',
                  color: 'orange',
                  message: 'Starting',
                },
                {
                  name: 'Cancel',
                  color: 'grey',
                  message: 'Cancel',
                },
                {
                  name: 'Cancelling',
                  color: 'orange',
                  message: 'Cancelling',
                },
                {
                  name: 'Cancelled',
                  color: 'grey',
                  message: 'Cancelled',
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
  const NOTIFICATION_HUB = '/notificationhub';

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

  const actionButton = {
    name: 'Operational View',
    color: '#00A4EC',
    handleActionButton: () => console.log('Action Button Clicked'),
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
              token={
                'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJzdWIiOiJwb3J0b2ZicmlzYmFuZXBvcnRkaGlzdXBwb3J0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlBvcnQgT2YgQnJpc2JhbmUgUG9ydCBESEkgU3VwcG9ydCIsIm1vZHVsZXMiOiJbXG4gIFwiTW9vcmluZ0FuYWx5c2lzXCIsXG4gIFwiVHJhbnNpdHNWMlwiXG5dIiwicm9sZXMiOiJbXSIsImNsaWVudGlkIjoiUG9ydE9mQnJpc2JhbmUiLCJkZWJ1ZyI6IlRydWUiLCJkZXNjcmlwdGlvbiI6IlN1cHBvcnQgQWNjb3VudCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZ3JvdXBzaWQiOlsiRWRpdG9ycyIsIkR5bmFtaWMtU3VwcG9ydC1BY2Nlc3MiLCJTdXBwb3J0LUFjY2VzcyJdLCJleHAiOjE2NDczMjIzNjcsImlzcyI6ImRoaWdyb3VwLmNvbSIsImF1ZCI6ImRoaWdyb3VwLmNvbSJ9.AF4yiZa6kTBssGMmgyBTc5lz5wUYIq5ehcyqodXCi6WPTXcqT2XnPEFmXnzMyqHlXnzNhroKVWztrBZnTxZ5Om_G-3yHo_kPiA4Kcbfy65YSdo5XMWLy0saJsDufARAYjR3KAou2JNFk_LPOmEEOBrnAjcEj9m-91CBSbDDbFc5NVKv83doa8iTp1z4xBXTIuwab3W7DW8Mv-xykOKTTVeECHpFgIlrgXhUUxAeOeBvLrxqFvAxqmZT0ujUsay1YPr5H6-esvwWv_uu9donNuaP7XM3k3_9Nb6z3eJDWdQLCuwA-Xk6fHtD-Sjj5nvOnLcbjbNmhIy-uI6XBzsTTug'
              }
              // queryDates={queryDates}
              signalRConnectionHubUrl={'https://api-dev.seaportopx.com/notificationhub'}
              host={'https://api-dev.seaportopx.com'}
              scenarioConnection={'MarineAid-JsonDocuments-Transits-PortOfBrisbane'}
              jobHost={'https://ncos.ozsea.online'}
              jobToken={
                'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJzdWIiOiJzcG9wc3VzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU1BPUFMgVXNlciIsIm1vZHVsZXMiOiJbXSIsInJvbGVzIjoiW10iLCJjbGllbnRpZCI6IlNlbGVjdCBBIFBvcnQiLCJkZWJ1ZyI6IkZhbHNlIiwiZGVzY3JpcHRpb24iOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2dyb3Vwc2lkIjoiVXNlcnMiLCJleHAiOjE2NDUyNTA0NDMsImlzcyI6ImRoaWdyb3VwLmNvbSIsImF1ZCI6ImRoaWdyb3VwLmNvbSJ9.BJn9jA01Rx8A7KpZ6liWdsDaz6b9_ilNz90njseS_QyVtpyvEGSLSvflB25xnAoaLTdfZAdim8hRS_Qhrw2g1E6Xbr_Kqd8exLD7NDREHySw2ON_TO0o3GTKzNj49PxwTRCjqmC7MjDBdqa4nr9m9Egw2auxvtHFJtANWg7CLwEyRM2edN5lZuNBBagHqEQk-10grGWKMTBayFyL82uA29bvqfp04YsP6Wgg6mWbtqq47p8-_sVTdLaSwIZvDcinPRXkXdhnnFTM5eERqZ14rqodvUnELEHxw5olZaDEeU0w6oWxuAph6bO5HlAh-Hcl4wXxJ6dHLe1x53t0UVtQRg'
              }
              jobConnection={'OzSea-Exe'}
              jobQueryItemKey={'EventId'}
              actionButton={actionButton}
              dataFilterbyProperty={[]}
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
