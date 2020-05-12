import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { groupBy, sortBy, isEmpty, isFunction, isObject } from 'lodash';
import { format, parseISO } from 'date-fns';
//import { getObjectProperty } from '@dhi/utils';
import { ScenarioItem } from './ScenarioItem';

const styles = createStyles({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        marginTop: '30px',
    },
    content: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft: '30px',
    },
    dateBlock: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    dateArea: {
        alignSelf: 'flex-start',
        flexDirection: 'column',
        marginTop: '-33px',
        marginBottom: '-33px',
    },
    dayText: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: 'gray',
    },
    textFields: {
        fontSize: '12px',
        color: 'gray',
    },
    divider: {
        marginLeft: '30px',
        borderTop: '1px solid #c9c9c9',
    },
    listItem: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft: '30px',
        '&:hover': {
            cursor: 'pointer',
            background: '#ebebeb',
        },
    },
    selectedItem: {
        background: '#e8e8e8',
    },
});

interface IScenarioItemProps {
    classes: any;
    functions: any;
    menuItems: {
        name: string,
        field: string,
        condition:
        {
            field: string,
            value: string
        }
    }[];
    scenarios: {
        Id: string,
        Name: string,
        JobStatus: string,
        DateTime: string,
        MaxDepth: number,
        LossCurve: string,
        Progress: number
    }[];
    idField: string;
    nameField: string;
    dateField: string;
    descriptionFields: {
        field: string,
        name: string,
        condition: {
            field: string,
            value: string,
        }
    }[];
    showDate: boolean;
    showHour: boolean;
    showMenu: boolean;
    showStatus: boolean;
    onSelectScenario: any;
    selectedScenarioId: string;
    status: {
        name: string,
        color: string,
        message: string
    }[];
}

const ScenariosList: FC<IScenarioItemProps> = (propData: IScenarioItemProps) => {
    const [groupedScenarios, setGroupedScenarios] = useState(Object);
    const [selectedId, setSelectedId] = useState(propData.selectedScenarioId);

    useEffect(() => {
        groupScenarios(propData.scenarios)
    });

    const getObjectProperty = (objectItem: any, property: string, compareValue?: any) => {
        let valid = true;
        const properties = property.split('.');
        let value = objectItem;
        for (let i = 0; i < properties.length; i++) {
            if (properties[i].indexOf('!') >= 0) {
                valid = !valid;
                properties[i] = properties[i].replace('!', '');
            }
            value = isObject(value) ? value[properties[i]] : null;
        }
        if (compareValue) {
            if (typeof compareValue === 'object') {
                for (let i = 0; i < compareValue.length; i++) {
                    if (value === compareValue[i]) {
                        return valid;
                    }
                }
                return !valid;
            }
            return valid ? value === compareValue : !(value === compareValue);
        }
        return valid ? value : !value;
    };

    function groupScenarios(scenarios: any) {
        // group scenarios in an object with the date as key
        const _groupedScenarios =
            propData.showHour || propData.showDate
                ? groupBy(scenarios, scenario =>
                    format(
                        propData.dateField ? parseISO(getObjectProperty(scenario, propData.dateField)) : parseISO(scenario.DateTime),
                        'yyyy-MM-dd',
                    ),
                )
                : groupBy(scenarios, scenario => getObjectProperty(scenario, propData.idField));
        setGroupedScenarios(_groupedScenarios);
    };

    const buildMenu = (scenario: any) => {
        return propData.menuItems.filter(menuItem => (checkEnabled(scenario, menuItem.condition) ? menuItem : null));
    };

    const checkEnabled = (scenario: any, condition: any) => {
        if (!isEmpty(scenario)) {
            if (condition) {
                const check =
                    typeof condition === 'object'
                        ? getObjectProperty(scenario, condition.field, condition.value)
                        : getObjectProperty(scenario, condition);
                return check;
            }
            return true;
        }
        return false;
    };

    const checkStatus = (scenario: any) => {
        const scenarioStatus = getObjectProperty(scenario, 'lastJobStatus');
        const progress = getObjectProperty(scenario, 'lastJobProgress');

        let currentStatus = {};
        propData.status.map(obj => {
            if (obj.name === scenarioStatus) {
                currentStatus = {
                    ...obj,
                    progress,
                };
            }
        });

        let result;
        if (scenarioStatus === undefined) {
            result = {
                color: 'red',
                message: 'Unknown Status Field',
            };
        } else if (currentStatus === null) {
            result = {
                color: 'red',
                message: 'Unknown Status',
            };
        } else {
            result = currentStatus;
        }

        return result;
    };

    const createDescriptionObject = (scenario: any, descriptionFields: any) => {
        const descriptionObject = {
            name: String,
            value: String
        };
        const descriptionArray = [descriptionObject];
        for (let i = 0; i < descriptionFields.length; i++) {
            if (descriptionFields[i].condition) {
                if (typeof descriptionFields[i].condition === 'object') {
                    const condtion = getObjectProperty(
                        scenario,
                        descriptionFields[i].condition.field,
                        descriptionFields[i].condition.value,
                    );
                    if (condtion) {
                        descriptionObject.name = descriptionFields[i].name;
                        descriptionObject.value = getObjectProperty(scenario, descriptionFields[i].field);
                        descriptionArray.push(descriptionObject);
                        continue;
                    }
                }
                if (getObjectProperty(scenario, descriptionFields[i].field, descriptionFields[i].condition)) {
                    descriptionObject.name = descriptionFields[i].name;
                    descriptionObject.value = getObjectProperty(scenario, descriptionFields[i].field);
                    descriptionArray.push(descriptionObject);
                    continue;
                }
            } else {
                descriptionObject.name = descriptionFields[i].name;
                descriptionObject.value = getObjectProperty(scenario, descriptionFields[i].field);
                descriptionArray.push(descriptionObject);
            }
        }
        return descriptionArray;
    };

    const buildScenariosList = (scenarios: any) => {
        return sortBy(scenarios, [propData.dateField])
            .reverse()
            .map(scenario => (
                <div
                    key={scenario.id}
                    onClick={onScenarioClick.bind(scenario)}
                    onKeyPress={onScenarioClick.bind(scenario)}
                    role="presentation"
                    className={classNames(propData.classes.listItem, {
                        [propData.classes.selectedItem]: selectedId === getObjectProperty(scenario, propData.idField),
                    })}
                >
                    <ScenarioItem
                        classes={propData.classes.content}
                        name={getObjectProperty(scenario, propData.nameField)}
                        description={createDescriptionObject(scenario, propData.descriptionFields)}
                        date={propData.showDate ? getObjectProperty(scenario, propData.dateField) : null}
                        key={scenario.id}
                        isSelected={selectedId === getObjectProperty(scenario, propData.idField)}
                        functions={propData.functions}
                        menu={buildMenu(scenario)}
                        showHour={propData.showHour}
                        showMenu={propData.showMenu}
                        showStatus={propData.showStatus}
                        scenario={scenario}
                        status={checkStatus(scenario)}
                    />
                </div>
            ));
    };

    const buildDateArea = (date: string) => {
        const dateObject = {
            day: format(parseISO(date), 'dd'),
            dayName: format(parseISO(date), 'EEE'),
            monthName: format(parseISO(date), 'MMM'),
        };
        const dateBlockwidth = propData.showHour ? '97px' : '39px';
        return (
            <div className={propData.classes.dateBlock} style={{ width: dateBlockwidth }}>
                <div className={propData.classes.dateArea}>
                    <div className={propData.classes.dayText}>{dateObject.day}</div>
                    <div className={propData.classes.textFields}>{dateObject.monthName}</div>
                    <div className={propData.classes.textFields}>{dateObject.dayName}</div>
                </div>
            </div>
        );
    };

    const onScenarioClick = (scenario: any) => {
        if (scenario && selectedId !== getObjectProperty(scenario, propData.idField)) {
            setSelectedId(getObjectProperty(scenario, propData.idField));
            if (isFunction(propData.onSelectScenario)) {
                propData.onSelectScenario(scenario);
            }
        }
    };

    const getSelectedClass = (scenario: any, selected: any) => {
        if (!scenario || !selected || isEmpty(selected)) {
            return '';
        }

        return getObjectProperty(scenario, propData.idField) === getObjectProperty(selected, propData.idField)
            ? ' selected'
            : '';
    };


    return (
        <div className={propData.classes.root}>
            {Object.keys(groupedScenarios)
                .sort()
                .reverse()
                .map(key => (
                    <div key={key}>
                        {propData.showDate && buildDateArea(key)}
                        <div>
                            {buildScenariosList(groupedScenarios[key])}
                            <Divider variant="inset" className={propData.classes.divider} />
                        </div>
                    </div>
                ))}
        </div>
    );
}

ScenariosList.defaultProps = {
    idField: 'id',
    nameField: 'name',
    dateField: 'dateTime',
    showDate: false,
    showHour: false,
    showMenu: false,
    showStatus: false,
    selectedScenarioId: '',
    status: [
        {
            name: 'Pending',
            color: 'orange',
            message: 'Pending',
        },
        {
            name: 'InProgress',
            color: 'orange',
            message: 'Running',
        },
        {
            name: 'ReadyToInitiate',
            color: 'red',
            message: 'Ready',
        },
        {
            name: 'Completed',
            color: 'green',
            message: 'Completed',
        },
        {
            name: 'Error',
            color: 'black',
            message: 'Error',
        },
        {
            name: 'Default',
            color: 'red',
            message: 'Unknown',
        },
    ],
};

export { ScenariosList };

export default withStyles(styles)(ScenariosList);
