import { tap } from 'rxjs/operators';
import { DataSource } from '../types';
import { fetchUrl } from '../helpers';
import { AutomationData } from '../../Automations/type';

/**
 * /api/automations/ids
 * Gets a list of group ids entries.
 * @param dataSources
 */
export const fetchGroupId = (dataSources: DataSource) => {
    return fetchUrl(`${dataSources.host}/api/automations/ids`, {
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
 * /api/automations
 * Gets a list of automations entries.
 * @param dataSources
 * @param group
 */
export const fetchListAutomations = (
    dataSources: DataSource,
    group: string
) => {
    return fetchUrl(`${dataSources.host}/api/automations/?group=${group}`, {
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
 * /api/automations
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

    return fetchUrl(`${dataSources.host}/api/automations`, {
        method: 'POST',
        additionalHeaders: {
            Authorization: `Bearer ${dataSources.token}`,
        },
        body: JSON.stringify(body)
    }).pipe(
        tap(
            (res) => {
                updateStatusAutomation(dataSources, {
                    id: payload.id,
                    flag: `${payload.isEnabled}`
                })
            },
            (error) => {
                console.log(error);
            },
        ),
    );
};

/**
 * /api/automations
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

    return fetchUrl(`${dataSources.host}/api/automations`, {
        method: 'PUT',
        additionalHeaders: {
            Authorization: `Bearer ${dataSources.token}`,
        },
        body: JSON.stringify(body)
    }).pipe(
        tap(
            (res) => {
                updateStatusAutomation(dataSources, {
                    id: payload.id,
                    flag: `${payload.isEnabled}`
                })
            },
            (error) => {
                console.log(error);
            },
        ),
    );
};

/**
 * /api/automations/enables
 * updates status automation.
 * @param dataSources
 * @param object
 */
export const updateStatusAutomation = (
    dataSources: DataSource,
    payload: {
        id: string,
        flag: string
    }
) => {

    return fetchUrl(`${dataSources.host}/api/automations/enable?id=${payload.id}&flag=${payload.flag}`, {
        method: 'POST',
        additionalHeaders: {
            Authorization: `Bearer ${dataSources.token}`,
        },
    }).pipe(
        tap(
            (res) => {
                console.log('update status automation', res);
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
    return fetchUrl(`${dataSource.host}/api/automations/${splitedId[0]}|${splitedId[1]}`, {
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
export const getScalarStatus = (dataSource: DataSource) => {
    const group = `Job Automator|${dataSource.host.split("//")[1].split("/")[0].split(':')[0].toUpperCase()}`

    return fetchUrl(`${dataSource.host}/api/scalars/${dataSource.connection}?group=${group}`,
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

/**
 * /api/jobs/{connectionId}/{id}
 * Gets the job with the specified identifier.
 * @param dataSource
 * @param token
 * @param id
 */
export const fetchJob = (dataSource: DataSource, id: string) =>
    fetchUrl(`${dataSource.host}/api/jobs/${dataSource.connectionJobLog}/${id}`, {
        method: 'GET',
        additionalHeaders: {
            Authorization: `Bearer ${dataSource.token}`,
        },
    }).pipe(tap((res) => console.log('job fetched executed', res)));