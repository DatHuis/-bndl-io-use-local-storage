type SafeStorageAPI = {
  /** @private */
  __storage: any;
  /** Sets a value in local storage or fallback global */
  setItem: (key: string, value: string) => void;
  /** Get the value for this key */
  getItem: (key: string) => string | null;
  /** Removes an item from local storage */
  removeItem: (key: string) => void;
  /** Clears the entire local storage, when available */
  clear: () => void;
};

const TEST_KEY = '___local_storage_test_key__';

const canAccessLocalStorage = (): boolean => {
  try {
    // Check if window is defined
    if (window && 'localStorage' in window) {
      // Set a test key in local storage
      window.localStorage.setItem(TEST_KEY, 'true');
      // Get the test key from local storage
      const item = window.localStorage.getItem(TEST_KEY);
      if (!item) return false;

      window.localStorage.removeItem(TEST_KEY);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

const mockedLocalStorage: SafeStorageAPI = {
  __storage: {},
  clear() {
    this.__storage = {};
  },
  setItem(key, value) {
    this.__storage[key] = value;
  },
  getItem(key) {
    return this.__storage[key];
  },
  removeItem(key) {
    delete this.__storage[key];
  },
};

export const safeLocalStorage = canAccessLocalStorage()
  ? window.localStorage
  : mockedLocalStorage;

export default safeLocalStorage;
