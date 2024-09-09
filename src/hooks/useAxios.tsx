import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook para manejar las peticiones desde Axios
 * @param initialConfig Configuración inicial de Axios
 * @returns Hook para el uso axios
 */
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

  // Callback para enviar la solicitud
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

  /**
   * Metodo para actualizar la configuración y volver a enviar la configuración
   * @param _config Nueva configuración
   */
  const updateConfig = (_config: AxiosRequestConfig): void => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      ..._config,
    }));
  };

  return [data, isLoading, hasError, updateConfig, config];
}

export default useAxios;
