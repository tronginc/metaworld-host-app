import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { SERVICE_ACCOUNT_API_URL, SERVICE_ACCOUNT_SERVICE_NAME } from '@env';
import useUserStore from '@stores/user.store';
import { getRequestError } from '@utils/string';

// Config default axios
axios.defaults.baseURL = SERVICE_ACCOUNT_API_URL;
axios.defaults.headers.common.ServiceName = SERVICE_ACCOUNT_SERVICE_NAME;

axios.interceptors.request.use(config => {
  return configWithLogger(config);
});

axios.interceptors.response.use(
  response => {
    if ('status' in response.data && 'data' in response.data) {
      // Handle response from service account
      // Don't know why service account return response like this (status in data instead of status in response)
      // So we need to handle it
      // Construct new axios error if status is > 400
      if (response.data.status >= 400) {
        const error = new AxiosError(
          response.data.message,
          response.data.status,
          response.config,
          response.request,
          response,
        );

        return errorWithLogger(error);
      }
      // Now we can return data like a normal axios response!
      return responseWithLogger(response.data);
    }
    // Return normal axios response like a normal axios response! :D
    return responseWithLogger(response);
  },
  (error: AxiosError) => {
    console.log('-------------------------------------');
    const isUnauthorized = error.response?.status === 401;
    if (isUnauthorized) {
      const { clearStore, credentials } = useUserStore.getState();
      if (credentials) {
        clearStore();
        return errorWithLogger(error);
      }
      // Skip clear store if not login
      return;
    }
    return errorWithLogger(error);
  },
);

const configWithLogger = <T>(config: InternalAxiosRequestConfig<T>) => {
  if (__DEV__) {
    const method = config.method?.toUpperCase() || 'GET';
    const url = config.url || '';
    console.log('[REQUEST]', method, url);
  }
  return config;
};

const responseWithLogger = <T>(response: T) => {
  if (__DEV__) {
    console.log('[RESPONSE]', JSON.stringify(response, null, 2));
  }
  return response;
};

const errorWithLogger = (error: AxiosError) => {
  if (__DEV__) {
    console.group('[ERROR]');
    const config = error.response?.config;
    const method = config?.method?.toUpperCase() || 'GET';
    const url = config?.url || '';
    const status = error.response?.status;
    console.log(method, url, status, status === 200 ? '?' : '');

    const headers = config?.headers;
    console.log('Headers:', JSON.stringify(headers, null, 2));

    const body = config?.data;
    console.log('Body:', JSON.stringify(body, null, 2));

    const data = error.response?.data;
    console.log('Response:', JSON.stringify(data, null, 2));
    console.groupEnd();
  }
  return Promise.reject(new Error(getRequestError(error)));
};
