import React, { useEffect, useMemo, useState } from 'react';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { fetchJobs } from '../../DataServices/DataServices';
import JobListProps, { JobData } from './types';
import { SelectColumnFilter } from '../../common/tableHelper';
import { calcTimeDifference } from '../../utils/Utils';
import StatusIconCell from './StatusIconCell';
import JobListTable from './JobListTable';
import './style.css';

const JobList = (props: JobListProps) => {
  const { frequency, dataSources, token, startTimeUtc, dateTimeFormat, timeZone, translations, onReceived } = props;
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

  const columns = [
    {
      header: 'Task Id',
      accessor: 'taskId',
      Filter: SelectColumnFilter,
      width: 220,
    },
    {
      header: 'Status',
      accessor: 'status',
      Cell: StatusIconCell,
      Filter: SelectColumnFilter,
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

  const fetchJobList = (dateTimeValue: string) => {
    setLoading(true);
    const query = { since: dateTimeValue };
    const oldJobsData = jobsData;

    fetchJobs(dataSources, token, query).subscribe(
      (res) => {
        // console.log(res);
        const rawJobs = res.map((s: { data }) => {
          // Mapping to JobData.
          const dataMapping = {
            id: s.data.id,
            taskId: s.data.taskId,
            hostId: s.data.hostId,
            status: s.data.status,
            progress: s.data.progress || 0,
            requested: s.data.requested
              ? format(utcToZonedTime(s.data.requested.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            started: s.data.started
              ? format(utcToZonedTime(s.data.started.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            finished: s.data.finished
              ? format(utcToZonedTime(s.data.finished.replace('T', ' '), timeZone), dateTimeFormat)
              : '',
            duration: calcTimeDifference(s.data.started, s.data.finished),
            delay: calcTimeDifference(s.data.requested, s.data.started),
          };

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

  /** Function and variable to select display column */
  // const [open, setOpen] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  const hiddenColumnsData = useMemo(() => {
    return hiddenColumns;
  }, [hiddenColumns]);

  return (
    <JobListTable
      columns={columns}
      data={data}
      translations={translations}
      loading={loading}
      hiddenColumns={hiddenColumnsData}
      windowHeight={windowHeight}
      isTableWiderThanWindow={(wider) => setIsTableWider(wider)}
    />
  );
};

export { JobListProps, JobList };
