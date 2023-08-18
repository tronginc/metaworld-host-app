import { AxiosError } from 'axios';
import i18n from '../i18n/i18n';

export const isEmailValid = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const isPhoneValid = (phone: string) => {
  const re = /^(\+|0)?[0-9]{10}$/;
  return re.test(phone);
};

export const getRequestError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Check network error
    if (!error.response) {
      return i18n.t('messages:api_errors.network_error');
    }
    if (error.response.status === 401) {
      return i18n.t('messages:api_errors.unauthorized');
    }
    if (error.response.status === 403) {
      return i18n.t('messages:api_errors.forbidden');
    }
    if (error.response.status === 404) {
      return i18n.t('messages:api_errors.not_found');
    }
    if (error.response.status === 500) {
      return i18n.t('messages:api_errors.internal_server_error');
    }
    if (error.response.status === 502) {
      return i18n.t('messages:api_errors.service_unavailable');
    }
    if (typeof error.response.data === 'string') {
      return error.response.data;
    }
    if (error.response.data?.message) {
      return error.response.data.message;
    }
  }

  if (error instanceof Error) {
    if (!error.message) {
      return i18n.t('messages:api_errors.unknown_error');
    }
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  console.log(error);

  return i18n.t('messages:api_errors.unknown_error');
};
