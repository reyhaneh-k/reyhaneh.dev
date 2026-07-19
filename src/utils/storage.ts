/**
 * Web storage helpers (local / session) with optional cross-backend fallback.
 * Cookie helpers are exported separately via `handleCookieStorage`.
 */

/** Backends exposed by the public `webStorage` API. */
export enum STORAGE_TYPES {
  LOCAL = "local",
  SESSION = "session",
}

/** Internal CRUD action dispatched to a storage backend. */
enum StorageAction {
  GET = "get",
  SET = "set",
  REMOVE = "remove",
  CLEAR = "clear",
}

interface StorageOptions {
  /** When the primary backend fails, try the alternate web storage once. */
  shouldFallback?: boolean;
}

/** Probes whether `localStorage` exists and is usable (not blocked by policy). */
const isLocalStorageAvailable = () => {
  if (!("localStorage" in globalThis)) {
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

/**
 * Checks whether localStorage can perform the given action.
 * For SET, also verifies the value fits (QuotaExceededError) without leaving the key.
 */
const isLocalStorageAvailableForAction = (
  action: StorageAction,
  key: string,
  value: string
) => {
  let isAvailabe;
  if (action === StorageAction.SET) {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem(key, value);
        localStorage.removeItem(key);
      } catch (e) {
        if (
          e instanceof DOMException &&
          e.name === "QuotaExceededError"
        ) {
          //TODO handle quota exceeded error
          isAvailabe = false;
        }
      }
    } else {
      isAvailabe = false;
    }
  } else {
    isAvailabe = isLocalStorageAvailable();
  }
  return isAvailabe;
};

/** Probes whether `sessionStorage` exists and is usable. */
const isSessionStorageAvailable = () => {
  if (!("sessionStorage" in globalThis)) {
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
      e.name === "SecurityError"
    ) {
      //TODO handle security error
      return false;
    }
    //TODO catch via sentry
    return false;
  }
};

/**
 * Checks whether sessionStorage can perform the given action.
 * For SET, also verifies the value fits (QuotaExceededError) without persisting the test write.
 */
const isSessionStorageAvailableForAction = (
  action: StorageAction,
  key: string,
  value: string
) => {
  let isAvailabe;
  if (action === StorageAction.SET) {
    if (isSessionStorageAvailable()) {
      try {
        sessionStorage.setItem(key, value);
        sessionStorage.removeItem(key);
        isAvailabe = true;
      } catch (e) {
        if (
          e instanceof DOMException &&
          e.name === "QuotaExceededError"
        ) {
          //TODO handle quota exceeded error
          isAvailabe = false;
        }
      }
    } else {
      isAvailabe = false;
    }
  } else {
    isAvailabe = isSessionStorageAvailable();
  }
  return isAvailabe;
};

/**
 * Reads/writes/clears localStorage for `key`.
 * If unavailable and `options.shouldFallback`, tries sessionStorage once (no further fallback).
 */
const handleLocalStorage = (
  key: string,
  value: string,
  type: StorageAction,
  options?: StorageOptions
): string | null | undefined => {
  if (isLocalStorageAvailableForAction(type, key, value)) {
    switch (type) {
      case StorageAction.GET:
        return localStorage.getItem(key);
      case StorageAction.SET:
        localStorage.setItem(key, value);
        break;
      case StorageAction.REMOVE:
        localStorage.removeItem(key);
        break;
      case StorageAction.CLEAR:
        localStorage.clear();
        break;
    }
  } else if (options?.shouldFallback) {
    if (
      isSessionStorageAvailableForAction(type, key, value)
    ) {
      return handleSessionStorage(key, value, type, {
        shouldFallback: false,
      });
    }
  }
  return;
};

/**
 * Reads/writes/clears sessionStorage for `key`.
 * If unavailable and `options.shouldFallback`, tries localStorage once.
 */
const handleSessionStorage = (
  key: string,
  value: string,
  type: StorageAction,
  options?: StorageOptions
): string | null | undefined => {
  if (
    isSessionStorageAvailableForAction(type, key, value)
  ) {
    switch (type) {
      case StorageAction.GET:
        return sessionStorage.getItem(key);
      case StorageAction.SET:
        sessionStorage.setItem(key, value);
        break;
      case StorageAction.REMOVE:
        sessionStorage.removeItem(key);
        break;
      case StorageAction.CLEAR:
        sessionStorage.clear();
        break;
    }
  } else if (options?.shouldFallback) {
    if (
      isLocalStorageAvailableForAction(type, key, value)
    ) {
      return handleLocalStorage(key, value, type, {
        shouldFallback: false,
      });
    }
  }
  return;
};

/** Probes the Cookie Store API (`cookieStore`) when present. */
const isCookeStoreAvailable = async () => {
  if (!("cookieStore" in globalThis)) {
    //TODO catch via sentry
    return false;
  }
  try {
    await cookieStore.set("test_key", "test_value");
    await cookieStore.delete("test_key");
    return true;
  } catch (e) {
    if (
      e instanceof DOMException &&
      e.name === "SecurityError"
    ) {
      //TODO handle security error
      return false;
    }
  }
  return true;
};

