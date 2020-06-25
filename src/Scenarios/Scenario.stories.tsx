import React, { useEffect, useState } from 'react';
import { fetchToken, Scenario } from '..';
import { IScenario } from './Scenario/types';

export default {
  title: 'Scenarios Components',
  component: [Scenario],
};

export const scenario = () => {
  const [token, setToken] = useState<string>();
  const [newScenario, setNewScenario] = useState<IScenario>();

  useEffect(() => {
    fetchToken(process.env.ENDPOINT_URL, {
      id: process.env.ADMINUSER,
      password: process.env.ADMINPASSWORD,
    }).subscribe(
      (res) => {
        setToken(res.accessToken.token);
      },
      (err) => {
        console.log('Error Fetching Token');
      },
    );
  }, []);

  const onAddScenario = () => {
    setNewScenario({
      data: '{"name":"My Scenario","vessel":{"vesselName":"MSC Pamela"},"mooring":{"berthName":"VIG Berth 2"}}',
    });
  };

  const onContextMenuClickHandler = (scenario: IScenario, clickId: string) => {
    alert(clickId);
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
          <Button variant="contained" color="primary" style={{ backgroundColor: '#0D3958' }} startIcon={<AddIcon />} onClick={onAddScenario}>
            <span>Add new scenario</span>
          </Button>
        </Typography>

        <Scenario
          onContextMenuClick={onContextMenuClickHandler}
          frequency={10}
          token={token}
          host={process.env.ENDPOINT_URL}
          scenarioConnection={'postgres-scenarios'}
          jobConnection={'wf-jobs'}
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
          descriptionFields={[
            {
              field: 'vessel.vesselName',
              name: 'Vessel Name',
            },
            {
              field: 'mooring.berthName',
              name: 'Berth Name',
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
        />
      </div>
    );
  }
  return null;
};
