import apiService from '../../services/api';

const getDashboardData = async () => {
  const response = await apiService.get('/dashboard');

  return response.data;
};

const updateLoyalty = async (id, data) => {
  const response = await apiService.put('/user/loyalties/' + id, data);

  return response.data;
};

const homeService = {
  getDashboardData,
  updateLoyalty,
};

export default homeService;
