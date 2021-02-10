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
import { FormControlLabel, Grid as MUIGrid, Paper, Switch } from '@material-ui/core';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import React, { useEffect, useRef, useState } from 'react';
import AuthService from '../../Auth/AuthService';
import Loading from '../../common/Loading/Loading';
import { executeJobQuery, fetchLogs } from '../../DataServices/DataServices';
import { calcTimeDifference, convertLocalTime, convertServerTimeToLocalTime } from '../../utils/Utils';
import { DateFilter } from './helpers/DateFilter';
import { Cell, dateGroupCriteria, GroupCellContent } from './helpers/helpers';
import JobDetail from './helpers/JobDetail';
import { JobPanelStyles } from './styles';
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

const NOTIFICATION_HUB = '/notificationhub';

const JobList = (props: JobListProps) => {
  const { dataSources, token, disabledColumns, parameters, startTimeUtc, dateTimeFormat, timeZone } = props;
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
    connectionJobLog: '',
  };

  const [job, setJob] = useState<JobData>(initialJobData);
  const classes = JobPanelStyles(job?.id)();
  const [jobsData, setJobsData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [textareaScrolled, setTextareaScrolled] = useState<boolean>(true);
  const [date, setDate] = useState<DateProps>(initialDateState);
  const [selectedRow, setSelectedRow] = useState<string>('');
  const [tableColumnExtensions] = useState([{ columnName: 'status', width: 120 }]);
  const latestJobs = useRef(null);

  latestJobs.current = jobsData;

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

    executeJobQuery(dataSources, token, query).subscribe(
      (res) => {
        const rawJobs = res.map((s: { data }) => {
          const { id, taskId, hostId, accountId, status } = s.data;

          // Mapping to JobData.
          const dataMapping = {
            id,
            taskId,
            hostId,
            accountId,
            status,
            progress: s.data.progress || 0,
            requested: s.data.requested ? convertServerTimeToLocalTime(s.data.requested, dateTimeFormat) : '',
            started: s.data.started ? convertServerTimeToLocalTime(s.data.started, dateTimeFormat) : '',
            finished: s.data.finished ? convertServerTimeToLocalTime(s.data.finished, dateTimeFormat) : '',
            duration: calcTimeDifference(s.data.started, s.data.finished),
            delay: calcTimeDifference(s.data.requested, s.data.started),
            connectionJobLog: s.data.connectionJobLog || '',
          };

          if (s.data.parameters) {
            for (const key of Object.keys(s.data.parameters)) {
              dataMapping[key] = s.data.parameters[key];
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

  const [columns] = useState(DEFAULT_COLUMNS.concat(parameterHeader));

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
      connectionJobLog = '',
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

      const sources = dataSources.map((item) => ({
        host: item.host,
        connection: item.connectionJobLog,
      }));

      fetchLogs(sources, token, query).subscribe(
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
            connectionJobLog,
            logs,
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

  const ToolbarRootComponent = (props: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>{props.children}</div>
      <DateFilter
        dateTimeFormat={dateTimeFormat}
        startTimeUtc={startTimeUtc}
        timeZone={timeZone}
        date={date}
        onSetDate={(date) => setDate(date)}
        onClearDateFilter={clearDateFilter}
      >
        <MUIGrid item>
          <FormControlLabel
            control={
              <Switch
                checked={textareaScrolled}
                onChange={() => setTextareaScrolled(!textareaScrolled)}
                color="primary"
                name="textareaView"
                inputProps={{ 'aria-label': 'textareaView checkbox' }}
              />
            }
            label="Log scrolled down"
          />
        </MUIGrid>
      </DateFilter>
    </div>
  );

  const jobUpdated = (job) => {
    const dataUpdated = JSON.parse(job.data);
    const jobs = [...latestJobs.current];

    console.log({ dataUpdated });

    const updatedJob = jobs.map((job) =>
      job.id === dataUpdated.Id
        ? {
            ...job,
            started:
              job.started || dataUpdated.Started ? convertLocalTime(dataUpdated.Started, timeZone, dateTimeFormat) : '',
            finished:
              job.finished || dataUpdated.Finished
                ? convertLocalTime(dataUpdated.Finished, timeZone, dateTimeFormat)
                : '',
            hostId: dataUpdated.HostId,
            status: dataUpdated.Status,
            duration:
              job.duration ||
              (dataUpdated.Started &&
                dataUpdated.Finished &&
                calcTimeDifference(dataUpdated.Started.split('+')[0], dataUpdated.Finished.split('+')[0])),
            delay:
              job.delay ||
              (dataUpdated.Started && calcTimeDifference(dataUpdated.Requested, dataUpdated.Started.split('+')[0])),
            progress: dataUpdated.Progress || 0,
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
      requested: dataAdded.Requested ? convertLocalTime(dataAdded.Requested, timeZone, dateTimeFormat) : '',
      status: dataAdded.Status,
      connectionJobLog: dataAdded.ConnectionJobLog || '',
      progress: dataAdded.Progress || 0,
    };

    jobs.push(addedJob);
    setJobsData(jobs);
  };

  const connectToSignalR = async () => {
    const auth = new AuthService(process.env.ENDPOINT_URL);
    const session = auth.getSession();

    // Open connections
    try {
      await dataSources.forEach((source) => {
        if (!source.host) {
          throw new Error('Host not provided.');
        }

        const connection = new HubConnectionBuilder()
          .withUrl(source.host + NOTIFICATION_HUB, {
            accessTokenFactory: () => session.accessToken,
          })
          .configureLogging(LogLevel.Information)
          .withAutomaticReconnect()
          .build();

        connection
          .start()
          .then(() => {
            connection.on('JobUpdated', jobUpdated);
            connection.on('JobAdded', jobAdded);

            connection.invoke(
              'AddJobFilter',
              source.connection,
              [{ Item: 'Priority', QueryOperator: 'GreaterThan', Value: -1 }], // ability to change condition?
            );
          })
          .catch((e) => console.log('Connection failed: ', e));
      });
    } catch (err) {
      console.log('SignalR connection failed: ', err);
    }
  };

  useEffect(() => {
    fetchJobList();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    connectToSignalR();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <Paper style={{ position: 'relative' }}>
        {loading && <Loading />}

        <Grid rows={jobsData} columns={columns}>
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />

          <SortingState defaultSorting={[{ columnName: 'requested', direction: 'desc' }]} />
          <IntegratedSorting />

          <DragDropProvider />
          <GroupingState />
          <IntegratedGrouping columnExtensions={integratedGroupingColumnExtensions} />

          <VirtualTable
            height={windowHeight - 230}
            rowComponent={TableRow}
            cellComponent={Cell}
            columnExtensions={tableColumnExtensions}
          />

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
          textareaScrolled={textareaScrolled}
          timeZone={timeZone}
          dateTimeFormat={dateTimeFormat}
          onClose={closeTab}
        />
      </div>
    </div>
  );
};

export { JobList, JobListProps };
