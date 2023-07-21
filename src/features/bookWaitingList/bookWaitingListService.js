import apiService from '../../services/api';

const bookWaitingList = async (id, data) => {
  const response = await apiService.post(
    `/account/${id}/waiting-list/book`,
    data,
  );

  return response.data;
};

const bookWaitingListService = {
  bookWaitingList,
};

export default bookWaitingListService;
