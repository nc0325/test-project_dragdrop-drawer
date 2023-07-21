import apiService from '../../services/api';

const getActiveWaitingList = async () => {
  const response = await apiService.get('/user/active-waiting-list');

  return response.data;
};

const updateActiveWaitingList = async (id) => {
  const response = await apiService.put('/user/active-waiting-list/' + id);

  return response.data;
};

const deleteActiveWaitingList = async (id) => {
  const response = await apiService.delete('/user/active-waiting-list/' + id);

  return response.data;
};

const activeWaitingListService = {
  getActiveWaitingList,
  updateActiveWaitingList,
  deleteActiveWaitingList,
};

export default activeWaitingListService;
