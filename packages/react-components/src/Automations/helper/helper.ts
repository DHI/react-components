import { useCallback, useState } from "react";

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