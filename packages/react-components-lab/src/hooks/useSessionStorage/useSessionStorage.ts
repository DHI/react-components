import { useState } from 'react';

function useSessionStorage<T>(
  key: string,
  initialValue?: T
): [T, (value: T) => void] {
  const [sessionValue, setsessionValue] = useState(() => {
    const item = window.sessionStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : initialValue;
  });

  const setValue = (value: T) => {
    setsessionValue(value);
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [sessionValue, setValue];
}

export default useSessionStorage;
