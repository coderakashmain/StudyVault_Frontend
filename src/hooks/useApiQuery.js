import { useEffect, useState, useCallback } from "react";

const useApiQuery = (apiFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFn();
      setData(res);
    } catch (err) {
      setError(err?.message || "API request failed");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
};

export default useApiQuery;
