import { forkJoin, from, of, throwError } from 'rxjs';
import { catchError, flatMap, map, tap } from 'rxjs/operators';
import { Token } from '../Auth/types';
import { UserGroupsData } from '../UserGroups/types';
import { dataObjectToArray } from '../utils/Utils';
import { DataSource, Options, User } from './types';

const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const fetchUrl = (endPoint: RequestInfo, options?: Options) => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options?.additionalHeaders,
    },
  };

  return from(fetch(endPoint, mergedOptions as any)).pipe(
    tap((response) => console.log(`Response status: ${response.status}`)),
    map((response) => {
      if (response.status >= 400) {
        throw new Error(`Error: ${response.status}, reason: ${response.statusText}`);
      } else {
        return response;
      }
    }),
    flatMap((response) => checkStatus(response)),
    catchError((error) => throwError(error)),
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
  }).pipe<Token>(
    tap(
      (res) => console.log('token res', res),
      (error) => console.log(error),
    ),
  );
};

const validateToken = (host: string, token: string) => {
  return fetch(`${host}/api/tokens/validation`, {
    ...DEFAULT_OPTIONS,
    method: 'POST',
    body: JSON.stringify(token),
  });
};

// GIS

const fetchFeatureCollectionValues = (dataSources: DataSource | DataSource[], token: string) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.map((source: DataSource) =>
    fetchUrl(`${source.host}/api/featurecollections/${source.connection}/list`, {
      method: 'POST',
      body: JSON.stringify(source.ids),
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(map((fc) => dataObjectToArray(fc))),
  );

  return forkJoin(requests).pipe(map((fc) => fc.flat()));
};

// TIMESERIES

const fetchTimeseriesValues = (dataSources: DataSource[], token: string, onlyLast = false) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.map((source) => {
    let url = `${source.host}/api/timeseries/${source.connection}/list/${onlyLast ? 'value/last' : 'values'}`;

    if (source.from && source.to) {
      url = `${url}?from=${source.from}&to=${source.to}`;
    }

    return fetchUrl(url, {
      method: 'POST',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(source.ids),
    }).pipe(map((timeseries) => dataObjectToArray(timeseries)));
  });

  return forkJoin(requests).pipe(map((timeseries) => timeseries.flat()));
};

const fetchTimeseriesByGroup = (dataSources: DataSource[], token: string) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.flatMap((source) =>
    source.ids!.map((group) =>
      fetchUrl(`${source.host}/api/timeseries/${source.connection}/fullnames?group=${group.replace(/\//g, '|')}`, {
        additionalHeaders: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ),
  );

  return forkJoin(requests).pipe(tap((ts) => console.log('got group names', ts)));
};

/**
 * /api/timeseries/{connectionId}/fullnames
 * Gets a list of time series full-name identifiers.
 * @param dataSources connectionId is required
 * @param token
 */
const fetchTimeseriesFullNames = (dataSources: DataSource[], token: string, group: any) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.flatMap((source) =>
    fetchUrl(
      `${source.host}/api/timeseries/${source.connection}/fullnames?group=${source.group || group || ''};nonrecursive`,
      {
        method: 'GET',
        additionalHeaders: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).pipe(
      tap(
        (res) => {
          console.log('fetch full names: ', res);
        },
        (error) => {
          console.log(error);
        },
      ),
    ),
  );

  return forkJoin(requests).pipe(map((ts) => ts.flat()));
};

// ACCOUNTS
// Could be an account name or `me`.
const fetchUserGroups = (host: string, token: string) =>
  fetchUrl(`${host}/api/usergroups`, {
    method: 'GET',
    additionalHeaders: { Authorization: `Bearer ${token}` },
  }).pipe(tap((res) => console.log('fetchUserGroups', res)));

const updateUserGroupsForUser = (host: string, token: string, data: { userId: string; groups: string[] }) =>
  fetchUrl(`${host}/api/usergroups/user/${data.userId}`, {
    method: 'POST',
    additionalHeaders: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data.groups),
  }).pipe(tap((res) => console.log('fetchUserGroups', res)));

