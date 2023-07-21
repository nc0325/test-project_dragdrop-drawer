import apiService from '../../services/api';

const bookReservation = async (id, data) => {
  const response = await apiService.post(
    `/account/${id}/reservation/book`,
    data,
  );

  return response.data;
};

const bookReservationService = {
  bookReservation,
};

export default bookReservationService;
