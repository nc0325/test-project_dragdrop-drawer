import apiService from '../../services/api';

const getNotifications = async (page = null) => {
  const response = await apiService({
    url: '/user/notifications',
    params: page ? {page} : {},
  });

  return response.data;
};

const notificationsService = {
  getNotifications,
};

export default notificationsService;
