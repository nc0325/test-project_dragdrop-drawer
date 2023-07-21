import apiService from '../../services/api';

const getFeedbacks = async (params) => {
  const response = await apiService({
    url: `/user/feedbacks`,
    method: 'get',
    params: {
      ...(params.page && params.page > 1 && {page: params.page}),
      ...(params.q && {q: params.q}),
    },
  });

  return response.data;
};

const getFeedbacksStats = async () => {
  const response = await apiService.get('/user/feedbacks/statistics');

  return response.data;
};

const feedbacksService = {
  getFeedbacks,
  getFeedbacksStats,
};

export default feedbacksService;
