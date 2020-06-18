import { from, of, throwError, forkJoin } from 'rxjs';
import { tap, map, flatMap, catchError } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { formatValues, toArray, queryProp } from '../';

const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const fetchUrl = (endPoint, options = {}) => {
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

const checkStatus = response => {
  if (response.status === 204 || response.status === 202) {
    return of(response);
  }
  return response.json();
};

// AUTHENTICATION

const fetchToken = (host, user) => {
  console.log('GETTING TOKEN');
  return fetchUrl(`${host}/api/tokens`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).pipe(tap(res => console.log('token res', res)));
};

// GIS

const fetchFeatureCollectionValues = (dataSources, token) => {
  const dataSourcesArray = toArray(dataSources);

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requests = dataSourcesArray.map(source =>
    fetchUrl(
      `${source.host}/api/featurecollections/${source.connection}/list`,
      {
        method: 'POST',
        body: JSON.stringify(source.ids),
        headers,
      }
    ).pipe(map(fc => formatValues(fc)))
  );

  return forkJoin(requests).pipe(map(fc => fc.flat()));
};

// TIMESERIES

const fetchTimeseriesValues = (dataSources, token) => {
  const dataSourcesArray = toArray(dataSources);
  const requests = dataSourcesArray.map(source => {
    let url = `${source.host}/api/timeseries/${source.connection}/list/values`;

    if (source.from && source.to) {
      url = `${url}?from=${source.from}&to=${source.to}`;
    }

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetchUrl(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(source.ids),
    }).pipe(map(timeseries => formatValues(timeseries)));
  });

  return forkJoin(requests).pipe(map(timeseries => timeseries.flat()));
};

const fetchTimeseriesByGroup = (dataSources, token) => {
  dataSources = toArray(dataSources);

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requests = dataSources.flatMap(source =>
    source.ids.map(group =>
      fetchUrl(
        `${source.host}/api/timeseries/${
          source.connection
        }/fullnames?group=${group.replace(/\//g, '|')}`,
        {
          'Content-Type': 'application/json',
          headers,
        }
      )
    )
  );

  return forkJoin(requests).pipe(tap(ts => console.log('got group names', ts)));
};

// ACCOUNTS
// Could be an account name or `me`.
const fetchAccount = (host, token, id) =>
  fetchUrl(`${host}/api/accounts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch account', res)));

const fetchAccounts = (host, token) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch accounts', res)));

const deleteAccount = (host, token, usernameToDelete) =>
  fetchUrl(`${host}/api/accounts/${usernameToDelete}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('deleted account', res)));

const updateAccount = (host, token, userToUpdate) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userToUpdate),
  }).pipe(tap(json => console.log('updated user', json)));

const createAccount = (host, token, userToCreate) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userToCreate),
  });

const resetPassword = (host, user, token) =>
  fetchUrl(`${host}/api/accounts/passwordreset`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: user.Id,
  }).pipe(tap(res => console.log('password reset', res)));

const updatePassword = (host, token, passwordToken, newPassword) =>
  fetchUrl(`${host}/api/accounts/password/token=${passwordToken}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: newPassword,
  }).pipe(tap(res => console.log('password reset', res)));

const activateAccount = (host, token, accountToken) =>
  fetchUrl(`${host}/api/accounts/password/token=${accountToken}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('account activiated', res)));

// MAIL TEMPLATES

const fetchMailTemplate = (host, token, id) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch mail template', res)));

const fetchMailTemplates = (host, token) =>
  fetchUrl(`${host}/api/mailtemplates`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch mail templates', res)));

const deleteMailTemplate = (host, token, id) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('delete mail template', res)));

const updateMailTemplate = (host, token, id, mailTemplateDTO) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mailTemplateDTO),
  }).pipe(tap(res => console.log('delete mail template', res)));

// MAP

