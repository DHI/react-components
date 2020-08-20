import { getObjectProperty, utcToTz } from '..';
import { parseISO, format } from 'date-fns';
import { isArray } from 'lodash';
import { ScenarioOld, DescriptionFieldOld, ConditionOld, StatusOld } from './types';

const getDescriptions = (
  scenarioData: ScenarioOld,
  descriptionFields: DescriptionFieldOld[] | undefined,
  timeZone: string | undefined,
) => {
  const descriptions: { name: string; value: any }[] = [];

  if (!descriptionFields) {
    return descriptions;
  }

  for (const field of descriptionFields) {
    const value = getObjectProperty(scenarioData, field.field);

    // if (!value) {
    //   console.warn(`Could not find field reference: ${field.field}!`);
    //   continue;
    // }

    // Check if valid conditions met
    if (!field.condition || checkCondition(scenarioData, field.condition)) {
      // Formatting
      let formattedValue = value;

      // Formatting if date/time type
      if (value && field.dataType === 'dateTime') {
        let date: Date = parseISO(value);

        if (timeZone) {
          date = utcToTz(value, timeZone);
        }

        formattedValue = format(date, field.format ? field.format : 'yyyy-MM-dd HH:mm:ss');
      }

      descriptions.push({
        name: field.name,
        value: formattedValue,
      });
    }
  }

  return descriptions;
};

const checkCondition = (scenarioData: ScenarioOld, condition: ConditionOld) => {
  let conditions: string[] = [];
  let isInverse = false;

  if (condition) {
    if (condition!.field.indexOf('!') === 0) {
      isInverse = true;
    }

    // If we have a value, check that it matches
    // If we didn't specify a value, just want to check if this field has data or not
    if (condition.value) {
      if (isArray(condition.value)) {
        conditions = [...condition.value];
      } else {
        conditions = [condition.value!];
      }

      return conditions.indexOf(getObjectProperty(scenarioData, condition!.field.replace('!', ''))) >= 0 === !isInverse;
    } else {
      return (getObjectProperty(scenarioData, condition!.field.replace('!', '')) != null) === !isInverse;
    }
  } else {
    return true;
  }
};

const checkStatus = (scenario: ScenarioOld, status: StatusOld[]) => {
  const scenarioStatus = getObjectProperty(scenario, 'lastJobStatus');
  const progress = Number(getObjectProperty(scenario, 'lastJobProgress'));

  const currentStatus = {
    ...status.find((s) => s.name === scenarioStatus),
    progress,
  };

  let result;

  if (!scenarioStatus) {
    result = {
      color: 'red',
      message: 'Unknown Status Field',
    };
  } else {
    result = currentStatus;
  }

  return result;
};

export { getDescriptions, checkCondition, checkStatus };
