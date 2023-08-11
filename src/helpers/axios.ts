import axios, { AxiosError } from 'axios';
import { SERVICE_ACCOUNT_API_URL, SERVICE_ACCOUNT_SERVICE_NAME } from '@env';
import i18n from '../i18n/i18n';

// Config default axios
axios.defaults.baseURL = SERVICE_ACCOUNT_API_URL;
axios.defaults.headers.common.ServiceName = SERVICE_ACCOUNT_SERVICE_NAME;

axios.interceptors.request.use(config => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = config.url || '';
  console.log(`[REQUEST] ${method} ${url}`);
  return config;
});

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    // Check network error
    if (!error.response) {
      return i18n.t('messages.api_errors.network_error');
    }
    if (error.response.status === 401) {
      return i18n.t('messages.api_errors.unauthorized');
    }
    if (error.response.status === 403) {
      return i18n.t('messages.api_errors.forbidden');
    }
    if (error.response.status === 404) {
      return i18n.t('messages.api_errors.not_found');
    }
    if (error.response.status === 500) {
      return i18n.t('messages.api_errors.internal_server_error');
    }
    if (error.response.data?.message) {
      return error.response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  console.log(error);

  return i18n.t('messages.api_errors.unknown_error');
};

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      console.log(error.response.data);
    }
    return Promise.reject(new Error(getErrorMessage(error)));
  },
);
