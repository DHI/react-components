import {
  FilteringState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSorting,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  GroupingPanel,
  TableColumnVisibility,
  TableFilterRow,
  TableGroupRow,
  TableHeaderRow,
  Toolbar,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { Paper, Switch, Typography } from '@material-ui/core';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { executeJobQuery, fetchLogs } from '../../api';
import Loading from '../../common/Loading/Loading';
import { DefaultColumnsTypeProvider } from '../../common/Table';
import { calcTimeDifference, zonedTimeFromUTC } from '../../utils/Utils';
import { DateFilter } from '../../common/DateFilter/DateFilter';
import { Cell, dateGroupCriteria, GroupCellContent } from './helpers/helpers';
import JobDetail from './helpers/JobDetail';
import { JobPanelStyles } from './styles';
import JobListProps, { JobData, Sorting } from './types';
import { DateProps } from '../../common/types';

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

const NOTIFICATION_HUB = '/notificationhub';

const JobList = (props: JobListProps) => {
  const {
    dataSources,
    disabledColumns,
    parameters,
    startTimeUtc,
    dateTimeFormat,
    timeZone,
    defaultFilter,
    positionToInsert,
    showHidePrefixButton,
  } = props;

  const initialDateState = {
    from: new Date(startTimeUtc).toISOString(),
    to: new Date().toISOString(),
  };
  const initialJobData = {
    id: '',
    taskId: '',
    accountId: '',
    status: '',
    hostId: '',
    duration: '',
    delay: '',
    requested: '',
    started: '',
    finished: '',
    progress: 0,
    tokenJobLog: '',
    hostJobLog: '',
    connectionJobLog: '',
    token: '',
    host: '',
    connection: '',
  };

  const [job, setJob] = useState<JobData>(initialJobData);
  const classes = JobPanelStyles(job?.id)();
  const [jobsData, setJobsData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [date, setDate] = useState<DateProps>(initialDateState);
  const [selectedRow, setSelectedRow] = useState<string>('');
  const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'requested', direction: 'desc' }]);
  const [hideWorkflowPrefix, setHideWorkflowPrefix] = useState(false);
  const [tableColumnExtensions] = useState([{ columnName: 'status', width: 120 }]);
  const latestJobs = useRef(null);

  latestJobs.current = jobsData;

  const [defaultColumnsNameArray] = useState<string[]>(DEFAULT_COLUMNS.map((column) => column.name));

  const [tableGroupColumnExtension] = useState([
    { columnName: 'requested', showWhenGrouped: true },
    { columnName: 'started', showWhenGrouped: true },
    { columnName: 'finished', showWhenGrouped: true },
  ]);

  const [integratedGroupingColumnExtensions] = useState([
    { columnName: 'requested', criteria: dateGroupCriteria },
    { columnName: 'started', criteria: dateGroupCriteria },
    { columnName: 'finished', criteria: dateGroupCriteria },
  ]);

  const durationToSeconds = (duration: string | null): number => {
    if (duration === '' || duration === null) {
      return 0;
    }

    const parts = duration.split(' ');
    let seconds = 0;
    for (let index = 0; index < parts.length; index++) {
      if (parts[index].includes('h')) {
        seconds += Number(parts[index].slice(0, -1)) * 3600;;
      }

      if (parts[index].includes('m')) {
        seconds += Number(parts[index].slice(0, -1)) * 60;
      }

      if (parts[index].includes('s')) {
        seconds += Number(parts[index].slice(0, -1));
      }
    }

    return seconds;
  }

  const compareDurations = (a, b) => {
    const durationA = durationToSeconds(a);
    const durationB = durationToSeconds(b);
    if (durationA === durationB) {
      return 0;
    }
    return durationA < durationB ? -1 : 1;
  };

  const [integratedSortingColumnExtensions] = useState([
    { columnName: 'duration', compare: compareDurations },
    { columnName: 'delay', compare: compareDurations },
  ]);

  const fetchJobList = () => {
    setLoading(true);

    const query = [
      {
        item: 'Requested',
        queryOperator: 'GreaterThan',
        value: date.from ? date.from : initialDateState.from,
      },
      {
        item: 'Requested',
        queryOperator: 'LessThan',
        value: date.to ? date.to : initialDateState.to,
      },
    ];

    executeJobQuery(dataSources, query).subscribe(
      (response) => {
        const rawJobs = response.map((job: any) => {
          // Mapping to JobData.
          const dataMapping = {
            ...job.data,
            progress: job.data.progress || 0,
            requested: job.data.requested ? zonedTimeFromUTC(job.data.requested, timeZone, dateTimeFormat) : '',
            started: job.data.started ? zonedTimeFromUTC(job.data.started, timeZone, dateTimeFormat) : '',
            finished: job.data.finished ? zonedTimeFromUTC(job.data.finished, timeZone, dateTimeFormat) : '',
            duration: calcTimeDifference(job.data.started, job.data.finished),
            delay: calcTimeDifference(job.data.requested, job.data.started),
            tokenJobLog: job.data.dataSource.tokenJobLog || '',
            hostJobLog: job.data.dataSource.hostJobLog || '',
            connectionJobLog: job.data.dataSource.connectionJobLog || '',
            token: job.data.dataSource.token || '',
            host: job.data.dataSource.host || '',
            connection: job.data.dataSource.connection || '',
          };

          if (job.data.parameters) {
            for (const key of Object.keys(job.data.parameters)) {
              dataMapping[key] = job.data.parameters[key];
            }
          }

          return dataMapping;
        });

        setJobsData(rawJobs);

        setLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );
  };

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

  const combinedColumns = typeof positionToInsert === "undefined"
    ? [...DEFAULT_COLUMNS, ...parameterHeader]
    : [
      ...DEFAULT_COLUMNS.slice(0, positionToInsert),
      ...parameterHeader,
      ...DEFAULT_COLUMNS.slice(positionToInsert)
    ];

  const [columns] = useState(combinedColumns);

  const expandWithData = (row) => {
    const {
      id = '',
      taskId = '',
      accountId = '',
      status = '',
      hostId = '',
      duration = '',
      delay = '',
      requested = '',
      started = '',
      finished = '',
      progress = 0,
      tokenJobLog = '',
      hostJobLog = '',
      connectionJobLog = '',
      token = '',
      host = '',
      connection = '',
    } = row;

    if (job.id === id) {
      setJob(initialJobData);
      setSelectedRow('');
    } else {
      setLoading(true);
      setSelectedRow(id);
      const query = [
        {
          Item: 'Tag',
          Value: id,
          QueryOperator: 'Equal',
        },
      ];

      const dataSources = [
        {
          host: hostJobLog,
          connection: connectionJobLog,
          token: tokenJobLog,
        },
      ];

      fetchLogs(dataSources, tokenJobLog, query).subscribe(
        (res) => {
          const logs = res.map((item) => item.data);

          setJob({
            id,
            taskId,
            accountId,
            status,
            hostId,
            duration,
            delay,
            requested,
            started,
            finished,
            progress,
            tokenJobLog,
            hostJobLog,
            connectionJobLog,
            logs,
            token,
            host,
            connection,
          });

          setLoading(false);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  const closeTab = () => {
    setJob(initialJobData);
  };

  const clearDateFilter = () => {
    setDate(initialDateState);
  };

  useEffect(() => fetchJobList(), [date]);

  const TableRow = (props: any) => (
    <VirtualTable.Row
      {...props}
      style={{
        cursor: 'pointer',
        backgroundColor: selectedRow === props.row.id ? '#f5f5f5' : 'transparent',
      }}
      onClick={() => expandWithData(props.tableRow.row)}
    />
  );

  const ToolbarRootComponent = useCallback((props: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>{props.children}</div>
      {showHidePrefixButton && (
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: 20, display: 'flex', alignItems: 'center', width: '200px' }}>
            <Typography style={{ fontSize: '15px' }}>Hide Workflow Prefix</Typography>
            <Switch
              checked={hideWorkflowPrefix}
              onChange={(event) => setHideWorkflowPrefix(event.target.checked)}
            />
          </div>
          <DateFilter
            dateTimeFormat={dateTimeFormat}
            startTimeUtc={startTimeUtc}
            timeZone={timeZone}
            date={date}
            onSetDate={(date) => setDate(date)}
            onClearDateFilter={clearDateFilter}
          >
          </DateFilter>
        </div>
      )}
      {!showHidePrefixButton && (
        <DateFilter
          dateTimeFormat={dateTimeFormat}
          startTimeUtc={startTimeUtc}
          timeZone={timeZone}
          date={date}
          onSetDate={(date) => setDate(date)}
          onClearDateFilter={clearDateFilter}
        >
        </DateFilter>
      )}
    </div>
  ), [hideWorkflowPrefix]);

  const jobUpdated = (job) => {
    const dataUpdated = JSON.parse(job.data);
    const jobs = [...latestJobs.current];
    console.log({ dataUpdated });

    const updatedJob = jobs.map((job) =>
      job.id === dataUpdated.Id
        ? {
          ...job,
          started:
            job.started || dataUpdated.Started ? zonedTimeFromUTC(dataUpdated.Started, timeZone, dateTimeFormat) : '',
          finished:
            job.finished || dataUpdated.Finished
              ? zonedTimeFromUTC(dataUpdated.Finished, timeZone, dateTimeFormat)
              : '',
          hostId: dataUpdated.HostId,
          status: dataUpdated.Status,
          duration:
            job.duration ||
            (dataUpdated.Started &&
              dataUpdated.Finished &&
              calcTimeDifference(dataUpdated.Started.split('.')[0], dataUpdated.Finished.split('.')[0])),
          delay:
            job.delay ||
            (dataUpdated.Started &&
              calcTimeDifference(dataUpdated.Requested.split('.')[0], dataUpdated.Started.split('.')[0])),
          progress: dataUpdated.Progress || 0,
          tokenJobLog: dataSources[0].tokenJobLog || '', // So wrong ... it doesn't necessarily sit on the first one. Should be fixed later
          hostJobLog: dataSources[0].hostJobLog || '',
          connectionJobLog: dataSources[0].connectionJobLog || '',
        }
        : job,
    );

    setJobsData(updatedJob);
  };

  const jobAdded = (job) => {
    const dataAdded = JSON.parse(job.data);
    const jobs = [...latestJobs.current];
    console.log({ dataAdded });

    const addedJob = {
      taskId: dataAdded.TaskId,
      id: dataAdded.Id,
      hostId: dataAdded.HostId,
      accountId: dataAdded.AccountId,
      ScenarioId: dataAdded.Parameters?.ScenarioId,
      priority: dataAdded.Priority,
      requestedUtc: dataAdded.Requested,
      requested: dataAdded.Requested ? zonedTimeFromUTC(dataAdded.Requested, timeZone, dateTimeFormat) : '',
      status: dataAdded.Status,
      progress: dataAdded.Progress || 0,
      tokenJobLog: dataSources[0].tokenJobLog || '', // So wrong ... it doesn't necessarily sit on the first one. Should be fixed later
      hostJobLog: dataSources[0].hostJobLog || '',
      connectionJobLog: dataSources[0].connectionJobLog || '',
    };

    jobs.push(addedJob);
    setJobsData(jobs);
  };

  const connectToSignalR = () => {
    // No support for multiple connections. Not used anyway
    const dataSource = dataSources[0];
    if (!dataSource.host) {
      throw new Error('Host not provided.');
    }

    const connection = new HubConnectionBuilder()
      .withUrl(dataSource.host + NOTIFICATION_HUB, {
        accessTokenFactory: () => dataSource.token,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect([1, 2, 3, 5, 7, 8, 10, 30, 60])
      .build();

    connection
      .start()
      .then(() => {
        connection.on('JobUpdated', jobUpdated);
        connection.on('JobAdded', jobAdded);

        connection.invoke(
          'AddJobFilter',
          dataSource.connection,
          [{ Item: 'Priority', QueryOperator: 'GreaterThan', Value: '-1' }], // ability to change condition?
        );
      })
      .catch((e) => console.log('Connection failed: ', e));

    return connection;
  };

  const handleGroupingChange = (grouping) => {
    console.log('grouping', grouping)
    if (grouping.length > 0) {
      const lastGroupedColumn = grouping[grouping.length - 1].columnName;
      setSorting([{ columnName: lastGroupedColumn, direction: 'asc' }]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const connection = connectToSignalR();

    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('Unmounting SignalR connection');
      connection.stop();
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <Paper style={{ position: 'relative' }}>
        {loading && <Loading />}

        <Grid rows={jobsData} columns={columns}>
          <FilteringState defaultFilters={defaultFilter} />
          <IntegratedFiltering />

          <SortingState sorting={sorting} onSortingChange={setSorting} />
          <IntegratedSorting columnExtensions={integratedSortingColumnExtensions} />

          <DragDropProvider />
          <GroupingState onGroupingChange={handleGroupingChange} />
          <IntegratedGrouping columnExtensions={integratedGroupingColumnExtensions} />

          <VirtualTable
            height={windowHeight - 230}
            rowComponent={TableRow}
            cellComponent={(cellProps) => <Cell {...cellProps} hideWorkflowPrefix={hideWorkflowPrefix} />}
            columnExtensions={tableColumnExtensions}
          />

          <DefaultColumnsTypeProvider for={defaultColumnsNameArray} />

          <TableHeaderRow showSortingControls />
          <TableFilterRow />

          <TableGroupRow contentComponent={GroupCellContent} columnExtensions={tableGroupColumnExtension} />
          <Toolbar rootComponent={ToolbarRootComponent} />
          <GroupingPanel showGroupingControls />

          <TableColumnVisibility defaultHiddenColumnNames={disabledColumns} />
          <ColumnChooser />
        </Grid>
      </Paper>
      <div className={classes.jobPanel}>
        <JobDetail
          detail={job}
          timeZone={timeZone}
          dateTimeFormat={dateTimeFormat}
          onClose={closeTab}
        />
      </div>
    </div>
  );
};

export { JobList, JobListProps };
