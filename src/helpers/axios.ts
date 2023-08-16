import axios from 'axios';
import { SERVICE_ACCOUNT_API_URL, SERVICE_ACCOUNT_SERVICE_NAME } from '@env';
import useUserStore from '@stores/user.store';
import { getRequestError } from '@utils/string';

// Config default axios
axios.defaults.baseURL = SERVICE_ACCOUNT_API_URL;
axios.defaults.headers.common.ServiceName = SERVICE_ACCOUNT_SERVICE_NAME;

axios.interceptors.request.use(config => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = config.url || '';
  console.log(`[REQUEST] ${method} ${url}`);
  return config;
});

axios.interceptors.response.use(
  response => {
    const config = response.config;
    const method = config.method?.toUpperCase() || 'GET';
    const url = config.url || '';
    console.log(`[REQUEST] ${method} ${url} - SUCCESS`);
    console.log(JSON.stringify(response.data, null, 2));
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response.data);
    }
    const isUnauthorized = error.response?.status === 401;
    if (isUnauthorized) {
      const { clearStore, credentials } = useUserStore.getState();
      if (credentials) {
        clearStore();
        return Promise.reject(new Error(getRequestError(error)));
      }
      // Skip clear store if not login
      return;
    }
    return Promise.reject(new Error(getRequestError(error)));
  },
);
