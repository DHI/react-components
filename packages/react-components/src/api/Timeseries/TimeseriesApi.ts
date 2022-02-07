import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { dataObjectToArray } from '../../utils/Utils';
import { fetchUrl } from '../helpers';
import { DataSource } from '../types';

/**
 * /api/timeseries/{connectionId}/list/values
 * Gets a list of values within the given time interval for the given list of time series.
 *
 * or
 *
 * /api/timeseries/{connectionId}/list/value/last
 * Gets the last value (corresponding to the last time step) for the given list of time series
 * @param dataSources
 * @param token
 * @param onlyLast
 */
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

/**
 * /api/timeseries/{connectionId}/fullnames
 * Gets a list of time series full-name identifiers.
 * @param dataSources
 * @param token
 */
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
const fetchTimeseriesFullNames = (dataSources: DataSource[], group: any) => {
  const dataSourcesArray = !Array.isArray(dataSources) ? [dataSources] : dataSources;

  const requests = dataSourcesArray.flatMap((source) =>
    fetchUrl(
      `${source.host}/api/timeseries/${source.connection}/fullnames?group=${source.group || group || ''};nonrecursive`,
      {
        method: 'GET',
        additionalHeaders: {
          Authorization: `Bearer ${source.token}`,
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

export { fetchTimeseriesValues, fetchTimeseriesByGroup, fetchTimeseriesFullNames };
