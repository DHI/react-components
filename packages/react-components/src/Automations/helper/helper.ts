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

export const getFilterExtensions = () => {
    return [{
        columnName: 'isEnabled',
        predicate: (value, filter, row) => {
            if (filter && filter.value) {
                let filterValue = filter.value.toLowerCase();
                if (value && 'yes'.includes(filterValue)) {
                    return true;
                }
                if (!value && 'no'.includes(filterValue)) {
                    return true;
                }
            }
            return false;
        }
    }];
};


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