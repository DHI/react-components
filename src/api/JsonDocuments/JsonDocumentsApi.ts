import { tap } from 'rxjs/operators';
import { DataSource } from '../../api/types';
import { Scenario } from '../../Scenarios/types';
import { fetchUrl } from '../helpers';

/**
 * /api/jsondocuments/{connectionId}
 * Gets all json documents within the given time interval. If no time interval is given, all json documents are returned.
 * @param dataSource
 * @param token
 */
const fetchJsonDocuments = (dataSource: DataSource, token: string) => {
  const dataSelectors =
    dataSource.dataSelectors && dataSource.dataSelectors.length > 0
      ? `?dataSelectors=[${dataSource.dataSelectors
          .map((dataSelector) => dataSelector.replace('data.', ''))
          .join(',')}]`
      : '';

  return fetchUrl(
    `${dataSource.host}/api/jsondocuments/${dataSource.connection}?from=${dataSource.from || ''}&to=${
      dataSource.to || ''
    }&${dataSelectors}`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).pipe(tap((res) => console.log('List of JSON documents fetched', res)));
};

/**
 * /api/jsondocuments/{connectionId}/{fullName}
 * Gets the JSON document with the specified fullname identifier.
 * @param dataSource
 * @param token
 * @param id
 */
const fetchJsonDocument = (dataSource: DataSource, token: string, id: string) =>
  fetchUrl(`${dataSource.host}/api/jsondocuments/${dataSource.connection}/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log(`${id} scenario fetched`, res)));

/**
 * /api/jsondocuments/{connectionId}
 * Adds a new JSON document.
 * @param dataSource
 * @param token
 * @param scenario
 */
const postJsonDocuments = (dataSource: DataSource, token: string, scenario: Scenario) => {
  return fetchUrl(`${dataSource.host}/api/jsondocuments/${dataSource.connection}`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap((res) => console.log('Create a JSON document', res)));
};

/**
 * /api/jsondocuments/{connectionId}/{fullName}
 * Deletes the JSON document with the specified fullname identifier.
 * @param dataSource
 * @param token
 * @param fullName
 */
const deleteJsonDocument = (dataSource: DataSource, token: string, fullName: string) =>
  fetchUrl(`${dataSource.host}/api/jsondocuments/${dataSource.connection}/${fullName}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('scenario deleted', res)));

/**
 * /api/jsondocuments/{connectionId}
 * Updates an existing JSON document.
 * @param dataSource
 * @param token
 * @param scenario
 */
const updateJsonDocument = (dataSource: DataSource, token: string, scenario: any) =>
  fetchUrl(`${dataSource.host}/api/jsondocuments/${dataSource.connection}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap((res) => console.log('scenario updated', res)));

export { fetchJsonDocuments, fetchJsonDocument, postJsonDocuments, deleteJsonDocument, updateJsonDocument };
