import { tap } from 'rxjs/operators';
import { DataSource } from '../types';
import { fetchUrl } from '../helpers';
import { AutomationData } from '../../Automations/type';

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
            (res) => {
                console.log('fetch group', res);
            },
            (error) => {
                console.log(error);
            },
        ),
    );
};

/**
 * /DSWebAPI/api/automations
 * create new automation.
 * @param dataSources
 * @param object
 */
export const createNewAutomation = (
    dataSources: DataSource,
    payload: AutomationData
) => {
    const type = "DHI.Services.Jobs.Automations.Automation, DHI.Services.Jobs";

    if (payload.triggerCondition && payload.triggerCondition.triggers) {
        payload.triggerCondition.triggers = payload.triggerCondition.triggers.map((trigger) => {
            return {
                "$type": trigger.type,
                ...trigger
            };
        });
    }

    const body = {
        "$type": type,
        ...payload
    };

    return fetchUrl(`${dataSources.host}/DSWebAPI/api/automations`, {
        method: 'POST',
        additionalHeaders: {
            Authorization: `Bearer ${dataSources.token}`,
        },
        body: JSON.stringify(body)
    }).pipe(
        tap(
            (res) => {
                console.log('create automation', res);
            },
            (error) => {
                console.log(error);
            },
        ),
    );
};

/**
 * /DSWebAPI/api/automations
 * create new automation.
 * @param dataSources
 * @param object
 */
export const updateAutomation = (
    dataSources: DataSource,
    payload: AutomationData
) => {
    const type = "DHI.Services.Jobs.Automations.Automation, DHI.Services.Jobs";

    if (payload.triggerCondition && payload.triggerCondition.triggers) {
        payload.triggerCondition.triggers = payload.triggerCondition.triggers.map((trigger) => {
            return {
                "$type": trigger.type,
                ...trigger
            };
        });
    }

    const body = {
        "$type": type,
        ...payload
    };

    return fetchUrl(`${dataSources.host}/DSWebAPI/api/automations`, {
        method: 'PUT',
        additionalHeaders: {
            Authorization: `Bearer ${dataSources.token}`,
        },
        body: JSON.stringify(body)
    }).pipe(
        tap(
            (res) => {
                console.log('update automation', res);
            },
            (error) => {
                console.log(error);
            },
        ),
    );
};


/**
 * /api/scenarios/{connectionId}/{id}
 * Deletes the scenario with the specified identifier.
 * @param dataSource
 * @param id
 */
export const deleteAutomation = (dataSource: DataSource, id: string) => {
    const splitedId = id.split('/')
    return fetchUrl(`${dataSource.host}/DSWebAPI/api/automations/${splitedId[0]}|${splitedId[1]}`, {
        method: 'DELETE',
        additionalHeaders: {
            Authorization: `Bearer ${dataSource.token}`,
        },
    })
}

/**
 * /api/scalars/wf-scalars/{query}
 * Get the scalar with the specified group.
 * @param dataSource
 * @param id
 */
export const getScalarStatus = (dataSource: DataSource, query: string) => {
    return fetchUrl(`${dataSource.host}/DSWebAPI/api/scalars/${dataSource.connection}/Job Automator|${dataSource.host.split("//")[1].split("/")[0].toUpperCase()}|${query}`,
        {
            method: 'GET',
            additionalHeaders: {
                Authorization: `Bearer ${dataSource.token}`,
            },
        }).pipe(
            tap(
                (res) => {
                    console.log('get scalar', res);
                },
                (error) => {
                    console.log(error);
                },
            ),
        );
}