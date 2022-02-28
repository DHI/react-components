import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { dataObjectToArray } from '../../utils/Utils';
import { fetchUrl } from '../helpers';
import { DataSource } from '../types';

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

const fetchFeatureCollection = (dataSource: DataSource, token: string) => {
  return fetchUrl(`${dataSource.host}/api/featurecollections/${dataSource.connection}/${dataSource.id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { fetchFeatureCollectionValues, fetchFeatureCollection };
