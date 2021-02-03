import { addHours, differenceInMinutes, parseISO } from 'date-fns';
import { format, toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import jp from 'jsonpath';
import { isArray } from 'lodash';
import { Condition, DescriptionField, Scenario, Status } from '../Scenarios/types';

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

const setObjectProperty = (objectItem: any, property: string, newValue: any) => {
  // Use jsonpath to apply in a deep path approach
  jp.apply(objectItem, `$.${property}`, () => newValue);
};

const trimRecursive = (obj) => {
  for (const k in obj) {
    if (typeof obj[k] === 'string') obj[k] = obj[k].trim();
    else if (typeof obj[k] === 'object' && !(obj[k] instanceof Array)) trimRecursive(obj[k]);
  }

  return obj;
};

const getDescriptions = (
  scenarioData: Scenario,
  descriptionFields: DescriptionField[] | undefined,
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

const checkCondition = (scenarioData: Scenario, condition: Condition) => {
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

const checkStatus = (scenario: Scenario, status: Status[]) => {
  const scenarioStatus = getObjectProperty(scenario, 'lastJobStatus');
  const progress = Number(getObjectProperty(scenario, 'lastJobProgress'));

  const currentStatus = {
    ...status.find((s) => s.name === scenarioStatus),
    progress: scenarioStatus === 'InProgress' ? progress : 0,
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
    score += 3;
  }

  // At least one upper case letter
  if (password.match(/[A-Z]/)) {
    score += 6;
  }

  // At least one number
  if (password.match(/\d+/)) {
    score += 6;
  }

  // At least three numbers
  if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
    score += 6;
  }

  // At least one special character
  if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
    score += 6;
  }

  // Aat least two special characters
  if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
    score += 8;
  }

  // Combinations both upper and lower case
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    score += 5;
  }

  // Both letters and numbers
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
    score += 5;
  }

  // Letters, numbers, and special characters
  if (password.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
    score += 5;
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

  if (score > 45) {
    return 4;
  }

  return 0;
};

const calcTimeDifference = (beginDate: string, endDate: string) => {
  const difference = differenceInMinutes(new Date(endDate), new Date(beginDate));
  const hour = Math.floor(difference / 60);
  const minute = Math.floor(difference - hour * 60);

  if (hour === 0 && minute === 0) {
    return `<1m`;
  } else if (isNaN(difference)) {
    return '';
  } else {
    return `${hour}h ${minute}m`;
  }
};

/**
 * Convert and format data to from UTC to Zoned Time
 * @param date Date and Time
 * @param timeZone 'Australia/Brisbane'
 * @param dateTimeFormat 'Date time format. 'yyyy-MM-dd HH:mm:ss'
 */
const zonedTimeFromUTC = (date, timeZone, dateTimeFormat) =>
  format(utcToZonedTime(date.replace('T', ' '), timeZone), dateTimeFormat);

/**
 * Function to convert to local time.
 * @param date 2021-02-03T17:11:13.415297
 * @param timeZone 'Australia/Brisbane'
 * @param dateTimeFormat Date time format. 'yyyy-MM-dd HH:mm:ss'
 */
const convertLocalTime = (date, timeZone, dateTimeFormat) => format(zonedTimeToUtc(date, timeZone), dateTimeFormat);

/**
 * Function to convert to local time on the Job List component
 * when the page is refreshed with some updates from Signal R.
 * @param time for example: 2021-02-03T17:11:13.415297
 * @param dateTimeFormat Date time format. 'yyyy-MM-dd HH:mm:ss'
 */
const convertServerTimeToLocalTime = (time, dateTimeFormat) => {
  const timeConvertedToSydneyUTC = zonedTimeToUtc(time, 'Australia/Sydney');

  return format(timeConvertedToSydneyUTC, dateTimeFormat);
};

/**
 * This the current utc time possibly offset by a number of hours. The returned string is without time zone
 * @param offsetHours An optional number of hours to offset the time
 */
const utcNow = (offsetHours?: number | null) =>
  format(addHours(utcToZonedTime(new Date(), 'UTC'), offsetHours == null ? 0 : offsetHours), 'yyyy-MM-dd HH:mm:ss');

/**
 * This converts the date provided in a specific IANA time zone to UTC
 * @param date The date in a time zone to convert. No time zone provided
 * @param timeZone The time zone its in
 */
const tzToUtc = (date: string | Date, timeZone: string) =>
  date
    ? format(utcToZonedTime(toDate(date, { timeZone }), 'UTC'), 'yyyy-MM-dd HH:mm:ss')
    : format(utcToZonedTime(toDate(utcNow(), { timeZone }), 'UTC'), 'yyyy-MM-dd HH:mm:ss');

const toISOLocal = (d: Date) => {
  const z = (n) => `0${n}`.slice(-2);
  const zz = (n) => `00${n}`.slice(-3);
  let off = d.getTimezoneOffset();
  off = Math.abs(off);

  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}:${z(
    d.getSeconds(),
  )}.${zz(d.getMilliseconds())}`;
};

export {
  dataObjectToArray,
  getObjectProperty,
  setObjectProperty,
  getDescriptions,
  trimRecursive,
  changeObjectProperty,
  checkCondition,
  checkStatus,
  utcToTz,
  queryProp,
  uniqueId,
  calcTimeDifference,
  zonedTimeFromUTC,
  convertLocalTime,
  tzToUtc,
  toISOLocal,
  convertServerTimeToLocalTime,
};
