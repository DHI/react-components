import { format } from 'date-fns';
import { isObject } from 'lodash';

export const dataObjectToArray = (data: { [x: string]: any }) =>
  Object.keys(data).map(key => ({
    id: key,
    data: data[key],
  }));

export const getObjectProperty = (
  objectItem: any,
  property: string,
  compareValue?: any
) => {
  let valid = true;
  const properties = property != null ? property.split('.') : [];
  let value = objectItem;
  for (let i = 0; i < properties.length; i++) {
    if (properties[i].indexOf('!') >= 0) {
      valid = !valid;
      properties[i] = properties[i].replace('!', '');
    }
    value = isObject(objectItem) ? (objectItem as any)[properties[i]] : '';
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

export const changeObjectProperty = (
  objectItem: any,
  property: string,
  intent: any
) => {
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

export const queryProp = (query: any) => {
  return typeof query == 'undefined' ? '' : query;
};

export const uniqueId = () =>
  `${format(
    new Date(),
    'yyyyMMddhhmmss'
  )}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
