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
 * /api/scenarios/{connectionId}/query
 * Gets all scenarios that match the given filtering criteria:
 * @param dataSource
 * @param filtering
 * @param token
 */
const fetchScenariosPost = (dataSource: DataSource, token: string) => {
  const dataSelectors =
    dataSource.dataSelectors && dataSource.dataSelectors.length > 0
      ? `?dataSelectors=[${dataSource.dataSelectors
          .map((dataSelector) => dataSelector.replace('data.', ''))
          .join(',')}]`
      : '';

  return fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}/query${dataSelectors}`, {
    method: 'Post',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataSource?.queryFilter),
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
const deleteScenario = (dataSource: DataSource, token: string, scenario: any, softDelete = false) => {
  if (softDelete) {
    scenario.data.deleted = true;
    scenario.data = JSON.stringify(scenario.data);

    return fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}`, {
      method: 'PUT',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(scenario),
    });
  } else {
    return fetchUrl(`${dataSource.host}/api/scenarios/${dataSource.connection}/${scenario}`, {
      method: 'DELETE',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

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
  });

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
  });

export { fetchScenario, fetchScenarios, fetchScenariosPost, fetchScenariosByDate, deleteScenario, postScenario, updateScenario };
