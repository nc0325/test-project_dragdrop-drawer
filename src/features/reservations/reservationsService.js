import apiService from '../../services/api';

const getReservations = async (params) => {
  const response = await apiService({
    url: `/user/reservations`,
    method: 'get',
    params: {
      ...(params.page && params.page > 1 && {page: params.page}),
      ...(params.q && {q: params.q}),
    },
  });

  return response.data;
};

const getPendingReservations = async (params) => {
  const response = await apiService({
    url: `/user/reservations`,
    method: 'get',
    params: {
      filter: 'pending',
      ...(params.page && params.page > 1 && {page: params.page}),
    },
  });

  return response.data;
};

const createReservation = async (data) => {
  const response = await apiService.post(`/user/reservations`, data);

  return response.data;
};

const confirmReservation = async (id) => {
  const response = await apiService.put(`/user/reservations/${id}/confirm`);

  return response.data;
};

const attendReservation = async (id) => {
  const response = await apiService.put(`/user/reservations/${id}/attend`);

  return response.data;
};

const deleteReservation = async (id) => {
  const response = await apiService.delete(`/user/reservations/${id}`);

  return response.data;
};

const reservationsService = {
  getReservations,
  getPendingReservations,
  confirmReservation,
  attendReservation,
  deleteReservation,
  createReservation,
};

export default reservationsService;
