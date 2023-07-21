import axios from 'axios';
import {notification} from 'antd';
import defaultConfig from '../../@crema/utility/AppContextProvider/defaultConfig';
import {parseValidationErrors} from '../../utils';

const apiService = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/v1`,
  timeout: 60000,
});

apiService.interceptors.request.use((req) => {
  const locale = localStorage.getItem('locale') || defaultConfig.locale.locale;

  req.headers['Accept-Language'] = locale;

  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem('user'),
    )}`;
  }
  return req;
});

apiService.interceptors.response.use(
  function (response) {
    if (response.data.message && response.data.status === 'success') {
      notification.success({
        description: response.data.message,
      });
    }

    return response;
  },
  function (error) {
    if (error.response.data.message && !error.response.data.errors) {
      notification.error({
        description: error.response.data.message,
      });
    }
    if (error.response.data.errors) {
      const errors = parseValidationErrors(error.response.data.errors);

      errors.forEach((error) => {
        notification.error({
          description: error,
        });
      });
    }
    // Remove token and redirect
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  },
);

export default apiService;
