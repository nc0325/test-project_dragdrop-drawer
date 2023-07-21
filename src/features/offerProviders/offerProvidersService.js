import apiService from '../../services/api';

const getOfferProviders = async () => {
  const response = await apiService.get('/user/offer-providers');

  return response.data;
};

const offerProviderQuickService = async (id, data) => {
  const response = await apiService.post(
    `/user/offer-providers/${id}/quick-service`,
    data,
  );

  return response.data;
};

const offerProvidersService = {
  getOfferProviders,
  offerProviderQuickService,
};

export default offerProvidersService;
