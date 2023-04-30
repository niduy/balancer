import { useEffect, useState } from "react";
import { fetcher } from "../utils/fetcher";

// TODO: reset timeout when data is updated
const createData = <T>(key: string, data: T) => {
  return {
    data,
    timeoutId: setTimeout(() => localStorage.removeItem(key), 1000 * 60 * 10),
  };
};

type Options<T> = {
  initialData?: T;
  shouldCache?: boolean;
  shouldUseCachedData?: boolean;
  customFetcher?: (url?: string) => Promise<T>;
};

export const useFetcher = <T extends unknown>(
  url: string,
  {
    initialData: initialDataProp,
    shouldCache = true,
    shouldUseCachedData = true,
    customFetcher,
  }: Options<T> = {}
) => {
  const initialData = initialDataProp;
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setLoading(true);

    const cachedDataString = localStorage.getItem(url);
    if (shouldUseCachedData && cachedDataString) {
      const cachedData = JSON.parse(cachedDataString) as {
        data: T;
        timeoutId: number;
      };

      setLoading(false);
      setValue(cachedData.data);
      return;
    }

    if (initialData && initialData === initialDataProp) {
      const data = createData(url, initialData);
      if (shouldCache) localStorage.setItem(url, JSON.stringify(data));

      setLoading(false);
      setValue(initialData);
      return;
    }

    (customFetcher?.(url) ?? fetcher(url)).then((fetchedData: T) => {
      const data = createData(url, fetchedData);
      if (shouldCache) localStorage.setItem(url, JSON.stringify(data));

      setLoading(false);
      setValue(fetchedData);
    });
  }, [url, initialData, initialDataProp]);

  return {
    data: value,
    loading,
  };
};
