import apiService from '../../services/api';

const getWaitingListStats = async (params) => {
  const response = await apiService({
    url: `/user/waiting-list/statistics`,
    method: 'get',
    params: {
      ...(params.time && {time: params.time}),
    },
  });
  return response.data;
};

const waitingListService = {
  getWaitingListStats,
};

export default waitingListService;