const fetchMapAnimationFiles = (dataSource, config, token) => {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${dataSource.host}/api/maps/${dataSource.connection}?&style=${config.style}&item=${config.item}&width=${config.width}&height=${config.height}&bbox=${config.bbox}&shadingtype=${config.shadingType}&scale=${config.scale}`;

  return fetchUrl(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(dataSource.ids),
  });
};

// const fetchMapAnimationFiles = (dataSources, config) => {
//   const dataSourcesArray = toArray(dataSources);
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

const fetchMapStylePalette = (host, token, id) =>
  fetchUrl(`${host}/api/mapstyles/${id}/palette`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch style palette', res)));

const fetchMapStyle = (host, token, id) =>
  fetchUrl(`${host}/api/mapstyles/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch style', res)));

const fetchMapStyles = (host, token) =>
  fetchUrl(`${host}/api/mapstyles`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch style', res)));

const createMapStyle = (host, token, styleDTO) =>
  fetchUrl(`${host}/api/mapstyles`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(styleDTO),
  }).pipe(tap(res => console.log('fetch style', res)));

const fetchMapStyleCount = (host, token) =>
  fetchUrl(`${host}/api/mapstyles/count`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('fetch style', res)));

const deleteMapStyle = (host, token, id) =>
  fetchUrl(`${host}/api/mapstyles/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('delete style', res)));

// SCENARIOS

const fetchScenario = (dataSource, token, id) =>
  fetchUrl(
    `${dataSource.host}/api/scenarios/${dataSource.connection}/${id}?scenarioId=${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log(`${id} scenario fetched`, res)));

const fetchScenarios = (dataSource, token) => {
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

const fetchScenariosByDate = (dataSource, token) => {
  const dataSelectors =
    dataSource.dataSelectors && dataSource.dataSelectors.length > 0
      ? `?dataSelectors=[${dataSource.dataSelectors
          .map(dataSelector => dataSelector.replace('data.', ''))
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
};

const deleteScenario = (dataSource, token, id) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('scenario deleted', res)));

const postScenario = (dataSource, token, scenario) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap(res => console.log('scenario posted', res)));

const updateScenario = (dataSource, token, scenario) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap(res => console.log('scenario updated', res)));

// JOBS

const executeJob = (dataSource, token, taskId, parameters) => {
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

const cancelJob = (dataSource, token, id) =>
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

const cancelJobs = (dataSource, token, ids) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/cancel`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: { ids },
  }).pipe(tap(res => console.log('job canceled', res)));

const fetchJob = (dataSource, token, id) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('jeb fetched executed', res)));

const fetchJobs = (dataSource, token, query) => {
  const url = isEmpty(query)
    ? `${dataSource.host}/api/jobs/${dataSource.connection}`
    : `${dataSource.host}/api/jobs/${dataSource.connection}?account=${queryProp(
        query.account
      )}&since=${queryProp(query.since)}&status=${queryProp(
        query.status
      )}&task=${queryProp(query.task)}&tag=${queryProp(query.tag)}`;

  return fetchUrl(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('jobs fetched', res)));
};

const deleteJob = (dataSource, token, id) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('job deleted', res)));

const deleteJobs = (dataSource, token, query) =>
  fetchUrl(
    `${dataSource.host}/api/jobs/${dataSource.connection}?account=${query.account}&since=${query.since}&status=${querystatus}&task=${query.task}&tag=${query.tag}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log('jobs deleted', res)));

const fetchLastJob = (dataSource, token, query) =>
  fetchUrl(
    `${dataSource.host}/api/jobs/${dataSource.connection}/last?account=${query.account}&since=${query.since}&status=${querystatus}&task=${query.task}&tag=${query.tag}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log('last job fetched', res)));

const fetchJobCount = (dataSource, token) =>
  fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connection}/count`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap(res => console.log('job count fetched', res)));

//Logs
const fetchLogs = (dataSource, token, query) =>
  fetchUrl(`${dataSource.host}/api/logs/${dataSource.connection}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(query),
  }).pipe(tap(res => console.log('logs fetched', res)));

// Spreadsheets
const fetchSpreadsheetUsedRange = (dataSource, token) =>
  fetchUrl(
    `${dataSource.host}/api/spreadsheets/${dataSource.connection}/${dataSource.id}/${dataSource.sheetName}/usedrange`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).pipe(tap(res => console.log(`spread sheet fetched`, res)));

const updateSpreadsheet = (host, connection, token, spreadSheetToUpdate) =>
  fetchUrl(`${host}/api/spreadsheets/${connection}`, {
    method: 'PUT',
    headers: {
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
