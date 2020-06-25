import { format } from 'date-fns';
import { isObject } from 'lodash';

export const dataObjectToArray = (data: { [x: string]: any }) => {
  return Object.keys(data).map((key) => ({
    id: key,
    data: data[key],
  }));
};

export const getObjectProperty = (objectItem: any, property: string, compareValue?: any) => {
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

export const changeObjectProperty = (objectItem: any, property: string, intent: any) => {
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
  return typeof query === 'undefined' ? '' : query;
};

export const uniqueId = () => `${format(new Date(), 'yyyyMMddhhmmss')}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

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
