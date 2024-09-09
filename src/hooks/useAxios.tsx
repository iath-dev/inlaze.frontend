import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

function useAxios<T>(
  initialConfig: AxiosRequestConfig,
): [
  T | null,
  boolean,
  AxiosError | null,
  (config: AxiosRequestConfig) => void,
  AxiosRequestConfig,
] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<AxiosError | null>(null);
  const [config, setConfig] = useState<AxiosRequestConfig>(initialConfig);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setHasError(null);
    try {
      const response: AxiosResponse<T> = await axios(config.url!, config);
      setData(response.data);
    } catch (err) {
      setHasError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateConfig = (_config: AxiosRequestConfig): void => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      ..._config,
    }));
  };

  return [data, isLoading, hasError, updateConfig, config];
}

export default useAxios;
