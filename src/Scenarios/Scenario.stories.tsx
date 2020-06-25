import React from 'react';
import { ScenarioList } from '..';

export default {
  title: 'Scenarios Components',
  component: [ScenarioList],
};

export const scenarioList = () => {
  const onContextMenuClickHandler = (clickId: any, scenario: any) => {
    alert(clickId);
  };

  return (
    <ScenarioList
      onContextMenuClick={onContextMenuClickHandler}
      menuItems={[
        {
          id: 'execute',
          label: 'Execute',
        },
        {
          id: 'clone',
          label: 'Clone 123',
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
          id: 'edit',
          label: 'Edit',
        },
        {
          id: 'openPdf',
          label: 'Open PDF',
        },
      ]}
      scenarios={[
        {
          lastJobStatus: 'InProgress',
          version: '49c7bc72-516a-4b63-b50d-ee53d126479c',
          lastJobId: '029f605c-ee40-43d0-9f5b-3de1c0707080',
          dateTime: '2020-05-01T03:43:31',
          data: '{"name":"My Scenario","vessel":{"vesselName":"MSC Pamela"},"mooring":{"berthName":"VIG Berth 2"}}',
          id: '20200501034331-f4bc4f6d-299e-4815-9761-e2294ec67823',
          lastJobProgress: 50,
        },
        {
          lastJobStatus: 'Completed',
          version: 'c88e1581-792b-458b-8b9d-0f33530e9f38',
          lastJobId: 'f2232b68-98ed-48d9-9ace-32b9703c60ee',
          dateTime: '2020-04-29T05:00:46',
          data: '{"name":"Test 1","vessel":{"vesselName":"Susan Maersk"},"mooring":{"berthName":"NIT South Berth 1"}}',
          id: '20200429050045-51e9cc1a-f569-489f-8601-1455e4722bf7',
        },
        {
          lastJobStatus: 'Completed',
          version: 'baa08488-363a-49e8-97b2-79e84f97aa45',
          lastJobId: '40c9e56e-3e80-482b-8acf-673a09cb34cd',
          dateTime: '2020-04-29T05:32:55',
          data: '{"name":"Test 2","vessel":{"vesselName":"Emma Maersk"},"mooring":{"berthName":"NIT South Berth 1"}}',
          id: '20200429053255-3de95a07-bb32-4513-be39-5c44bcd04742',
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
      selectedScenarioId=""
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
    />
  );
};
