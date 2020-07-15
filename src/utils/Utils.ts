import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import jp from 'jsonpath';
import { isArray } from 'lodash';
import { DescriptionField, ICondition, IScenario, IStatus } from '../Scenarios/types';

const dataObjectToArray = (data: { [x: string]: any }) => {
  return Object.keys(data).map((key) => ({
    id: key,
    data: data[key],
  }));
};

const getObjectProperty = (objectItem: any, property: string): any => {
  const value = jp.query(objectItem, property);

  return value.length > 0 ? value[0] : null;
};

const getDescriptions = (
  scenarioData: IScenario,
  descriptionFields: DescriptionField[] | undefined,
  timeZone: string | undefined,
) => {
  const descriptions: { name: string; value: any }[] = [];

  if (!descriptionFields) {
    return descriptions;
  }

  for (const field of descriptionFields) {
    const value = getObjectProperty(scenarioData, field.field);

    if (!value) {
      console.warn(`Could not find field reference: ${field.field}!`);
      continue;
    }

    // Check if valid conditions met
    if (!field.condition || checkCondition(scenarioData, field.condition)) {
      // Formatting
      let formattedValue = value;

      // Formatting if date/time type
      if (field.dataType === 'dateTime') {
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

const checkCondition = (scenarioData: IScenario, condition: ICondition) => {
  let conditions: string[] = [];
  let isInverse = false;

  if (condition) {
    if (condition!.field.indexOf('!') === 0) {
      isInverse = true;
    }

    if (isArray(condition.value)) {
      conditions = [...condition.value];
    } else {
      conditions = [condition.value!];
    }
  }

  return conditions.indexOf(getObjectProperty(scenarioData, condition!.field.replace('!', ''))) >= 0 === !isInverse;
};

const changeObjectProperty = (objectItem: any, property: string, intent: any) => {
  const properties = property.split('.');
  let value = objectItem;
  const body = [value];

  for (let i = 0; i < properties.length; i++) {
    value = value[properties[i]];
    body.push(value);
  }
  body[properties.length] = intent;
  for (let j = properties.length; j > 0; j--) {
    body[j - 1][properties[j - 1]] = body[j];
  }

  return body[0];
};

const checkStatus = (scenario: IScenario, status: IStatus[]) => {
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

/**
 * This converts the date provided to a specific IANA time zone
 * @param date The UTC date to convert. No time zone provided
 * @param timeZone The time zone to convert it to
 */
const utcToTz = (date: string, timeZone: string) => utcToZonedTime(`${date}Z`, timeZone);

const queryProp = (query: any) => {
  return typeof query === 'undefined' ? '' : query;
};

const uniqueId = () => `${format(new Date(), 'yyyyMMddhhmmss')}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const passwordStrength = (password?: string) => {
  let score = 0;

  if (!password) {
    return 0;
  }

  // Length 4 or less
  if (password.length < 5) {
    score += 3;
    // Length between 5 and 7
  } else if (password.length < 8) {
    score += 6;
    // Length between 8 and 15
  } else if (password.length < 16) {
    score += 12;
    // Length 16 or more
  } else {
    score += 18;
  }

  // At least one lower case letter
  if (password.match(/[a-z]/)) {
    score += 1;
  }

  // At least one upper case letter
  if (password.match(/[A-Z]/)) {
    score += 5;
  }

  // At least one number
  if (password.match(/\d+/)) {
    score += 5;
  }

  // At least three numbers
  if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
    score += 5;
  }

  // At least one special character
  if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
    score += 5;
  }

  // Aat least two special characters
  if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
    score += 5;
  }

  // Combinations both upper and lower case
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    score += 2;
  }

  // Both letters and numbers
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
    score += 2;
  }

  // Letters, numbers, and special characters
  if (password.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
    score += 2;
  }

  if (score < 16) {
    return 0;
  }

  if (score < 25) {
    return 1;
  }

  if (score < 35) {
    return 2;
  }

  if (score < 45) {
    return 3;
  }

  return 0;
};

export {
  dataObjectToArray,
  getObjectProperty,
  getDescriptions,
  changeObjectProperty,
  checkCondition,
  checkStatus,
  utcToTz,
  queryProp,
  uniqueId,
};
