import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';

/**
 * @param {*} timeseries;
 *
 * Accepts the following format:
 * {
 *  timeseries/1/id: [["time", value], ["time", value], ["time", value]],
 *  timeseries/2/id: [["time", value], ["time", value], ["time", value]],
 * }
 *
 * Returns the following format:
 * [
 *  {
 *    id: timeseries/1/id,
 *    data: [["time", value], ["time", value], ["time", value]],
 *  },
 *  {
 *    id: timeseries/2/id,
 *    data: [["time", value], ["time", value], ["time", value]],
 *  },
 * ]
 *
 */
const formatValues = timeseries =>
  Object.keys(timeseries).map(tsId => ({
    id: tsId,
    data: timeseries[tsId],
  }));

const toDateTimeString = dateString =>
  dateString.replace(new RegExp(':', 'g'), '%3A').split('.')[0];

const toDateByFormat = (date, dateFormat) => {
  return date == 'Invalid Date' || isNaN(date)
    ? 'Date Not Avaliable'
    : format(date, dateFormat);
};

const populateLookup = (job, name) => {
  const lookup = {};
  for (var i = 0; i < job.length; i++) {
    let current = job[i][name];
    if (!(current in Object.keys(lookup))) {
      lookup[current] = `${current}`;
    }
  }
  return lookup;
};

const debounce = (delay, fn) => {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};

const hexToRGBA = (colorInHex, alpha) => {
  const hex = colorInHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const opacity = alpha / 100;

  const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

  return rgba;
};

const colorToRGB = color => {
  if (color.indexOf('rgb') > -1) {
    return {
      R: color
        .split('(')[1]
        .split(')')[0]
        .split(',')[0],
      G: color
        .split('(')[1]
        .split(')')[0]
        .split(',')[1],
      B: color
        .split('(')[1]
        .split(')')[0]
        .split(',')[2],
    };
  }

  return {
    R: parseInt(color.substring(1, 3), 16),
    G: parseInt(color.substring(3, 5), 16),
    B: parseInt(color.substring(5, 7), 16),
  };
};

const round = (value, decimals) => {
  if (decimals !== 0) {
    const multiplier = 10 ** decimals;
    return Math.round(value * multiplier) / multiplier;
  }

  return Math.round(value);
};

const passwordStrength = password => {
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
  if (
    password.match(
      /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/
    )
  ) {
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

const toArray = any => {
  if (!Array.isArray(any)) return [any];

  return any;
};

const isObjectEmpty = object => {
  if (object === null) {
    return true;
  }
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) return false;

  return true;
};

const isObject = object => {
  if (object === null || isEmpty(object) || typeof object !== 'object') {
    return false;
  }

  return true;
};

const getObjectProperty = (objectItem, property, compareValue) => {
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

const changeObjectProperty = (objectItem, property, intent) => {
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

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay != null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
      W;
    }
  }, [delay]);
};

const queryProp = query => {
  return typeof query == 'undefined' ? '' : query;
};

const toPascal = string => {
  let words = string.split(' ');
  words = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const rest = word.slice(1).toLowerCase();
    return firstLetter + rest;
  });

  return words.join(' ');
};

const toCamel = string => {
  let words = string.split(' ');
  words = words.map((word, i) => {
    const firstLetter =
      i === 0 ? word.charAt(0).toLowerCase() : word.charAt(0).toUpperCase();
    const rest = word.slice(1).toLowerCase();
    return firstLetter + rest;
  });

  return words.join(' ');
};

const uniqueId = () =>
  `${format(
    new Date(),
    'yyyyMMddhhmmss'
  )}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

const customApiCall = (
  host,
  api,
  pathParameters,
  method,
  bodyParameters,
  data
) => {
  const body = JSON.stringify(getApiBody(bodyParameters, data));
  return fetchUrl(`${host}/${api}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).pipe(tap(res => console.log('Successful api call!', res)));
};

export {
  formatValues,
  toDateTimeString,
  debounce,
  hexToRGBA,
  colorToRGB,
  round,
  passwordStrength,
  toArray,
  isObjectEmpty,
  getObjectProperty,
  changeObjectProperty,
  queryProp,
  uniqueId,
  useInterval,
  toDateByFormat,
  populateLookup,
  toPascal,
  toCamel,
  customApiCall,
};
