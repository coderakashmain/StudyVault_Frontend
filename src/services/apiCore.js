import axios from "axios";

const apiBaseUrl = import.meta?.env?.VITE_API_URL || '/api';


const api = axios.create({
  baseURL: apiBaseUrl ,
  withCredentials: true, // cookie auth
});

const coreRequest = async ({ method, url, token, data, params }) => {
  const config = {
    method,
    url,
    data,
    params,
    headers: {},
  };

  //  attach token only if provided
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await api(config);
  return response.data;
};

export default coreRequest;
