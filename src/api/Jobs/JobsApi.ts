import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataSource, JobParameters, JobQuery } from '../../api/types';
import { dataObjectToArray, queryProp } from '../../utils/Utils';
import { fetchUrl } from '../helpers';

/**
 * /api/jobs/{connectionId}/query
 * @param dataSource
 * @param token
 * @param query array of objects { item: string, queryOperator: string, value: string}
 *
 *  Gets all the jobs meeting the criteria specified by the given query.
 */
const executeJobQuery = (dataSources: DataSource | DataSource[], token: string, query: JobParameters[]) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.map((source: DataSource) =>
    fetchUrl(`${source.host}/api/jobs/${source.connection}/query`, {
      method: 'POST',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(query),
    }).pipe(
      tap(
        (res) => {
          console.log('job executed', res);
        },
        (error) => {
          console.log(error);
        },
      ),
      map((job) => {
        return dataObjectToArray(job).sort((a, b) => {
          return new Date(b.data.requested).getTime() - new Date(a.data.requested).getTime();
        });
      }),
    ),
  );

  return forkJoin(requests).pipe(map((job) => job.flat()));
};

/**
 * /api/jobs/{connectionId}
 * Requests a job execution.
 * @param dataSource
 * @param token
 * @param taskId
 * @param parameters
 * @param hostGroup
 */
const executeJob = (
  dataSource: DataSource,
  token: string,
  taskId: string,
  parameters: JobParameters,
  hostGroup?: string,
) => {
  const body: Partial<Record<string, any>> = { taskId, parameters };

  if (hostGroup) {
    body.hostGroup = hostGroup;
  }

  return fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).pipe(
    tap(
      (res) => {
        console.log('job executed', res);
      },
      (error) => {
        console.log(error);
      },
    ),
  );
};

/**
 * /api/jobs/{connectionId}/{id}/cancel
 * Requests cancellation of the job with the specified job identifier.
 * @param dataSource
 * @param token
 * @param id
 */
const cancelJob = (dataSource: DataSource, token: string, id: any) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/${id}/cancel`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: '',
  }).pipe(tap((res) => console.log('job canceled', res)));

/**
 * /api/jobs/{connectionId}/cancel
 * Requests cancellation of the jobs with the specified job identifiers.
 * @param dataSource
 * @param token
 * @param ids
 */
const cancelJobs = (dataSource: DataSource, token: string, ids: string) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/cancel`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: { ids },
  }).pipe(tap((res) => console.log('job canceled', res)));

/**
 * /api/jobs/{connectionId}/{id}
 * Gets the job with the specified identifier.
 * @param dataSource
 * @param token
 * @param id
 */
const fetchJob = (dataSource: DataSource, token: string, id: string) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('job fetched executed', res)));

/**
 * /api/jobs/{connectionId}
 * Gets all the jobs meeting the criteria specified by the given query string parameters.
 * @param dataSources
 * @param token
 * @param query
 */
const fetchJobs = (
  dataSources: DataSource | DataSource[],
  token: string,
  query: {
    account?: any;
    since: any;
    status?: any;
    task?: any;
    tag?: any;
  },
) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.map((source: DataSource) =>
    fetchUrl(
      !query
        ? `${source.host}/api/jobs/${source.connection}`
        : `${source.host}/api/jobs/${source.connection}?account=${queryProp(query.account)}&since=${queryProp(
            query.since,
          )}&status=${queryProp(query.status)}&task=${queryProp(query.task)}&tag=${queryProp(query.tag)}`,
      {
        method: 'GET',
        additionalHeaders: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).pipe(
      map((fc) => {
        fc.forEach((item) => (item.connectionJobLog = source.connectionJobLog));

        return dataObjectToArray(fc).sort((a, b) => {
          return new Date(b.data.requested).getTime() - new Date(a.data.requested).getTime();
        });
      }),
    ),
  );

  return forkJoin(requests).pipe(map((fc) => fc.flat()));
};

/**
 * /api/jobs/{connectionId}
 * Deletes all the jobs meeting the criteria specified by the given parameters.
 * NOTE: This endpoint if for system purposes only. You should never manually delete a job.
 * @param dataSource
 * @param token
 * @param id
 */
const deleteJob = (dataSource: DataSource, token: string, id: string) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('job deleted', res)));

/**
 * /api/jobs/{connectionId}
 * Deletes all the jobs meeting the criteria specified by the given parameters.
 * NOTE: This endpoint if for system purposes only. You should never manually delete a job.
 * @param dataSource
 * @param token
 * @param query
 */
const deleteJobs = (dataSource: DataSource, token: string, query: JobQuery) =>
  fetchUrl(
    `${dataSource.host}/api/jobs/${dataSource.connection}?account=${query.account}&since=${query.since}&status=${query.status}&task=${query.task}&tag=${query.tag}`,
    {
      method: 'DELETE',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).pipe(tap((res) => console.log('jobs deleted', res)));
/**
 * /api/jobs/{connectionId}/last
 * Gets the last job meeting the criteria specified by the given parameters.
 * @param dataSource
 * @param token
 * @param query
 */
const fetchLastJob = (dataSource: DataSource, token: string, query: JobQuery) =>
  fetchUrl(
    `${dataSource.host}/api/jobs/${dataSource.connection}/last?account=${query.account}&since=${query.since}&status=${query.status}&task=${query.task}&tag=${query.tag}`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).pipe(tap((res) => console.log('last job fetched', res)));

/**
 * /api/jobs/{connectionId}/count
 * Gets the total number of jobs.
 * @param dataSource
 * @param token
 */
const fetchJobCount = (dataSource: DataSource, token: string) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/count`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('job count fetched', res)));

export {
  executeJobQuery,
  executeJob,
  cancelJob,
  cancelJobs,
  fetchJobs,
  deleteJob,
  deleteJobs,
  fetchLastJob,
  fetchJobCount,
};
