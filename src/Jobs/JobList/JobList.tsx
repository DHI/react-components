import { zonedTimeToUtc } from 'date-fns-tz';
import React, { useEffect, useMemo, useState } from 'react';
import { SelectColumnFilter } from '../../common/tableHelper';
import { fetchJobs } from '../../DataServices/DataServices';
import { calcTimeDifference, setUtcToZonedTime } from '../../utils/Utils';
import JobListTable from './JobListTable';
import StatusIconCell from './StatusIconCell';
import JobListProps, { JobData } from './types';

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
  const [startDateUtc, setStartDateUtc] = useState<string>();
  const [jobsData, setJobsData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [isTableWider, setIsTableWider] = useState<boolean>(false);

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

  const fetchJobList = (dateTimeValue: string) => {
    setLoading(true);
    const query = { since: dateTimeValue };
    const oldJobsData = jobsData;

    fetchJobs(dataSources, token, query).subscribe(
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

          const duplicateIndex = oldJobsData.findIndex((x: { id: string }) => x.id === s.data.Id);

          // Remove duplicate data
          if (duplicateIndex > -1) {
            oldJobsData.splice(duplicateIndex, 1);
          }

          return dataMapping;
        });
        setJobsData(rawJobs.concat(oldJobsData));

        const utcDate = zonedTimeToUtc(new Date(), timeZone).toISOString();

        setStartDateUtc(utcDate);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    fetchJobList(startTimeUtc);
  }, []);

  useEffect(() => {
    let interval: any;

    if (startDateUtc) {
      interval = setInterval(() => fetchJobList(startDateUtc), frequency * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startDateUtc]);

  return (
    <JobListTable
      token={token}
      dataSources={dataSources}
      timeZone={timeZone}
      dateTimeFormat={dateTimeFormat}
      columns={TableHeadersData}
      data={data}
      translations={translations}
      loading={loading}
      hiddenColumns={disabledColumns}
      windowHeight={windowHeight}
      isTableWiderThanWindow={(wider) => setIsTableWider(wider)}
    />
  );
};

export { JobListProps, JobList };
