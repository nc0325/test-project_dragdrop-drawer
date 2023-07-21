import apiService from '../../services/api';

const getActiveReservations = async () => {
  const response = await apiService.get('/user/active-reservations');

  return response.data;
};

const confirmActiveReservations = async (id) => {
  const response = await apiService.put(`/user/reservations/${id}/confirm`);

  return response.data;
};

const attendActiveReservations = async (id) => {
  const response = await apiService.put(`/user/reservations/${id}/attend`);

  return response.data;
};

const activeReservationsService = {
  getActiveReservations,
  confirmActiveReservations,
  attendActiveReservations,
};

export default activeReservationsService;
