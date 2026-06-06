"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const tabListeners = new Map<string, Set<() => void>>();

function notifyTab(key: string) {
  tabListeners.get(key)?.forEach((cb) => cb());
}

function makeSubscribe(key: string) {
  return (cb: () => void) => {
    let set = tabListeners.get(key);
    if (!set) {
      set = new Set();
      tabListeners.set(key, set);
    }
    set.add(cb);

    const onStorage = (e: StorageEvent) => {
      if (e.key === key) cb();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      tabListeners.get(key)?.delete(cb);
      window.removeEventListener("storage", onStorage);
    };
  };
}

function makeGetSnapshot(key: string) {
  return () => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };
}

const getServerSnapshot = () => null;

export function useLocalState<T>(key: string, initial: T) {
  const subscribe = useMemo(() => makeSubscribe(key), [key]);
  const getSnapshot = useMemo(() => makeGetSnapshot(key), [key]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<T>(() => {
    if (raw == null) return initial;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  }, [raw, initial]);

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      let current: T;
      try {
        const cr = window.localStorage.getItem(key);
        current = cr != null ? (JSON.parse(cr) as T) : initial;
      } catch {
        current = initial;
      }
      const next =
        typeof updater === "function"
          ? (updater as (p: T) => T)(current)
          : updater;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore quota / privacy mode
      }
      notifyTab(key);
    },
    [key, initial],
  );

  return [value, setValue] as const;
}
