import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from '../types';
import { dataObjectToArray } from '../../utils/Utils';
import { fetchUrl } from '../helpers';

/**
 * /api/scalars/{connectionId}
 * Gets a list of scalars
 * @param dataSources
 * @param token
 */
const fetchScalars = (dataSources: DataSource | DataSource[], token: string) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.map((source: DataSource) =>
    fetchUrl(`${source.host}/api/scalars/${source.connection}`, {
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(map((fc) => dataObjectToArray(fc))),
  );

  return forkJoin(requests).pipe(map((fc) => fc.flat()));
};

export { fetchScalars };
