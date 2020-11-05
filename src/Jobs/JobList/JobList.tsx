import { Button, Divider, FormControlLabel, Grid, Switch } from '@material-ui/core';
import { zonedTimeToUtc } from 'date-fns-tz';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { SelectColumnFilter } from '../../common/tableHelper';
import { executeJobQuery } from '../../DataServices/DataServices';
import { calcTimeDifference, setUtcToZonedTime } from '../../utils/Utils';
import DateInput from './DateInput';
import JobListTable from './JobListTable';
import StatusIconCell from './StatusIconCell';
import JobListProps, { DateProps, JobData } from './types';


const JobList = (props: JobListProps) => {
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
  const [isTableWider, setIsTableWider] = useState<boolean>(false);
  const [textareaScrolled, setTextareaScrolled] = useState<boolean>(false)
  const [date, setDate] = useState<DateProps>(initialDateState);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const onJobsRecieved = (data: JobData[]) => {
    return data.reduce(function (obj, v) {
      obj[v.status] = (obj[v.status] || 0) + 1;

      return obj;
    }, {});
  };

  const data = useMemo(() => {
    setLoading(false);

    if (onReceived) {
      onReceived(onJobsRecieved(jobsData));
    }

    return jobsData;
  }, [jobsData]);

  const parameterHeader = parameters
    ? parameters.reduce(
      (acc, cur) => [
        ...acc,
        {
          header: cur.label,
          accessor: cur.parameter,
          flexGrow: isTableWider && 1,
        },
      ],
      [],
    )
    : [];

  const columns = [
    {
      header: 'Task Id',
      accessor: 'taskId',
      Filter: SelectColumnFilter,
      width: 220,
    },
    {
      category: 'Status',
      header: 'Status',
      accessor: 'status',
      Cell: StatusIconCell,
      Filter: SelectColumnFilter,
      width: 120,
    },
    {
      header: 'Account ID',
      accessor: 'accountId',
      width: 120,
    },
    {
      header: 'Host Id',
      accessor: 'hostId',
      Filter: SelectColumnFilter,
      width: 150,
    },
    {
      header: 'Duration',
      accessor: 'duration',
      width: 120,
    },
    {
      header: 'Delay',
      accessor: 'delay',
      width: 120,
    },
    {
      header: 'Requested',
      accessor: 'requested',
      width: 200,
      flexGrow: isTableWider && 1,
    },
    {
      header: 'Started',
      accessor: 'started',
      width: 200,
      flexGrow: isTableWider && 1,
    },
    {
      header: 'Finished',
      accessor: 'finished',
      width: 200,
      flexGrow: isTableWider && 1,
    },
  ];

  const TableHeadersData = useMemo(() => columns.concat(parameterHeader), [isTableWider]);

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
          setIsFiltered(false);
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

  const setFilter = () => {
    setIsFiltered(true);
    fetchJobList();
  }

  const handleSwitchChange = () => {
    setTextareaScrolled(!textareaScrolled);
  }

  const clearFilter = () => {
    setDate(initialDateState)
  }

  useEffect(() => {
    fetchJobList();
  }, []);

  useEffect(() => {

    let interval: any;

    if (startDateUtc) {
      interval = setInterval(() => fetchJobList(), frequency * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startDateUtc]);

  return (
    <Fragment>
      <Grid container direction='row' alignItems='center' justify='flex-end' spacing={3} style={{ padding: 20 }}>
        <Grid item>
          <DateInput
            label='From'
            dateFormat={dateTimeFormat}
            timeZone={timeZone}
            defaultDate={date.from ? date.from : new Date(startTimeUtc).toISOString()}
            dateSelected={(value) => setDate({ ...date, from: value })}
          />
        </Grid>
        <Grid item>
          <DateInput
            label='To'
            dateFormat={dateTimeFormat}
            timeZone={timeZone}
            defaultDate={date.to ? date.to : new Date().toISOString()}
            dateSelected={(value) => setDate({ ...date, to: value })}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => setFilter()}>Filter</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => clearFilter()}>Clear</Button>
        </Grid>
        <Divider />
        <Grid item>
          <FormControlLabel
            control={<Switch
              checked={textareaScrolled}
              onChange={handleSwitchChange}
              color="primary"
              name="textareaView"
              inputProps={{ 'aria-label': 'textareaView checkbox' }}
            />}
            label="Textarea scrolled down"
          />
        </Grid>
      </Grid>

      <JobListTable
        token={token}
        dataSources={dataSources}
        timeZone={timeZone}
        dateTimeFormat={dateTimeFormat}
        columns={TableHeadersData}
        data={data || []}
        translations={translations}
        isFiltered={isFiltered}
        textareaScrolled={textareaScrolled}
        loading={loading}
        hiddenColumns={disabledColumns}
        windowHeight={windowHeight}
        isTableWiderThanWindow={(wider) => setIsTableWider(wider)}
      />
    </Fragment>
  );
};

export { JobListProps, JobList };
