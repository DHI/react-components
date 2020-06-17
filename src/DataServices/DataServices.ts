import { from, of, throwError } from 'rxjs';
import { tap, map, flatMap, catchError } from 'rxjs/operators';
import { Options, DataSource, User } from './types';

const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const fetchUrl = (endPoint: RequestInfo, options: Options) => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options.headers,
    },
  };

  return from(fetch(endPoint, mergedOptions)).pipe(
    tap(response => console.log(`Response status: ${response.status}`)),
    map(response => {
      if (response.status >= 400) {
        throw new Error(
          `Error: ${response.status}, reason: ${response.statusText}`
        );
      } else {
        return response;
      }
    }),
    flatMap(response => checkStatus(response)),
    catchError(error => throwError(error))
  );
};

const checkStatus = (response: Response) => {
  if (response.status === 204 || response.status === 202) {
    return of(response);
  }
  return response.json();
};

// AUTHENTICATION

const fetchToken = (host: string, user: User) => {
  return fetchUrl(`${host}/api/tokens`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).pipe(tap(res => console.log('token res', res)));
};

// SCENARIOS
const fetchScenarios = (dataSource: DataSource, token: any) => {
  const dataSelectors =
    dataSource.dataSelectors && dataSource.dataSelectors.length > 0
      ? `?dataSelectors=[${dataSource.dataSelectors
          .map(dataSelector => dataSelector.replace('data.', ''))
          .join(',')}]`
      : '';

  return fetchUrl(
    `${dataSource.host}/api/scenarios/${dataSource.connection}${dataSelectors}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log('List of scenarios fetched', res)));
};

const fetchScenariosByDate = (dataSource?: DataSource, token?: any) => {
  if (dataSource !== undefined && token !== undefined) {
    const dataSelectors =
      dataSource.dataSelectors && dataSource.dataSelectors.length > 0
        ? `?dataSelectors=[${dataSource.dataSelectors
            .map((dataSelector: string) => dataSelector.replace('data.', ''))
            .join(',')}]`
        : '';

    return fetchUrl(
      `${dataSource.host}/api/scenarios/${dataSource.connection}/list?from=${dataSource.from}&to=${dataSource.to}${dataSelectors}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    return null;
  }
};

const deleteScenario = (dataSource: DataSource, token: any, id: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('scenario deleted', res)));

const postScenario = (dataSource: DataSource, token: any, scenario: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap(res => console.log('scenario posted', res)));

const updateScenario = (dataSource: DataSource, token: any, scenario: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap(res => console.log('scenario updated', res)));

// JOBS

const executeJob = (
  dataSource: DataSource,
  token: any,
  taskId: any,
  parameters: any
) => {
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ taskId, parameters }),
  }).pipe(
    tap(
      res => {
        console.log('job executed', res);
      },
      error => {
        console.log(error);
      }
    )
  );
};

const cancelJob = (dataSource: DataSource, token: any, id: any) =>
  fetchUrl(
    `${dataSource.host}/api/jobs/${dataSource.connection}/${id}/cancel`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: '',
    }
  ).pipe(tap(res => console.log('job canceled', res)));

export {
  fetchToken,
  fetchScenarios,
  fetchScenariosByDate,
  deleteScenario,
  postScenario,
  updateScenario,
  executeJob,
  cancelJob,
};
