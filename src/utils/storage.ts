export enum STORAGE_TYPES {
  LOCAL = "local",
  SESSION = "session",
  COOKIE = "cookie",
}

enum StorageAction {
  GET = "get",
  SET = "set",
  REMOVE = "remove",
  CLEAR = "clear",
}

const isLocalStorageFullForKey = (
  key: string,
  value: string
) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    if (
      e instanceof DOMException &&
      e.name === "QuotaExceededError"
    ) {
      //TODO handle quota exceeded error
      return true;
    }
  }
  return false;
};
const isLocalStorageAvailable = () => {
  if (!("localStorage" in window)) {
    //TODO catch via sentry
    return false;
  }
  try {
    localStorage.setItem("test_key", "test_value");
    localStorage.removeItem("test_key");
    return true;
  } catch (e) {
    if (
      e instanceof DOMException &&
      e.name === "SecurityError"
    ) {
      //TODO handle security error
      return false;
    }
    //TODO catch via sentry
    return false;
  }
};
const isLocalStorageAvailableForAction = (
  action: StorageAction,
  key: string,
  value?: string
) => {
  let isAvailabe;
  if (action === StorageAction.SET) {
    if (isLocalStorageAvailable()) {
      if (isLocalStorageFullForKey(key, value ?? "")) {
        isAvailabe = false;
      } else {
        isAvailabe = true;
      }
    } else {
      isAvailabe = false;
    }
  } else {
    isAvailabe = isLocalStorageAvailable();
  }
  return isAvailabe;
};
const isSessionStorageFullForKey = (
  key: string,
  value: string
) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    if (
      e instanceof DOMException &&
      e.name === "QuotaExceededError"
    ) {
      //TODO handle quota exceeded error
      return true;
    }
  }
  return false;
};
const isSessionStorageAvailable = () => {
  if (!("sessionStorage" in window)) {
    //TODO catch via sentry
    return false;
  }
  try {
    sessionStorage.setItem("test_key", "test_value");
    sessionStorage.removeItem("test_key");
    return true;
  } catch (e) {
    if (
      e instanceof DOMException &&
      e.name === "QuotaExceededError"
    ) {
      //TODO handle quota exceeded error
      return true;
    }
    if (
      e instanceof DOMException &&
      e.name === "SecurityError"
    ) {
      //TODO handle security error
      return false;
    }
    //TODO catch via sentry
    return false;
  }
};
const isSessionStorageAvailableForAction = (
  action: StorageAction,
  key: string,
  value?: string
) => {
  let isAvailabe;
  if (action === StorageAction.SET) {
    if (isSessionStorageAvailable()) {
      if (isSessionStorageFullForKey(key, value ?? "")) {
        isAvailabe = false;
      } else {
        isAvailabe = true;
      }
    } else {
      isAvailabe = false;
    }
  } else {
    isAvailabe = isSessionStorageAvailable();
  }
  return isAvailabe;
};
const isCookieStorageAvailable = () => {
  try {
    //TODO implement cookie storage
    return true;
  } catch {
    //TODO catch via sentry
    return false;
  }
};
const handleLocalStorage = (
  key: string,
  type: StorageAction,
  value?: string,
  shouldFallback?: boolean
) => {
  if (isLocalStorageAvailableForAction(type, key, value)) {
    switch (type) {
      case StorageAction.GET:
        localStorage.getItem(key);
        break;
      case StorageAction.SET:
        localStorage.setItem(key, value ?? "");
        break;
      case StorageAction.REMOVE:
        localStorage.removeItem(key);
        break;
      case StorageAction.CLEAR:
        localStorage.clear();
        break;
    }
  } else if (shouldFallback) {
    if (isSessionStorageAvailable()) {
      handleSessionStorage(key, type, value, false);
      return;
    } else if (isCookieStorageAvailable()) {
      handleCookieStorage(key, type, value, false);
      return;
    } else {
      //TODO catch via sentry
      return;
    }
  }
  return;
};
const handleSessionStorage = (
  key: string,
  type: StorageAction,
  value?: string,
  shouldFallback?: boolean
) => {
  if (
    isSessionStorageAvailableForAction(type, key, value)
  ) {
    switch (type) {
      case StorageAction.GET:
        sessionStorage.getItem(key);
        break;
      case StorageAction.SET:
        sessionStorage.setItem(key, value ?? "");
        break;
      case StorageAction.REMOVE:
        sessionStorage.removeItem(key);
        break;
      case StorageAction.CLEAR:
        sessionStorage.clear();
        break;
    }
  } else if (shouldFallback) {
    if (isLocalStorageAvailable()) {
      handleLocalStorage(key, type, value, false);
      return;
    } else if (isCookieStorageAvailable()) {
      handleCookieStorage(key, type, value, false);
      return;
    } else {
      //TODO catch via sentry
      return;
    }
  }
  return;
};
const handleCookieStorage = (
  key: string,
  type: StorageAction,
  value?: string,
  shouldFallback?: boolean
) => {
  if (isCookieStorageAvailable()) {
    //TODO implement cookie storage
  } else if (shouldFallback) {
    if (isLocalStorageAvailable()) {
      handleLocalStorage(key, type, value, false);
      return;
    } else if (isSessionStorageAvailable()) {
      handleSessionStorage(key, type, value, false);
      return;
    } else {
      //TODO catch via sentry
      return;
    }
  }
  return;
};
const getStorageItem = (
  key: string,
  type: STORAGE_TYPES,
  shouldFallback = false
) => {
  switch (type) {
    case STORAGE_TYPES.LOCAL: {
      handleLocalStorage(
        key,
        StorageAction.GET,
        undefined,
        shouldFallback
      );
      return;
    }
    case STORAGE_TYPES.SESSION: {
      handleSessionStorage(
        key,
        StorageAction.GET,
        undefined,
        shouldFallback
      );
      return;
    }
    case STORAGE_TYPES.COOKIE: {
      handleCookieStorage(
        key,
        StorageAction.GET,
        undefined,
        shouldFallback
      );
      return;
    }
  }
};

