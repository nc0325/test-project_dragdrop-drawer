import apiService from '../../services/api';

const getCustomersEngagementStats = async (params) => {
  const response = await apiService({
    url: `/user/customers-engagement/statistics`,
    method: 'get',
    params: {
      ...(params.time && {time: params.time}),
    },
  });
  return response.data;
};

const customersEngagementService = {
  getCustomersEngagementStats,
};

export default customersEngagementService;
