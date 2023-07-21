import apiService from '../../services/api';

const addService = async (data) => {
  const response = await apiService.post('/user/services/', data);

  return response.data;
};

const addServiceService = {
  addService,
};

export default addServiceService;