const setStorageItem = (
  key: string,
  value: string,
  storageType: STORAGE_TYPES,
  shouldFallback = false
) => {
  switch (storageType) {
    case STORAGE_TYPES.LOCAL: {
      handleLocalStorage(
        key,
        StorageAction.SET,
        value,
        shouldFallback
      );
      return;
    }
    case STORAGE_TYPES.SESSION: {
      handleSessionStorage(
        key,
        StorageAction.SET,
        value,
        shouldFallback
      );
      return;
    }
    case STORAGE_TYPES.COOKIE: {
      handleCookieStorage(
        key,
        StorageAction.SET,
        value,
        shouldFallback
      );
      return;
    }
  }
};

const removeStorageItem = (
  key: string,
  storageType: STORAGE_TYPES,
  shouldFallback = false
) => {
  switch (storageType) {
    case STORAGE_TYPES.LOCAL: {
      handleLocalStorage(
        key,
        StorageAction.REMOVE,
        undefined,
        shouldFallback
      );
      return;
    }
    case STORAGE_TYPES.SESSION: {
      handleSessionStorage(
        key,
        StorageAction.REMOVE,
        undefined,
        shouldFallback
      );
      return;
    }
    case STORAGE_TYPES.COOKIE: {
      handleCookieStorage(
        key,
        StorageAction.REMOVE,
        undefined,
        shouldFallback
      );
      return;
    }
  }
};

const clearStorage = (
  storageType: STORAGE_TYPES,
  shouldFallback = false
) => {
  switch (storageType) {
    case STORAGE_TYPES.LOCAL: {
      handleLocalStorage(
        "",
        StorageAction.CLEAR,
        undefined,
        shouldFallback
      );
      return;
    }
    case STORAGE_TYPES.SESSION: {
      handleSessionStorage(
        "",
        StorageAction.CLEAR,
        undefined,
        shouldFallback
      );
      return;
    }
    case STORAGE_TYPES.COOKIE: {
      handleCookieStorage(
        "",
        StorageAction.CLEAR,
        undefined,
        shouldFallback
      );
      return;
    }
  }
};
export {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
};
