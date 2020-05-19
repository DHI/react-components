import React from 'react';
import { ScenarioMenu, ScenarioItem, ScenarioList } from '../src';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export default {
  title: 'Scenarios Components',
  component: [ScenarioMenu, ScenarioItem, ScenarioList],
};

export const scenarioMenu = () => {
  return (
    <ScenarioMenu
      menu={[
        {
          name: 'View',
          field: 'Action',
        },
        {
          name: 'Edit',
          field: 'Action',
        },
        {
          name: 'Execute',
          field: 'Execute',
        },
        {
          name: 'Cancel',
          field: 'Terminate',
        },
        {
          name: 'Clone',
          field: 'Clone',
        },
        {
          name: 'Delete',
          field: 'Delete',
        },
      ]}
    />
  );
};

export const scenarioItem = () => {
  return (
    <ScenarioItem
      classes={createStyles({
        scenario: {
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          height: '100%',
          alignItems: 'center',
          direction: 'ltr',
          justify: 'flex-start',
        },
        dayText: {
          fontWeight: 'bold',
          fontSize: '18px',
          color: 'gray',
        },
        hourText: {
          fontSize: '15px',
          color: 'gray',
        },
        scenarioHour: {
          padding: '10px',
        },
        scenarioTitle: {
          fontWeight: 'bold',
          fontSize: '18px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        },
        scenarioProgress: {
          fontSize: '10px',
          color: 'gray',
        },
        scenarioDetails: {
          padding: '10px',
          width: '100%',
          display: 'grid',
        },
        textFields: {
          padding: '3px',
          fontSize: '12px',
          color: 'gray',
        },
        status: {
          display: 'contents',
        },
        verticalLine: {
          marginLeft: '8px',
          borderLeft: '1px solid #c9c9c9',
          alignSelf: 'stretch',
          height: 'auto',
        },
        scenarioStatus: {
          paddingTop: 5,
          width: 50,
          textAlign: 'center',
          display: 'grid',
          marginLeft: -15,
        },
      })}
      menu={[
        {
          name: 'View',
          field: 'Action',
        },
        {
          name: 'Edit',
          field: 'Action',
        },
        {
          name: 'Execute',
          field: 'Execute',
        },
        {
          name: 'Cancel',
          field: 'Terminate',
        },
        {
          name: 'Clone',
          field: 'Clone',
        },
        {
          name: 'Delete',
          field: 'Delete',
        },
      ]}
      scenario={{
        Id: '20180101-Category4',
        Name: 'Scenario 4',
        JobStatus: 'InProgress',
        DateTime: '2019-10-02T02:49:22',
        MaxDepth: 10,
        LossCurve: 'Custom',
        Progress: 50,
      }}
      functions={{
        action: 'this.onActionScenario',
        clone: 'this.cloneDialog',
        delete: 'this.deleteDialog',
        edit: 'this.onEditScenario',
        execute: 'this.executeDialog',
        terminate: 'this.terminateDialog',
      }}
      status={{
        name: 'Pending',
        color: 'orange',
        message: 'Pending',
      }}
      showHour={true}
      showMenu={true}
      showStatus={true}
      isSelected={true}
      name={'20200510145038-04d68892-5178-496c-b96f-7ac4823723bc'}
      date={'2019-10-02T01:49:22'}
      description={[
        {
          field: 'version',
          name: 'Version',
          value: 'ede7f938-1ade-4477-91f6-9153c2879fee',
        },
        {
          field: 'lastJobStatus',
          name: 'Last Job Status',
          value: 'Completed',
        },
      ]}
    />
  );
};

export const scenarioList = () => {
  return (
    <ScenarioList
      classes={{
        root: {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          height: '100%',
          marginTop: '30px',
        },
        content: {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          marginLeft: '30px',
          scenario: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
            direction: 'ltr',
            justify: 'flex-start',
          },
          dayText: {
            fontWeight: 'bold',
            fontSize: '18px',
            color: 'gray',
          },
          hourText: {
            fontSize: '15px',
            color: 'gray',
          },
          scenarioHour: {
            padding: '10px',
          },
          scenarioTitle: {
            fontWeight: 'bold',
            fontSize: '18px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
          scenarioProgress: {
            fontSize: '10px',
            color: 'gray',
          },
          scenarioDetails: {
            padding: '10px',
            width: '100%',
            display: 'grid',
          },
          textFields: {
            padding: '3px',
            fontSize: '12px',
            color: 'gray',
          },
          status: {
            display: 'contents',
          },
          verticalLine: {
            marginLeft: '8px',
            borderLeft: '1px solid #c9c9c9',
            alignSelf: 'stretch',
            height: 'auto',
          },
          scenarioStatus: {
            paddingTop: 5,
            width: 50,
            textAlign: 'center',
            display: 'grid',
            marginLeft: -15,
          },
        },
        dateBlock: {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        },
        dateArea: {
          alignSelf: 'flex-start',
          flexDirection: 'column',
          marginTop: '-33px',
          marginBottom: '-33px',
        },
        dayText: {
          fontWeight: 'bold',
          fontSize: '18px',
          color: 'gray',
        },
        textFields: {
          fontSize: '12px',
          color: 'gray',
        },
        divider: {
          marginLeft: '30px',
          borderTop: '1px solid #c9c9c9',
        },
        listItem: {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          marginLeft: '30px',
          '&:hover': {
            cursor: 'pointer',
            background: '#ebebeb',
          },
        },
        selectedItem: {
          background: '#e8e8e8',
        },
      }}
      functions={{
        action: 'this.onActionScenario',
        clone: 'this.cloneDialog',
        delete: 'this.deleteDialog',
        edit: 'this.onEditScenario',
        execute: 'this.executeDialog',
        terminate: 'this.terminateDialog',
      }}
      menuItems={[
        {
          name: 'Edit',
          field: 'Action',
        },
        {
          name: 'Execute',
          field: 'Execute',
        },
        {
          name: 'Clone',
          field: 'Clone',
        },
        {
          name: 'Delete',
          field: 'Delete',
        },
      ]}
      scenarios={[
        {
          lastJobStatus: 'InProgress',
          version: '49c7bc72-516a-4b63-b50d-ee53d126479c',
          lastJobId: '029f605c-ee40-43d0-9f5b-3de1c0707080',
          dateTime: '2020-05-01T03:43:31',
          data:
            '{"name":"My Scenario","vessel":{"vesselName":"MSC Pamela"},"mooring":{"berthName":"VIG Berth 2"}}',
          id: '20200501034331-f4bc4f6d-299e-4815-9761-e2294ec67823',
          lastJobProgress: 50,
        },
        {
          lastJobStatus: 'Completed',
          version: 'c88e1581-792b-458b-8b9d-0f33530e9f38',
          lastJobId: 'f2232b68-98ed-48d9-9ace-32b9703c60ee',
          dateTime: '2020-04-29T05:00:46',
          data:
            '{"name":"Test 1","vessel":{"vesselName":"Susan Maersk"},"mooring":{"berthName":"NIT South Berth 1"}}',
          id: '20200429050045-51e9cc1a-f569-489f-8601-1455e4722bf7',
        },
        {
          lastJobStatus: 'Completed',
          version: 'baa08488-363a-49e8-97b2-79e84f97aa45',
          lastJobId: '40c9e56e-3e80-482b-8acf-673a09cb34cd',
          dateTime: '2020-04-29T05:32:55',
          data:
            '{"name":"Test 2","vessel":{"vesselName":"Emma Maersk"},"mooring":{"berthName":"NIT South Berth 1"}}',
          id: '20200429053255-3de95a07-bb32-4513-be39-5c44bcd04742',
        },
      ]}
      //idField="Id"
      nameField="name"
      //dateField="DateTime"
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
      onSelectScenario="this.onSelectScenario"
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
