import apiService from '../../services/api';

const getWeeklyOffer = async () => {
  const response = await apiService.get('/user/weekly-offer');

  return response.data;
};

const updateWeeklyOffer = async (data) => {
  const response = await apiService.put('/user/weekly-offer', data);

  return response.data;
};

const createWeeklyOffer = async (data) => {
  const response = await apiService.post('/user/weekly-offer', data);

  return response.data;
};

const weeklyOfferService = {
  getWeeklyOffer,
  updateWeeklyOffer,
  createWeeklyOffer,
};

export default weeklyOfferService;
