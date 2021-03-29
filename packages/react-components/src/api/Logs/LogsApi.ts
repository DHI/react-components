import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from '../../api/types';
import { dataObjectToArray } from '../../utils/Utils';
import { fetchUrl } from '../helpers';

/**
 * /api/logs/{connectionId}/query
 * Gets a list of log entries by query.
 * @param dataSources
 * @param token
 * @param query
 */
const fetchLogs = (dataSources: DataSource | DataSource[], token: string, query: any) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.map((source: DataSource) =>
    fetchUrl(`${source.host}/api/logs/${source.connection}/query`, {
      method: 'POST',
      body: JSON.stringify(query),
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(map((fc) => dataObjectToArray(fc))),
  );

  return forkJoin(requests).pipe(map((fc) => fc.flat()));
};

export { fetchLogs };
