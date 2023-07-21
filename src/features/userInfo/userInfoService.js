import apiService from '../../services/api';

const getUserInfo = async () => {
  const response = await apiService.get('/info');

  return response.data;
};

const updateUserInfo = async (data) => {
  const response = await apiService.put('/user', data);

  return response.data;
};

const updateUserPassword = async (data) => {
  const response = await apiService.put('/user/update-password', data);

  return response.data;
};

const updateUserAvatar = async (data) => {
  const response = await apiService.post('/user/upload-avatar', data);

  return response.data;
};

const markUnreadNotificationsAsRead = async () => {
  const response = await apiService.put('/user/notifications/mark-all-read');

  return response.data;
};

const userInfoService = {
  getUserInfo,
  updateUserInfo,
  updateUserPassword,
  updateUserAvatar,
  markUnreadNotificationsAsRead,
};

export default userInfoService;
