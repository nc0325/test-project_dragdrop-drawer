import apiService from '../../services/api';

const getGiftCards = async (params) => {
  const response = await apiService({
    url: `/user/gift-cards`,
    method: 'get',
    params: {
      ...(params.page && params.page > 1 && {page: params.page}),
      ...(params.q && {q: params.q}),
    },
  });
  return response.data;
};

const getGiftCardsStats = async (params) => {
  const response = await apiService({
    url: `/user/gift-cards/statistics`,
    method: 'get',
    params: {
      ...(params.time && {time: params.time}),
    },
  });
  return response.data;
};

const createGiftCard = async (data) => {
  const response = await apiService.post('/user/gift-cards', data);

  return response.data;
};

const giftCardService = {
  createGiftCard,
  getGiftCards,
  getGiftCardsStats,
};

export default giftCardService;