/** Probes classic `document.cookie` read/write support. */
const isDocumentCookieAvailable = () => {
  if (!("document" in globalThis)) {
    //TODO catch via sentry
    return false;
  }
  if (!("cookie" in document)) {
    //TODO catch via sentry
    return false;
  }
  try {
    document.cookie = "test_key=test_value";
    const cookies = document.cookie.split("; ");
    const testCookie = cookies
      .find((cookie) => cookie.startsWith("test_key="))
      ?.split("=")[1];
    if (!testCookie || testCookie !== "test_value") {
      return false;
    }
    return true;
  } catch {
    //TODO catch via sentry
    return false;
  }
};

/**
 * Cookie get/set/remove/clear via Cookie Store API, then `document.cookie`,
 * then optional fallback to local/session when `shouldFallback` is true.
 * @returns For GET: cookie value or null/undefined; otherwise undefined.
 */
const handleCookieStorage = async (
  key: string,
  value: string,
  type: StorageAction,
  shouldFallback?: boolean,
  options?: {
    domain?: string;
    expires?: Date;
    maxAge?: number;
    path?: string;
  }
): Promise<string | null | undefined> => {
  if (await isCookeStoreAvailable()) {
    switch (type) {
      case StorageAction.GET:
        return (
          (await cookieStore
            .get(key)
            .then((cookie) => cookie?.value ?? null)
            .catch((e: unknown) => {
              if (e instanceof TypeError) {
                //TODO handle type error
              }
            })) ?? null
        );
      case StorageAction.SET:
        cookieStore.set(key, value).catch((e: unknown) => {
          if (e instanceof TypeError) {
            //TODO handle type error
          }
        });
        break;
      case StorageAction.REMOVE:
        cookieStore.delete(key).catch((e: unknown) => {
          //TODO catch via sentry
          if (e instanceof TypeError) {
            //TODO handle type error
          }
        });
        break;
      case StorageAction.CLEAR:
        cookieStore
          .getAll()
          .then((cookies) => {
            cookies.forEach((cookie) => {
              cookieStore
                .delete(cookie.name ?? "")
                .catch((e: unknown) => {
                  if (e instanceof TypeError) {
                    //TODO handle type error
                  }
                });
            });
          })
          .catch((e: unknown) => {
            if (e instanceof TypeError) {
              //TODO handle type error
            }
          });
        break;
    }
  } else if (isDocumentCookieAvailable()) {
    switch (type) {
      case StorageAction.GET:
        return document.cookie
          .split("; ")
          .find((row) => row.startsWith(key + "="))
          ?.split("=")[1];

      case StorageAction.SET:
        document.cookie = `${key}=${value};
        ${options?.path ? `path=${options.path};` : ""}
        ${options?.domain ? `domain=${options.domain};` : ""}
        ${options?.expires ? `expires=${options.expires.toUTCString()};` : ""}
        ${options?.maxAge ? `maxAge=${options.maxAge};` : ""}`;
        break;
      case StorageAction.REMOVE:
        document.cookie = `${key}=; expires=${new Date(0).toUTCString()}`;
        break;
      case StorageAction.CLEAR:
        document.cookie = "";
        break;
    }
  } else {
    if (shouldFallback) {
      if (
        isLocalStorageAvailableForAction(type, key, value)
      ) {
        return handleLocalStorage(key, value, type, {
          shouldFallback: false,
        });
      } else if (
        isSessionStorageAvailableForAction(type, key, value)
      ) {
        return handleSessionStorage(key, value, type, {
          shouldFallback: false,
        });
      }
    }
  }
  return;
};

/** Public: get a string value from local or session storage. */
const getStorageItem = (
  key: string,
  type: STORAGE_TYPES,
  options?: StorageOptions
): string | null | undefined => {
  switch (type) {
    case STORAGE_TYPES.LOCAL: {
      return handleLocalStorage(
        key,
        "",
        StorageAction.GET,
        options
      );
    }
    case STORAGE_TYPES.SESSION: {
      return handleSessionStorage(
        key,
        "",
        StorageAction.GET,
        options
      );
    }
  }
};

/** Public: set a string value in local or session storage. */
const setStorageItem = (
  key: string,
  value: string,
  storageType: STORAGE_TYPES,
  options?: StorageOptions
) => {
  switch (storageType) {
    case STORAGE_TYPES.LOCAL: {
      handleLocalStorage(
        key,
        value,
        StorageAction.SET,
        options
      );
      return;
    }
    case STORAGE_TYPES.SESSION: {
      handleSessionStorage(
        key,
        value,
        StorageAction.SET,
        options
      );
      return;
    }
  }
};

/** Public: remove a key from local or session storage. */
const removeStorageItem = (
  key: string,
  storageType: STORAGE_TYPES,
  options?: StorageOptions
) => {
  switch (storageType) {
    case STORAGE_TYPES.LOCAL: {
      handleLocalStorage(
        key,
        "",
        StorageAction.REMOVE,
        options
      );
      return;
    }
    case STORAGE_TYPES.SESSION: {
      handleSessionStorage(
        key,
        "",
        StorageAction.REMOVE,
        options
      );
      return;
    }
  }
};

/** Public: clear all keys in local or session storage. */
const clearStorage = (
  storageType: STORAGE_TYPES,
  options?: StorageOptions
) => {
  switch (storageType) {
    case STORAGE_TYPES.LOCAL: {
      handleLocalStorage(
        "",
        "",
        StorageAction.CLEAR,
        options
      );
      return;
    }
    case STORAGE_TYPES.SESSION: {
      handleSessionStorage(
        "",
        "",
        StorageAction.CLEAR,
        options
      );
      return;
    }
  }
};

const webStorage = {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
};

export { webStorage, handleCookieStorage };
