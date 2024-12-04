import { useState, useEffect, useCallback } from 'react';
import safeLocalStorage from '../safeLocalStorage/index';

const useLocalStorageValue = <T>(
  key: string,
): [T | null, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    const item = safeLocalStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  });

  const setValue = useCallback(
    (value: T) => {
      const valueString = JSON.stringify(value);
      safeLocalStorage.setItem(key, valueString);
      setStoredValue(value);
    },
    [key],
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const item = safeLocalStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorageValue;