import { forkJoin, from, of, throwError } from 'rxjs';
import { catchError, flatMap, map, tap } from 'rxjs/operators';
import { dataObjectToArray, queryProp } from '../';
import { DataSource, JobQuery, Options, User } from './types';

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
      ...options.additionalHeaders,
    },
  };

  return from(fetch(endPoint, mergedOptions as any)).pipe(
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

// GIS

const fetchFeatureCollectionValues = (
  dataSources: DataSource | DataSource[],
  token: string
) => {
  const dataSourcesArray = !Array.isArray(dataSources)
    ? [dataSources]
    : dataSources;

  const requests = dataSourcesArray.map((source: DataSource) =>
    fetchUrl(
      `${source.host}/api/featurecollections/${source.connection}/list`,
      {
        method: 'POST',
        body: JSON.stringify(source.ids),
        additionalHeaders: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).pipe(map(fc => dataObjectToArray(fc)))
  );

  return forkJoin(requests).pipe(map(fc => fc.flat()));
};

// TIMESERIES

const fetchTimeseriesValues = (dataSources: DataSource[], token: string) => {
  const dataSourcesArray = !Array.isArray(dataSources)
    ? [dataSources]
    : dataSources;

  const requests = dataSourcesArray.map(source => {
    let url = `${source.host}/api/timeseries/${source.connection}/list/values`;

    if (source.from && source.to) {
      url = `${url}?from=${source.from}&to=${source.to}`;
    }

    return fetchUrl(url, {
      method: 'POST',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(source.ids),
    }).pipe(map(timeseries => dataObjectToArray(timeseries)));
  });

  return forkJoin(requests).pipe(map(timeseries => timeseries.flat()));
};

const fetchTimeseriesByGroup = (dataSources: DataSource[], token: string) => {
  const dataSourcesArray = !Array.isArray(dataSources)
    ? [dataSources]
    : dataSources;

  const requests = dataSourcesArray.flatMap(source =>
    source.ids!.map(group =>
      fetchUrl(
        `${source.host}/api/timeseries/${
          source.connection
        }/fullnames?group=${group.replace(/\//g, '|')}`,
        {
          additionalHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    )
  );

  return forkJoin(requests).pipe(tap(ts => console.log('got group names', ts)));
};

// ACCOUNTS
// Could be an account name or `me`.
const fetchAccount = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/accounts/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch account', res)));

const fetchAccounts = (host: string, token: string) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch accounts', res)));

const deleteAccount = (host: string, token: string, username: string) =>
  fetchUrl(`${host}/api/accounts/${username}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('deleted account', res)));

const updateAccount = (host: string, token: string, username: string) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(username),
  }).pipe(tap(json => console.log('updated user', json)));

const createAccount = (host: string, token: string, username: string) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(username),
  });

const resetPassword = (host: string, user: { Id: string }, token: string) =>
  fetchUrl(`${host}/api/accounts/passwordreset`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: user.Id,
  }).pipe(tap(res => console.log('password reset', res)));

const updatePassword = (
  host: string,
  token: string,
  passwordToken: string,
  newPassword: string
) =>
  fetchUrl(`${host}/api/accounts/password/token=${passwordToken}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: newPassword,
  }).pipe(tap(res => console.log('password reset', res)));

const activateAccount = (host: string, token: string, accountToken: string) =>
  fetchUrl(`${host}/api/accounts/password/token=${accountToken}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('account activiated', res)));

// MAIL TEMPLATES
const fetchMailTemplate = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch mail template', res)));

const fetchMailTemplates = (host: string, token: string) =>
  fetchUrl(`${host}/api/mailtemplates`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch mail templates', res)));

const deleteMailTemplate = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('delete mail template', res)));

const updateMailTemplate = (
  host: string,
  token: string,
  id: string,
  mailTemplateDTO: any
) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mailTemplateDTO),
  }).pipe(tap(res => console.log('delete mail template', res)));

// MAP

const fetchMapAnimationFiles = (
  dataSource: DataSource,
  config: {
    style: any;
    item: any;
    width: any;
    height: any;
    bbox: any;
    shadingType: any;
    scale: any;
  },
  token: string
) => {
  const url = `${dataSource.host}/api/maps/${dataSource.connection}?&style=${config.style}&item=${config.item}&width=${config.width}&height=${config.height}&bbox=${config.bbox}&shadingtype=${config.shadingType}&scale=${config.scale}`;

  return fetchUrl(url, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataSource.ids),
  });
};

// const fetchMapAnimationFiles = (dataSources, config) => {
//   const dataSourcesArray = !Array.isArray(dataSources)
// ? [dataSources]
// : dataSources;
//   const source = dataSourcesArray[0];
//   const imageSources = [
//     {
//       [Object.keys(source.ids)[0]]: Object.values(source.ids)[0],
//     },
//     source.ids,
//   ];
//   const url = `${source.host}/api/maps/${source.connection}/list?&style=${config.style}&item=${
//     config.item
//   }&width=${config.width}&height=${config.height}&bbox=${config.bbox}&shadingtype=${config.shadingType}&scale=${
//     config.scale
//   }`;

//   return from(imageSources).pipe(
//     mergeMap(imageSource =>
//       fetchUrl(url, {
//         method: 'POST',
//         body: JSON.stringify(imageSource),
//       }),
//     ),
//   );
// };

// MAP STYLES

const fetchMapStylePalette = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mapstyles/${id}/palette`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch style palette', res)));

const fetchMapStyle = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mapstyles/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch style', res)));

const fetchMapStyles = (host: string, token: string) =>
  fetchUrl(`${host}/api/mapstyles`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch style', res)));

const createMapStyle = (host: string, token: string, styleDTO: any) =>
  fetchUrl(`${host}/api/mapstyles`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(styleDTO),
  }).pipe(tap(res => console.log('fetch style', res)));

const fetchMapStyleCount = (host: string, token: string) =>
  fetchUrl(`${host}/api/mapstyles/count`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch style', res)));

const deleteMapStyle = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mapstyles/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('delete style', res)));

// SCENARIOS

const fetchScenario = (dataSource: DataSource, token: string, id: string) =>
  fetchUrl(
    `${dataSource.host}/api/scenarios/${dataSource.connection}/${id}?scenarioId=${id}`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log(`${id} scenario fetched`, res)));

const fetchScenarios = (dataSource: DataSource, token: string) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('List of scenarios fetched', res)));

const fetchScenariosByDate = (dataSource: DataSource, token: string) =>
  fetchUrl(
    `${dataSource.host}/api/scenarios/${dataSource.connection}/list?from=${dataSource.from}&to=${dataSource.to}`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

const deleteScenario = (dataSource: DataSource, token: string, id: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('scenario deleted', res)));

const postScenario = (dataSource: DataSource, token: string, scenario: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap(res => console.log('scenario posted', res)));

const updateScenario = (dataSource: DataSource, token: string, scenario: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap(res => console.log('scenario updated', res)));

// JOBS

const executeJob = (
  dataSource: DataSource,
  token: string,
  taskId: any,
  parameters: any
) => {
  console.log(`${dataSource.host}/api/jobs/${dataSource.connection}`);
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}`, {
    method: 'POST',
    additionalHeaders: {
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

const cancelJob = (dataSource: DataSource, token: string, id: any) =>
  fetchUrl(
    `${dataSource.host}/api/jobs/${dataSource.connection}/${id}/cancel`,
    {
      method: 'PUT',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
      body: '',
    }
  ).pipe(tap(res => console.log('job canceled', res)));

const cancelJobs = (dataSource: DataSource, token: string, ids: string) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/cancel`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: { ids },
  }).pipe(tap(res => console.log('job canceled', res)));

const fetchJob = (dataSource: DataSource, token: string, id: string) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('jeb fetched executed', res)));

const fetchJobs = (
  dataSource: DataSource,
  token: string,
  query: { account: any; since: any; status: any; task: any; tag: any }
) => {
  const url = !query
    ? `${dataSource.host}/api/jobs/${dataSource.connection}`
    : `${dataSource.host}/api/jobs/${dataSource.connection}?account=${queryProp(
        query.account
      )}&since=${queryProp(query.since)}&status=${queryProp(
        query.status
      )}&task=${queryProp(query.task)}&tag=${queryProp(query.tag)}`;

  return fetchUrl(url, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('jobs fetched', res)));
};

const deleteJob = (dataSource: DataSource, token: string, id: string) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('job deleted', res)));

const deleteJobs = (dataSource: DataSource, token: string, query: JobQuery) =>
  fetchUrl(
    `${dataSource.host}/api/jobs/${dataSource.connection}?account=${query.account}&since=${query.since}&status=${query.status}&task=${query.task}&tag=${query.tag}`,
    {
      method: 'DELETE',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log('jobs deleted', res)));

const fetchLastJob = (dataSource: DataSource, token: string, query: JobQuery) =>
  fetchUrl(
    `${dataSource.host}/api/jobs/${dataSource.connection}/last?account=${query.account}&since=${query.since}&status=${query.status}&task=${query.task}&tag=${query.tag}`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log('last job fetched', res)));

const fetchJobCount = (dataSource: DataSource, token: string) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/count`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('job count fetched', res)));

//Logs
const fetchLogs = (dataSource: DataSource, token: string, query: any) =>
  fetchUrl(`${dataSource.host}/api/logs/${dataSource.connection}/query`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(query),
  }).pipe(tap(res => console.log('logs fetched', res)));

// Spreadsheets
const fetchSpreadsheetUsedRange = (dataSource: DataSource, token: string) =>
  fetchUrl(
    `${dataSource.host}/api/spreadsheets/${dataSource.connection}/${dataSource.id}/${dataSource.sheetName}/usedrange`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log(`spread sheet fetched`, res)));

const updateSpreadsheet = (
  host: string,
  connection: string,
  token: string,
  spreadSheetToUpdate: any
) =>
  fetchUrl(`${host}/api/spreadsheets/${connection}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(spreadSheetToUpdate),
  }).pipe(tap(json => console.log('updated spread sheet', json)));

export {
  fetchToken,
  fetchUrl,
  resetPassword,
  fetchAccounts,
  deleteAccount,
  updateAccount,
  createAccount,
  fetchTimeseriesValues,
  fetchFeatureCollectionValues,
  fetchTimeseriesByGroup,
  fetchMapAnimationFiles,
  fetchMapStylePalette,
  fetchScenario,
  fetchScenarios,
  fetchScenariosByDate,
  deleteScenario,
  postScenario,
  updateScenario,
  executeJob,
  cancelJob,
  cancelJobs,
  fetchJob,
  fetchJobs,
  deleteJob,
  deleteJobs,
  fetchLastJob,
  fetchJobCount,
  updateMailTemplate,
  fetchAccount,
  updatePassword,
  activateAccount,
  fetchMailTemplate,
  fetchMailTemplates,
  deleteMailTemplate,
  fetchMapStyle,
  fetchMapStyles,
  createMapStyle,
  fetchMapStyleCount,
  deleteMapStyle,
  fetchLogs,
  fetchSpreadsheetUsedRange,
  updateSpreadsheet,
};
