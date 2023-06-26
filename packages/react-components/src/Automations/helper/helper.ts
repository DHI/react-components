import { useCallback, useState } from "react";
import { fetchJob } from "../../api/Automations/AutomationApi";
import { AutomationData } from "../type";

export const applyConditionStatus = (conditionStatusMap: Map<string, boolean>, automation: AutomationData) => {
    if (conditionStatusMap.has(automation.id!)) {
        automation.triggerCondition.isMet = conditionStatusMap.get(automation.id!);
    }
    if (automation.isEnabled === false) {
        automation.currentStatus = 'Not Running';
        automation.requested = 'Not Running';
    }
}

export const applyLastJobIdStatus = async (lastJobIdMap: Map<string, any>, dataSources: any, automation: AutomationData) => {
    if (lastJobIdMap.has(automation.id!)) {
        try {
            const job = await fetchJob(dataSources, lastJobIdMap.get(automation.id!)).toPromise();
            automation.currentStatus = job.status;
            automation.requested = job.requested;
        } catch (error) {
            automation.currentStatus = 'Error';
            automation.requested = 'Not Found';
        }
    } else {
        automation.currentStatus = 'Not Running';
        automation.requested = 'Not Running';
    }
}

export const applyTriggerStatus = (triggerStatusMap: Map<string, boolean>, automation: AutomationData) => {
    for (let trigger of automation.triggerCondition.triggers) {
        const triggerKey = automation.id + '/' + trigger.id;
        if (triggerStatusMap.has(triggerKey)) {
            trigger.isMet = triggerStatusMap.get(triggerKey)!
        }
    }
}

export const processScalarStatus = (scalarStatus) => {
    const triggerStatusMap = new Map();
    const conditionStatusMap = new Map();
    const lastJobIdMap = new Map();

    for (let scalar of scalarStatus) {
        const parts = scalar.fullName.split('/');
        const id = parts[2] + '/' + parts[3];

        if (parts[4] === "Is Met") {
            conditionStatusMap.set(id, scalar.value === "True");
        } else if (parts[4] === "Last Job Id") {
            lastJobIdMap.set(id, scalar.value)
        } else {
            const triggerId = parts[4];
            triggerStatusMap.set(id + '/' + triggerId, scalar.value === "True");
        }
    }
    console.log('condition', conditionStatusMap)
    console.log('lastJobid', lastJobIdMap)
    console.log('trigger', triggerStatusMap)
    return { conditionStatusMap, lastJobIdMap, triggerStatusMap };
}

export function useForm(initialValues, initialErrors) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);

    const setError = useCallback((object, name, type, value) => {
        return {
            ...object,
            [name]: type === 'checkbox' ? value : !value,
        };
    }, []);

    const handleChange = useCallback((event) => {
        const { name, type, value, checked } = event.target;

        setValues(prevValues => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));

        setErrors(prevValues => setError(prevValues, `${name}Error`, type, value));
    }, [setError]);

    return { values, setValues, errors, handleChange, setErrors };
}