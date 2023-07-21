import apiService from '../../services/api';

const checkCode = async (data) => {
  const response = await apiService.post('/user/check-code/', data);

  return response.data;
};

const checkCodeService = {
  checkCode,
};

export default checkCodeService;
