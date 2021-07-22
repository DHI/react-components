import { useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, (value: T) => void] {
  const [storageValue, setStorageValue] = useState(() => {
    const item = window.localStorage.getItem(key);

    return item ? ((String(JSON.parse(item)) as unknown) as T) : initialValue;
  });

  const setValue = (value: T) => {
    setStorageValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storageValue, setValue];
}

export default useLocalStorage;
