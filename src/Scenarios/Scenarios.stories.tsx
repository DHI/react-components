import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { fetchToken } from '../DataServices/DataServices';
import { Scenarios } from './Scenarios/Scenarios';
import { IMenuItem, IScenario } from './types';

export default {
  title: 'Scenarios Components',
  component: [Scenarios],
};

export const ScenariosStory = () => {
  const [token, setToken] = useState<string>();
  const [newScenario, setNewScenario] = useState<IScenario>();

  useEffect(() => {
    fetchToken(process.env.ENDPOINT_URL, {
      id: process.env.ADMINUSER!,
      password: process.env.ADMINPASSWORD!,
    }).subscribe(
      (res) => {
        setToken(res.accessToken.token);
      },
      (err) => {
        console.log(err);
        console.log('Error Fetching Token');
      },
    );
  }, []);

  const onAddScenario = () => {
    setNewScenario({
      data: `{"name":"My Scenario","startTime":"${new Date().toISOString()}","vessel":{"vesselName":"MSC Pamela"},"mooring":{"berthName":"VIG Berth 2"}}`,
    });
  };

  if (token) {
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
          token={token}
          host={process.env.ENDPOINT_URL}
          scenarioConnection={'postgres-scenarios'}
          jobConnection={'wf-jobs'}
          jobParameters={{ ClientId: 'test' }}
          taskId={'workflow'}
          timeZone="Australia/Brisbane"
          menuItems={[
            {
              id: 'execute',
              label: 'Execute',
              condition: {
                field: '!lastJobStatus', // Prefix with exclamation if you wish to inverse the condition test
                value: ['Pending', 'InProgress', 'Completed'],
              },
              taskId: 'workflow',
              jobParameters: {
                ClientId: 'test_override',
              },
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
          onContextMenuClick={(menuItem: IMenuItem, scenario: IScenario) =>
            console.log('Scenario menu item clicked', {
              menuItem,
              scenario,
            })
          }
          onScenarioSelected={(scenario: IScenario) => {
            console.log('Scenario selected', scenario);
          }}
          onScenarioReceived={(scenario: IScenario) => {
            console.log('Full Scenario received', scenario);
          }}
          onScenariosReceived={(scenarios: IScenario[]) => {
            console.log('Received new scenarios!', scenarios);
          }}
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
                field: 'lastJobStatus',
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
          showDate={true}
          showHour={true}
          showMenu={true}
          showStatus={true}
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
              color: 'red',
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
              color: 'red',
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
      </div>
    );
  }

  return null;
};
