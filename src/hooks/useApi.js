import { useState, useContext, useCallback } from "react";
import coreRequest from "../services/apiCore";
import { UserContext } from "../Context/UserContext/UserContextdata";

const useApi = () => {
  const { usernav } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(
    async (method, url, token = false, payload = null, params = null) => {
      setLoading(true);
      setError(null);

      try {
        const resolvedToken =
          token === true
            ? usernav?.token
            : typeof token === "string"
            ? token
            : null;

        const res = await coreRequest({
          method,
          url,
          token: resolvedToken,
          data: method !== "GET" ? payload : null,
          params: method === "GET" ? payload : params,
        });

        return res;
      } catch (err) {
        setError(err?.message || "API request failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [usernav]
  );

  return {
    loading,
    error,

    get: (url, token = false, params = null) =>
      call("GET", url, token, params),

    post: (url, token = false, payload = null) =>
      call("POST", url, token, payload),

    put: (url, token = false, payload = null) =>
      call("PUT", url, token, payload),

    delete: (url, token = false, payload = null) =>
      call("DELETE", url, token, payload),
  };
};

export default useApi;
