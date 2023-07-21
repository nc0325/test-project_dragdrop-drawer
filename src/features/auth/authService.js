import apiService from '../../services/api';

const register = async (userData) => {
  const response = await apiService.post('/user/register', userData);

  return response.data;
};

const login = async (userData) => {
  const response = await apiService.post('/user/login', userData);

  if (response.data.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data.token));
  }

  return response.data;
};

const logout = async () => {
  const response = await apiService.post('/user/logout');

  return response.data;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