const createUserGroup = (host: string, token: string, data: UserGroupsData) =>
  fetchUrl(`${host}/api/usergroups`, {
    method: 'POST',
    additionalHeaders: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  }).pipe(tap((res) => console.log('createUserGroup', res)));

const updateUserGroups = (host: string, token: string, data: UserGroupsData) =>
  fetchUrl(`${host}/api/usergroups`, {
    method: 'PUT',
    additionalHeaders: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      id: data.id,
      name: data.name,
      users: data.users,
      metadata: data.metadata,
    }),
  }).pipe(tap((res) => console.log('updateUserGroups', res)));

const deleteUserGroup = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/usergroups/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('deleted account', res)));

const fetchAccount = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/accounts/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch account', res)));

const fetchAccounts = (host: string, token: string) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch accounts', res)));

const deleteAccount = (host: string, token: string, username: string) =>
  fetchUrl(`${host}/api/accounts/${username}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('deleted account', res)));

const updateAccount = (host: string, token: string, data: Record<any, any>) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).pipe(tap((json) => console.log('updated user', json)));

const createAccount = (host: string, token: string, data: Record<any, any>) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

const resetPassword = (host: string, user: { Id: string }, token: string) =>
  fetchUrl(`${host}/api/accounts/passwordreset`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: user.Id,
  }).pipe(tap((res) => console.log('password reset', res)));

const updatePassword = (host: string, token: string, passwordToken: string, newPassword: string) =>
  fetchUrl(`${host}/api/accounts/password/token=${passwordToken}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: newPassword,
  }).pipe(tap((res) => console.log('password reset', res)));

const activateAccount = (host: string, token: string, accountToken: string) =>
  fetchUrl(`${host}/api/accounts/password/token=${accountToken}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('account activiated', res)));

// MAIL TEMPLATES
const fetchMailTemplate = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch mail template', res)));

const fetchMailTemplates = (host: string, token: string) =>
  fetchUrl(`${host}/api/mailtemplates`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch mail templates', res)));

const deleteMailTemplate = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('delete mail template', res)));

const updateMailTemplate = (host: string, token: string, id: string, mailTemplateDTO: any) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mailTemplateDTO),
  }).pipe(tap((res) => console.log('delete mail template', res)));

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
  token: string,
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
  }).pipe(tap((res) => console.log('fetch style palette', res)));

const fetchMapStyle = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mapstyles/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch style', res)));

const fetchMapStyles = (host: string, token: string) =>
  fetchUrl(`${host}/api/mapstyles`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch style', res)));

const createMapStyle = (host: string, token: string, styleDTO: any) =>
  fetchUrl(`${host}/api/mapstyles`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(styleDTO),
  }).pipe(tap((res) => console.log('fetch style', res)));

const fetchMapStyleCount = (host: string, token: string) =>
  fetchUrl(`${host}/api/mapstyles/count`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch style', res)));

const deleteMapStyle = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mapstyles/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('delete style', res)));

// Spreadsheets
const fetchSpreadsheetUsedRange = (dataSource: DataSource, token: string) =>
  fetchUrl(
    `${dataSource.host}/api/spreadsheets/${dataSource.connection}/${dataSource.id}/${dataSource.sheetName}/usedrange`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).pipe(tap((res) => console.log(`spread sheet fetched`, res)));

const updateSpreadsheet = (host: string, connection: string, token: string, spreadSheetToUpdate: any) =>
  fetchUrl(`${host}/api/spreadsheets/${connection}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(spreadSheetToUpdate),
  }).pipe(tap((json) => console.log('updated spread sheet', json)));

export {
  fetchToken,
  validateToken,
  fetchUrl,
  resetPassword,
  fetchAccounts,
  deleteAccount,
  updateAccount,
  createAccount,
  fetchTimeseriesValues,
  fetchUserGroups,
  updateUserGroupsForUser,
  createUserGroup,
  updateUserGroups,
  deleteUserGroup,
  fetchFeatureCollectionValues,
  fetchTimeseriesByGroup,
  fetchTimeseriesFullNames,
  fetchMapAnimationFiles,
  fetchMapStylePalette,
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
  fetchSpreadsheetUsedRange,
  updateSpreadsheet,
};
