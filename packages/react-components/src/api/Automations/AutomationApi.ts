import { tap } from 'rxjs/operators';
import { DataSource } from '../types';
import { fetchUrl } from '../helpers';

/**
 * /DSWebAPI/api/automations/ids
 * Gets a list of group ids entries.
 * @param dataSources
 */
export const fetchGroupId = (dataSources: DataSource) => {
    return fetchUrl(`${dataSources.host}/DSWebAPI/api/automations/ids`, {
        method: 'GET',
        additionalHeaders: {
            Authorization: `Bearer ${dataSources.token}`,
        },
    }).pipe(
        tap(
            (res) => {
                console.log('update text', res);
            },
            (error) => {
                console.log(error);
            },
        ),
    );
};

/**
 * /DSWebAPI/api/automations
 * Gets a list of automations entries.
 * @param dataSources
 * @param group
 */
export const fetchListAutomations = (
    dataSources: DataSource, 
    group: string
    ) => {
    return fetchUrl(`${dataSources.host}/DSWebAPI/api/automations/?group=${group}`, {
        method: 'GET',
        additionalHeaders: {
          Authorization: `Bearer ${dataSources.token}`,
        },
    }).pipe(
        tap(
            // (res) => {
            //     console.log('update text', res);
            // },
            // (error) => {
            //     console.log(error);
            // },
        ),
    );
};