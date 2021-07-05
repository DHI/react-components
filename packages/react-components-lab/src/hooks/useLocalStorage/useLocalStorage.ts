import { useState } from 'react';
import { HookTypes } from './types';

export default ({
  key,
  initialValue,
}: HookTypes): [unknown, (value: unknown) => void] => {
  const [storageValue, setStorageValue] = useState(() => {
    const item = window.localStorage.getItem(key);

    return item ? String(JSON.parse(item)) : initialValue;
  });

  const setValue = (value: unknown) => {
    setStorageValue(String(value));
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storageValue, setValue];
};
