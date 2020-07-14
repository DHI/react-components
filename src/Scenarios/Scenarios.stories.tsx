import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { fetchToken } from '../DataServices/DataServices';
import Scenarios from './Scenarios/Scenarios';
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
      data: '{"name":"My Scenario","vessel":{"vesselName":"MSC Pamela"},"mooring":{"berthName":"VIG Berth 2"}}',
    });
  };

  const onContextMenuClickHandler = (menuItem: IMenuItem, scenario: IScenario) => {
    console.log(scenario);
    alert(menuItem.id);
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
          onContextMenuClick={onContextMenuClickHandler}
          frequency={10}
          token={token}
          host={process.env.ENDPOINT_URL}
          scenarioConnection={'postgres-scenarios'}
          jobConnection={'wf-jobs'}
          jobParameters={{ ClientId: 'test' }}
          menuItems={[
            {
              id: 'execute',
              label: 'Execute',
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
            },
          ]}
          nameField="name"
          onReceiveScenarios={(scenarios: IScenario[]) => {
            console.log('Received new scenarios!', scenarios);
          }}
          descriptionFields={[
            {
              field: 'data.vessel.vesselName',
              name: 'Vessel Name',
            },
            {
              field: 'data.mooring.berthName',
              name: 'Berth Name',
              condition: {
                field: 'mooring.berthName',
                value: 'Whatever',
              },
            },
            {
              field: 'data.dateTime',
              name: 'Creation Date',
              dataType: 'date',
              format: 'dd-MMM-yyyy HH:mm',
            },
          ]}
          extraFields={[
            {
              field: 'vessel.loa',
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
              message: 'Ready',
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
          taskId={'workflow'}
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
          timeZone="Australia/Brisbane"
        />
      </div>
    );
  }

  return null;
};
