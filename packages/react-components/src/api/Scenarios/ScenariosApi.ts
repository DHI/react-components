import { tap } from 'rxjs/operators';
import { DataSource } from '../../api/types';
import { fetchUrl } from '../helpers';

/**
 * /api/scenarios/{connectionId}/{id}
 * Gets a scenario with the specified identifier
 * @param dataSource
 * @param token
 * @param id
 */
const fetchScenario = (dataSource: DataSource, token: string, id: string) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}/${id}?scenarioId=${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log(`${id} scenario fetched`, res)));

/**
 * /api/scenarios/{connectionId}
 * Gets all scenarios
 * @param dataSource
 * @param token
 */
const fetchScenarios = (dataSource: DataSource, token: string) => {
  const dataSelectors =
    dataSource.dataSelectors && dataSource.dataSelectors.length > 0
      ? `?dataSelectors=[${dataSource.dataSelectors
          .map((dataSelector) => dataSelector.replace('data.', ''))
          .join(',')}]`
      : '';

  return fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}${dataSelectors}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * /api/scenarios/{connectionId}
 * Gets all scenarios within the given time span
 * @param dataSource
 * @param token
 */
const fetchScenariosByDate = (dataSource: DataSource, token: string) => {
  const dataSelectors =
    dataSource.dataSelectors && dataSource.dataSelectors.length > 0
      ? `&dataSelectors=[${dataSource.dataSelectors
          .map((dataSelector) => dataSelector.replace('data.', ''))
          .join(',')}]`
      : '';

  return fetchUrl(
    `${dataSource.host}/api/scenarios/${dataSource.connection}?from=${dataSource.from}&to=${dataSource.to}${dataSelectors}`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

/**
 * /api/scenarios/{connectionId}/{id}
 * Deletes the scenario with the specified identifier.
 * @param dataSource
 * @param token
 * @param id
 */
const deleteScenario = (dataSource: DataSource, token: string, id: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('scenario deleted', res)));

/**
 * /api/scenarios/{connectionId}
 * Adds a scenario
 * @param dataSource
 * @param token
 * @param scenario
 */
const postScenario = (dataSource: DataSource, token: string, scenario: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap((res) => console.log('scenario posted', res)));

/**
 * /api/scenarios/{connectionId}
 * Updates an existing scenario.
 * @param dataSource
 * @param token
 * @param scenario
 */
const updateScenario = (dataSource: DataSource, token: string, scenario: any) =>
  fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scenario),
  }).pipe(tap((res) => console.log('scenario updated', res)));

export { fetchScenario, fetchScenarios, fetchScenariosByDate, deleteScenario, postScenario, updateScenario };
