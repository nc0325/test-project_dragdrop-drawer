import apiService from '../../services/api';

const getLoyalty = async () => {
  const response = await apiService.get('/user/loyalties');
  return response.data;
};

const loyaltyService = {
  getLoyalty,
};

export default loyaltyService;
