import apiService from '../../services/api';

const getCustomers = async (params) => {
  const response = await apiService({
    url: `/user/customers`,
    method: 'get',
    params: {
      ...(params.page && params.page > 1 && {page: params.page}),
      ...(params.q && {q: params.q}),
    },
  });

  return response.data;
};

const getCustomersStats = async (params) => {
  const response = await apiService({
    url: `/user/customers/statistics`,
    method: 'get',
    params: {
      ...(params.time && {time: params.time}),
    },
  });
  return response.data;
};

const customersService = {
  getCustomers,
  getCustomersStats,
};

export default customersService;
