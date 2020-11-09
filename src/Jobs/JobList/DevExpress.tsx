import { FilteringState, GroupingState, IntegratedFiltering, IntegratedGrouping, IntegratedSorting, SortingState } from '@devexpress/dx-react-grid';
import { ColumnChooser, DragDropProvider, Grid, GroupingPanel, TableColumnVisibility, TableFilterRow, TableGroupRow, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Button, Grid as MUIGrid, Paper } from '@material-ui/core';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
import { executeJobQuery } from '../../DataServices/DataServices';
import { calcTimeDifference, setUtcToZonedTime } from '../../utils/Utils';
import DateInput from './DateInput';
import StatusCell from './DevX/StatusCell';
import JobListProps, { DateProps, JobData } from './types';

const DEFAULT_COLUMNS = [
  { title: 'Task Id', name: 'taskId' },
  { title: 'Status', name: 'status', width: 80 },
  { title: 'Account ID', name: 'accountId' },
  { title: 'Host Id', name: 'hostId' },
  { title: 'Duration', name: 'duration' },
  { title: 'Delay', name: 'delay' },
  { title: 'Requested', name: 'requested' },
  { title: 'Started', name: 'started' },
  { title: 'Finished', name: 'finished' },
];

const DevExpress = (props: JobListProps) => {
  const {
    frequency,
    dataSources,
    disabledColumns,
    parameters,
    token,
    startTimeUtc,
    dateTimeFormat,
    timeZone,
    translations,
    onReceived,
  } = props;
  const initialDateState = {
    from: '',
    to: ''
  }
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [jobsData, setJobsData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  const [textareaScrolled, setTextareaScrolled] = useState<boolean>(false)
  const [date, setDate] = useState<DateProps>(initialDateState);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const [tableColumnExtensions] = useState([
    { columnName: 'status', width: 120 },
  ]);

  const [tableGroupColumnExtension] = useState([
    { columnName: 'requested', showWhenGrouped: true },
    { columnName: 'started', showWhenGrouped: true },
    { columnName: 'finished', showWhenGrouped: true },
  ]);

  const [defaultHiddenColumnNames] = useState(["accountId", "delay", "Area"]);

  const dateGroupCriteria = value => {
    return { key: format(new Date(value), 'yyyy-MM-dd - HH:00') }
  };
  const [integratedGroupingColumnExtensions] = useState([
    { columnName: 'requested', criteria: dateGroupCriteria },
    { columnName: 'started', criteria: dateGroupCriteria },
    { columnName: 'finished', criteria: dateGroupCriteria },
  ]);


  const fetchJobList = () => {
    setLoading(true);
    const oldJobsData = jobsData;

    const query = [
      {
        item: "Requested",
        queryOperator: "GreaterThan",
        value: date.from ? date.from : new Date(startTimeUtc).toISOString()
      },
      {
        item: "Requested",
        queryOperator: "LessThan",
        value: date.to ? date.to : new Date().toISOString()
      }
    ];

    executeJobQuery(dataSources, token, query).subscribe(
      (res) => {
        const rawJobs = res.map((s: { data }) => {
          // Mapping to JobData.
          const dataMapping = {
            id: s.data.id,
            taskId: s.data.taskId,
            hostId: s.data.hostId,
            accountId: s.data.accountId,
            status: s.data.status,
            progress: s.data.progress || 0,
            requested: s.data.requested ? setUtcToZonedTime(s.data.requested, timeZone, dateTimeFormat) : '',
            started: s.data.started ? setUtcToZonedTime(s.data.started, timeZone, dateTimeFormat) : '',
            finished: s.data.finished ? setUtcToZonedTime(s.data.finished, timeZone, dateTimeFormat) : '',
            duration: calcTimeDifference(s.data.started, s.data.finished),
            delay: calcTimeDifference(s.data.requested, s.data.started),
            connectionJobLog: s.data.connectionJobLog || '',
          };

          if (s.data.parameters) {
            for (const key of Object.keys(s.data.parameters)) {
              dataMapping[key] = s.data.parameters[key];
            }
          }

          const duplicateIndex = oldJobsData.findIndex((x: { id: string }) => x.id === s.data.id);

          // Remove duplicate data
          if (duplicateIndex > -1) {
            oldJobsData.splice(duplicateIndex, 1);
          }

          return dataMapping;
        });

        if (isFiltered) {
          setJobsData(rawJobs);
        } else {
          setJobsData(rawJobs.concat(oldJobsData));
        }

        const utcDate = zonedTimeToUtc(new Date(), timeZone).toISOString();

        setStartDateUtc(utcDate);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    fetchJobList();
  }, [isFiltered])

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }), [];

  // useEffect(() => {

  //   let interval: any;

  //   if (startDateUtc) {
  //     interval = setInterval(() => fetchJobList(), frequency * 1000);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [startDateUtc]);

  const parameterHeader = parameters
    ? parameters.reduce(
      (acc, cur) => [
        ...acc,
        {
          title: cur.label,
          name: cur.parameter,
        },
      ],
      [],
    )
    : [];


  const [columns] = useState(DEFAULT_COLUMNS.concat(parameterHeader))

  const TableRow = (props: any) => {
    return <VirtualTable.Row {...props} style={{ cursor: 'pointer' }} onClick={() => console.log(JSON.stringify(props.row))} />
  };

  const Cell = (props: any) => {

    if (props.column.name === 'status') {
      return <td style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', paddingLeft: 10 }}><StatusCell {...props} /></td>
    }

    return <VirtualTable.Cell {...props} />
  }

  const setDateFilter = () => {
    setIsFiltered(true);
    fetchJobList();
  }

  const clearDateFilter = () => {
    setIsFiltered(false);
    setDate(initialDateState)
  }

  const ToolbarRootComponent = (props: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
        {props.children}
      </div>
      <MUIGrid container direction='row' alignItems='center' justify='flex-end' spacing={3} >
        <MUIGrid item>
          <DateInput
            label='From'
            dateFormat={dateTimeFormat}
            timeZone={timeZone}
            defaultDate={date.from ? date.from : new Date(startTimeUtc).toISOString()}
            dateSelected={(value) => setDate({ ...date, from: value })}
          />
        </MUIGrid>
        <MUIGrid item>
          <DateInput
            label='To'
            dateFormat={dateTimeFormat}
            timeZone={timeZone}
            defaultDate={date.to ? date.to : new Date().toISOString()}
            dateSelected={(value) => setDate({ ...date, to: value })}
          />
        </MUIGrid>
        <MUIGrid item>
          <Button variant="contained" color="primary" onClick={() => setDateFilter()}>Filter</Button>
        </MUIGrid>
        <MUIGrid item>
          <Button variant="contained" color="secondary" onClick={() => clearDateFilter()}>Clear</Button>
        </MUIGrid>
      </MUIGrid>

    </div >
  );

  const GroupCellContent = (props: any) => (
    <span>
      <strong>{props.row.value}</strong>
    </span>
  );

  return (
    <Paper>
      <Grid
        rows={jobsData}
        columns={columns}
      >
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />

        <SortingState defaultSorting={[{ columnName: 'requested', direction: 'desc' }]} />
        <IntegratedSorting />

        <DragDropProvider />
        <GroupingState />
        <IntegratedGrouping
          columnExtensions={integratedGroupingColumnExtensions}
        />

        <VirtualTable
          height={windowHeight - 150}
          rowComponent={TableRow}
          cellComponent={Cell}
          columnExtensions={tableColumnExtensions}
        />

        <TableHeaderRow showSortingControls />
        <TableFilterRow />

        <TableGroupRow
          contentComponent={GroupCellContent}
          columnExtensions={tableGroupColumnExtension}
        />
        <Toolbar rootComponent={ToolbarRootComponent} />
        <GroupingPanel showGroupingControls />

        <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames} />
        <ColumnChooser />
      </Grid>
    </Paper>
  )
}

export default DevExpress;