import apiService from '../../services/api';

const initiateFoodics = async () => {
  const response = await apiService.post('/foodics/initiate/');

  return response.data;
};

const successFoodics = async (data) => {
  const response = await apiService.post('/foodics/success', data);

  return response.data;
};

const getIntegrations = async () => {
  const response = await apiService.get('/integrations');

  return response.data;
};

const integrationsService = {
  initiateFoodics,
  successFoodics,
  getIntegrations,
};

export default integrationsService;
