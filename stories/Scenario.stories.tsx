import React from 'react';
import { ScenarioMenu, ScenarioItem } from '../src';
import { createStyles } from '@material-ui/core/styles';

export default {
  title: 'Scenarios Components',
  component: [ScenarioMenu, ScenarioItem]
};

export const scenarioMenu = () => {
  return (
    <ScenarioMenu menu={[
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
      }
    ]} />
  );
};


export const scenarioItem = () => {
  return (
    <ScenarioItem classes={createStyles({
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
      }
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
        }
      ]}
      scenario={
        {
          Id: '20180101-Category4',
          Name: 'Scenario 4',
          JobStatus: 'InProgress',
          DateTime: '2019-10-02T02:49:22',
          MaxDepth: 10,
          LossCurve: 'Custom',
          Progress: 50,
        }
      }
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
        { field: 'version', name: 'Version', value: 'ede7f938-1ade-4477-91f6-9153c2879fee' },
        {
          field: 'lastJobStatus',
          name: 'Last Job Status',
          value: 'Completed'
        },
      ]}
    />
  );
};
